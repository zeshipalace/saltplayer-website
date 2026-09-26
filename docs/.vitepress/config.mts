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
      { text: '发展历程', link: '/development' },
      {
        text: 'Windows',
        collapsed: false,
        items: [
          { text: '平台简介', link: '/windows/' },
          { text: '下载与安装', link: '/windows/install' },
          { text: '音乐库', link: '/windows/library' },
          { text: '音频播放', link: '/windows/audio' },
          { text: '外观与渲染', link: '/windows/appearance' },
          { text: '歌词与标签', link: '/windows/lyrics' },
          { text: '创意工坊', link: '/windows/workshop' },
          { text: '常见问题', link: '/windows/faq' },
          { text: '更新日志', link: '/windows/changelog' },
          { text: '加入测试', link: '/windows/join-dev' },
          { text: '法律信息', link: '/windows/legal' }
        ]
      },
      {
        text: 'Linux',
        collapsed: false,
        items: [
          { text: '平台简介', link: '/linux/' },
          { text: '安装与启动', link: '/linux/install' },
          { text: '音乐库与播放', link: '/linux/library' }
        ]
      },
      {
        text: 'Android',
        collapsed: false,
        items: [
          { text: '平台简介', link: '/android/' },
          { text: '下载与开始使用', link: '/android/install' },
          { text: '音乐库', link: '/android/library' },
          { text: '歌词', link: '/android/lyrics' }
        ]
      },
      {
        text: 'iOS',
        collapsed: false,
        items: [
          { text: '平台简介', link: '/ios/' },
          { text: '安装与开始使用', link: '/ios/install' },
          { text: '音乐库与播放', link: '/ios/library' }
        ]
      },
      {
        text: '鸿蒙',
        collapsed: false,
        items: [
          { text: '平台简介', link: '/harmonyos/' },
          { text: '安装与开始使用', link: '/harmonyos/install' },
          { text: '音乐库与播放', link: '/harmonyos/library' }
        ]
      }
    ]
  }
})
