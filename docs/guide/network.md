# 网络状态

目前大多数的网络状态变更，还是依赖于 `Broadcast`, 但官方其实很早就废除了 `ConnectivityCallback` 的方式。因此，`emo` 提供的方式就是采用这种新的方式。此外还添加了很弱的流量监控功能

## 依赖引入

```kts
implementation("cn.qhplus.emo:network:0.7.0")
```

## 网络状态

1. 获取当前网络状态

```kotlin
val state = NetworkConnectivity.of(context).getNetworkState(/*forceRefresh*/)
```

2. 监听网络状态

```kotlin
NetworkConnectivity.of(context).stateFlow.collectLatest {
    // TODO 网络状态
}
```

返回的 `NetworkState` 的完整定义为

```kotlin
data class NetworkState(
    val networkType: NetworkType, // none, 流量, Wifi, Fake, Unknown
    val isValid: Boolean, // 是否是有效连接
    val uuid: String,
    val updateTime: Long
)
```

这里有两个疑问：

1. 为何会存在 `isValid`？这个其实是为了处理网络连接了，但是网络实际不可用的情况。可惜的是国内目前很多这个值不可信任。
2. 为何会存在 `Fake` 状态？这个我一直觉得是华为手机的 Bug，当使用 `ConnectivityCallback` 时，手机退到后台一会儿返回到前台，华为会返回个无网络的状态，然而实际上是没问题的，要过一段时间强刷一次才行。

所以 `emo` 提供了 `fakeToConnectedAndRecheckAfter` 方法，可以在华为手机每次进入前台时有开发者主动调用一下。`emo` 不会自动去做这个事情，因为判断华为需要用到 Build 里的某些字段，现在的审核，会有频率限制，所以 `emo` 会避免这些事情。

## 网络流量监控

1. 监控的开始与暂停

```kotlin
// 开始
NetworkBandwidthSampler.of(context).startSampling()

// 停止
NetworkBandwidthSampler.of(context).stopSampling()

```

2. 监听流量变化

```
NetworkBandwidthSampler.of(context).streamTotalFlow.collectLatest {
    // it.down 下行流量总量
    // it.up 上行流量的总量
    // it.timestamp 时间戳，使用者可以用它来监听一段时间的流量消耗情况
}

NetworkBandwidthSampler.of(context).bandwidthFlow.collectLatest {
    // it.down 下行速度 kbps
    // it.up 上行速度 kbps
}
```

> 注：这里的监控是基于使用网络流量的统计监控，并不代表当前的网络环境。这个监控主要是监控网络流量使用情况，防止巨额流量的产生。