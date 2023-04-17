# 图片库

`emo` 的图片库包含了九宫格缩略图、图片预览、图片选择器、图片裁剪等功能

## 依赖引入

```kts
val version = "0.7.0"
// 默认使用 coil 作为图片加载器
implementation("cn.qhplus.emo:photo-coil:$version")
// 可选：如果需要使用其它库，则引入 photo 库，自定义实现 PhotoProvider 即可 
implementation("cn.qhplus.emo:photo:$version")
```

## 九宫格预览图

```kotlin

PhotoThumbnailWithViewer(
    images = listOf(
        CoilPhotoProvider(
            "url".toUri(),
            ratio = xx // 图片宽高比，不确定就传 -1
        )，
        CoilPhotoProvider(
            "url".toUri(),
            ratio = xx
        ),
        ...
    )
)

```

其完整定义为：

```kotlin
fun PhotoThumbnailWithViewer(
    targetActivity: Class<out PhotoViewerActivity> = PhotoViewerActivity::class.java, // 点击后跳转的图片查看界面 Activity
    images: List<PhotoProvider>, // 图片列表
    config: PhotoThumbnailConfig = remember { emoDefaultPhotoThumbnailConfig } // 配置项
)
```

## 图片查看

```kotlin
// list 为 item 为 PhotoShot，主要是包含 PhotoProvider 以及其位置信息
// 如果使用九宫格，就默认帮你处理好了
val intent = PhotoViewerActivity.intentOf(context, PhotoViewerActivity::class.java, list, index)
context.startActivity(intent)
```

## 图片选择器

```kotlin

// 注册 launcher
val pickLauncher = rememberLauncherForActivityResult(ActivityResultContracts.StartActivityForResult()) {
    if (it.resultCode == RESULT_OK) {
        it.data?.getPhotoPickResult()?.let { ret ->
            pickResult.value = ret
        }
    }
}

// 启动选择器

pickLauncher.launch(
    PhotoPickerActivity.intentOf(
        context,
        CoilMediaPhotoProviderFactory::class.java // 可自定义图片加载器
    )
)

```

`PhotoPickerActivity.intentOf` 的完整定义为：

```kotlin

fun intentOf(
    context: Context,
    factoryCls: Class<out MediaPhotoProviderFactory>,
    cls: Class<out PhotoPickerActivity> = PhotoPickerActivity::class.java,
    pickedItems: ArrayList<Uri> = arrayListOf(), // 已选中项
    pickLimitCount: Int = PHOTO_DEFAULT_PICK_LIMIT_COUNT, // 选中数目限制
    enableOrigin: Boolean = true, // 是否开启允许原图框
    configProviderCls: Class<out PhotoPickerConfigProvider> = DefaultPhotoPickerConfigProvider::class.java // 配置提供类
)

```

其内部 UI 大体上保持与微信照片选择器相同。

## 图片裁剪

```kotlin
// 注册 launcher
val pickLauncher = rememberLauncherForActivityResult(ActivityResultContracts.StartActivityForResult()) {
    if (it.resultCode == RESULT_OK) {
        it.data?.getPhotoClipperResult()?.let { ret ->
            clipperResult.value = ret
        }
    }
}

//启动
pickLauncher.launch(
    PhotoClipperActivity.intentOf(
        context,
        CoilPhotoProvider(
            "url".toUri(),
            ratio = 0f
        )
    )
)
```

## 自定义图片加载器

由于目前主流还是使用 `Glide` 作为图片加载，所以你可能需要做点适配工作，主要是要实现以下几个类：

1. Photo

```kotlin
interface Photo {
    @Composable
    fun Compose(
        contentScale: ContentScale, // 缩放模式
        isContainerDimenExactly: Boolean, // 外部容器是否固定大小
        onSuccess: ((PhotoResult) -> Unit)?,
        onError: ((Throwable) -> Unit)?
    )
}
```

2. PhotoProvider

```kotlin
interface PhotoProvider {
    // 缩略图
    fun thumbnail(openBlankColor: Boolean): Photo?
    // 正图
    fun photo(): Photo?
    // 宽高比
    fun ratio(): Float = -1f

    // 是否是长图
    fun isLongImage(): Boolean = false

    // 下面两个是处理 activity 重建所用的，用以从 meta 中恢复出 PhotoProvider 对象
    fun meta(): Bundle?
    fun recoverCls(): Class<out PhotoShotRecover>?
}
```

3. MediaPhotoProviderFactory

```kotlin

// 用于图片选择器
interface MediaPhotoProviderFactory {
    fun factory(model: MediaModel): PhotoProvider
}
```