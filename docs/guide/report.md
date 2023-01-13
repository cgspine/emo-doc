# 上报

在推荐系统盛行的今天，一个稳定的上报组件就格外重要了，如果上报的数据出现丢失、不及时等，那整个推荐系统的结果都是不可信任的了。所以 `emo` 就提供了一套封装，方便开发者把精力集中在自己的业务上。

一般而言，上报分为三种类型：

1. 立即上报：像 App 唤醒之类，因为涉及到了日活数据，肯定要非常及时才行。
2. 内存 Batch 上报：如果没一个上报都立即执行，那服务端压力就比较大，所以是 batch 上报是很有必要存在的。但数据只存于内存，会存在丢数据的情况，所以只适应于丢数据也影响不大的场景。
3. 文件 Batch 上报：上报先通过 mmap 写入文件，然后再把整个文件的数据发送给后端，这个还可以应用于无网络、网络失败等场景，保证不会丢数据。

`emo` 主要就是封装好了这几种场景，至于具体的数据上报格式，则需要开发者定义好，然后告知 `emo`。

## 依赖引入

```kts
implementation("cn.qhplus.emo:config-report:0.3.1")
```

## 使用

这里假设以 `kotlinx.serialization.protobuf` 的数据格式来使用本组件

1. 定义消息类型

```kotlin
// 定义总的消息类型，然后可以根据 name 解析出不通过的 content 类型
@Serializable
class ReportMsg(
    @ProtoNumber(1)
    val name: String,
    @ProtoNumber(2)
    val content: ByteArray
)

// 定义具体的消息类型
@Serializable
data class WakeMsgContent(
    @ProtoNumber(1)
    val time: Long = System.currentTimeMillis(),
    @ProtoNumber(2)
    val platform: String = "android",
    @ProtoNumber(3)
    val user: String
)

// 添加消息创建的快捷函数
fun newWakeMsg(user: String): ReportMsg {
    return ReportMsg("wake", ProtoBuf.encodeToByteArray(WakeMsgContent(user = user)))
}
```

2. 实例 `ReportClient`， 并做好配置

```kotlin
val reportClient by lazy {
    newReportClient(
        context = applicationContext,
        listReportTransporter = writeBackIfFailed(AppListReportTransporter),
        converter = ReportStringMsgConverter,
        fileBatchFileSize = 300 // for test
    )
}

// Transporter 是向后端传输的接口抽象，其有两种方式，一种是列表传输，一种是流式传输，这里先采用列表的方式传输
// 通过 writeBackIfFailed 包裹后，传输失败可以再次写回文件，当然你也可以主动做这一步
object AppListReportTransporter : ListReportTransporter<ReportMsg> {

    override suspend fun transport(client: ReportClient<ReportMsg>, batch: List<ReportMsg>, usedStrategy: ReportStrategy): Boolean {
        batch.forEach {
            if (it.name == "wake") {
                Log.i("AppReport", "wake: ${ProtoBuf.decodeFromByteArray<WakeMsgContent>(it.content)}")
            }
        }
        // TODO 网络传输
        return true
    }
}

// converter 主要用于消息写入文件和从文件中读取所需要。
object ReportStringMsgConverter : ReportMsgConverter<ReportMsg> {

    override fun encode(content: ReportMsg): ByteArray {
        return ProtoBuf.encodeToByteArray(content)
    }

    override fun decode(content: ByteArray): ReportMsg {
        return ProtoBuf.decodeFromByteArray(content)
    }
}

```

`newReportClient` 的完整定义为：

```kotlin
fun <T> newReportClient(
    context: Context,
    listReportTransporter: ListReportTransporter<T>, // list 类型传输
    converter: ReportMsgConverter<T>, // 数据转换
    scope: CoroutineScope = CoroutineScope(...), // 协程域，一般不传，主要是测试使用
    streamReportTransporter: StreamReportTransporter<T>? = null, // 流式传输
    batchInterval: Long = 5 * 60 * 1000, // batch 上报间隔，默认 5min 上报一次
    memBatchCount: Int = 50, // 内存 batch 缓存最大容量，默认 50
    fileBatchDirName: String = "emo-report", // 文件 batch 上报的缓存文件夹
    fileBatchFileSize: Long = 150 * 1024 // 文件上报 batch 容量，写满这个容量就会触发上报
)
```

3. 上报

```kotlin
reportClient.report(newWakeMsg(user), ReportStrategy.Immediately)
```

在执行上报动作时，就可以选择上报策略：

* Immediately：立即上报
* MemBach： 内存 Batch 上报
* FileBatch： 文件 Batch 上报
* WriteBackBecauseOfFailed： 用于传输失败重新写回文件，这个和 FileBatch 的区别是它会阻止一段时间的再次传输，目前是固定的 30s，这样可以避免写文件又不断的触发传输

## 流式传输

如果你的 app 有长连接的功能，那么使用流式数据上报也是个不错的选择。其定义为：

```kotlin
interface StreamReportTransporter<T> {

    suspend fun transport(
        client: ReportClient<T>,
        buffer: ByteArray, // 直接给到消息的 byteArray 数据
        converter: ReportMsgConverter<T>,
        usedStrategy: ReportStrategy
    )

    suspend fun flush(client: ReportClient<T>, usedStrategy: ReportStrategy)
}
```

当然，对于列表传输和流式传输，emo 提供了二者的相互转换包装：

```kotlin
// 列表传输转换为流式传输
fun <T> ListReportTransporter<T>.wrapToStreamTransporter(batchCount: Int)
// 流式传输转换为列表传输
fun <T> StreamReportTransporter<T>.wrapToListTransporter(
    converter: ReportMsgConverter<T>
)

```