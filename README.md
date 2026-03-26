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

当前线上版本已经预接入第三方 OpenAI-compatible 接口，打开网页即可直接使用。

如果你后续要切换到别的接口，也可以改这些常量：

- `/Users/zhengruyue/Documents/Playground/draftelier-ai-web/src/App.jsx`

默认分工：

- 穿搭解析：`gemini-3.1-pro-preview-h`
- 图生图：`gemini-3.1-flash-image-preview-c`
- 备用文生图：`gemini-3.1-flash-image-preview-c`

## Build

```bash
npm run build
npm run preview
```

## Deploy

推送到 GitHub `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布到 GitHub Pages。
