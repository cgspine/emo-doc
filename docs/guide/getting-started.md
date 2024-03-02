# 快速开始

## 环境要求

1. 最低支持 `API Level` 为 24；
2. `kotlin` 1.9.22；
3. `Compose BOM` 2024.02.01，`Compose Compiler` 1.5.10。

>历史版本对应关系可查看 [`compose-versions`](https://github.com/cgspine/emo-public#compose-versions)

## BOM 支持

由于 `emo` 的子库众多了，而且相互之间也存在依赖关系， `emo` 现在也开始使用 `BOM` 来方便调用者进行版本管理。当前 `BOM` 版本为 `2023.08.00`

开发只需要在 `build.gradle.kts` 的 `dependencies` 里添加

```kts
implementation(platform("cn.qhplus.emo:bom:2024.03.00"))
```

在使用其它子库时，就可以不用添加版本号，而由 `BOM` 进行约束

## 按需引用

`emo` 是根据功能独立了非常多的子库，没有统一的引入方式，你需要按需引入。在每篇文档的开始，都会给出其具体依赖的引入方式。所以去查看左边的目录，看看有没有自己想要的功能吧。


## 更多资源

1. 关注公众号 《古哥E下》，一些库的源码解析和设计思路会在这上面推送。
2. 加微信号【cgine_song】，备注【emo +1】，可反馈问题与共同讨论。


