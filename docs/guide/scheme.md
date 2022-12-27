# Scheme 路由

以 `scheme` 的协议来做界面路由协议，通过 `ksp` 加注解的方式来做界面路由管理。

## 依赖引入

```kts
val version = "0.3.1"
implementation("cn.qhplus.emo:scheme-impl:$version")
ksp("cn.qhplus.emo:scheme-ksp:$version")
```

## 特性

* 支持 activity 跳转
* 支持 compose 跳转

## Scheme 协议

>emo://home?arg1=value1&arg2=value2

`scheme` 协议类同于 `url`。传参等同于 `url` 的 `query` 部分

## 使用

### 添加注解

1. `Activity`

```kotlin
@ActivityScheme(action = "single")
@SchemeBoolArg(name = "bool", default = false)
class SingleActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val boolArg = intent.getBooleanExtra("bool")
        //...
    }
   
}
```

2. `Composeable`

```kotlin
@ComposeScheme(
    action = "modal",
    alternativeHosts = [MainActivity::class] // 承载 compose 的容器 activity, 必须继承自 ComposeHostActivity
)
@SchemeIntArg(name = "i", default = 1)
@Composable
fun ModalPage(navBackStackEntry: NavBackStackEntry) {
     val intArg = navBackStackEntry.arguments?.getString("i")
    //...
}
```

我们可以同过注解指定参数的类型，如果不指定，默认为解析出来就为字符串。其支持以下几种参数类型：

* @SchemeBoolArg(name, special, default)
* @SchemeIntArg(name, special, default)
* @SchemeLongArg(name, special, default)
* @SchemeFloatArg(name, special, default)
* @SchemeStringArg(name, special, default)

其参数值 `special` 表示必须在 `scheme` 参数是路由选择的一部分，例如:

```kotlin
@ComposeScheme(
    action = "product",
    alternativeHosts = [MainActivity::class]
)
@SchemeIntArg(name = "type", special=true, default = 1)
@Composable
fun AProductPage(navBackStackEntry: NavBackStackEntry) {
     
}
```kotlin
@ComposeScheme(
    action = "product",
    alternativeHosts = [MainActivity::class]
)
@SchemeIntArg(name = "type", special=true, default = 2)
@Composable
fun BProductPage(navBackStackEntry: NavBackStackEntry) {
     
}
```
在上面的例子中，有 A、B 两种类型的商品，他们的展示 `UI` 完全不一样，但是 `scheme` 差不多，那么我们就可以通过 `special` 来取代 `if else` 的判断。

* `emo://product?type=1&id=xxx` 就会路由到 `AProductPage`
* `emo://product?type=2&id=xxx` 就会路由到 `BProductPage`

### 实例化 SchemeClient

推荐在 `Application.onCreate` 中初始化, 必须在首个 `Activity.onCreate` 前完成初始化，所以不要 `lazy`。

```kotlin
val EmoScheme = schemeClient(application) {
    // debug 模式下，参数解析错误等回直接抛错。 非 debug 模式下只是返回 false 表示 scheme 处理失败
    debug = BuildConfig.DEBUG
    addInterceptor(object: SchemeInterceptor {
        override suspend fun intercept(env: SchemeTransaction, schemeParts: SchemeParts, next: SchemeHandler): Boolean {
            Log.i("EmoDemo", "begin handle scheme: ${schemeParts.origin}")
            val ret = next.run(env, schemeParts)
            Log.i("EmoDemo", "after handle scheme: ${schemeParts.origin}, ret = $ret")
            return ret
        }

    })
}
```

### 构建 scheme

```kotlin
 val scheme = SchemeBuilder(SchemeConst.SCHEME_PROTOCOL, action)
    .arg("bool", true)
    .arg("i", 30)
    .toString()
```

一般协议头是个固定常量，所以使用者可以抽取一个更动用的函数

```kotlin
fun schemeBuilder(action: String): SchemeBuilder = SchemeBuilder(SchemeConst.SCHEME_PROTOCOL, action)
```

那么使用就变成

```kotlin
val scheme = schemeBuilder("modal").arg(xx, xx).toString()
```

### 跳转

```kotlin
launch {
    // 返回 scheme 是否被处理
    val ret = EmoScheme.handle(scheme, SchemeHandleStrategy.WaitPrevAndRun)
}
```

scheme 跳转运行在协程中，主要是为了适配某些情况，需要读取 `DB` 之类的确定某些参数才能跳转的情况。所以用协程，使用者就可以解决某些必须用子线程而不阻塞主线程的魔幻产品需求。

因为使用了协程，就存在如果一个 `scheme` 还在处理过程中，有发起另一个 `scheme` 跳转的请求的场景，因而我提供了 `SchemeHandleStrategy` 的控制，其取值为：

* `WaitPrevAndRun`： 串行，等待前一个 `scheme` 执行完成，再执行当前的。
* `CancelPrevAndRun`: 取消前一个，然后执行当前的。
* `ContinuePrevOrRun`: 如果存在正在处理的 `scheme`, 那就抛弃当前的，否则执行当前的。


如果你有一次性处理多个 `scheme` 的需求场景，例如后台点击通知消息，产品期望先跳转会话列表，再跳转会话详情，那就可以用 `batchHandle` 方法


```kotlin
launch {
    // 返回 scheme 是否全被处理
    val ret = EmoScheme.batchHandle(schemes, SchemeHandleStrategy.WaitPrevAndRun)
}
```


如果你不关心 `scheme` 处理的结果，或者已经在拦截器里面处理好，那么可以用 `handleQuietly`、`batchHandleQuietly` 在非协程环境下直接调用。


## 更多玩法

### 使用拦截器

在实例化 `SchemeClient` 过程中，我们可以添加多个拦截器，以完成更多的场景化需求，诸如：

* 日志输出
* 兼容 `http` 协议，处理 `url` 跳转
* 登录拦截
* 服务器下发，动态更改某些 `scheme` 的目标界面，处理诸如某些页面上线了，但是有 bug，需要临时先让它重定向到某些 H5 界面
* `scheme` 无法被处理的兜底策略
* ...

```kotlin

val EmoScheme = schemeClient(application) {
    addInterceptor(A)
    addInterceptor(B)
    addInterceptor(C)
}
```

拦截器采用洋葱模型，上述 A、B、C 三个拦截器，拦截过程如下：

```
      handle start
           |
           v
+--------- A -----------+
| +------- B ---------+ |
| | +----- C -------+ | |
| | |               | | |
| | |     core      | | |
| | |               | | |
| | +----- C -------+ | |
| +------- B ---------+ |
+--------- A -----------+
           |
           v
        handle end
```

所以在实现拦截器时，需要调用者主动调用 `next` 方法交由下一级进行处理。

### 在页面中获取原始 `scheme`:

在跳转到新的界面，我们可能需要获取到原始的 `scheme`。 我遇到的有两个场景：

1. 界面曝光，我们直接将 `scheme` 上报给后台，那么就将当前的界面以及界面参数全都上报了。
2. 界面重入，界面重入是指我们进入到了 A 界面，然后在 A 界面杀死了 App。产品期望下次打开 app 就直接进入到 A 界面。 这在阅读、学习等 App 中很有必要。那么我们在进入 A 界面时把 A 界面的 scheme 存起来，下次 App 打开，直接路由过来，实现就很简单了。

```kotlin

@ActivityScheme(action = "single")
class SingleActivity : ComponentActivity() {
    override fun onResume() {
        super.onResume()
        val originScheme = intent.getStringExtra(SchemeKeys.KEY_ORIGIN)?.let { Uri.decode(it) }
        // 上报 originScheme
        // 存储 originScheme， 以便下次打开 app 用
    }
   
}

@ComposeScheme(
    action = "modal",
    alternativeHosts = [MainActivity::class]
)
@Composable
fun ModalPage(navBackStackEntry: NavBackStackEntry) {
     LaunchedEffect(""){
        val originSchem = arguments?.getString(SchemeKeys.KEY_ORIGIN)?.let { Uri.decode(it) }
        // 上报 originScheme
        // 存储 originScheme， 以便下次打开 app 用
    }
}
```





