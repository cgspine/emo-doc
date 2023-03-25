# 浮层

一个使用 `Jetpack Compose` 实现的浮层组件，最大的特色就是不采用 `Dialog` 或者 `PopupWindow` 这些子 `Window` 实现，所以也就没有使用它们的各种坑点。

## 依赖引入

```kts
implementation("cn.qhplus.emo:modal:0.6.0")
```

## Dialog

### 简单消息类型

```kotlin
view.emoDialog { modal ->
    EmoDialogMsg(
        modal,
        "这是标题",
        "这是一丢丢有趣但是没啥用的内容",
        listOf(
            EmoModalAction("取 消", MaterialTheme.colorScheme.primary) {
                it.dismiss()
            },
            EmoModalAction("确 定", MaterialTheme.colorScheme.primary) {
                view.emoToast("确定啦!!!")
                it.dismiss()
            }
        )
    )
}.show()

```

### 列表类型

```kotlin
view.emoDialog { modal ->
    EmoDialogList(modal, maxHeight = 500.dp) {
        items(200) { index ->
            Item(title = "第${index + 1}项") {
                view.emoToast("你点了第${index + 1}项")
            }
        }
    }
}.show()

```

### 单选类型

```kotlin
view.emoDialog { modal ->
    val list = remember {
        val items = arrayListOf<String>()
        for (i in 0 until 500) {
            items.add("Item $i")
        }
        items
    }
    // 选中 index
    var markIndex by remember {
        mutableStateOf(20)
    }
    EmoDialogMarkList(
        modal,
        maxHeight = 500.dp,
        list = list,
        markIndex = markIndex
    ) { _, index ->
        markIndex = index
        view.emoToast("你点了第${index + 1}项")
    }
}.show()

```

### 多选类型

```kotlin
view.emoDialog { modal ->
    val list = remember {
        val items = arrayListOf<String>()
        for (i in 0 until 500) {
            items.add("Item $i")
        }
        items
    }
    // 选中项
    val checked = remember {
        mutableStateListOf(0, 5, 10, 20)
    }
    // 不可选项
    val disable = remember {
        mutableStateListOf(5, 10)
    }
    Column {
        EmoDialogMutiCheckList(
            modal,
            maxHeight = 500.dp,
            list = list,
            checked = checked.toSet(),
            disabled = disable.toSet()
        ) { _, index ->
            if (checked.contains(index)) {
                checked.remove(index)
            } else {
                checked.add(index)
            }
        }
        EmoDialogActions(
            modal = modal,
            actions = listOf(
                EmoModalAction("取 消", MaterialTheme.colorScheme.primary) {
                    it.dismiss()
                },
                EmoModalAction("确 定", MaterialTheme.colorScheme.primary) {
                    view.emoToast("你选择了: ${checked.joinToString(",")}")
                    it.dismiss()
                }
            )
        )
    }
}.show()

```

## Toast

这个也没有用系统的 `Toast` 组件，使用和效果类似，但可以更自定义化

```kotlin
view.emoToast("这只是个 Toast!")

// 更自定义的写法
view.emoToast(
    duration: Long = 1000, // 保留时间
    modalHostProvider: ModalHostProvider = DefaultModalHostProvider, // 承载主题，默认在 id 为 ID_ANDROID_CONTENT 的 view 下
    alignment: Alignment = Alignment.BottomCenter, // 显示位置
    horEdge: Dp = DefaultToastHorEdgeProtectionMargin,
    verEdge: Dp = DefaultToastVerEdgeProtectionMargin,
    radius: Dp = 8.dp,
    background: Color = Color.Black,
    enter: EnterTransition = xxx // 进入动画
    exit: ExitTransition = xxx // 退出动画
) {
    // Compose 内容
}
```

## Tip

显示加载中、加载成功、加载失败的阻塞用户操作的浮层

```kotlin
val flow = MutableStateFlow<TipStatus>(TipStatus.Loading())
val tip = view.emoTip(status = flow).show()
scope.launch {
    // 耗时操作
    delay(1000)
    flow.value = TipStatus.Error()
    delay(100)
    tip.dismiss()
}
```

## Popup

```kotlin
// 提供点击位置检测功能
ClickPositionCheckerBox(
    modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 16.dp, vertical = 8.dp)
        .clip(RoundedCornerShape(6.dp))
        .background(MaterialTheme.colorScheme.surfaceVariant),
    onClick = {
        // 显示 popup
        view.emoPopup(
            offset = it,
            widthCal = {
                // 计算 popup 宽度
                200.dp
            },
            background = { MaterialTheme.colorScheme.secondaryContainer }
        ){
            Text(
                text = "This is Popup Content\nThis is Popup Content",
                modifier = Modifier.padding(16.dp),
                color = MaterialTheme.colorScheme.onSecondaryContainer
            )
        }.show()
    }
) {
    Text(
        text = "PopUp",
        modifier = Modifier.padding(horizontal = 16.dp, vertical = 14.dp)
    )
}
```
## QuickAction

```kotlin
// 提供点击位置检测功能
ClickPositionCheckerBox(
    modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 16.dp, vertical = 8.dp)
        .clip(RoundedCornerShape(6.dp))
        .background(MaterialTheme.colorScheme.surfaceVariant),
    onClick = {
        // 显示 quick action
        view.emoQuickAction(
            offset = it,
            actions = listOf(
                QuickAction(R.drawable.quick_action_ic_copy, "Copy") {
                    // 点击事件
                    view.emoToast("What do you want to copy?").show()
                },
                QuickAction(R.drawable.quick_action_ic_delete, "Delete") {
                    // 点击事件
                    view.emoToast("What do you want to delete?").show()
                }
            ),
            actionWidth = 48.dp
        ).show()
    }
) {
    Text(
        text = "Quick Action",
        modifier = Modifier.padding(horizontal = 16.dp, vertical = 14.dp))
}
```

## BottomSheet

```kotlin
view.emoBottomSheet {
    EmoBottomSheetList(it) {
        items(200) { index ->
            Item(title = "第${index + 1}项") {
                view.emoToast("你点了第${index + 1}项")
            }
        }
    }
}.show()

```

## 自定义 Modal

``` kotlin

view.emoModal(
    mask: Color = DefaultMaskColor, // mask color
    systemCancellable: Boolean = true, // 系统返回操作是否可以取消浮层
    maskTouchBehavior: MaskTouchBehavior = MaskTouchBehavior.Dismiss, // mask 点击行为：穿透/取消浮层/不做响应
    uniqueId: Long = SystemClock.elapsedRealtimeNanos(), // 如果相同，会把已存在的浮层 dismiss 掉
    modalHostProvider: ModalHostProvider = DefaultModalHostProvider,
    enter: EnterTransition = fadeIn(tween(), 0f),
    exit: ExitTransition = fadeOut(tween(), 0f)
){ 
    // Compose 内容
}.show()

```


> 更多信息可查看公众号文章 [Android 浮层的重新思考与设计](https://mp.weixin.qq.com/s?__biz=Mzk0OTMzMjE2OQ==&mid=2247483796&idx=1&sn=189146e50c165b4cc01acdfdae12fb9c&chksm=c358b032f42f3924b408bb34b4129bcd49ef4e80cf57d905539741842920ea31957fc8e284a8&token=1864276121&lang=zh_CN#rd)