# JS Bridge

`js bridge` 提供了一套 `Webview` 与 `native` 的交互方式。

## 依赖引入

```kts
implementation("cn.qhplus.emo:js-bridge:0.6.0")
```

## native 端使用


1. 实例化 `EmoJsBridgeHandler`

我们有两种方式来使用 `EmoJsBridgeHandler`。

第一种是继承自 `EmoJsBridgeHandler`, 实现其指定的方法

```kotlin
class BusinessJsBridgeHandler(scope: CoroutineScope) : EmoJsBridgeHandler(scope) {
    // 支持的指令集
    override fun getSupportedCmdList(): List<String> {
        return listOf("normal", "timeout", "nativeError")
    }

    // 接收到 js 端的指令消息，根据指令进行不同的处理
    override fun handleMessage(cmd: String, dataPicker: JsonDataPicker, callback: ResponseCallback?) {
        when (cmd) {
            "normal" -> {
                val data = dataPicker.pickAsJsonObject()!!
                val id = data.getInt("id")
                callback?.finish("收到 native 的结果， id = $id")
            }
            "timeout" -> {
                scope.launch {
                    delay(3000)
                    val data = dataPicker.pickAsJsonObject()!!
                    val id = data.getInt("id")
                    callback?.finish("收到 native 的结果， id = $id")
                }
            }
            "nativeError" -> {
                callback?.failed("native 告诉你失败了")
            }
        }
    }
}
```

这种方式的问题就是要写在 `handleMessage` 内写很多分支。而第二种方式则是 `emo` 用反射的方式来让代码写起来更优雅

```kotlin
// 记住要 keep 住以适应 proguard.
@Keep
class BusinessJsReflect {

    // 方法名就是指令，所有方法共同构建成支持的指令集
    fun normal(scope: CoroutineScope, dataPicker: EmoJsBridgeHandler.JsonDataPicker, callback: EmoJsBridgeHandler.ResponseCallback?) {
        val data = dataPicker.pickAsJsonObject()!!
        val id = data.getInt("id")
        callback?.finish("收到 native 的结果， id = $id")
    }

    fun timeout(scope: CoroutineScope, dataPicker: EmoJsBridgeHandler.JsonDataPicker, callback: EmoJsBridgeHandler.ResponseCallback?) {
        scope.launch {
            delay(3000)
            val data = dataPicker.pickAsJsonObject()!!
            val id = data.getInt("id")
            callback?.finish("收到 native 的结果， id = $id")
        }
    }

    fun nativeError(scope: CoroutineScope, dataPicker: EmoJsBridgeHandler.JsonDataPicker, callback: EmoJsBridgeHandler.ResponseCallback?) {
        callback?.failed("native 告诉你失败了")
    }
}

// 通过 EmoReflectJsBridgeHandler 实例化
val bridgeHandler = EmoReflectJsBridgeHandler(scope, BusinessJsReflect())
```

2. 实例化 `EmoBridgeWebViewClient`

```kotlin
// 第一个参数是决定是否要对 `WebView` 注入 js-bridge 的代码，如果不注入，则需要 H5 自身来引入。
val webviewClient = EmoBridgeWebViewClient(true, bridgeHandler)
```

当然，由于业务需要，你可能无法使用 `EmoBridgeWebViewClient`, 那么你需要在你的 `WebViewClient` 添加下面的代码

```kotlin
class BusinessWebViewClient(handler: EmoJsBridgeHandler) : AccompanistWebViewClient() {
    // 第一个参数是决定是否要对 `WebView` 注入 js-bridge 的代码，如果不注入，则需要 H5 自身来引入。
    private val helper = EmoBridgeWebViewClientHelper(true, handler)

    override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        if (view != null && helper.shouldOverrideUrlLoading(view, request)) {
            return true
        }
        return super.shouldOverrideUrlLoading(view, request)
    }

    override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        view?.let {
            helper.doOnPageFinished(it)
        }
    }
}
```

3. 在 `Webview` 中使用

```kotlin
val scope = rememberCoroutineScope()
val state = rememberWebViewState("url")
val client = remember {
    val bridgeHandler = EmoReflectJsBridgeHandler(scope, BusinessJsReflect())
    BusinessWebViewClient(bridgeHandler)
}
WebView(
    state = state,
    modifier = Modifier
        .fillMaxWidth()
        .weight(1f),
    onCreated = {
        it.settings.javaScriptEnabled = true
    },
    client = client
)
```

## js 端使用

1. 监听 `EmoBridge` 的绑定

```javascript
document.addEventListener('EmoBridgeReady', function () {
    // 然后就可以使用 window.EmoBridge 了
}, false);
```

2. 获取原生支持的指令列表

```javascript
window.EmoBridge.getSupportedCmdList(function(data){
    // 因为 H5 不用跟版本，所以你可以做一些前置判断
    // 如果你调用不支持的组件，组件内部也会直接给你抛错
})
```

3. 发送指令

```javascript
window.EmoBridge.send({
    cmd: 'cmd',
    data: xxx,
    timeout: timeout, // 超时控制
    onResponse: function(data){
        // 获取到原生的结果
    },
    onFailed: function(error){
        // 失败了。
    }
})
```

> 更多信息可以查看公众号文章[JsBridge 的设计与实现（上）](https://mp.weixin.qq.com/s?__biz=Mzk0OTMzMjE2OQ==&mid=2247483943&idx=1&sn=e4608d2068901328ee6f8758452ede3c&chksm=c358b381f42f3a97a59d58ae29a6e90fbe8290a51ba0feb07ded4ff803153877ffa92539627f&token=1864276121&lang=zh_CN#rd) 和 [JsBridge 的设计与实现（下）](https://mp.weixin.qq.com/s?__biz=Mzk0OTMzMjE2OQ==&mid=2247483960&idx=1&sn=9bb2cbf09117971c49691a6994cbda66&chksm=c358b39ef42f3a88775a0c7485a13440251545b944840405056b73f111eccfe138afd8c347e4&token=1864276121&lang=zh_CN#rd)