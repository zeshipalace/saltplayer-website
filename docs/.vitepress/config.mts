import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Salt Player',
  description: 'Salt Player 官方网站与使用文档',
  themeConfig: {
    sidebar: [
      { text: '简介', link: '/' },
      {
        text: 'Windows',
        collapsed: false,
        items: [
          { text: '平台简介', link: '/windows/' },
          { text: '下载与安装', link: '/windows/install' },
          { text: '音乐库', link: '/windows/library' },
          { text: '音频播放', link: '/windows/audio' }
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
