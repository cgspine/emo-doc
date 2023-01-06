<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
</script>

<template>
  <ParentLayout>
    <template #page-content-bottom>
      <div class="developer-container">
        <div class="developer-item developer-item-mp">
            <img src="/images/mp.jpg" alt="策码编腾"/>
            <div class="developer-item-desc">关注公众号，干货满满的~</div>
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
  display:flex;
  flex-direction: row;
  align-items: center;
}
.developer-item{
    padding: 20px 20px 0;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    align-items: center;
}
.developer-item-mp{
    width: 50%;
}
.developer-item-reward{
    width: 30%;
}
.developer-item-desc{
    margin-top:12px;
    font-size:1.3em;
}
</style>