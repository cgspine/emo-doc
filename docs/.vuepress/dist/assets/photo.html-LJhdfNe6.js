import{_ as n,o as s,c as a,a as t}from"./app-YivrfQD0.js";const e={},o=t(`<h1 id="图片库" tabindex="-1"><a class="header-anchor" href="#图片库" aria-hidden="true">#</a> 图片库</h1><p><code>emo</code> 的图片库包含了九宫格缩略图、图片预览、图片选择器、图片裁剪等功能</p><h2 id="依赖引入" tabindex="-1"><a class="header-anchor" href="#依赖引入" aria-hidden="true">#</a> 依赖引入</h2><div class="language-kts line-numbers-mode" data-ext="kts"><pre class="language-kts"><code><span class="token comment">// 默认使用 coil 作为图片加载器</span>
<span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:photo-coil&quot;</span></span><span class="token punctuation">)</span>
<span class="token comment">// 可选：如果需要使用其它库，则引入 photo 库，自定义实现 PhotoProvider 即可 </span>
<span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:photo&quot;</span></span><span class="token punctuation">)</span>
<span class="token comment">// Pdf 查看器</span>
<span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:photo-pdf&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="九宫格预览图" tabindex="-1"><a class="header-anchor" href="#九宫格预览图" aria-hidden="true">#</a> 九宫格预览图</h2><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code>
<span class="token function">PhotoThumbnailWithViewer</span><span class="token punctuation">(</span>
    images <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span>
        <span class="token function">CoilPhotoProvider</span><span class="token punctuation">(</span>
            <span class="token string-literal singleline"><span class="token string">&quot;url&quot;</span></span><span class="token punctuation">.</span><span class="token function">toUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            ratio <span class="token operator">=</span> xx <span class="token comment">// 图片宽高比，不确定就传 -1</span>
        <span class="token punctuation">)</span>，
        <span class="token function">CoilPhotoProvider</span><span class="token punctuation">(</span>
            <span class="token string-literal singleline"><span class="token string">&quot;url&quot;</span></span><span class="token punctuation">.</span><span class="token function">toUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            ratio <span class="token operator">=</span> xx
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其完整定义为：</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">PhotoThumbnailWithViewer</span><span class="token punctuation">(</span>
    targetActivity<span class="token operator">:</span> Class<span class="token operator">&lt;</span><span class="token keyword">out</span> PhotoViewerActivity<span class="token operator">&gt;</span> <span class="token operator">=</span> PhotoViewerActivity<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">,</span> <span class="token comment">// 点击后跳转的图片查看界面 Activity</span>
    images<span class="token operator">:</span> List<span class="token operator">&lt;</span>PhotoProvider<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token comment">// 图片列表</span>
    config<span class="token operator">:</span> PhotoThumbnailConfig <span class="token operator">=</span> remember <span class="token punctuation">{</span> emoDefaultPhotoThumbnailConfig <span class="token punctuation">}</span> <span class="token comment">// 配置项</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="图片查看" tabindex="-1"><a class="header-anchor" href="#图片查看" aria-hidden="true">#</a> 图片查看</h2><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token comment">// list 为 item 为 PhotoShot，主要是包含 PhotoProvider 以及其位置信息</span>
<span class="token comment">// 如果使用九宫格，就默认帮你处理好了</span>
<span class="token keyword">val</span> intent <span class="token operator">=</span> PhotoViewerActivity<span class="token punctuation">.</span><span class="token function">intentOf</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> PhotoViewerActivity<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">,</span> list<span class="token punctuation">,</span> index<span class="token punctuation">)</span>
context<span class="token punctuation">.</span><span class="token function">startActivity</span><span class="token punctuation">(</span>intent<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="图片选择器" tabindex="-1"><a class="header-anchor" href="#图片选择器" aria-hidden="true">#</a> 图片选择器</h2><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code>
<span class="token comment">// 注册 launcher</span>
<span class="token keyword">val</span> pickLauncher <span class="token operator">=</span> <span class="token function">rememberLauncherForActivityResult</span><span class="token punctuation">(</span>ActivityResultContracts<span class="token punctuation">.</span><span class="token function">StartActivityForResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>it<span class="token punctuation">.</span>resultCode <span class="token operator">==</span> RESULT_OK<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        it<span class="token punctuation">.</span>data<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">getPhotoPickResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> ret <span class="token operator">-&gt;</span>
            pickResult<span class="token punctuation">.</span>value <span class="token operator">=</span> ret
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 启动选择器</span>

pickLauncher<span class="token punctuation">.</span><span class="token function">launch</span><span class="token punctuation">(</span>
    PhotoPickerActivity<span class="token punctuation">.</span><span class="token function">intentOf</span><span class="token punctuation">(</span>
        context<span class="token punctuation">,</span>
        CoilMediaPhotoProviderFactory<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java <span class="token comment">// 可自定义图片加载器</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>PhotoPickerActivity.intentOf</code> 的完整定义为：</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code>
<span class="token keyword">fun</span> <span class="token function">intentOf</span><span class="token punctuation">(</span>
    context<span class="token operator">:</span> Context<span class="token punctuation">,</span>
    factoryCls<span class="token operator">:</span> Class<span class="token operator">&lt;</span><span class="token keyword">out</span> MediaPhotoProviderFactory<span class="token operator">&gt;</span><span class="token punctuation">,</span>
    cls<span class="token operator">:</span> Class<span class="token operator">&lt;</span><span class="token keyword">out</span> PhotoPickerActivity<span class="token operator">&gt;</span> <span class="token operator">=</span> PhotoPickerActivity<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">,</span>
    pickedItems<span class="token operator">:</span> ArrayList<span class="token operator">&lt;</span>Uri<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token function">arrayListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 已选中项</span>
    pickLimitCount<span class="token operator">:</span> Int <span class="token operator">=</span> PHOTO_DEFAULT_PICK_LIMIT_COUNT<span class="token punctuation">,</span> <span class="token comment">// 选中数目限制</span>
    enableOrigin<span class="token operator">:</span> Boolean <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否开启允许原图框</span>
    configProviderCls<span class="token operator">:</span> Class<span class="token operator">&lt;</span><span class="token keyword">out</span> PhotoPickerConfigProvider<span class="token operator">&gt;</span> <span class="token operator">=</span> DefaultPhotoPickerConfigProvider<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java <span class="token comment">// 配置提供类</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其内部 UI 大体上保持与微信照片选择器相同。</p><h2 id="图片裁剪" tabindex="-1"><a class="header-anchor" href="#图片裁剪" aria-hidden="true">#</a> 图片裁剪</h2><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token comment">// 注册 launcher</span>
<span class="token keyword">val</span> pickLauncher <span class="token operator">=</span> <span class="token function">rememberLauncherForActivityResult</span><span class="token punctuation">(</span>ActivityResultContracts<span class="token punctuation">.</span><span class="token function">StartActivityForResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>it<span class="token punctuation">.</span>resultCode <span class="token operator">==</span> RESULT_OK<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        it<span class="token punctuation">.</span>data<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">getPhotoClipperResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> ret <span class="token operator">-&gt;</span>
            clipperResult<span class="token punctuation">.</span>value <span class="token operator">=</span> ret
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//启动</span>
pickLauncher<span class="token punctuation">.</span><span class="token function">launch</span><span class="token punctuation">(</span>
    PhotoClipperActivity<span class="token punctuation">.</span><span class="token function">intentOf</span><span class="token punctuation">(</span>
        context<span class="token punctuation">,</span>
        <span class="token function">CoilPhotoProvider</span><span class="token punctuation">(</span>
            <span class="token string-literal singleline"><span class="token string">&quot;url&quot;</span></span><span class="token punctuation">.</span><span class="token function">toUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            ratio <span class="token operator">=</span> <span class="token number">0f</span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义图片加载器" tabindex="-1"><a class="header-anchor" href="#自定义图片加载器" aria-hidden="true">#</a> 自定义图片加载器</h2><p>由于目前主流还是使用 <code>Glide</code> 作为图片加载，所以你可能需要做点适配工作，主要是要实现以下几个类：</p><ol><li>Photo</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> Photo <span class="token punctuation">{</span>
    <span class="token annotation builtin">@Composable</span>
    <span class="token keyword">fun</span> <span class="token function">Compose</span><span class="token punctuation">(</span>
        contentScale<span class="token operator">:</span> ContentScale<span class="token punctuation">,</span> <span class="token comment">// 缩放模式</span>
        isContainerDimenExactly<span class="token operator">:</span> Boolean<span class="token punctuation">,</span> <span class="token comment">// 外部容器是否固定大小</span>
        onSuccess<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>PhotoResult<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Unit<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">,</span>
        onError<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>Throwable<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Unit<span class="token punctuation">)</span><span class="token operator">?</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>PhotoProvider</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> PhotoProvider <span class="token punctuation">{</span>
    <span class="token comment">// 缩略图</span>
    <span class="token keyword">fun</span> <span class="token function">thumbnail</span><span class="token punctuation">(</span>openBlankColor<span class="token operator">:</span> Boolean<span class="token punctuation">)</span><span class="token operator">:</span> Photo<span class="token operator">?</span>
    <span class="token comment">// 正图</span>
    <span class="token keyword">fun</span> <span class="token function">photo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Photo<span class="token operator">?</span>
    <span class="token comment">// 宽高比</span>
    <span class="token keyword">fun</span> <span class="token function">ratio</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Float <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1f</span>

    <span class="token comment">// 是否是长图</span>
    <span class="token keyword">fun</span> <span class="token function">isLongImage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token comment">// 下面两个是处理 activity 重建所用的，用以从 meta 中恢复出 PhotoProvider 对象</span>
    <span class="token keyword">fun</span> <span class="token function">meta</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Bundle<span class="token operator">?</span>
    <span class="token keyword">fun</span> <span class="token function">recoverCls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Class<span class="token operator">&lt;</span><span class="token keyword">out</span> PhotoShotRecover<span class="token operator">&gt;</span><span class="token operator">?</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>MediaPhotoProviderFactory</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code>
<span class="token comment">// 用于图片选择器</span>
<span class="token keyword">interface</span> MediaPhotoProviderFactory <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">factory</span><span class="token punctuation">(</span>model<span class="token operator">:</span> MediaModel<span class="token punctuation">)</span><span class="token operator">:</span> PhotoProvider
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),p=[o];function i(c,l){return s(),a("div",null,p)}const r=n(e,[["render",i],["__file","photo.html.vue"]]);export{r as default};
