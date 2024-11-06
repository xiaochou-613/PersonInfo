<script setup>
defineOptions({
  name: 'chooseWeather'
})
import { ref } from 'vue'

const weather = ref(null)
let clickCount = ref(1)
const switchWeather = () => {
  weather.value.style.transform = `translateX(${-60 * clickCount.value}px)`
  clickCount.value++
  if (clickCount.value === 4) {
    clickCount.value = 0
  }
}

//暴露给父组件
defineExpose({ clickCount })
</script>

<template>
  <div class="Weathercontainer" @click="switchWeather">
    <div ref="weather" class="weather">
      <img src="@/image/sun.png" title="晴天" />
      <img src="@/image/cloud.png" title="阴天" />
      <img src="@/image/rain.png" title="雨天" />
      <img src="@/image/snow.png" title="下雪" />
    </div>
  </div>
</template>

<style scoped>
.Weathercontainer {
  width: 60px;
  height: 60px;
  overflow-x: hidden;
}
.weather {
  width: 60px;
  height: 60px;
  display: flex;
  transition: all 0.3s ease-in-out;
}
</style>
