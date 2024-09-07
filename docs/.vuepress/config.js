import { defineUserConfig } from 'vuepress'
import { getDirname, path } from '@vuepress/utils'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'zh-CN',
  title: 'emo',
  description: '一个现代化 Android 开发组件库',
  notFound: [
    '这里什么都没有',
    '这是一个 404 页面'
  ],
  backToHome: '返回首页',
  plugins: [
    nprogressPlugin(),
    ()=>{
      return {
        name: 'baidu-statistic',
        clientConfigFile: path.resolve(__dirname, './client/baidu-statistic.js'),
      }
    }
  ],
  head: [
        [
            'link', 
            { 
                rel: 'icon', 
                type: 'image/png',
                sizes: '16x16',
                href: '/images/favicon-16x16.png' 
            }
        ],
        [
            'link', 
            { 
                rel: 'icon', 
                type: 'image/png',
                sizes: '32x32',
                href: '/images/favicon-32x32.png' 
            }
        ]
    ],
  theme: defaultTheme({
    repo: 'cgspine/emo-public',
    docsRepo: 'cgspine/emo-doc',
    docsBranch: 'master',
    docsDir: 'docs',
    logo: '/images/logo.png',
    navbar: [
      {
        text: '使用指南',
        link: '/guide',
      },
      {
        text: 'Demo下载',
        link: '/apks/emo.apk',
        target: '_blank',
      },
      {
        text: 'emo-ai',
        link: '/ai/dashboard/portal',
        target: '_blank',
      },
    ],
    sidebar: {
      '/guide/': [
          {
            text: '使用指南',
            children: [
              '/guide/README.md',
              '/guide/getting-started.md',
              '/guide/core.md',
              '/guide/network.md',
              '/guide/device.md',
              '/guide/modal.md',
              '/guide/permission.md',
              '/guide/config.md',
              '/guide/photo.md',
              '/guide/report.md',
              '/guide/js-bridge.md',
              '/guide/scheme.md',
              '/guide/kv.md',
  
          ],
        }
      ]
    }
  }),
})