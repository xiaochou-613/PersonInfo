<script setup>
import navCard from './component/navCard.vue'
import { navData } from './index'
</script>

<template>
  <img src="@/image/剑仙问情.png" class="head_image" draggable="false" />
  <div class="nav_cycontent" v-for="(item, index) in navData" :key="index">
    <h3>---&nbsp;&nbsp;{{ item.title }}&nbsp;&nbsp; ---</h3>
    <navCard
      class="navcard"
      v-for="(i, indexNum) in item.webList"
      :key="indexNum"
      :webInfo="i"
      :color="item.color"
      :tag="i.tag"
    ></navCard>
  </div>
</template>

<style scoped>
*,
body {
  margin: 0px;
  padding: 0px;
}
.head_image {
  width: 100%;
}
.nav_cycontent {
  padding-top: 50px;
  float: left;
  width: 100%;
  /* height: 100%; */
  background-color: rgb(247, 249, 254);

  h3 {
    text-align: center;
    margin-bottom: 40px;
  }
  .navcard {
    float: left;
    margin-left: 25px;
    margin-top: 10px;
    margin-bottom: 8px;
  }
}
</style>
