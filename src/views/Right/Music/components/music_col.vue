<script setup>
import { useAudioStore } from '@/store/audio.js'
const audioStore = useAudioStore()

defineProps({
  address: String
})
</script>

<template>
  <!-- 控制台 -->
  <div class="control">
    <div class="col_left">
      <span style="margin-right: 10px" v-if="audioStore.lyricName()">{{
        audioStore.lyricName().replace(' - 周杰伦', '')
      }}</span>
      <!-- <p>周杰伦</p> -->
      <v-icon color="red-lighten-1" icon="mdi-heart" size="large"></v-icon>
      <div class="startTime">
        {{ audioStore.currentTime === 0 ? '0:00' : audioStore.currentTime }}
      </div>
    </div>
    <div class="col_center">
      <div class="col_btn">
        <v-icon icon="mdi-skip-previous-circle" size="x-large"></v-icon>
        <v-btn
          variant="tonal"
          rounded="xl"
          class="pause"
          color="rgb(231, 195, 171)"
          @click="audioStore.transState"
        >
          <v-icon
            v-if="!audioStore.audio?.paused"
            icon="mdi-pause"
            size="x-large"
          ></v-icon>
          <v-icon v-else icon="mdi-play" size="x-large"></v-icon>
        </v-btn>
        <v-icon icon="mdi-skip-next-circle" size="x-large"> </v-icon>
      </div>
      <!-- 进度条 -->
      <div class="linear">
        <v-progress-linear
          v-model="audioStore.schedule"
          color="rgb(231, 195, 171)"
          bg-color="red"
        ></v-progress-linear>
      </div>
    </div>
    <div class="col_right">
      <div class="endTime">
        {{ audioStore.totalTime === 0 ? '0:00' : audioStore.totalTime }}
      </div>
      <span
        v-if="audioStore.lyric.length"
        class="iconfont icon-geci lyric"
        @click="$router.push(address)"
      ></span>
      <v-icon icon="mdi-text"></v-icon>
    </div>
  </div>
</template>

<style>
.control {
  width: 100%;
  height: 91px;
  display: flex;
  align-items: center;
  justify-content: center;
  .col_left {
    float: left;
    width: 20%;
    max-height: 91px;
    margin-left: 70px;
    .startTime {
      float: right;
      position: relative;
      top: 26px;
      opacity: 0.6;
      left: -8px;
    }
  }
  .col_center {
    float: left;
    width: 60%;
    max-height: 91px;
    /* padding-top: 10px; */
    text-align: center;
    .col_btn {
      .pause {
        margin: 0px 20px;
      }
    }
    .linear {
      margin-top: 10px;
    }
  }
  .col_right {
    float: left;
    width: 20%;
    height: 91px;
    display: flex;
    justify-content: right;
    align-items: center;
    margin-right: 70px;
    .lyric {
      font-size: 30px;
      color: rgb(219, 124, 60);
      margin-right: 10px;
    }
    .endTime {
      float: left;
      position: relative;
      top: 24px;
      left: -62px;
      opacity: 0.6;
    }
  }
}
</style>
