<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAudioStore } from '@/store/audio.js'
import anhao from '@/music/暗号.mp3'
import qilixiang from '@/music/七里香.mp3'

const audioRef = ref(null)
const audioStore = useAudioStore()

const music = ref()
onMounted(() => {
  audioStore.audio = audioRef.value
})

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
  <!-- 放在这里解决路由跳转刷新的问题 -->
  <audio
    ref="audioRef"
    @canplay="canplay"
    @timeupdate="audioStore.timeChange"
    :src="music"
  >
    <!-- <source :src="audioStore.audioPath" /> -->
  </audio>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped>
a {
  padding: 20px;
}

.fade-enter-from,
.fade-leave-to {
  /* 定义进入开始和离开结束的透明度为 0 */
  opacity: 0;
}

.fade-leave-to {
  transform: translatex(20px);
}

.fade-enter-to {
  transform: translatex(-20px);
}

.fade-enter-to,
.fade-leave-from {
  /* 定义进入结束和离开开始的透明度为 1 */
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-enter-to {
  transform: translatey(0);
  opacity: 1;
  transition: all 0.3s ease-out 0.2s;
}
</style>
