<script setup>
import { ref } from 'vue'
import weather from './components/weather.vue'

const diary = ref({})
const pageShow = ref(true)
const container = ref(null)

const start = () => {
  pageShow.value = false //不显示在页面

  container.value.children[0].classList.add('fill')
  container.value.children[0].children[5].classList.add('fill')

  diary.value.style.animationPlayState = 'running'
  diary.value.children[0].style.animationPlayState = 'running'
  diary.value.children[1].style.animationPlayState = 'running'
}
</script>

<template>
  <div class="container" ref="container">
    <ul>
      <li v-if="pageShow" class="page1">
        <img draggable="false" src="@/image/封面.jpg" alt="" />
      </li>
      <li v-if="pageShow" class="page2">
        <img draggable="false" src="@/image/page.png" alt="" />
      </li>
      <li v-if="pageShow" class="page3">
        <img draggable="false" src="@/image/page.png" alt="" />
      </li>
      <li v-if="pageShow" class="page4">
        <img draggable="false" src="@/image/page.png" alt="" />
      </li>
      <li v-if="pageShow" class="page5">
        <img draggable="false" src="@/image/page.png" alt="" />
      </li>

      <li>
        <!-- 存放小型的雏形 -->
        <div class="diary-container" ref="diary">
          <div class="diary-title">📕日记</div>
          <p>记录一下今日的所思所想，所见所闻。。</p>
          <div v-if="pageShow">
            <div class="diary-date">2024/09/06</div>
            <div class="diary-content">&nbsp;&nbsp;请记录今日的日记~</div>
            <div class="diary-content" v-for="i in 7" :key="i">&nbsp;</div>
            <button @click="start" class="btn1">点击记录 ></button>
          </div>

          <!-- 编辑状态 -->
          <div v-else class="editState">
            <button class="btn2">完成</button>
            <div class="br"></div>
            <h4>2024/09/09</h4>
            <weather class="weatherDiv"></weather>
            <div class="input-container">
              <div class="lineBox">
                <p class="line" v-for="i in 15" :key="i">&nbsp;</p>
              </div>

              <textarea
                class="input"
                autofocus
                placeholder="在这里写下你的笔记..."
                maxlength="800"
                rows="15"
              ></textarea>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
body {
  font-family: Arial, sans-serif;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(174, 214, 209);
}
ul {
  width: 225px;
  height: 320px;
  list-style: none;
  transform-style: preserve-3d;
  perspective: 900px;
  transition: all 1.5s;
  position: relative;

  &:hover:not(.fill) {
    transform: translateX(100px);
    transition: 1s;
  }

  li {
    width: 225px;
    height: 323px;
    transition: all 1s;
    transform-origin: left;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 225px;
      height: 323px;
    }
  }
}

.page1 {
  transform: rotateY(-24deg);
  transition: 2s;
}
.page2 {
  transform: rotateY(-23deg);
  transition: 1.7s;
}
.page3 {
  transform: rotateY(-21deg);
  transition: 1.4s;
}
.page4 {
  transform: rotateY(-19deg);
  transition: 1.1s;
}
.page5 {
  transform: rotateY(-17deg);
  transition: 0.8s;
}

ul:hover .page1 {
  transform: rotateY(-180deg);
  transition: 1.4s;
}
ul:hover .page2 {
  transform: rotateY(-175deg);
  transition: 2s;
}
ul:hover .page3 {
  transform: rotateY(-170deg);
  transition: 2.6s;
}
ul:hover .page4 {
  transform: rotateY(-165deg);
  transition: 3.2s;
}
ul:hover .page5 {
  transform: rotateY(-160deg);
  transition: 3.8s;
}

.diary-container {
  width: 225px;
  height: 323px;
  background-color: white;
  padding: 20px;
  transition: all 5s;
  // position: absolute;
  animation: expand 0.5s ease-in-out forwards;
  animation-play-state: paused;

  .diary-title {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 10px;

    animation: titleMove 1.5s ease-in-out forwards;
    animation-play-state: paused;
  }

  p {
    font-size: 11px;

    animation: smallTitleMove 1.5s ease-in-out forwards;
    animation-play-state: paused;
  }

  .diary-date {
    font-size: 12px;
    text-align: left;
    margin-top: 10px;
    border-bottom: 1px dashed #ccc;
  }

  .diary-content {
    font-size: 13px;
    color: #ccc;
    border-bottom: 1px dashed currentColor;
  }
  .btn1 {
    margin: 8px 0 0 97px;
    color: rgb(174, 214, 209);
    transition: all 0.3s;
    &:hover {
      color: turquoise;
      transform: scale(0.8);
    }
  }
}

.fill {
  width: 100%;
  height: 100%;
}
.editState {
  width: 100%;
  height: 100%;
  overflow: hidden;
  h4 {
    position: absolute;
    top: 200px;
    left: 45px;
  }
  .btn2 {
    width: 70px;
    height: 30px;
    position: absolute;
    left: 800px;
    top: 85px;
    border: none;
    background-color: rgb(201, 139, 63);
    color: white;
    border-radius: 14px;
    transition: all 0.3s;

    &:active {
      transform: scale(0.8);
    }
  }
}

.br {
  width: 100%;
  height: 2px;
  background-color: black;
  position: absolute;
  top: 140px;
  left: 0;
}
.weatherDiv {
  position: absolute;
  top: 164px;
  left: 800px;
}
.input-container {
  width: 90%;
  height: 71%;
  position: absolute;
  top: 221px;
  left: 45px;
  .lineBox {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    .line {
      display: block;
      width: 100%;
      height: 40px;
      border-bottom: #979595 dashed 1.5px;
    }
  }
}
.input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  line-height: 40px;
  background-color: transparent;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  white-space: pre-wrap; /* Preserve whitespace and line breaks */
  position: absolute;
  z-index: 999;
}

/* 容器的放大动画 */
@keyframes expand {
  to {
    width: 100%;
    height: 100%;
  }
}

/* 标题的移动动画 */
@keyframes titleMove {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    position: absolute;
    top: 50px;
    left: 50px;
    font-size: 30px;
  }
}
//描述说明的移动动画
@keyframes smallTitleMove {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    position: absolute;
    top: 100px;
    left: 55px;
    font-size: 14px;
  }
}
</style>
