import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'emo',
  description: '一个现代化 Android 开发组件库',
  notFound: [
    '这里什么都没有',
    '这是一个 404 页面'
  ],
  backToHome: '返回首页',
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
    repo: 'cgspine/emo',
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
              '/guide/modal.md',
              '/guide/permission.md',
              '/guide/config.md',
              '/guide/photo.md',
              '/guide/report.md',
              '/guide/js-bridge.md',
              '/guide/scheme.md',
              '/guide/exposure.md',
  
          ],
        }
      ]
    }
  }),
})