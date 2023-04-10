# KV 存储

一个基于 `mmap` 实现的 `KV` 存储，与 `MMKV`/`SP`/`Jetpack DataStore` 不同的是，它不会把全部数据加载到内存，因而可以支持大量 `KV` 的存储与读取。

## 依赖引入

```kts
implementation("cn.qhplus.emo:kv:0.6.1")
```

### 限制

1. `key` 的 `byte` 长度小于 256。
2. `value` 的 `byte` 长度小于 65536，如果大于这个，推荐用文件存储，然后 `kv` 里只存储文件路径。
3. 只支持单进程使用。

## 使用

### 实例化

```kotlin
    val singleInstance = EmoKv(
        context, 
        name， // 运行期间应该唯一
        crc = true, // 是否给 value 加上 crc 32,  默认 true
        compress: Boolean = true, // 是否压缩 value， 默认 true
        compressMiniLen: Int = 500, // 如果开启压缩，value 长度大于 compressMiniLen 才压缩，默认 500
        indexInitSpace: Long = 16384, // 索引的 mmap 初始长度，默认 16k, 在 0.75 的加载因子下可存储 600 个 kv .
        keyInitSpace: Long = 4096, // key 的 mmap 初始长度，默认 4k
        valueInitSpace: Long = 1024 * 1024, // value 的 mmap 初始长度，默认 1m
        hashFactor: Float = 0.75f, // hash 索引加载因子
        valueUpdateCountToAutoCompact: Int = 5000, // 超过这个的写入次数，则触发 value 文件压缩
        validateFailedReporter: ((key: ByteArray, e: Throwable) -> Boolean)? = null // 校验失败的回调
    )
```

### 写入

```kotlin
singleInstance.put("bool", true)
singleInstance.put("char", 'a')
singleInstance.put("short", 1)
singleInstance.put("int", 1)
singleInstance.put("long", 1L)
singleInstance.put("float", 1.0f)
singleInstance.put("double", 1.0)
singleInstance.put("string", "hello world")
// 上述都只是这个方法的便携重载
singleInstance.put("bytearray".toByteArray(), "bytearray".toByteArray())
```

### 读取

```kotlin
singleInstance.getBool("bool", defalut = false)
singleInstance.getChar("char", defalut = 'a')
singleInstance.getShort("short", defalut = 1)
singleInstance.getInt("int", defalut = 1)
singleInstance.getLong("long", defalut = 1L)
singleInstance.getFloat("float", defalut = 1.0f)
singleInstance.getDouble("double", defalut = 1.0)
singleInstance.getString("string")
// 上述都只是这个方法的便携重载
singleInstance.get("bytearray".toByteArray())
```

 ### 删除

 ```kotlin
singleInstance.delete("key")
 ```

  ### 压缩 Value

 ```kotlin
 // 因为采用追加写的方式，反复写入同一个 key，会造成有多个无用 value 存在于文件中的情况
 // 一般不需要开发者调用这个方法，而是通过配置 valueUpdateCountToAutoCompact
singleInstance.compact()
 ```

 ### 关闭

  ```kotlin
 // 注： 因为关闭会涉及资源释放，最好在子线程调用。
singleInstance.close()
 ```

 ### 实现原理与对比

可查看公众号文章 [KV 存储那些事儿](https://mp.weixin.qq.com/s?__biz=Mzk0OTMzMjE2OQ==&mid=2247483990&idx=1&sn=8c8cdcd39bae07c8f13b852ed50a44da&chksm=c358b3f0f42f3ae6a2ca8f53fffb6310b330fc05bc74e6d278e3491af7689a018bc4ec3d5870&token=705170082&lang=zh_CN#rd)~

