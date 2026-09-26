import { defineTeekConfig } from 'vitepress-theme-teek/config'
import { version } from 'vitepress-theme-teek/es/version'

export const teekConfig = defineTeekConfig({
  teekTheme: true,
  teekHome: false, // 保留 VitePress 默认首页，不启用 Teek 博客首页
  vpHome: true,
  loading: false,
  anchorScroll: true, // 阅读时自动将标题锚点加入地址栏
  windowTransition: true, // 元素视图渐入过渡
  viewTransition: {
    enabled: true, // 深浅色切换全屏扩散动画
    mode: 'out-in',
    duration: 300,
    easing: 'ease-in'
  },
  backTop: {
    enabled: true,
    content: 'progress' // 回到顶部按钮显示滚动进度环
  },
  codeBlock: {
    enabled: true,
    collapseHeight: 700,
    langTextTransform: 'uppercase',
    copiedDone: TkMessage => TkMessage.success('复制成功！')
  },
  sidebarTrigger: true,
  vitePlugins: {
    sidebar: false // 禁用按目录自动生成侧边栏，使用 config.mts 中手动配置的可折叠分组
  },
  themeEnhance: {
    enabled: true, // 导航栏右侧主题增强面板
    position: 'top',
    layoutSwitch: {
      defaultMode: 'original'
    },
    themeColor: {
      defaultColorName: 'vp-primary',
      defaultSpread: false
    },
    spotlight: {
      defaultStyle: 'aside',
      defaultValue: true
    }
  },
  footerInfo: {
    theme: {
      name: `Theme By Teek@${version}`,
      link: 'https://github.com/Kele-Bingtang/vitepress-theme-teek'
    },
    copyright: {
      createYear: 2020,
      suffix: 'Salt Player'
    }
  }
})
