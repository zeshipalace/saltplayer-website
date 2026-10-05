# 插件配置

插件可以通过 `preference_config.json` 声明配置界面，由播放器负责展示控件和保存用户设置。运行时代码通过 `ConfigManager` 与 `ConfigHelper` 读取、修改和监听配置

## 启用配置入口

在模块的 `spmod {}` 中声明：

```kotlin
spmod {
    PluginHasConfig = true
}
```

将界面定义文件放在 `src/main/resources/preference_config.json`，使其随插件打包到类路径根目录。这个文件描述配置界面，用户实际设置保存在插件自己的数据目录中

## 配置文件结构

根对象包含 `configs` 数组，每个元素描述一个配置组：

```json
{
  "configs": [
    {
      "title": "通用设置",
      "config": "config.json",
      "preferences": [
        {
          "type": "switch",
          "key": "feature.enabled",
          "title": "启用功能",
          "summary": "控制插件的主要功能",
          "default_value": true
        }
      ]
    }
  ]
}
```

| 配置组字段 | 说明 |
| --- | --- |
| `title` | 配置组标题，建议为每组提供不同名称 |
| `config` | 用户设置文件相对于插件数据目录的路径，例如 `config.json` |
| `preferences` | 该组的配置项数组 |

用户设置位于播放器应用数据目录下的 `workshop/data/<插件 ID>/`。通过配置 API 获取文件和路径，避免硬编码 Windows 或 Linux 的应用数据根目录

界面定义必须是合法 JSON，不能包含注释。配置项的 `key` 与代码读取的键名应一致，同一文件内不同配置项使用不同键名；点号可表示嵌套结构，例如 `feature.enabled`

## 配置项类型

所有配置项都需要 `type` 和显示用的 `title`。除按钮外，还应填写 `key` 与对应类型的 `default_value`；`summary` 用于可选的辅助说明，滑动条目前不显示该说明

### 开关

`switch` 保存布尔值：

```json
{
  "type": "switch",
  "key": "feature.enabled",
  "title": "启用功能",
  "summary": "控制插件的主要功能",
  "default_value": true
}
```

### 列表

`list` 提供多选一列表，保存选中项的字符串值：

```json
{
  "type": "list",
  "key": "display.mode",
  "title": "显示模式",
  "summary": "选择适合的显示方式",
  "entries": ["简洁", "详细"],
  "entry_values": ["compact", "detailed"],
  "default_value": "compact"
}
```

`entries` 是显示文本，`entry_values` 是实际保存的值，两者长度与顺序须一一对应。`default_value` 应是其中一个 `entry_values` 值

### 按钮

`button` 触发操作，不保存配置值，因此无需 `key` 和 `default_value`：

```json
{
  "type": "button",
  "title": "显示当前设置",
  "summary": "在播放器中显示一条提示",
  "arrow_type": "none",
  "on_click": "com.example.myplugin.ConfigActions.showSettings"
}
```

`arrow_type` 可取 `none`、`link` 或 `arrow`，省略时不显示箭头。`on_click` 为完整类名加方法名，目标必须是公开、静态且无参数的方法

::: code-group

```kotlin [Kotlin]
package com.example.myplugin

import com.xuncorp.spw.workshop.api.UnstableSpwWorkshopApi
import com.xuncorp.spw.workshop.api.WorkshopApi

class ConfigActions {
    companion object {
        @JvmStatic
        @OptIn(UnstableSpwWorkshopApi::class)
        fun showSettings() {
            val config = WorkshopApi.manager.createConfigManager().getConfig()
            val enabled = config.get("feature.enabled", true)
            WorkshopApi.ui.toast("功能已启用：$enabled", WorkshopApi.Ui.ToastType.Success)
        }
    }
}
```

```java [Java]
package com.example.myplugin;

import com.xuncorp.spw.workshop.api.WorkshopApi;
import com.xuncorp.spw.workshop.api.config.ConfigHelper;

public class ConfigActions {
    public static void showSettings() {
        ConfigHelper config = WorkshopApi.manager().createConfigManager().getConfig();
        boolean enabled = config.get("feature.enabled", true);
        WorkshopApi.ui().toast("功能已启用：" + enabled, WorkshopApi.Ui.ToastType.Success);
    }
}
```

:::

Kotlin 伴生对象方法使用 `@JvmStatic` 暴露静态入口。如果通过 `@JvmName` 改过 JVM 方法名，`on_click` 也必须使用修改后的名称

### 滑动条

`seekbar` 保存浮点数，使用 `min` 与 `max` 指定范围：

```json
{
  "type": "seekbar",
  "key": "display.opacity",
  "title": "不透明度",
  "default_value": 80.0,
  "min": 0.0,
  "max": 100.0
}
```

为范围和默认值提供有效数值，默认值应处于范围内。Kotlin 读取时使用对应浮点类型，例如 `config.get("display.opacity", 80f)`

### 文本输入

`edittext` 点击后打开文本输入对话框，保存字符串：

```json
{
  "type": "edittext",
  "key": "display.label",
  "title": "显示名称",
  "summary": "设置插件显示的文字",
  "default_value": "我的插件"
}
```

## 读写用户设置

在插件内调用 `WorkshopApi.manager.createConfigManager()`，宿主会识别当前插件。配置接口标记为 `UnstableSpwWorkshopApi`，Kotlin 需要显式 opt-in

以下代码放在插件的 `start()` 等运行时方法中：

::: code-group

```kotlin [Kotlin]
val manager = WorkshopApi.manager.createConfigManager()
val config = manager.getConfig()

val enabled = config.get("feature.enabled", true)
val mode = config.get("display.mode", "compact")

config.set("display.label", "新的显示名称")
if (!config.save()) {
    println("配置保存失败")
}
```

```java [Java]
ConfigManager manager = WorkshopApi.manager().createConfigManager();
ConfigHelper config = manager.getConfig();

boolean enabled = config.get("feature.enabled", true);
String mode = config.get("display.mode", "compact");

config.set("display.label", "新的显示名称");
if (!config.save()) {
    System.out.println("配置保存失败");
}
```

:::

`ConfigManager`、`ConfigHelper` 位于 `com.xuncorp.spw.workshop.api.config` 包中

| 方法 | 行为 |
| --- | --- |
| `manager.getConfig()` | 获取默认的 `config.json` |
| `manager.getConfig("display.json")` | 获取指定配置文件，同一管理器缓存对应 helper |
| `config.get(key, defaultValue)` | 读取值，缺失或无法按指定类型读取时返回默认值 |
| `config.set(key, value)` | 修改内存值，支持字符串、数值和布尔值，需调用 `save()` 持久化 |
| `config.save()` | 将当前设置写入文件，返回是否成功 |
| `config.reload()` | 从磁盘重新加载，会覆盖尚未保存的内存修改，返回是否成功 |
| `config.getConfigPath()` | 获取实际配置文件路径 |

播放器配置界面会自动保存用户修改；插件主动写入时需要自行调用 `save()`。`preference_config.json` 中的默认值用于界面展示，代码读取时也应提供一致的默认值，不要假定用户从未修改的字段已经写入文件

## 监听配置更改

通过 `addConfigChangeListener` 监听配置文件变化，回调接收对应的 `ConfigHelper`。保存监听器实例，在停用时传给 `removeConfigChangeListener`，避免每次启用都重复注册

下面展示插件主类中的完整写法：

```kotlin
package com.example.myplugin

import com.xuncorp.spw.workshop.api.PluginContext
import com.xuncorp.spw.workshop.api.SpwPlugin
import com.xuncorp.spw.workshop.api.UnstableSpwWorkshopApi
import com.xuncorp.spw.workshop.api.WorkshopApi
import com.xuncorp.spw.workshop.api.config.ConfigHelper
import com.xuncorp.spw.workshop.api.config.ConfigManager
import java.util.function.Consumer

@OptIn(UnstableSpwWorkshopApi::class)
class MainPlugin(pluginContext: PluginContext) : SpwPlugin(pluginContext) {
    private val manager: ConfigManager by lazy {
        WorkshopApi.manager.createConfigManager()
    }

    private val listener = Consumer<ConfigHelper> { config ->
        val enabled = config.get("feature.enabled", true)
        println("功能设置已更新：$enabled")
    }

    override fun start() {
        manager.addConfigChangeListener(listener)
    }

    override fun stop() {
        manager.removeConfigChangeListener(listener)
    }
}
```

不传文件名时监听 `config.json`，也可使用 `manager.addConfigChangeListener("display.json", listener)` 指定文件。文件名必须与配置组中的 `config` 一致，不支持用 `*` 监听所有文件

配置回调不保证运行在 UI 线程，更新界面时应切换到所用 UI 框架要求的线程，也不要在回调中无条件保存同一文件，以免重复触发变更

相关文档：[开发入门](getting-started) · [插件权限](permissions) · [发布 Mod](publishing)
