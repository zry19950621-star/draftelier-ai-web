/* global Buffer, process */

const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta'
const MAX_BODY_BYTES = 12 * 1024 * 1024

export default async function handler(req, res) {
  setCorsHeaders(res)

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: 'Method not allowed.' } })
    return
  }

  const apiKey = getGeminiApiKey()
  if (!apiKey) {
    res.status(500).json({ error: { message: 'GEMINI_API_KEY is not configured on the server.' } })
    return
  }

  try {
    const body = await readJsonBody(req)
    const model = normalizeGeminiModel(body?.model)
    const geminiRequest = buildGeminiGenerateContentRequest(body?.messages || [], model)
    const geminiResponse = await callGeminiGenerateContent(model, apiKey, geminiRequest)
    const completion = isImageModel(model)
      ? buildImageChatCompletion(geminiResponse, model)
      : buildTextChatCompletion(geminiResponse, model)

    res.status(200).json(completion)
  } catch (error) {
    const status = Number(error?.status) || 500
    res.status(status).json({
      error: {
        message: sanitizeErrorMessage(error?.message || 'Gemini request failed.'),
      },
    })
  }
}

function getGeminiApiKey() {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ''
  ).trim()
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return JSON.parse(req.body)

  const chunks = []
  let totalBytes = 0

  for await (const chunk of req) {
    totalBytes += chunk.length
    if (totalBytes > MAX_BODY_BYTES) {
      const error = new Error('Request body is too large. Please upload a smaller image.')
      error.status = 413
      throw error
    }
    chunks.push(chunk)
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')
  if (!rawBody.trim()) return {}
  return JSON.parse(rawBody)
}

function normalizeGeminiModel(model) {
  const rawModel = String(model || '').trim()
  const aliases = {
    'gemini-3.1-pro-preview-h': 'gemini-3.1-pro-preview',
    'gemini-3.1-flash-image-preview-c': 'gemini-3.1-flash-image',
    'gemini-2.5-flash-image-preview': 'gemini-2.5-flash-image',
  }

  return aliases[rawModel] || rawModel || 'gemini-3.1-pro-preview'
}

function isImageModel(model) {
  return /image/i.test(String(model || ''))
}

function buildGeminiGenerateContentRequest(messages, model) {
  const systemText = []
  const contents = []

  for (const message of Array.isArray(messages) ? messages : []) {
    const role = message?.role === 'assistant' ? 'model' : 'user'
    const parts = convertOpenAiContentToGeminiParts(message?.content)
    if (!parts.length) continue

    if (message?.role === 'system') {
      systemText.push(parts.map((part) => part.text).filter(Boolean).join('\n'))
    } else {
      contents.push({ role, parts })
    }
  }

  if (!contents.length) {
    const error = new Error('No valid message content was provided.')
    error.status = 400
    throw error
  }

  const request = {
    contents,
  }

  const systemInstruction = systemText.filter(Boolean).join('\n\n').trim()
  if (systemInstruction) {
    request.systemInstruction = {
      parts: [{ text: systemInstruction }],
    }
  }

  if (isImageModel(model)) {
    request.generationConfig = {
      responseModalities: ['IMAGE'],
      imageConfig: {
        aspectRatio: '3:4',
        imageSize: '2K',
      },
    }
  }

  return request
}

function convertOpenAiContentToGeminiParts(content) {
  if (typeof content === 'string') return [{ text: content }]
  if (!Array.isArray(content)) return []

  return content.flatMap((part) => {
    if (!part) return []
    if (part.type === 'text' && part.text) return [{ text: String(part.text) }]
    if (part.type === 'image_url') {
      const imageUrl = typeof part.image_url === 'string' ? part.image_url : part.image_url?.url
      const inlineData = parseDataImageUrl(imageUrl)
      return inlineData ? [{ inlineData }] : []
    }
    return []
  })
}

function parseDataImageUrl(dataUrl) {
  const match = String(dataUrl || '').match(/^data:([^;,]+);base64,(.+)$/)
  if (!match) return null

  return {
    mimeType: match[1],
    data: match[2],
  }
}

async function callGeminiGenerateContent(model, apiKey, payload) {
  const response = await fetch(`${GEMINI_API_BASE_URL}/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(async () => ({ raw: await response.text().catch(() => '') }))
  if (!response.ok) {
    const message = data?.error?.message || data?.message || data?.raw || `Gemini API error (${response.status}).`
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return data
}

function buildTextChatCompletion(geminiResponse, model) {
  const text = extractText(geminiResponse) || '{}'
  return buildChatCompletionPayload(model, text)
}

function buildImageChatCompletion(geminiResponse, model) {
  const image = extractInlineImage(geminiResponse)
  if (image) {
    return buildChatCompletionPayload(model, `data:${image.mimeType};base64,${image.data}`)
  }

  const text = extractText(geminiResponse)
  if (text) return buildChatCompletionPayload(model, text)

  const error = new Error('Gemini did not return an image payload.')
  error.status = 502
  throw error
}

function buildChatCompletionPayload(model, content) {
  return {
    id: `chatcmpl_${Date.now()}`,
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content,
        },
        finish_reason: 'stop',
      },
    ],
  }
}

function extractText(geminiResponse) {
  return getParts(geminiResponse)
    .map((part) => part?.text)
    .filter(Boolean)
    .join('\n')
    .trim()
}

function extractInlineImage(geminiResponse) {
  for (const part of getParts(geminiResponse)) {
    const inlineData = part?.inlineData || part?.inline_data
    if (inlineData?.data) {
      return {
        mimeType: inlineData.mimeType || inlineData.mime_type || 'image/png',
        data: inlineData.data,
      }
    }
  }
  return null
}

function getParts(geminiResponse) {
  return geminiResponse?.candidates?.flatMap((candidate) => candidate?.content?.parts || []) || []
}

function sanitizeErrorMessage(message) {
  const apiKey = getGeminiApiKey()
  if (!apiKey) return String(message || '')
  return String(message || '').replaceAll(apiKey, '[REDACTED]')
}
