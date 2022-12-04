# 权限

国内现在的审核机制，基本上都需要在申请权限时要出一个申请权限的理由，目前的交互设计都趋于归一化（如下图），因为 `emo` 做了统一的封装。

<img width="280" alt="权限申请示例" src="/images/permission.jpg">

> 注：此库不包含对特定权限的兼容性处理

## 依赖引入

```kts
// 此组件依赖了 modal 组件
implementation("cn.qhplus.emo:permission:0.3.0")
```

## 使用

1. 通过 `rememberEmoPermissionState` 获取 `permissionState`

```kotlin
val permissionState = rememberEmoPermissionState(
    permission = Manifest.permission.CAMERA,
    tipContent = "为了录入羞羞的事情申请个相机权限"
)

```

你也可以通过传入 `EmoPermissionTip` 自定义提示信息, `EmoPermissionTip` 的定义为：

```kotlin
interface EmoPermissionTip {
    @Composable
    fun AnimatedVisibilityScope.Content()
}
```

2. 通过 `permissionState.status` 判断权限是否已经被允许，

```kotlin
when (permissionState.status) {
    PermissionStatus.Granted -> {
        // 权限已获取
    }
    is PermissionStatus.Denied -> {
        if (status.shouldShowRationale) {
            
        } else {
            权限未申请
        }
    }
}
```
2. 通过 `permissionState.launchPermissionRequest()` 申请权限。

3. 如果你想一次性申请多个权限，则使用 `rememberEmoMultiplePermissionsState`。


**完整 Demo**


```kotlin
@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun PermissionDemo() {
    val permissionState = rememberEmoPermissionState(
        permission = Manifest.permission.CAMERA,
        tipContent = "为了录入羞羞的事情申请个相机权限"
    )
    val view = LocalView.current
    val status = permissionState.status
    CommonItem("申请单个权限") {
        when (status) {
            PermissionStatus.Granted -> {
                view.emoToast("权限已经获取啦")
            }
            is PermissionStatus.Denied -> {
                // 申请权限
                permissionState.launchPermissionRequest()
            }
        }
    }
    val text = when (status) {
        PermissionStatus.Granted -> {
            "已获取权限"
        }
        is PermissionStatus.Denied -> {
            if (status.shouldShowRationale) {
                "你不应该拒绝这个权限"
            } else {
                "点击获取权限"
            }
        }
    }
    Text(
        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
        text = text,
        color = Color.DarkGray
    )
}
```

> 更多信息请查看公众号文章 [这权限提示的交互，迟早会抄袭到大一统](https://mp.weixin.qq.com/s?__biz=Mzk0OTMzMjE2OQ==&mid=2247483884&idx=1&sn=45cc1fc656ec5daaf1eab464cf9090ee&chksm=c358b04af42f395c8a95061526e2ad23fbae7906cabc5182cdfb4116ceba07d39a3836c2a8bd&token=1864276121&lang=zh_CN#rd)

