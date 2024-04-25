<script setup>
import Music_col from './music_col.vue'
import { useAudioStore } from '@/store/audio.js'
import { inject } from 'vue'
const audioStore = useAudioStore()
const isPC = inject('device')
//使用onMounted会找不到audio,可能是父子不能使用两个onmounted吧。

//获取音乐信息
audioStore.getMusic()
</script>

<template>
  <!-- pc -->
  <div class="music_content" v-if="isPC">
    <img v-for="item in 3" :key="item" src="@/image/帘.png" alt="" />
    <div class="love">
      <img src="@/image/猜你喜欢.png" alt="" />
      <div class="guess">
        <h2>猜你喜欢</h2>
        <p>听好音乐,赢美好人生.</p>
        <v-btn
          rounded="xl"
          style="margin-right: 20px"
          prepend-icon="mdi-play"
          @click="audioStore.play(1)"
          >播放</v-btn
        >
        <v-btn rounded="xl" style="margin-right: 20px" prepend-icon="mdi-heart"
          >收藏</v-btn
        >
        <v-btn size="small" icon="mdi-arrow-expand-all"></v-btn>
        <hr class="wrap" />
      </div>
    </div>
    <div class="music_list">
      <v-table height="460px" fixed-header>
        <!-- 固定表头失效了，未知原因 -->
        <thead>
          <tr>
            <th class="text-left">歌名</th>
            <th class="text-left">歌手</th>
            <th class="text-left">时长</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in audioStore.musicInfo"
            :key="index"
            :class="{ newcolor: index % 2 === 0 }"
            @click="audioStore.play(index + 1)"
          >
            <td>
              <div class="musicName">
                <img :src="item.image" alt="" />
                <span>{{ item.name }}</span>
              </div>
            </td>
            <td>{{ item.singer }}</td>
            <td>{{ audioStore.formatTime(item.time) }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <!-- 控制台 -->
    <Music_col address="/music/lyric"></Music_col>
  </div>

  <!-- mobile -->
  <div class="music">
    <header>
      <img src="@/image/猜你喜欢.png" alt="" />
      <h3>猜你喜欢</h3>
      <p>听好音乐,赢美好人生。</p>
    </header>
    <main>
      <div
        v-for="(item, index) in audioStore.musicInfo"
        :key="index"
        @click="audioStore.play(index + 1)"
      >
        <img :src="item.image" alt="" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.singer }}</p>
      </div>
    </main>
    <footer>
      <Music_col address="/music/lyric"></Music_col>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 1500px) {
  .newcolor {
    background-color: rgb(211 183 172 / 16%);
  }
  .music_content {
    img {
      width: 313px;
      height: 160px;
    }
    .love {
      img {
        float: left;
        width: 100px;
        height: 100px;
        margin-left: 80px;
        margin-right: 40px;
        border-radius: 5px;
      }
      .guess {
        p {
          margin: 5px 0px;
        }
        .wrap {
          margin-top: 20px;
          border: 1px solid rgb(231, 195, 171);
        }
      }
    }
  }
  .music_list {
    .musicName {
      display: flex;
      align-items: center;
      tr {
        background-color: aqua;
      }
      img {
        width: 48px;
        height: 48px;
      }
      span {
        margin-left: 7px;
      }
    }
  }
  table {
    overflow: hidden;
    box-sizing: border-box;
  }
  tbody {
    tr {
      transition: all 0.2s ease-in-out;
    }
    tr:hover {
      transform: scaleX(1.03);
    }
  }
}

@media screen and (max-width: 1500px) {
  @import '@/mobileCSS/music';
}
</style>
