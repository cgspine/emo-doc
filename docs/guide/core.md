# core

## 依赖引入

```kts
implementation("cn.qhplus.emo:core:0.7.0")
```

## EmoConfig

用于提供 `emo` 组件的通用配置项，当前只有 `debug` 属性。

```kotlin
// 建议在 Application.onCreate 里调用
EmoConfig.debug = BuildConfig.DEBUG
```

> emo 组件都默认关闭了 `BuildConfig` 的输出，所以你不会一搜索 `BuildConfig` 就出现一堆无用的同名类，更多可看 [stop-generating-the-buildconfig-on-your-android-modules](https://blog.dipien.com/stop-generating-the-buildconfig-on-your-android-modules-7d82dd7f20f1)



## EmoLog

`EmoLog` 是提供开发者接收 `emo` 各个组件的日志信息，方便开发者们发现并调试 `emo` 组件的相关问题。

```kotlin
// 建议在 Application.onCreate 里调用
// 默认情况调用系统的 Log
EmoLog.delegate = object : EmoLogDelegate {
    override fun e(tag: String, msg: String, throwable: Throwable?) {
        // TODO
    }

    override fun w(tag: String, msg: String, throwable: Throwable?) {
        // TODO
    }

    override fun i(tag: String, msg: String, throwable: Throwable?) {
        // TODO
    }

    override fun d(tag: String, msg: String, throwable: Throwable?) {
        // TODO
    }
}
```

## EmoBus

`EmoBus` 是基于 `SharedFlow` 的 `EventBus` 实现。可以用于消息通知、跨页面数据传递等。

1. 定义消息

```kotlin
@EmoEventProp(
    // 是否是 sticky 事件， 默认为 false
    sticky = true, 
    // emo 是每个事件类型一个 channel，如果长时间没使用这个 channel， 是否要释放？默认 fasle 表示释放
    keepChannelAlive = false, 
     // extraBufferCapacity 与 onBufferOverflow 配合使用，为了处理背压问题
    extraBufferCapacity = 1,
    // 当消息产生速度大于消耗速度时，默认 drop 掉旧的还没消耗的消息
    onBufferOverflow = BufferOverflow.DROP_OLDEST 
)
class CustomEvent(...)

```

2. 发送消息

```kotlin
// 此方法在 suspend 方法调用，也可以使用 emitNonSuspend 在非 suspend 环境调用
EmoBus.default.emit(CustomEvent(...))
```

3. 接收消息

``` kotlin
EmoBus.default.flowOf<CustomEvent>().collectLatest { event ->
    // 消耗消息
}
```

因为直接提供了 `SharedFlow` 接口，所以可以用借助 `repeatOnLifecycle` 等处理界面生命周期相关的问题，不需要 `emo` 提供过多的接口。

> 更多信息可查看公众号文章 [用 SharedFlow 包装个 EventBus](https://mp.weixin.qq.com/s?__biz=Mzk0OTMzMjE2OQ==&mid=2247483900&idx=1&sn=11652a23af444d241788b2da929e65ad&chksm=c358b05af42f394ca9f563d2c79b0369cbe0c02667641bb0789553908ecafe445e82099539a3&token=1864276121&lang=zh_CN#rd)

## ConcurrencyShare

思考一个场景：我们三个界面都需要发送网络请求请求一份基础信息，如果每个界面都单独发送网络请求，那么我依次进入三个界面，同样的请求就会发送三次，而实际上可能第一个界面的请求结果还没回来，实际上后面的两个界面只需要等待并复用第一个界面的请求结果就好。
这便是 `ConcurrencyShare` 存在的意义。

```kotlin

// 你也可以通过 `ConcurrencyShare.globalInstance` 使用全局的实例
val concurrencyShare = ConcurrencyShare();

// 如果已经有协程开启了任务，那么此协程等待结果就好
// 否则才开始执行耗时任务
concurrencyShare.joinPreviousOrRun("key"){
    // 耗时任务
}

// 如果已经有协程开启了任务，那就取消它，然后重新跑
// 例如根据用户输入后台更新某些信息，就要以最新输入为准，否则反而会产生多线程问题。
concurrencyShare.cancelPreviousThenRun("key"){
    // 耗时任务
}

```

> 更多信息可查看公众号文章 [明明请求的数据是最新的，为啥渲染出来的是旧数据？](https://mp.weixin.qq.com/s?__biz=Mzk0OTMzMjE2OQ==&mid=2247483845&idx=1&sn=9799ac2aabd302b382fc8f393d9901f8&chksm=c358b063f42f39752602746340836411a6af9479c4ae4a350f38ce054b7a3a8b59b35e144e04&token=1864276121&lang=zh_CN#rd)
