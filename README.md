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

## Environment

在项目根目录创建 `.env.local`：

```bash
VITE_GEMINI_API_KEY=your_google_ai_api_key
```

注意：这个站点是纯前端部署，若直接部署到 GitHub Pages，`VITE_GEMINI_API_KEY` 会被打进浏览器端代码里，因此请务必在 Google Cloud / Gemini API 控制台里把 Key 限制到你的最终域名（HTTP referrer 限制）。

## Build

```bash
npm run build
npm run preview
```

## Deploy

推送到 GitHub `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布到 GitHub Pages。
