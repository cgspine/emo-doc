# 配置读取与存储

每一个 app 的运行，都离不开各种各样的配置，有的配置通过后台下发，有的配置则是开发者的彩蛋，那么如何存储这些配置？如何减少因为配置而需要写的各种模板代码？`emo` 通过注解配合 `ksp` 的代码生成，为开发者提供了一套便利的方式。

## 依赖引入

```kts
val version = "0.5.0"
// 默认提供了 mmkv 的存储实现
implementation("cn.qhplus.emo:config-mmkv:$version")
// 可选：如果想自定义存储实现，则需引入 config-runtime 库
implementation("cn.qhplus.emo:config-runtime:$version")
// 可选：可是化的配置面板，可以引入和作为彩蛋供开发、产品、测试使用
implementation("cn.qhplus.emo:config-panel:$version")
// 需要引入 ksp plugin.
ksp("cn.qhplus.emo:config-ksp:$version")
```

## 使用

### 定义配置

```kotlin

@ConfigBasic(
    category = "分类",
    name = "config_test",
    humanName = "测试配置", // 这个会被配置面板所使用
    versionRelated = true, // 是否是版本相关
    tags = ["test"] // 可以打标签
)
@ConfigWithIntValue(default = 1) // 默认值
sealed interface ConfigTest

```

开发者通过注解，可以配置很多元信息，包裹：
 
 1. 分类，可用于配置面板，以及更多自定义场景
 2. 是否版本相关，这个用途主要是 app 升级版本后，配置项要不要恢复成默认值？
 3. 标签，各种自定义化场景，例如可以服务端下发指令，还原某个标签的全部配置为默认值。
 4. 配置的数据类型，目前有 `@ConfigWithIntValue`、`@ConfigWithBoolValue`、`@ConfigWithLongValue`、`@ConfigWithFloatValue`、`@ConfigWithDoubleValue`、`@ConfigWithStringValue` 六种类型
 5. 注解是添加在一个 `sealed` 类型的接口上，接口是可以添加方法，然后添加实现类的，具体可查看[接口增添实现类](#接口增添实现类)。

  > 注： 接口都必须使用 sealed，所以只能用于主工程，不支持多模块。

 ### 实例化 `ConfigCenter`

 ```kotlin
val configCenter by lazy {
    configCenterWithMMKV(BuildConfig.VERSION_CODE)
}
 ```

 `configCenterWithMMKV` 的完整定义为：

 ```kotlin
 fun configCenterWithMMKV(
    version: Int, // 版本
    name: String = "emo-cfg-mmkv", // mmkv id
    prodMode: Boolean = true, // 是否是非 debug 模式
    multiProcess: Boolean = false, // mmkv 多进程安全
    autoClearUp: Boolean = true // 自动清理不被注解控制且非当前版本的配置项
)

 ```

 ### 配置的读写

 ```kotlin
 // 通过 concreteInt 具体化到 int 类型
 val action = configCenter.actionOf<ConfigTest>().concreteInt()
 // 编译期间也会生成 actionOfConfigTest 方法，可以帮你做好这个类型的具体化
 val action = configCenter.actionOfConfigTest()
 // 读取
 val value = action.read()
 // 写入
 action.write(xx)
 // 以 stateFlow 的形式监听配置的更改
 action.stateFlowOf()
 ```

 ### 接口增添实现类

 我们定义配置项，有时候我们是需要获取配置项的值，但更多场景是我们需要根据不同的配置做不同的事。
 
 如果我们不做任何包装，那我们就是读取配置后，根据配置的值写一堆的 if else。

 使用 `emo` 的本组件就不再有这个烦恼了，以获取请求域名为例：

1. 和之前一样，定义接口：

 ```kotlin
@ConfigBasic(
    category = "implementation",
    name = "test_domain",
    humanName = "请求环境",
    versionRelated = true
)
@ConfigWithIntValue(default = 1)
sealed interface ConfigHost : ConfigImplDisplayable {
    fun getHost(): String
}
 ```

 不同的是这里添加了 `getHost` 方法， `ConfigImplDisplayable` 主要用于配置面板的可视化，这里可以先不关注。

 2. 增添各个子类

 ```kotlin

@ConfigWithIntValue(default = 1)
object ConfigTestImplDisplayA : ConfigHost {

    override fun displayName(): String {
        return "现网环境"
    }

    override fun getHost(): String {
        return "prod.qhplus.cn"
    }
}

@ConfigWithIntValue(default = 2)
object ConfigTestImplDisplayB : ConfigHost {

    override fun displayName(): String {
        return "开发环境"
    }

    override fun getHost(): String {
        return "dev.qhplus.cn"
    }
}

@ConfigWithIntValue(default = 3)
object ConfigTestImplDisplayC : ConfigHost {

    override fun displayName(): String {
        return "测试环境"
    }

    override fun getHost(): String {
        return "test.qhplus.cn"
    }
}
 ```

 这里我给出了三个实现，分配通过 `ConfigWithIntValue` 配置了不同的值。

 3. 通过 `ConfigCenter` 获取当前配置下的实现类

 ```kotlin
// 通过当前配置值获取实现类
val configHost = configCenter.implOf<ConfigHost>() ?: throw RuntimeException("配置值没有实现类")
// 调用接口方法
val host = configHost.getHost()
 ```

 如此以来，就通过接口规避了各种各样的 if else.

### 批量更新配置

App 一般都会从后台拉取配置，拉取结果一般是 `json` 格式，所以 `emo` 以提供了批量插入的情况:

```kotlin
config.writeMap(
    map = xxx,
    onConfigNotFind = xxx,
    onValueTypeNotMatch = xxx
)
```

`emo` 会默认处理一些数据类型的兼容问题：

* 1/"true"/true 都能解析成 true; 0/"false"/false 都能解析成 fasle
* int、long 的数据兼容
* float、double 的数据兼容
* 字符串尝试解析成 number 类型

如果内部无法兼容，就会通过 `onValueTypeNotMatch` 交给开发者来决定。

### 使用 `ConfigPanel` 可视化配置项

`ConfigPanel` 是一个 `Composable` 函数，你可按需引入，例如以 `BottomSheet` 的形式引入：

```kotlin
view.emoBottomSheet {
    ConfigPanel(configCenter)
}.show()
```

`emo` 的 `Demo` 程序的显示结果为：

<img width="280" alt="配置面板" src="/images/config-panel.jpg">

并且使用者可以根据名称搜索配置，然后修改。

特别留意请求环境一栏，因为配置接口继承了 `ConfigImplDisplayable`, 所以可以把配置项显示成实现类的设置，如果点击，直接切换到下一个实现类的配置，这样子也就能组织使用者输入配置支持外的值。