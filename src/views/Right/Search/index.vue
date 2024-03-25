<script setup>
import SerachBox from './component/index.vue'
</script>

<template>
  <div class="search_content">
    <img src="@/image/logo.png" alt="" draggable="false" />
    <!-- <div class="inp"> -->
    <SerachBox></SerachBox>
    <!-- <input
        type="text"
        placeholder="你想知道什么？"
        v-model="SearchText"
        @keydown.enter="baidu"
      />
      <v-btn class="btn" variant="outlined" @click="baidu"> 瞅一眼 </v-btn> -->
    <!-- </div> -->
  </div>
  <img class="back" src="@/image/独角兽.png" alt="独角兽" />
</template>

<style scoped>
.search_content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 182px;
  width: 100%;
  height: 100%;
  background-color: rgb(248, 221, 218);
  img {
    float: left;
    width: 283px;
    height: 165px;
  }
}
.back {
  width: 628px;
  height: 850px;
  z-index: 99;
  position: absolute;
  bottom: 130px;
  margin-left: 742px;
}
.inp {
  input {
    /* position: relative;
    left: 100px;
    top: 354px; */
    width: 600px;
    height: 45px;
    border: 1px solid black;
    border-radius: 15px;
    padding-left: 80px;
  }
  .btn {
    width: 80px;
    height: 45px;
    border-radius: 15px;
    margin-left: -85px;
    background-color: #d74f4f;
    /* position: relative;
    left: 16px;
    top: 352px; */
  }
}
</style>
