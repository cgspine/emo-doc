import { defineClientConfig } from '@vuepress/client'
import { onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'


 function submit(waitMills) {
    setTimeout(() => {
        push();
    }, waitMills);
  }
  

  function push() {
    if(!window){
        return;
    }
    const host = window.location.host;
    if ((host.indexOf("127.0.0.1") != -1 || host.indexOf("localhost") != -1)) {
        return;
    }

    const id = 'baidu-statistic';
    var element = document.getElementById(id);
    if (element) {
        element.remove();
    }

    window._hmt = window._hmt || [];
    const hm = document.createElement('script');
    hm.id = id;
    hm.src = 'https://hm.baidu.com/hm.js?b68859d3c37042c375d1aa517e07a18d';
    const s = document.getElementsByTagName('script')[0];
    if (s.parentNode) {
      s.parentNode.insertBefore(hm, s);
      window._hmt.push(['_trackPageview', window.location.href]);
    }
}

export default defineClientConfig({
    setup: () => {
        onMounted(()=> {
            submit(1000);
            const router = useRouter();
            router.afterEach((to, from) => {
                var toPath = to.path;
                var fromPath = from.path;
                if (toPath != fromPath) {
                    submit(500);
                }
            });
        })
    }
  })