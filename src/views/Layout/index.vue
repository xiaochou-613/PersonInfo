<script setup>
import left_list from '../Left/index.vue'
import { ref, onMounted } from 'vue'
import anime from 'animejs'

const content = ref(null)
onMounted(() => {
  const time = setTimeout(() => {
    anime({
      targets: content.value,
      height: ['0px', '100%'],
      duration: 300,
      complete: () => {
        clearTimeout(time)
      }
    })
  }, 500)
})
</script>

<template>
  <div class="container" ref="content">
    <div class="vector">
      <div class="left">
        <left_list></left_list>
        <img class="nv" src="@/image/坐姿女.png" alt="" />
      </div>
      <div class="right">
        <RouterView></RouterView>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 2122px;
  height: 0px;
  transition: 0.6s ease-out;
  overflow: hidden;

  .vector {
    width: 1200px;
    height: 850px;
    margin: auto;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    transition: 0.4s linear;
    border-radius: 25px;
    .left {
      width: 20%;
      height: 850px;
      background-color: rgb(58, 58, 58);
      float: left;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
      .nv {
        width: 229px;
        height: 358px;
        position: relative;
        top: -308px;
        left: -156px;
        margin-bottom: -308px; //消除底部的空白
      }
    }
    .right {
      width: 80%;
      height: 850px;
      float: right;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
      overflow: auto;
    }
  }
}
::-webkit-scrollbar {
  //隐藏滚动条
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>
