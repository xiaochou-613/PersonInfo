<script setup>
import { computed } from 'vue'
defineOptions({
  name: 'choose-weather'
})
const props = defineProps({
  date: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  weather: {
    type: Number,
    required: true
  }
})
const weatherImg = computed(() => {
  if (props.weather === 1) {
    return 'src/image/sun.png'
  } else if (props.weather === 2) {
    return 'src/image/cloud.png'
  } else if (props.weather === 3) {
    return 'src/image/rain.png'
  } else if (props.weather === 0) {
    return 'src/image/snow.png'
  } else {
    return ''
  }
})
</script>

<template>
  <div class="code-box">
    <h3 class="code-title">{{ date }}</h3>
    <p class="code-content">{{ content }}</p>
    <img :src="weatherImg" draggable="false" />
  </div>
</template>

<style scoped>
.code-box {
  user-select: none;
  width: 400px;
  height: 80px;
  border-radius: 20px;
  background-color: #313131;
  padding: 10px;
  color: white;
  margin-top: 20px;
  &:last-child {
    margin-bottom: 20px;
  }

  .code-title {
    font-size: 18px;
    width: 120px;
    height: 30px;
    margin-top: 5px;
    margin-left: 5px;
    float: left;
    user-select: none;
  }
  .code-content {
    font-size: 14px;
    margin-left: 5px;
    width: 300px;
    height: 30px;
    float: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
  }
  img {
    width: 60px;
    height: 60px;
    user-select: none;
  }
}
</style>
