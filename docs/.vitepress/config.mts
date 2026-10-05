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
    outline: { label: '本页目录' },
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    sidebar: [
      { text: '简介', link: '/guide/' },
      { text: '下载', link: '/download' },
      { text: '歌词', link: '/lyrics' },
      {
        text: '音频',
        link: '/audio',
        items: [
          { text: 'USB 独占模式', link: '/audio/usb-exclusive' }
        ]
      },
      { text: 'Morvanium', link: '/morvanium' },
      { 
        text: '创意工坊',
        link: '/workshop',
        items: [
          { text: '直接 Hook API', link: '/workshop/hook' }
        ]
      },
      {
        text: 'Android',
        items: [
          { text: '更新日志', link: '/android/changelog' },
          { text: 'OEM 兼容性', link: '/android/oem-compatibility' }
        ]
      },
      {
        text: 'iOS',
        items: [
          { text: '更新日志', link: '/ios/changelog' }
        ]
      }
    ]
  }
})
