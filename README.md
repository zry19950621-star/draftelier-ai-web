# Draftelier AI Web

Draftelier AI 的静态 React/Vite 网页版本，支持上传穿搭照片、选择时装手稿风格，并生成编辑感海报排版。

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 3
- GitHub Pages via GitHub Actions

## Local Development

```bash
npm install
npm run dev
```

## API Configuration

当前线上版本通过 Vercel Serverless Function 调用 Gemini API。Gemini 密钥只应配置在 Vercel 环境变量中，不要写入前端源码或 `VITE_` 变量。

本地或线上需要配置：

- `GEMINI_API_KEY`：服务端 Gemini API Key
- `VITE_API_BASE_URL=/api/gemini`

默认分工：

- 穿搭解析：`gemini-3.1-flash-lite`
- 图生图：`gemini-3.1-flash-image`
- 备用文生图：`gemini-3.1-flash-image`

## Build

```bash
npm run build
npm run preview
```

## Deploy

推送到 GitHub `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布到 GitHub Pages。
