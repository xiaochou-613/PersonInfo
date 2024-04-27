<script setup>
import { ref, onMounted } from 'vue'
import { useAudioStore } from '@/store/audio'
const audioStore = useAudioStore()

//拿到容器高度
const contRef = ref(null)
onMounted(() => {
  window.contRef = contRef.value
  window.lyricUlHeight = contRef.value.clientHeight
  window.lyricLiHeight = contRef.value.children[0].children[0].clientHeight
})
</script>

<template>
  <div class="main">
    <div class="name">
      {{ audioStore.lyricName() }}
    </div>
    <div ref="contRef" class="content">
      <ul>
        <li
          v-for="(item, index) in audioStore.lyric"
          :key="index"
          :class="{ active: index === audioStore.lyricIndex }"
        >
          {{ item.word }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 1500px) {
  * {
    margin: 0;
    padding: 0;
  }
  .main {
    text-align: center;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .content {
    width: 100%;
    height: 500px;
    /* border: 1px solid white; */
    overflow: hidden;
  }
  .content ul {
    transition: 0.6s;
  }
  audio {
    width: 440px;
    margin: 30px;
  }
  li {
    list-style: none;
    transition: 0.6s;
    height: 43px;
    /* border: 1px solid white; */
    line-height: 30px;
    color: #555;
    font-size: x-large;
  }
  .active {
    transform: scale(1.3);
    /* 使用transform不会引发reflow */
    color: rgb(255, 134, 54);
  }
  .name {
    margin-top: 100px;
    margin-bottom: 32px;
    font-size: xx-large;
  }
  .lyric_col {
    margin-top: 143px;
  }
}

@media screen and (max-width: 1500px) {
  @import '@/mobileCSS/lyric';
}
</style>
