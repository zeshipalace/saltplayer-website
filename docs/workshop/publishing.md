# 发布 Mod

完成 [构建与安装](getting-started#构建与安装)，并验证插件功能、配置和启停行为后，可以通过 GitHub 或 Steam 创意工坊分享 Mod

## 通过 GitHub 分享

将构建生成的 `.spmod` 文件发布到自己的 GitHub Releases，并说明功能、适用系统、播放器版本、权限用途和安装方式

为仓库添加 [salt-player-plugins](https://github.com/topics/salt-player-plugins) topic，方便用户从播放器或本站找到插件，并引导用户按照 [本地导入步骤](usage#本地导入) 安装

## 发布到 Steam 创意工坊

Steam 渠道内置 Workshop Publisher，中文入口为「创意工坊发布」

1. 启动 Steam，登录拥有 Salt Player 的账号，在 Steam 渠道播放器中打开「创意工坊 → 创意工坊发布」
2. 选择「新建 Mod」，上传 `.spmod` 文件和小于 1 MB 的 PNG、JPG 或 GIF 封面
3. 核对标题与简介，确认工坊条款后发布，并停留在页面直到 Steam 确认完成
4. 打开上传后的条目页面，按提示接受协议并设置可见范围

新建条目默认私有。确认内容和说明准备完成后，再在 Steam 条目页面调整公开范围

更新时，从「我的 Mod」选择已有条目，按需替换插件包或封面，修改标题、简介并填写更新说明。未选择修改的内容会保留，更新不会改变条目的可见性

发布器仅接受 `.spmod` 文件。上传结果尚未确认时，先在 Steam 检查条目，再决定是否重试

发布完成后，可将 [Steam 创意工坊](https://steamcommunity.com/app/3009140/workshop/) 中的具体条目链接提供给用户，并引导他们按照 [Steam 订阅步骤](usage#steam-订阅) 安装
