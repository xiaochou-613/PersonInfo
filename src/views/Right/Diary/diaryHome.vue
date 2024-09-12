<script setup>
import chooesDiary from './components/choose.vue'
import { ref } from 'vue'
import { getDiary } from '@/apis/diary'

//获取日记
const diaryList = ref([])
const getDiaryList = async () => {
  const res = await getDiary()
  diaryList.value = res.data
  diaryList.value.forEach((item) => {
    item.date = item.date.substring(0, 10)
  })
}
setTimeout(() => {
  getDiaryList()
}, 1000)

const index = ref(0)
const image = ref('src/image/sun.png')
const switchDiary = (i) => {
  index.value = i
  switch (diaryList.value[i].weather) {
    case 0:
      image.value = 'src/image/snow.png'
      break
    case 1:
      image.value = 'src/image/sun.png'
      break
    case 2:
      image.value = 'src/image/cloud.png'
      break
    case 3:
      image.value = 'src/image/rain.png'
      break
    default:
      image.value = 'src/image/sun.png'
      break
  }
}
</script>

<template>
  <div class="home-container">
    <div class="diary-title">📕日记</div>
    <p>记录一下今日的所思所想，所见所闻。。</p>
    <div class="line"></div>

    <div class="content">
      <div class="chooesDiary">
        <chooesDiary
          v-for="(item, index) in diaryList"
          :key="index"
          :date="item.date"
          :content="item.content"
          :weather="item.weather"
          @click="switchDiary(index)"
        ></chooesDiary>
      </div>
      <div class="showDiary">
        <div class="contentBox">
          <h3>{{ diaryList[index]?.date || '日期' }}</h3>
          <img :src="image" draggable="false" />
          <span>{{ diaryList[index]?.content || '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  opacity: 0;
  position: relative;
  animation: fade-in 2s linear forwards;

  .diary-title {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 10px;
    position: absolute;
    top: 50px;
    left: 50px;
  }
  p {
    font-size: 14px;
    position: absolute;
    top: 100px;
    left: 55px;
  }
  .line {
    width: 100%;
    height: 2px;
    background-color: black;
    position: absolute;
    top: 140px;
    left: 0;
  }
  .content {
    width: 100%;
    height: 80%;
    position: absolute;
    top: 140px;
    left: 0;
    .chooesDiary {
      padding-top: 20px;
      width: 50%;
      height: 100%;
      float: left;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .showDiary {
      width: 50%;
      height: 100%;
      float: right;
      display: flex;
      justify-content: center;
      align-items: center;

      .contentBox {
        width: 400px;
        height: 600px;
        border-radius: 20px;
        position: relative;
        padding: 20px;
        // background-color: #313131;
        box-shadow: 1px 7px 20px 9px rgba(0, 0, 0, 0.2);
        animation: fade-in 2s linear forwards;

        h3 {
          font-size: 24px;
          position: absolute;
          top: 40px;
          left: 40px;
        }
        span {
          position: absolute;
          top: 100px;
          left: 20px;
          border-bottom: 1px dashed #6b6969;
        }
        img {
          position: absolute;
          right: 10px;
          bottom: 10px;
          opacity: 0.5;
        }
      }
    }
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
