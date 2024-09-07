import{_ as s,c as a,a as e,o as t}from"./app-CTIoDS1N.js";const p={};function l(c,n){return t(),a("div",null,n[0]||(n[0]=[e(`<h1 id="scheme-路由" tabindex="-1"><a class="header-anchor" href="#scheme-路由"><span>Scheme 路由</span></a></h1><p>以 <code>scheme</code> 的协议来做界面路由协议，通过 <code>ksp</code> 加注解的方式来做界面路由管理。</p><h2 id="依赖引入" tabindex="-1"><a class="header-anchor" href="#依赖引入"><span>依赖引入</span></a></h2><div class="language-kts line-numbers-mode" data-highlighter="prismjs" data-ext="kts" data-title="kts"><pre><code><span class="line"><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:scheme-impl&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">ksp</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:scheme-ksp:0.14.0&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="特性" tabindex="-1"><a class="header-anchor" href="#特性"><span>特性</span></a></h2><ul><li>支持 activity 跳转</li><li>支持 compose 跳转</li></ul><h2 id="scheme-协议" tabindex="-1"><a class="header-anchor" href="#scheme-协议"><span>Scheme 协议</span></a></h2><blockquote><p>emo://home?arg1=value1&amp;arg2=value2</p></blockquote><p><code>scheme</code> 协议类同于 <code>url</code>。传参等同于 <code>url</code> 的 <code>query</code> 部分</p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><h3 id="添加注解" tabindex="-1"><a class="header-anchor" href="#添加注解"><span>添加注解</span></a></h3><ol><li><code>Activity</code></li></ol><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token annotation builtin">@ActivityScheme</span><span class="token punctuation">(</span>action <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;single&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation builtin">@SchemeBoolArg</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;bool&quot;</span></span><span class="token punctuation">,</span> default <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">class</span> SingleActivity <span class="token operator">:</span> <span class="token function">ComponentActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token operator">:</span> Bundle<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">val</span> boolArg <span class="token operator">=</span> intent<span class="token punctuation">.</span><span class="token function">getBooleanExtra</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;bool&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">//...</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">   </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><code>Composeable</code></li></ol><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token annotation builtin">@ComposeScheme</span><span class="token punctuation">(</span></span>
<span class="line">    action <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;modal&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">    alternativeHosts <span class="token operator">=</span> <span class="token punctuation">[</span>MainActivity<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">]</span> <span class="token comment">// 承载 compose 的容器 activity, 必须继承自 ComposeHostActivity</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation builtin">@SchemeIntArg</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;i&quot;</span></span><span class="token punctuation">,</span> default <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation builtin">@Composable</span></span>
<span class="line"><span class="token keyword">fun</span> <span class="token function">ModalPage</span><span class="token punctuation">(</span>navBackStackEntry<span class="token operator">:</span> NavBackStackEntry<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">val</span> intArg <span class="token operator">=</span> navBackStackEntry<span class="token punctuation">.</span>arguments<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;i&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">//...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以同过注解指定参数的类型，如果不指定，默认为解析出来就为字符串。其支持以下几种参数类型：</p><ul><li>@SchemeBoolArg(name, special, default)</li><li>@SchemeIntArg(name, special, default)</li><li>@SchemeLongArg(name, special, default)</li><li>@SchemeFloatArg(name, special, default)</li><li>@SchemeStringArg(name, special, default)</li></ul><p>其参数值 <code>special</code> 表示必须在 <code>scheme</code> 参数是路由选择的一部分，例如:</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token annotation builtin">@ComposeScheme</span><span class="token punctuation">(</span></span>
<span class="line">    action <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;product&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">    alternativeHosts <span class="token operator">=</span> <span class="token punctuation">[</span>MainActivity<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation builtin">@SchemeIntArg</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;type&quot;</span></span><span class="token punctuation">,</span> special<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">,</span> default <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation builtin">@Composable</span></span>
<span class="line"><span class="token keyword">fun</span> <span class="token function">AProductPage</span><span class="token punctuation">(</span>navBackStackEntry<span class="token operator">:</span> NavBackStackEntry<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">\`\`\`kotlin</span>
<span class="line"><span class="token annotation builtin">@ComposeScheme</span><span class="token punctuation">(</span></span>
<span class="line">    action <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;product&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">    alternativeHosts <span class="token operator">=</span> <span class="token punctuation">[</span>MainActivity<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation builtin">@SchemeIntArg</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;type&quot;</span></span><span class="token punctuation">,</span> special<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">,</span> default <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation builtin">@Composable</span></span>
<span class="line"><span class="token keyword">fun</span> <span class="token function">BProductPage</span><span class="token punctuation">(</span>navBackStackEntry<span class="token operator">:</span> NavBackStackEntry<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，有 A、B 两种类型的商品，他们的展示 <code>UI</code> 完全不一样，但是 <code>scheme</code> 差不多，那么我们就可以通过 <code>special</code> 来取代 <code>if else</code> 的判断。</p><ul><li><code>emo://product?type=1&amp;id=xxx</code> 就会路由到 <code>AProductPage</code></li><li><code>emo://product?type=2&amp;id=xxx</code> 就会路由到 <code>BProductPage</code></li></ul><h3 id="实例化-schemeclient" tabindex="-1"><a class="header-anchor" href="#实例化-schemeclient"><span>实例化 SchemeClient</span></a></h3><p>推荐在 <code>Application.onCreate</code> 中初始化, 必须在首个 <code>Activity.onCreate</code> 前完成初始化，所以不要 <code>lazy</code>。</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">val</span> EmoScheme <span class="token operator">=</span> <span class="token function">schemeClient</span><span class="token punctuation">(</span>application<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// debug 模式下，参数解析错误等回直接抛错。 非 debug 模式下只是返回 false 表示 scheme 处理失败</span></span>
<span class="line">    debug <span class="token operator">=</span> BuildConfig<span class="token punctuation">.</span>DEBUG</span>
<span class="line">    <span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token keyword">object</span><span class="token operator">:</span> SchemeInterceptor <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">override</span> <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">intercept</span><span class="token punctuation">(</span>env<span class="token operator">:</span> SchemeTransaction<span class="token punctuation">,</span> schemeParts<span class="token operator">:</span> SchemeParts<span class="token punctuation">,</span> next<span class="token operator">:</span> SchemeHandler<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span></span>
<span class="line">            Log<span class="token punctuation">.</span><span class="token function">i</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;EmoDemo&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;begin handle scheme: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">schemeParts<span class="token punctuation">.</span>origin</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">val</span> ret <span class="token operator">=</span> next<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> schemeParts<span class="token punctuation">)</span></span>
<span class="line">            Log<span class="token punctuation">.</span><span class="token function">i</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;EmoDemo&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;after handle scheme: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">schemeParts<span class="token punctuation">.</span>origin</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, ret = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">ret</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span> ret</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构建-scheme" tabindex="-1"><a class="header-anchor" href="#构建-scheme"><span>构建 scheme</span></a></h3><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"> <span class="token keyword">val</span> scheme <span class="token operator">=</span> <span class="token function">SchemeBuilder</span><span class="token punctuation">(</span>SchemeConst<span class="token punctuation">.</span>SCHEME_PROTOCOL<span class="token punctuation">,</span> action<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">arg</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;bool&quot;</span></span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">arg</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;i&quot;</span></span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般协议头是个固定常量，所以使用者可以抽取一个更动用的函数</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">fun</span> <span class="token function">schemeBuilder</span><span class="token punctuation">(</span>action<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> SchemeBuilder <span class="token operator">=</span> <span class="token function">SchemeBuilder</span><span class="token punctuation">(</span>SchemeConst<span class="token punctuation">.</span>SCHEME_PROTOCOL<span class="token punctuation">,</span> action<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>那么使用就变成</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">val</span> scheme <span class="token operator">=</span> <span class="token function">schemeBuilder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;modal&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">arg</span><span class="token punctuation">(</span>xx<span class="token punctuation">,</span> xx<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="跳转" tabindex="-1"><a class="header-anchor" href="#跳转"><span>跳转</span></a></h3><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line">launch <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 返回 scheme 是否被处理</span></span>
<span class="line">    <span class="token keyword">val</span> ret <span class="token operator">=</span> EmoScheme<span class="token punctuation">.</span><span class="token function">handle</span><span class="token punctuation">(</span>scheme<span class="token punctuation">,</span> SchemeHandleStrategy<span class="token punctuation">.</span>WaitPrevAndRun<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>scheme 跳转运行在协程中，主要是为了适配某些情况，需要读取 <code>DB</code> 之类的确定某些参数才能跳转的情况。所以用协程，使用者就可以解决某些必须用子线程而不阻塞主线程的魔幻产品需求。</p><p>因为使用了协程，就存在如果一个 <code>scheme</code> 还在处理过程中，有发起另一个 <code>scheme</code> 跳转的请求的场景，因而我提供了 <code>SchemeHandleStrategy</code> 的控制，其取值为：</p><ul><li><code>WaitPrevAndRun</code>： 串行，等待前一个 <code>scheme</code> 执行完成，再执行当前的。</li><li><code>CancelPrevAndRun</code>: 取消前一个，然后执行当前的。</li><li><code>ContinuePrevOrRun</code>: 如果存在正在处理的 <code>scheme</code>, 那就抛弃当前的，否则执行当前的。</li></ul><p>如果你有一次性处理多个 <code>scheme</code> 的需求场景，例如后台点击通知消息，产品期望先跳转会话列表，再跳转会话详情，那就可以用 <code>batchHandle</code> 方法</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line">launch <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 返回 scheme 是否全被处理</span></span>
<span class="line">    <span class="token keyword">val</span> ret <span class="token operator">=</span> EmoScheme<span class="token punctuation">.</span><span class="token function">batchHandle</span><span class="token punctuation">(</span>schemes<span class="token punctuation">,</span> SchemeHandleStrategy<span class="token punctuation">.</span>WaitPrevAndRun<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你不关心 <code>scheme</code> 处理的结果，或者已经在拦截器里面处理好，那么可以用 <code>handleQuietly</code>、<code>batchHandleQuietly</code> 在非协程环境下直接调用。</p><h2 id="更多玩法" tabindex="-1"><a class="header-anchor" href="#更多玩法"><span>更多玩法</span></a></h2><h3 id="使用拦截器" tabindex="-1"><a class="header-anchor" href="#使用拦截器"><span>使用拦截器</span></a></h3><p>在实例化 <code>SchemeClient</code> 过程中，我们可以添加多个拦截器，以完成更多的场景化需求，诸如：</p><ul><li>日志输出</li><li>兼容 <code>http</code> 协议，处理 <code>url</code> 跳转</li><li>登录拦截</li><li>服务器下发，动态更改某些 <code>scheme</code> 的目标界面，处理诸如某些页面上线了，但是有 bug，需要临时先让它重定向到某些 H5 界面</li><li><code>scheme</code> 无法被处理的兜底策略</li><li>...</li></ul><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"></span>
<span class="line"><span class="token keyword">val</span> EmoScheme <span class="token operator">=</span> <span class="token function">schemeClient</span><span class="token punctuation">(</span>application<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">addInterceptor</span><span class="token punctuation">(</span>A<span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">addInterceptor</span><span class="token punctuation">(</span>B<span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">addInterceptor</span><span class="token punctuation">(</span>C<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拦截器采用洋葱模型，上述 A、B、C 三个拦截器，拦截过程如下：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">      handle start</span>
<span class="line">           |</span>
<span class="line">           v</span>
<span class="line">+--------- A -----------+</span>
<span class="line">| +------- B ---------+ |</span>
<span class="line">| | +----- C -------+ | |</span>
<span class="line">| | |               | | |</span>
<span class="line">| | |     core      | | |</span>
<span class="line">| | |               | | |</span>
<span class="line">| | +----- C -------+ | |</span>
<span class="line">| +------- B ---------+ |</span>
<span class="line">+--------- A -----------+</span>
<span class="line">           |</span>
<span class="line">           v</span>
<span class="line">        handle end</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以在实现拦截器时，需要调用者主动调用 <code>next</code> 方法交由下一级进行处理。</p><h3 id="在页面中获取原始-scheme" tabindex="-1"><a class="header-anchor" href="#在页面中获取原始-scheme"><span>在页面中获取原始 <code>scheme</code>:</span></a></h3><p>在跳转到新的界面，我们可能需要获取到原始的 <code>scheme</code>。 我遇到的有两个场景：</p><ol><li>界面曝光，我们直接将 <code>scheme</code> 上报给后台，那么就将当前的界面以及界面参数全都上报了。</li><li>界面重入，界面重入是指我们进入到了 A 界面，然后在 A 界面杀死了 App。产品期望下次打开 app 就直接进入到 A 界面。 这在阅读、学习等 App 中很有必要。那么我们在进入 A 界面时把 A 界面的 scheme 存起来，下次 App 打开，直接路由过来，实现就很简单了。</li></ol><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"></span>
<span class="line"><span class="token annotation builtin">@ActivityScheme</span><span class="token punctuation">(</span>action <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;single&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">class</span> SingleActivity <span class="token operator">:</span> <span class="token function">ComponentActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onResume</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onResume</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">val</span> originScheme <span class="token operator">=</span> intent<span class="token punctuation">.</span><span class="token function">getStringExtra</span><span class="token punctuation">(</span>SchemeKeys<span class="token punctuation">.</span>KEY_ORIGIN<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> Uri<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">// 上报 originScheme</span></span>
<span class="line">        <span class="token comment">// 存储 originScheme， 以便下次打开 app 用</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">   </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token annotation builtin">@ComposeScheme</span><span class="token punctuation">(</span></span>
<span class="line">    action <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;modal&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">    alternativeHosts <span class="token operator">=</span> <span class="token punctuation">[</span>MainActivity<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation builtin">@Composable</span></span>
<span class="line"><span class="token keyword">fun</span> <span class="token function">ModalPage</span><span class="token punctuation">(</span>navBackStackEntry<span class="token operator">:</span> NavBackStackEntry<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token function">LaunchedEffect</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">val</span> originSchem <span class="token operator">=</span> arguments<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span>SchemeKeys<span class="token punctuation">.</span>KEY_ORIGIN<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> Uri<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">// 上报 originScheme</span></span>
<span class="line">        <span class="token comment">// 存储 originScheme， 以便下次打开 app 用</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>更多信息请查看公众号文章 <a href="https://mp.weixin.qq.com/s?__biz=Mzk0OTMzMjE2OQ==&amp;mid=2247483975&amp;idx=1&amp;sn=6c0c1b8dc174a46a74078c59055cd8a5&amp;chksm=c358b3e1f42f3af75e331792a4d5ec6ffcee3effe45a622621e1f78753bb23a5cacbbd738d77&amp;token=705170082&amp;lang=zh_CN#rd" target="_blank" rel="noopener noreferrer">又撸了一个 Scheme 路由</a></p></blockquote>`,51)]))}const o=s(p,[["render",l],["__file","scheme.html.vue"]]),u=JSON.parse('{"path":"/guide/scheme.html","title":"Scheme 路由","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"依赖引入","slug":"依赖引入","link":"#依赖引入","children":[]},{"level":2,"title":"特性","slug":"特性","link":"#特性","children":[]},{"level":2,"title":"Scheme 协议","slug":"scheme-协议","link":"#scheme-协议","children":[]},{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[{"level":3,"title":"添加注解","slug":"添加注解","link":"#添加注解","children":[]},{"level":3,"title":"实例化 SchemeClient","slug":"实例化-schemeclient","link":"#实例化-schemeclient","children":[]},{"level":3,"title":"构建 scheme","slug":"构建-scheme","link":"#构建-scheme","children":[]},{"level":3,"title":"跳转","slug":"跳转","link":"#跳转","children":[]}]},{"level":2,"title":"更多玩法","slug":"更多玩法","link":"#更多玩法","children":[{"level":3,"title":"使用拦截器","slug":"使用拦截器","link":"#使用拦截器","children":[]},{"level":3,"title":"在页面中获取原始 scheme:","slug":"在页面中获取原始-scheme","link":"#在页面中获取原始-scheme","children":[]}]}],"git":{"updatedTime":1709383116000,"contributors":[{"name":"cgspine","email":"cgspine@gmail.com","commits":9}]},"filePathRelative":"guide/scheme.md"}');export{o as comp,u as data};