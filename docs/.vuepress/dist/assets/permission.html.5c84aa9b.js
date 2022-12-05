import{_ as e,r as t,o as i,c as o,b as n,d as s,e as p,a as l}from"./app.ddfcfcb2.js";const c="/images/permission.jpg",u={},r=l('<h1 id="权限" tabindex="-1"><a class="header-anchor" href="#权限" aria-hidden="true">#</a> 权限</h1><p>国内现在的审核机制，基本上都需要在申请权限时要出一个申请权限的理由，目前的交互设计都趋于归一化（如下图），因为 <code>emo</code> 做了统一的封装。</p><img width="280" alt="权限申请示例" src="'+c+`"><blockquote><p>注：此库不包含对特定权限的兼容性处理</p></blockquote><h2 id="依赖引入" tabindex="-1"><a class="header-anchor" href="#依赖引入" aria-hidden="true">#</a> 依赖引入</h2><div class="language-kts line-numbers-mode" data-ext="kts"><pre class="language-kts"><code><span class="token comment">// 此组件依赖了 modal 组件</span>
<span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:permission:0.3.0&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><ol><li>通过 <code>rememberEmoPermissionState</code> 获取 <code>permissionState</code></li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> permissionState <span class="token operator">=</span> <span class="token function">rememberEmoPermissionState</span><span class="token punctuation">(</span>
    permission <span class="token operator">=</span> Manifest<span class="token punctuation">.</span>permission<span class="token punctuation">.</span>CAMERA<span class="token punctuation">,</span>
    tipContent <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;为了录入羞羞的事情申请个相机权限&quot;</span></span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你也可以通过传入 <code>EmoPermissionTip</code> 自定义提示信息, <code>EmoPermissionTip</code> 的定义为：</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> EmoPermissionTip <span class="token punctuation">{</span>
    <span class="token annotation builtin">@Composable</span>
    <span class="token keyword">fun</span> AnimatedVisibilityScope<span class="token punctuation">.</span><span class="token function">Content</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>通过 <code>permissionState.status</code> 判断权限是否已经被允许，</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">when</span> <span class="token punctuation">(</span>permissionState<span class="token punctuation">.</span>status<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    PermissionStatus<span class="token punctuation">.</span>Granted <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 权限已获取</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">is</span> PermissionStatus<span class="token punctuation">.</span>Denied <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>status<span class="token punctuation">.</span>shouldShowRationale<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            权限未申请
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>通过 <code>permissionState.launchPermissionRequest()</code> 申请权限。</p></li><li><p>如果你想一次性申请多个权限，则使用 <code>rememberEmoMultiplePermissionsState</code>。</p></li></ol><p><strong>完整 Demo</strong></p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@OptIn</span><span class="token punctuation">(</span>ExperimentalPermissionsApi<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation builtin">@Composable</span>
<span class="token keyword">fun</span> <span class="token function">PermissionDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> permissionState <span class="token operator">=</span> <span class="token function">rememberEmoPermissionState</span><span class="token punctuation">(</span>
        permission <span class="token operator">=</span> Manifest<span class="token punctuation">.</span>permission<span class="token punctuation">.</span>CAMERA<span class="token punctuation">,</span>
        tipContent <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;为了录入羞羞的事情申请个相机权限&quot;</span></span>
    <span class="token punctuation">)</span>
    <span class="token keyword">val</span> view <span class="token operator">=</span> LocalView<span class="token punctuation">.</span>current
    <span class="token keyword">val</span> status <span class="token operator">=</span> permissionState<span class="token punctuation">.</span>status
    <span class="token function">CommonItem</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;申请单个权限&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">when</span> <span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            PermissionStatus<span class="token punctuation">.</span>Granted <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                view<span class="token punctuation">.</span><span class="token function">emoToast</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;权限已经获取啦&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">is</span> PermissionStatus<span class="token punctuation">.</span>Denied <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                <span class="token comment">// 申请权限</span>
                permissionState<span class="token punctuation">.</span><span class="token function">launchPermissionRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">val</span> text <span class="token operator">=</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        PermissionStatus<span class="token punctuation">.</span>Granted <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token string-literal singleline"><span class="token string">&quot;已获取权限&quot;</span></span>
        <span class="token punctuation">}</span>
        <span class="token keyword">is</span> PermissionStatus<span class="token punctuation">.</span>Denied <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>status<span class="token punctuation">.</span>shouldShowRationale<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token string-literal singleline"><span class="token string">&quot;你不应该拒绝这个权限&quot;</span></span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token string-literal singleline"><span class="token string">&quot;点击获取权限&quot;</span></span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">Text</span><span class="token punctuation">(</span>
        modifier <span class="token operator">=</span> Modifier<span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span>horizontal <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">.</span>dp<span class="token punctuation">,</span> vertical <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">.</span>dp<span class="token punctuation">)</span><span class="token punctuation">,</span>
        text <span class="token operator">=</span> text<span class="token punctuation">,</span>
        color <span class="token operator">=</span> Color<span class="token punctuation">.</span>DarkGray
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),d={href:"https://mp.weixin.qq.com/s?__biz=Mzk0OTMzMjE2OQ==&mid=2247483884&idx=1&sn=45cc1fc656ec5daaf1eab464cf9090ee&chksm=c358b04af42f395c8a95061526e2ad23fbae7906cabc5182cdfb4116ceba07d39a3836c2a8bd&token=1864276121&lang=zh_CN#rd",target:"_blank",rel:"noopener noreferrer"};function k(m,v){const a=t("ExternalLinkIcon");return i(),o("div",null,[r,n("blockquote",null,[n("p",null,[s("更多信息请查看公众号文章 "),n("a",d,[s("这权限提示的交互，迟早会抄袭到大一统"),p(a)])])])])}const g=e(u,[["render",k],["__file","permission.html.vue"]]);export{g as default};
