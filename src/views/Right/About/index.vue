<script setup>
defineOptions({
  name: 'AboutPage'
})

import Toast from '@/components/index'
let count = 896
//一行32
const countNum = (e) => {
  //排除重复
  if (e.target.classList.contains('boxActive')) return

  e.target.classList.add('boxActive')
  const num = Math.random() * 3
  e.target.style.animationDuration = 1 + num + 's'

  // // 监听动画结束事件
  e.target.addEventListener(
    'animationend',
    () => {
      e.target.classList.remove('boxActive')
      e.target.style.visibility = 'hidden'
    },
    { once: true }
  )

  count--
  if (count === 0) Toast('你怎么这么无聊。')
}
</script>

<template>
  <div class="container_about">
    <div class="info">
      <h1>关于</h1>
      <span>@author ： 小江子</span>
      <span>@shool ： 湖北经济学院</span>
    </div>

    <main>
      <div
        class="box"
        v-for="item in 896"
        :key="item"
        @mouseenter="countNum"
      ></div>
    </main>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.container_about {
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}
main {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  box-sizing: border-box;
  position: absolute;
  top: 5px;
  left: 0px;
}
.info {
  color: #ffffff;
  span {
    display: block;
    margin-top: 10px;
  }
}
h1 {
  color: #fff;
  font-size: 30px;
  font-weight: 400;
}
.box {
  width: 30px;
  height: 30px;
  background-color: #2e2d2d;
  border: 1px solid #000;
}
.boxActive {
  background-color: #0f0;
  border: none;
  box-shadow:
    0 0 10px #0f05,
    0 0 10px #0f05,
    0 0 10px #0f05;
  /* 动画 */
  animation: drop 0.5s linear forwards;
}

@keyframes drop {
  from {
    transform: translateY(0px) rotate(0deg);
  }
  to {
    transform: translateY(80vh) rotate(360deg);
  }
}
</style>
