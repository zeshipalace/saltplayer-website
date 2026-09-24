# Salt Player 官方网站

使用 VitePress 构建，并通过 GitHub Pages 发布到 [saltplayer.com](https://saltplayer.com)。

文档页面位于 `docs/`，平台分组和侧边栏顺序配置在 `docs/.vitepress/config.mts`。

```sh
npm ci
npm run docs:dev
```

运行 `npm run docs:build` 构建，运行 `npm run docs:preview` 预览构建结果。推送到 `main` 后，GitHub Actions 会自动构建并发布。
