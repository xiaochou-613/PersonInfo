<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const content = ref()
content.value = [
  { title: '个人主页', color: 'rgb(107, 86, 115)', address: '/' },
  { title: '百度一下', color: 'rgb(162, 48, 18)', address: '/baidu' },
  { title: '我的计划', color: 'rgb(99, 127, 132)', address: '/plan' },
  { title: '播放音乐', color: 'rgb(0, 207, 162)', address: '/music' },
  { title: '导航', color: 'rgb(120, 207, 12)', address: '/nav' },
  { title: '设置', color: 'rgb(241, 54, 127)', address: '/set' }
]

//点击中的选项
const indexNum = ref(null)
const activing = (index) => {
  indexNum.value = index
  //跳转网页地址
  router.push(content.value[index]?.address)
}

//头像以及昵称的资源
const name = ref()
const image = ref()
image.value = localStorage.getItem('uploadedImage')
name.value = localStorage.getItem('PerosnInfo_name')
</script>

<template>
  <div class="left-list">
    <div class="option">
      <div class="person">
        <img v-if="image" :src="image" alt="头像" />
        <img v-else src="@/image/QQ.jpg" alt="头像" />
        <span v-if="name">{{ name }}</span>
        <span v-else>小江子 </span>
      </div>
      <v-btn
        variant="plain"
        class="search"
        height="50px"
        v-for="(item, index) in content"
        :key="index"
        @click="activing(index)"
        :class="{
          active:
            indexNum === index ||
            router.currentRoute.value.path === item.address
        }"
        :style="{ color: indexNum === index && item.color }"
        ><span>{{ item.title }}</span>
      </v-btn>
    </div>
  </div>
</template>

<style>
.left-list {
  width: 240px;
  height: 100%;
  .option {
    width: 100%;
    height: 40px;
  }
  .person {
    display: flex;
    align-items: center; /* 垂直居中 */
    height: 100px; /* 容器的高度 */

    img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      margin: 20px 20px 20px 50px;
    }
    span {
      color: white;
      font-size: 20px;
      font-family: serif;
      margin-left: 10px;
      font-weight: bold;
    }
  }

  .search {
    /* background-color: rgb(182, 54, 24); */
    background-color: rgb(58, 58, 58);
    color: white;
    width: 100%;
    height: 60px;
    /* display: flex;
    justify-content: center;
    align-items: center;  */
    user-select: none;
    opacity: 1;
    transition: 0.3s;
    border-radius: 10px;
  }
}
.search:hover {
  transform: scale(1.2);
  /* background-color: rgb(182, 54, 24); */
}
.active {
  transform: scale(1.2);
  /* background-color: rgb(182, 54, 24); */
}
</style>
