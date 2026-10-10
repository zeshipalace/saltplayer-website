# 创意工坊 <Badge type="tip" text="Windows" /> <Badge type="tip" text="Linux" />

创意工坊让你通过 Mod（模组，也称插件）扩展 Salt Player 的功能。

你可以安装社区分享的 Mod，也可以使用 Kotlin 或 Java 开发自己的插件。

创意工坊目前面向 Windows 和 Linux 桌面版本，插件 API 仍处于试验阶段。安装前请查看作者说明，确认 Mod 支持的系统、播放器版本和所需权限。

## 可以做什么

Mod 可以通过 SPW Workshop API 获取播放状态和歌词、控制播放、读取曲库信息、注册快捷键，或通过 Hook 调整应用行为与界面。具体能力由插件实现，并受播放器版本和用户授权影响。

播放器提供统一的模组管理入口，用于导入、启用、禁用和配置 Mod。Steam 渠道还支持通过 Steam 创意工坊订阅、下载和发布 Mod。

## 获取 Mod

| 来源 | 入口 | 使用方式 |
| --- | --- | --- |
| Steam 创意工坊 | [浏览 Salt Player 创意工坊](https://steamcommunity.com/app/3009140/workshop/) | 使用 Steam 渠道订阅，下载后在播放器中启用 |
| GitHub 社区 | [查找 Salt Player 插件](https://github.com/topics/salt-player-plugins) | 按作者说明下载插件包，在播放器中导入 |

详细步骤见 [安装与管理 Mod](usage)。

## 文档导航

- [安装与管理 Mod](usage)：本地导入、Steam 订阅、权限、配置与更新
- [开发入门](getting-started)：Gradle 配置、插件主类、播放扩展与元数据
- [插件配置](configs)：配置界面、读写设置与变更监听
- [插件权限](permissions)：权限声明、授权查询与拒绝处理
- [直接 Hook API](hook)：普通方法 Hook、UI 替换与追加内容
- [发布 Mod](publishing)：GitHub 分享、Steam 创意工坊发布与更新

## 开发者资源

SPW Workshop API 基于 PF4J，为 JVM 插件提供扩展点和播放器公开接口。

- [官网开发指南与示例](getting-started)
- [API 源码仓库](https://github.com/Moriafly/spw-workshop-api)
- [完整示例工程](https://github.com/Moriafly/spw-workshop-api/tree/main/example)
- [API 版本发布](https://github.com/Moriafly/spw-workshop-api/releases)
- [API 问题反馈](https://github.com/Moriafly/spw-workshop-api/issues)

第三方 Mod 的使用问题请优先向对应作者反馈，并附上播放器版本、Mod 版本和错误信息。
