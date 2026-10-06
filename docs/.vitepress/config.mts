import { defineConfig } from 'vitepress'
import { teekConfig } from './teekConfig'

export default defineConfig({
  extends: teekConfig,
  lang: 'zh-CN',
  title: 'Salt Player',
  description: 'Salt Player 官方网站与使用文档',
  themeConfig: {
    nav: [
      { text: '文档', link: '/guide/' },
      { text: '新闻', link: '/news/' }
    ],
    outline: { label: '本页目录' },
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    // 多侧边栏：按路径前缀划分独立板块，最具体的前缀优先匹配
    sidebar: {
      // 新闻板块不显示侧边栏
      '/news/': [],
      '/': [
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
          { text: '安装与管理 Mod', link: '/workshop/usage' },
          { text: '开发入门', link: '/workshop/getting-started' },
          { text: '插件配置', link: '/workshop/configs' },
          { text: '插件权限', link: '/workshop/permissions' },
          { text: '直接 Hook API', link: '/workshop/hook' },
          { text: '发布 Mod', link: '/workshop/publishing' }
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
  }
})
