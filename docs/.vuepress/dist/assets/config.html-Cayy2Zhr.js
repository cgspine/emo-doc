import{_ as s,c as a,a as e,o as p}from"./app-CTIoDS1N.js";const t="/images/config-panel.jpg",l={};function i(o,n){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="配置读取与存储" tabindex="-1"><a class="header-anchor" href="#配置读取与存储"><span>配置读取与存储</span></a></h1><p>每一个 app 的运行，都离不开各种各样的配置，有的配置通过后台下发，有的配置则是开发者的彩蛋，那么如何存储这些配置？如何减少因为配置而需要写的各种模板代码？<code>emo</code> 通过注解配合 <code>ksp</code> 的代码生成，为开发者提供了一套便利的方式。</p><h2 id="依赖引入" tabindex="-1"><a class="header-anchor" href="#依赖引入"><span>依赖引入</span></a></h2><div class="language-kts line-numbers-mode" data-highlighter="prismjs" data-ext="kts" data-title="kts"><pre><code><span class="line"><span class="token comment">// 默认提供了 mmkv 的存储实现</span></span>
<span class="line"><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:config-mmkv&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 可选：如果想自定义存储实现，则需引入 config-runtime 库</span></span>
<span class="line"><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:config-runtime&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 可选：可是化的配置面板，可以引入和作为彩蛋供开发、产品、测试使用</span></span>
<span class="line"><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:config-panel&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 需要引入 ksp plugin.</span></span>
<span class="line"><span class="token function">ksp</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:config-ksp:0.14.0&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><h3 id="定义配置" tabindex="-1"><a class="header-anchor" href="#定义配置"><span>定义配置</span></a></h3><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"></span>
<span class="line"><span class="token annotation builtin">@ConfigBasic</span><span class="token punctuation">(</span></span>
<span class="line">    category <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;分类&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">    name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;config_test&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">    humanName <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;测试配置&quot;</span></span><span class="token punctuation">,</span> <span class="token comment">// 这个会被配置面板所使用</span></span>
<span class="line">    versionRelated <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否是版本相关</span></span>
<span class="line">    tags <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;test&quot;</span></span><span class="token punctuation">]</span> <span class="token comment">// 可以打标签</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation builtin">@ConfigWithIntValue</span><span class="token punctuation">(</span>default <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 默认值</span></span>
<span class="line"><span class="token keyword">sealed</span> <span class="token keyword">interface</span> ConfigTest</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开发者通过注解，可以配置很多元信息，包裹：</p><ol><li>分类，可用于配置面板，以及更多自定义场景</li><li>是否版本相关，这个用途主要是 app 升级版本后，配置项要不要恢复成默认值？</li><li>标签，各种自定义化场景，例如可以服务端下发指令，还原某个标签的全部配置为默认值。</li><li>配置的数据类型，目前有 <code>@ConfigWithIntValue</code>、<code>@ConfigWithBoolValue</code>、<code>@ConfigWithLongValue</code>、<code>@ConfigWithFloatValue</code>、<code>@ConfigWithDoubleValue</code>、<code>@ConfigWithStringValue</code> 六种类型</li><li>注解是添加在一个 <code>sealed</code> 类型的接口上，接口是可以添加方法，然后添加实现类的，具体可查看<a href="#%E6%8E%A5%E5%8F%A3%E5%A2%9E%E6%B7%BB%E5%AE%9E%E7%8E%B0%E7%B1%BB">接口增添实现类</a>。</li></ol><blockquote><p>注： 接口都必须使用 sealed，所以只能用于主工程，不支持多模块。</p></blockquote><h3 id="实例化-configcenter" tabindex="-1"><a class="header-anchor" href="#实例化-configcenter"><span>实例化 <code>ConfigCenter</code></span></a></h3><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">val</span> configCenter <span class="token keyword">by</span> lazy <span class="token punctuation">{</span></span>
<span class="line">   <span class="token function">configCenterWithMMKV</span><span class="token punctuation">(</span>BuildConfig<span class="token punctuation">.</span>VERSION_CODE<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>configCenterWithMMKV</code> 的完整定义为：</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">fun</span> <span class="token function">configCenterWithMMKV</span><span class="token punctuation">(</span></span>
<span class="line">   version<span class="token operator">:</span> Int<span class="token punctuation">,</span> <span class="token comment">// 版本</span></span>
<span class="line">   name<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;emo-cfg-mmkv&quot;</span></span><span class="token punctuation">,</span> <span class="token comment">// mmkv id</span></span>
<span class="line">   prodMode<span class="token operator">:</span> Boolean <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否是非 debug 模式</span></span>
<span class="line">   multiProcess<span class="token operator">:</span> Boolean <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// mmkv 多进程安全</span></span>
<span class="line">   autoClearUp<span class="token operator">:</span> Boolean <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// 自动清理不被注解控制且非当前版本的配置项</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置的读写" tabindex="-1"><a class="header-anchor" href="#配置的读写"><span>配置的读写</span></a></h3><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token comment">// 通过 concreteInt 具体化到 int 类型</span></span>
<span class="line"><span class="token keyword">val</span> action <span class="token operator">=</span> configCenter<span class="token punctuation">.</span>actionOf<span class="token operator">&lt;</span>ConfigTest<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concreteInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 编译期间也会生成 actionOfConfigTest 方法，可以帮你做好这个类型的具体化</span></span>
<span class="line"><span class="token keyword">val</span> action <span class="token operator">=</span> configCenter<span class="token punctuation">.</span><span class="token function">actionOfConfigTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 读取</span></span>
<span class="line"><span class="token keyword">val</span> value <span class="token operator">=</span> action<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 写入</span></span>
<span class="line">action<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>xx<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 以 stateFlow 的形式监听配置的更改</span></span>
<span class="line">action<span class="token punctuation">.</span><span class="token function">stateFlowOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="接口增添实现类" tabindex="-1"><a class="header-anchor" href="#接口增添实现类"><span>接口增添实现类</span></a></h3><p>我们定义配置项，有时候我们是需要获取配置项的值，但更多场景是我们需要根据不同的配置做不同的事。</p><p>如果我们不做任何包装，那我们就是读取配置后，根据配置的值写一堆的 if else。</p><p>使用 <code>emo</code> 的本组件就不再有这个烦恼了，以获取请求域名为例：</p><ol><li>和之前一样，定义接口：</li></ol><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token annotation builtin">@ConfigBasic</span><span class="token punctuation">(</span></span>
<span class="line">   category <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;implementation&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">   name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;test_domain&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">   humanName <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;请求环境&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">   versionRelated <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation builtin">@ConfigWithIntValue</span><span class="token punctuation">(</span>default <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">sealed</span> <span class="token keyword">interface</span> ConfigHost <span class="token operator">:</span> ConfigImplDisplayable <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">fun</span> <span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同的是这里添加了 <code>getHost</code> 方法， <code>ConfigImplDisplayable</code> 主要用于配置面板的可视化，这里可以先不关注。</p><ol start="2"><li>增添各个子类</li></ol><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"></span>
<span class="line"><span class="token annotation builtin">@ConfigWithIntValue</span><span class="token punctuation">(</span>default <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">object</span> ConfigTestImplDisplayA <span class="token operator">:</span> ConfigHost <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span></span>
<span class="line">       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;现网环境&quot;</span></span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span></span>
<span class="line">       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;prod.qhplus.cn&quot;</span></span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token annotation builtin">@ConfigWithIntValue</span><span class="token punctuation">(</span>default <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">object</span> ConfigTestImplDisplayB <span class="token operator">:</span> ConfigHost <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span></span>
<span class="line">       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;开发环境&quot;</span></span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span></span>
<span class="line">       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;dev.qhplus.cn&quot;</span></span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token annotation builtin">@ConfigWithIntValue</span><span class="token punctuation">(</span>default <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">object</span> ConfigTestImplDisplayC <span class="token operator">:</span> ConfigHost <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span></span>
<span class="line">       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;测试环境&quot;</span></span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span></span>
<span class="line">       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;test.qhplus.cn&quot;</span></span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我给出了三个实现，分配通过 <code>ConfigWithIntValue</code> 配置了不同的值。</p><ol start="3"><li>通过 <code>ConfigCenter</code> 获取当前配置下的实现类</li></ol><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token comment">// 通过当前配置值获取实现类</span></span>
<span class="line"><span class="token keyword">val</span> configHost <span class="token operator">=</span> configCenter<span class="token punctuation">.</span>implOf<span class="token operator">&lt;</span>ConfigHost<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?:</span> <span class="token keyword">throw</span> <span class="token function">RuntimeException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;配置值没有实现类&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 调用接口方法</span></span>
<span class="line"><span class="token keyword">val</span> host <span class="token operator">=</span> configHost<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如此以来，就通过接口规避了各种各样的 if else.</p><h3 id="批量更新配置" tabindex="-1"><a class="header-anchor" href="#批量更新配置"><span>批量更新配置</span></a></h3><p>App 一般都会从后台拉取配置，拉取结果一般是 <code>json</code> 格式，所以 <code>emo</code> 以提供了批量插入的情况:</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line">config<span class="token punctuation">.</span><span class="token function">writeMap</span><span class="token punctuation">(</span></span>
<span class="line">    map <span class="token operator">=</span> xxx<span class="token punctuation">,</span></span>
<span class="line">    onConfigNotFind <span class="token operator">=</span> xxx<span class="token punctuation">,</span></span>
<span class="line">    onValueTypeNotMatch <span class="token operator">=</span> xxx</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>emo</code> 会默认处理一些数据类型的兼容问题：</p><ul><li>1/&quot;true&quot;/true 都能解析成 true; 0/&quot;false&quot;/false 都能解析成 fasle</li><li>int、long 的数据兼容</li><li>float、double 的数据兼容</li><li>字符串尝试解析成 number 类型</li></ul><p>如果内部无法兼容，就会通过 <code>onValueTypeNotMatch</code> 交给开发者来决定。</p><h3 id="使用-configpanel-可视化配置项" tabindex="-1"><a class="header-anchor" href="#使用-configpanel-可视化配置项"><span>使用 <code>ConfigPanel</code> 可视化配置项</span></a></h3><p><code>ConfigPanel</code> 是一个 <code>Composable</code> 函数，你可按需引入，例如以 <code>BottomSheet</code> 的形式引入：</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line">view<span class="token punctuation">.</span><span class="token function">emoBottomSheet</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">ConfigPanel</span><span class="token punctuation">(</span>configCenter<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>emo</code> 的 <code>Demo</code> 程序的显示结果为：</p><img width="280" alt="配置面板" src="`+t+'"><p>并且使用者可以根据名称搜索配置，然后修改。</p><p>特别留意请求环境一栏，因为配置接口继承了 <code>ConfigImplDisplayable</code>, 所以可以把配置项显示成实现类的设置，如果点击，直接切换到下一个实现类的配置，这样子也就能组织使用者输入配置支持外的值。</p>',42)]))}const u=s(l,[["render",i],["__file","config.html.vue"]]),r=JSON.parse('{"path":"/guide/config.html","title":"配置读取与存储","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"依赖引入","slug":"依赖引入","link":"#依赖引入","children":[]},{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[{"level":3,"title":"定义配置","slug":"定义配置","link":"#定义配置","children":[]},{"level":3,"title":"实例化 ConfigCenter","slug":"实例化-configcenter","link":"#实例化-configcenter","children":[]},{"level":3,"title":"配置的读写","slug":"配置的读写","link":"#配置的读写","children":[]},{"level":3,"title":"接口增添实现类","slug":"接口增添实现类","link":"#接口增添实现类","children":[]},{"level":3,"title":"批量更新配置","slug":"批量更新配置","link":"#批量更新配置","children":[]},{"level":3,"title":"使用 ConfigPanel 可视化配置项","slug":"使用-configpanel-可视化配置项","link":"#使用-configpanel-可视化配置项","children":[]}]}],"git":{"updatedTime":1709383116000,"contributors":[{"name":"cgspine","email":"cgspine@gmail.com","commits":10}]},"filePathRelative":"guide/config.md"}');export{u as comp,r as data};