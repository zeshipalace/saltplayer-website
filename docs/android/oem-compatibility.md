# Android OEM 兼容性

## 小米 Hyper OS / MIUI

| 项目 | 状态 | 说明 |
|:-- |:-- |:-- |
| 小米妙播 | 🟢 | 1. 调用小米妙播功能需要 MIUI 12 及以上版本，点击 Salt Player 播放界面右上角按钮自动跳转 <br> 2. 此功能基于小米投屏相关系统组件，若无效请检测是否禁用了相关组件 |
| CarWith | 🟢 | 2024 年 12 月 26 日 CarWith 3.3.6 版本支持，感谢小米官方支持，见小米澎湃OS公众号文章[《一张图看懂小米澎湃OS 2近期功能升级！》](https://mp.weixin.qq.com/s/LFz8oKGGo88Bt2xOaKXONg)中 CarWith 更新部分“适配 Salt Player 播放器” |
| Mix Flip 外屏显示 | 🟢 | |
| 小米 17 Pro / 18 Pro 系列背屏音乐 | 🔴 | 白名单，暂时沟通无果 |
| MIUI / Hyper OS 小部件 | 🔴 | 之前沟通未得到回复，搁置 |
| 小米车机 Pin 应用 | 🔴 | 白名单，暂时沟通无果 |

## 华为鸿蒙（Harmony Next 之前）

| 项目 | 状态 | 说明 |
|:-- |:-- |:-- |
| 音乐控制中心 | 🔴 | 白名单控制，相关功能应该官方不进行后续支持 |

## vivo OriginOS/Funtouch OS

| 项目 | 状态 | 说明 |
|:-- |:-- |:-- |
| joviincar 智能车载 | 🟢 | 1. 2024 年 8 月 29 日 vivo 智能车载 V4.0.7.3 版本添加了对 Salt Player 的支持，感谢向 vivo 反馈的用户和 vivo 的官方支持 <br> 2. 体验版，暂时不支持 joviincar 的歌词显示（不清楚适配方法），可通过车载蓝牙歌词模拟 |
| Hi-Fi | 🔵 | 1. 通过 adb 的方式输入 `settings put global game_support_hifi_list com.salt.music` 添加 <br> 2. 添加 Salt Player 进入 Hi-Fi 列表后，进入系统设置 > 声音与振动 > Hi-Fi 页面启用 <br> 3. 设备是否支持 Hi-Fi 功能，请前往 vivo 官网产品页面了解 |
| 原子随身听 | 🔴 | 白名单，官方沟通暂无进度 |

## OPPO ColorOS

| 项目 | 状态 | 说明 |
|:-- |:-- |:-- |
| 流体云 | 🟢 | 2024 年 11 月 4 日起逐步灰度测试，感谢 OPPO 官方支持 |
| 锁屏歌词 | 🔴 | 已联系上，暂无进度 |

## 魅族 Flyme

| 项目 | 状态 | 说明 |
|:-- |:-- |:-- |
| 状态栏歌词 | 🟢 | |
| 灵动光环音乐灯效 | 🟢 | 2025 年 10 月 22 日魅族发布 Flyme 12.3.1.2A 版本开始正式支持，感谢魅族官方专门提供支持 |