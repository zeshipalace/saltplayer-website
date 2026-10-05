# 开发入门

本指南介绍如何创建、打包和运行一个 SPW 插件。API 使用 Kotlin 编写，同时提供 Java 调用方式；插件继承 `SpwPlugin`，通过 `WorkshopApi` 访问播放器，通过扩展点接收事件

## 开发环境与版本

如果插件使用 Compose UI，还需要配置 Compose compiler，并匹配宿主的 Kotlin 与 Compose 版本，见 [直接 Hook API](hook)

## 项目结构

```text
my-plugin/
├── settings.gradle.kts
├── build.gradle.kts
├── gradle.properties
├── gradlew
├── gradlew.bat
├── gradle/
│   ├── libs.versions.toml
│   └── wrapper/
└── src/main/
    ├── kotlin/com/example/myplugin/
    │   ├── MainPlugin.kt
    │   └── PlaybackExtension.kt
    └── resources/
        └── preference_config.json
```

Java 源码放在 `src/main/java/`。`preference_config.json` 仅在需要 [插件配置界面](configs) 时添加

## 配置 Gradle

### 依赖版本

在 `gradle/libs.versions.toml` 中声明 API：

```toml
[versions]
spw-workshop-api = "0.1.0-dev22"

[libraries]
spw-workshop-api = { group = "com.github.Moriafly", name = "spw-workshop-api", version.ref = "spw-workshop-api" }
```

### 仓库与插件解析

在项目根目录的 `settings.gradle.kts` 中配置仓库。Workshop Gradle 插件通过 JitPack 模块坐标解析，因此需要 `resolutionStrategy`：

```kotlin
pluginManagement {
    repositories {
        maven("https://jitpack.io")
        gradlePluginPortal()
    }
    resolutionStrategy {
        eachPlugin {
            if (requested.id.id == "com.xuncorp.spw.workshop") {
                useModule(
                    "com.github.Moriafly.spw-workshop-api:spw-workshop-gradle-plugin:${requested.version}"
                )
            }
        }
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven("https://jitpack.io")
    }
}

rootProject.name = "my-plugin"
```

### 模块构建配置

Kotlin 插件项目在模块中使用以下构建配置，Kotlin DSL 和 Groovy 二选一：

::: code-group

```kotlin [build.gradle.kts]
plugins {
    id("java-library")
    kotlin("jvm") version "2.3.0"
    kotlin("kapt") version "2.3.0"
    id("com.xuncorp.spw.workshop") version "0.1.0-dev22"
}

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

kotlin {
    jvmToolchain(21)
}

dependencies {
    compileOnly(kotlin("stdlib"))
    compileOnly(libs.spw.workshop.api)
    kapt(libs.spw.workshop.api)
}

spmod {
    PluginClass = "com.example.myplugin.MainPlugin"
    PluginId = "com.example.myplugin"
    PluginVersion = "1.0.0"
    PluginProvider = "Example"
    PluginName = "我的插件"
    PluginDescription = "一个 Salt Player 示例插件"
}
```

```groovy [build.gradle]
plugins {
    id 'java-library'
    id 'org.jetbrains.kotlin.jvm' version '2.3.0'
    id 'org.jetbrains.kotlin.kapt' version '2.3.0'
    id 'com.xuncorp.spw.workshop' version '0.1.0-dev22'
}

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

kotlin {
    jvmToolchain(21)
}

dependencies {
    compileOnly 'org.jetbrains.kotlin:kotlin-stdlib'
    compileOnly libs.spw.workshop.api
    kapt libs.spw.workshop.api
}

spmod { config ->
    config.PluginClass = "com.example.myplugin.MainPlugin"
    config.PluginId = "com.example.myplugin"
    config.PluginVersion = "1.0.0"
    config.PluginProvider = "Example"
    config.PluginName = "我的插件"
    config.PluginDescription = "一个 Salt Player 示例插件"
}
```

:::

`compileOnly` 表示 API 和 Kotlin 标准库由宿主提供，不重复打入插件。`kapt` 用于处理 `@Extension` 并生成扩展索引。其他需要随插件分发的依赖按实际需要使用 `implementation`

如果项目只编写 Java，可移除 Kotlin JVM、Kapt 插件、`kotlin {}` 配置和显式的 Kotlin 标准库依赖，将 `kapt(libs.spw.workshop.api)` 改为 `annotationProcessor(libs.spw.workshop.api)`，保留 API 的 `compileOnly` 依赖

## 编写插件主类

主类完整类名必须与 `PluginClass` 一致，并通过构造器接收宿主提供的 `PluginContext`：

::: code-group

```kotlin [Kotlin]
package com.example.myplugin

import com.xuncorp.spw.workshop.api.PluginContext
import com.xuncorp.spw.workshop.api.SpwPlugin
import com.xuncorp.spw.workshop.api.WorkshopApi

class MainPlugin(pluginContext: PluginContext) : SpwPlugin(pluginContext) {
    override fun start() {
        WorkshopApi.ui.toast("插件已启用", WorkshopApi.Ui.ToastType.Success)
    }

    override fun stop() {
        println("插件已停用")
    }
}
```

```java [Java]
package com.example.myplugin;

import com.xuncorp.spw.workshop.api.PluginContext;
import com.xuncorp.spw.workshop.api.SpwPlugin;
import com.xuncorp.spw.workshop.api.WorkshopApi;

public class MainPlugin extends SpwPlugin {
    public MainPlugin(PluginContext pluginContext) {
        super(pluginContext);
    }

    @Override
    public void start() {
        WorkshopApi.ui().toast("插件已启用", WorkshopApi.Ui.ToastType.Success);
    }

    @Override
    public void stop() {
        System.out.println("插件已停用");
    }
}
```

:::

## 接收播放事件

创建实现 `PlaybackExtensionPoint` 的类，并添加 PF4J 的 `@Extension` 注解。下面的扩展记录播放状态和播放位置：

```kotlin
package com.example.myplugin

import com.xuncorp.spw.workshop.api.PlaybackExtensionPoint
import org.pf4j.Extension

@Extension
class PlaybackExtension : PlaybackExtensionPoint {
    override fun onIsPlayingChanged(isPlaying: Boolean) {
        println("正在播放：$isPlaying")
    }

    override fun onPositionUpdated(position: Long) {
        println("播放位置：$position ms")
    }
}
```

常用扩展点如下，按需覆盖对应方法即可：

| 方法 | 用途 |
| --- | --- |
| `onStateChanged(state)` | 接收 Idle、Buffering、Ready、Ended 状态变化 |
| `onIsPlayingChanged(isPlaying)` | 接收播放与暂停状态变化 |
| `onSeekTo(position)` | 接收进度跳转，位置单位为毫秒 |
| `onPositionUpdated(position)` | 接收每秒更新的播放位置，单位为毫秒 |
| `onBeforeLoadLyrics(mediaItem)` | 在默认逻辑前提供歌词，返回 `null` 时继续使用默认逻辑 |
| `onAfterLoadLyrics(mediaItem)` | 默认逻辑无法加载歌词时提供后备歌词，通常优先选择此扩展点 |
| `onLyricsLineUpdated(lyricsLine)` | 接收当前歌词行更新，可能为 `null` |
| `onLyricsLinesUpdated(lyricsLines)` | 接收完整歌词时间轴，API `0.1.0-dev21` 起提供 |

两个歌词加载回调运行在 IO 线程。完整歌词时间轴为空时，统一表示当前没有可用时间轴；换曲、重载、无歌词或加载失败均可能出现空列表，不要用通知次数推断加载次数

## 插件元数据

`spmod {}` 字段名称以大写字母开头。Groovy 中通过 `config.PluginId` 等形式访问，避免与 Gradle 默认导入的同名类型冲突

| 字段 | Manifest 属性 | 说明 |
| --- | --- | --- |
| `PluginClass` | `Plugin-Class` | 必填，继承 `SpwPlugin` 的主类完整类名 |
| `PluginId` | `Plugin-Id` | 必填，唯一且稳定的插件 ID，推荐反向域名形式 |
| `PluginVersion` | `Plugin-Version` | 必填，插件版本，建议使用语义化版本 |
| `PluginProvider` | `Plugin-Provider` | 可选，插件作者 |
| `PluginName` | `Plugin-Name` | 可选，显示名称 |
| `PluginDescription` | `Plugin-Description` | 可选，插件描述 |
| `PluginOpenSourceUrl` | `Plugin-Open-Source-Url` | 可选，源码地址 |
| `PluginHasConfig` | `Plugin-Has-Config` | 默认 `false`，提供配置界面时设为 `true`，见 [插件配置](configs) |
| `PluginPermissions` | `Plugin-Permissions` | 默认空列表，使用 Gradle 插件提供的权限枚举，见 [插件权限](permissions) |

必填字段为空时，构建会报告对应字段；未设置的可选字符串不会写入 Manifest。更新同一插件时保持 `PluginId` 不变，递增 `PluginVersion`

## 生命周期与资源释放

| 回调 | 处理内容 |
| --- | --- |
| `start()` | 启用插件，注册事件、快捷键、Hook 或配置监听 |
| `stop()` | 停用插件，释放插件持有的监听器、线程及其他资源 |
| `delete()` | 删除插件时执行插件自身的清理逻辑 |
| `update()` | 通过播放器的本地更新流程更新插件时调用，不保证外部替换文件等更新方式会调用 |

插件可能被反复启停，应在每次 `start()` 中重新建立所需注册，并在 `stop()` 中释放自己持有的资源。快捷键需在 `start()` 线程内注册；快捷键与 Hook 的宿主自动清理规则见 [插件权限](permissions) 和 [直接 Hook API](hook)

不要给 `WorkshopApi.instance` 赋值，它由播放器启动时注入。对于标记为 `UnstableSpwWorkshopApi` 的接口，Kotlin 调用方需显式使用 `@OptIn(UnstableSpwWorkshopApi::class)`

## 构建与安装

在插件项目根目录执行：

```sh
./gradlew plugin
```

多模块项目使用相应模块的任务，例如 `:example:plugin`。本例生成 `build/libs/plugin-com.example.myplugin-1.0.0.spmod`

构建后按照 [本地导入](usage#本地导入) 安装，启用插件时应看到“插件已启用”提示

Salt Player 鼓励 Mod 开源，并建议不混淆插件代码。GitHub 分享与 Steam 创意工坊发布流程见 [发布 Mod](publishing)

继续阅读：[插件配置](configs) · [插件权限](permissions) · [直接 Hook API](hook)

源码与完整示例：[SPW Workshop API](https://github.com/Moriafly/spw-workshop-api) · [example](https://github.com/Moriafly/spw-workshop-api/tree/main/example)
