<script setup>
import left_list from '../Left/index.vue'
import { ref, onMounted, watch, inject } from 'vue'
import { useAudioStore } from '@/store/audio.js'
import anhao from '@/music/暗号.mp3'
import qilixiang from '@/music/七里香.mp3'
import anime from 'animejs'
//用户信息
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
userStore.getUserInfo()

//开场动画
const content = ref(null)
onMounted(() => {
  audioStore.audio = audioRef.value
})
const isPC = inject('device')
watch(
  isPC,
  () => {
    const time = setTimeout(() => {
      anime({
        targets: content.value,
        height: ['0px', '100vh'],
        duration: 300,
        complete: () => {
          clearTimeout(time)
        }
      })
    }, 300)
  },
  { immediate: true }
)

//音乐持久化
const audioRef = ref(null)
const audioStore = useAudioStore()
const music = ref()
const canplay = () => {
  audioStore.totalTime = audioStore.formatTime(audioRef.value.duration)
  audioRef.value.play()
}
watch(
  () => audioStore.audioPath,
  () => {
    if (audioStore.audioPath === '暗号.mp3') music.value = anhao
    else if (audioStore.audioPath === '七里香.mp3') music.value = qilixiang
  }
)
</script>

<template>
  <!-- 放在这里解决路由跳转刷新的问题，又能解决跳转路由暂停的问题 -->
  <audio
    ref="audioRef"
    @canplay="canplay"
    @timeupdate="audioStore.timeChange"
    :src="music"
  >
    <!-- <source :src="audioStore.audioPath" /> -->
  </audio>

  <!-- pc -->
  <div class="PC-container" ref="content" v-if="isPC">
    <div class="vector">
      <div class="left">
        <left_list></left_list>
        <img class="nv" src="@/image/坐姿女.png" alt="" />
      </div>
      <div class="right">
        <router-view v-slot="{ Component }">
          <keep-alive include="AboutPage">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>

  <!-- mobile -->
  <div class="MO-container" ref="content" v-else>
    <div class="MO-vector">
      <div class="MO-info">
        <!-- <img v-if="userStore.user[0]" :src="userStore.user[0]?.image" alt="" />
        <span>{{ userStore.user[0]?.name }}</span> -->
        <img src="@/image/QQ.jpg" alt="" />
        <span>小江子</span>
      </div>
      <div class="MO-main">
        <router-view v-slot="{ Component }">
          <keep-alive include="AboutPage">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
      <left_list></left_list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 1500px) {
  .PC-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100vw;
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
          margin-bottom: -308px;
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
}
@media screen and (max-width: 1500px) {
  @import '@/mobileCSS/layout';
}
</style>
