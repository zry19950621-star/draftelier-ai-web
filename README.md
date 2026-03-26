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

这个版本默认适配 OpenAI-compatible 接口，例如：

```bash
VITE_API_BASE_URL=https://api2.qiandao.mom/v1
VITE_API_KEY=your_api_key
VITE_ANALYSIS_MODEL=gemini-3.1-pro-preview-h
VITE_IMAGE_MODEL=gemini-3.1-flash-image-preview-c
```

更安全的做法是：不要把真实 Key 写进公开仓库或 GitHub Actions secrets 再打包到前端里。当前站点支持在浏览器里本地保存 API Key，因此部署到 GitHub Pages 后，推荐直接在网页的 `API Setup` 面板里填写，这样不会把密钥提交到仓库。

## Build

```bash
npm run build
npm run preview
```

## Deploy

推送到 GitHub `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布到 GitHub Pages。
