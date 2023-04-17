# Device

`device` 提供了一些 `ROM` 或者设备相关的工具方法

## 依赖引入

```kts
implementation("cn.qhplus.emo:device:0.7.0")
```

## RomInfo

> 审核特色：读取 Build.Model，Build.BRAND，Build.MANUFACTURER 等都会缓存一次，以规避合规审查的次数要求。

```kotlin
fun getRomType(): RomType
fun isXiaomi(): Boolean
fun isHuawei(): Boolean
fun isHonor(): Boolean
fun isOppo(): Boolean
fun isVivo(): Boolean
fun isMeizu(): Boolean
fun isSamsung(): Boolean
```

## HardwareInfo

```kotlin
fun getTotalMemory(context: Context): Long
fun getDataStorageSize(): Long
fun hasExtraStorage(): Boolean
fun getExtraStorageSize(): Long
fun getCpuCoreCount(): Int
fun getBatteryCapacity(context: Context): Double
```

