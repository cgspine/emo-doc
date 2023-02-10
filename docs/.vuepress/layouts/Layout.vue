<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
</script>

<template>
  <ParentLayout>
    <template #page-content-bottom>
      <div class="developer-container">
        <div class="developer-item developer-item-mp">
            <img src="/images/mp.jpg" alt="古哥E下"/>
            <div class="developer-item-desc">关注公众号，入群聊聊~</div>
        </div>
        <div class="developer-item developer-item-reward">
            <img src="/images/reward.jpg" alt="给个赞赏"/>
        </div>
      </div>
      
    </template>
  </ParentLayout>
</template>

<style lang="css">
.developer-container {
  overflow: hidden;
}
.developer-item{
    padding: 20px 20px 0;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    align-items: center;
}
@media screen and (min-width: 600px) {
  .developer-container{
    display:flex;
    flex-direction: row;
    align-items: center;
  }
  .developer-item-mp{
      width: 50%;
  }
  .developer-item-reward{
      width: 30%;
  }
}

.developer-item-desc{
    margin-top:12px;
    font-size:1.2em;
}
</style>