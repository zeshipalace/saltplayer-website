import { defineConfig } from 'vitepress'
import { teekConfig } from './teekConfig'

export default defineConfig({
  extends: teekConfig,
  lang: 'zh-CN',
  title: 'Salt Player',
  description: 'Salt Player 官方网站与使用文档',
  themeConfig: {
    nav: [
      { text: '文档', link: '/guide/' }
    ],
    sidebar: [
      { text: '简介', link: '/guide/' },
      { text: '下载', link: '/download' }
    ]
  }
})
