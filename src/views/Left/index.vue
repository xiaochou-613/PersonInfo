<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
const router = useRouter()
const isPC = inject('device')
const content = ref()
content.value = [
  { title: '个人主页', color: 'rgb(248, 221, 218)', address: '/myPage' },
  { title: '百度一下', color: 'rgb(255, 117, 117)', address: '/' },
  { title: '我的计划', color: 'rgb(99, 127, 132)', address: '/plan' },
  { title: '播放音乐', color: 'rgb(0, 207, 162)', address: '/music' },
  { title: '导航', color: 'rgb(120, 207, 12)', address: '/nav' },
  { title: '设置', color: 'rgb(241, 54, 127)', address: '/set' },
  { title: '关于', color: 'rgb(21, 154, 127)', address: '/about' }
]

//点击中的选项
const indexNum = ref(null)
const activing = (index) => {
  indexNum.value = index
  //跳转网页地址
  router.push(content.value[index]?.address)
}

const image = ref()
const userStore = useUserStore()
const getuser = async () => {
  await userStore.getUserInfo()
  image.value = userStore.user[0].image
}
getuser()
</script>

<template>
  <!-- pc -->
  <div class="left-list" v-if="isPC">
    <div class="option">
      <div class="person">
        <img v-if="image" :src="image" alt="头像" />
        <span>{{ userStore.user[0]?.name || '小江子' }}</span>
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

  <!-- mobile -->
  <div class="emun" v-else>
    <div
      class="btn"
      v-for="item in content"
      :key="item.title"
      :style="{ backgroundColor: item.color }"
      @click="$router.push(item.address)"
    >
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<style>
@media screen and (min-width: 1500px) {
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
}

@media screen and (max-width: 1500px) {
  .emun {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    white-space: nowrap;

    .btn {
      flex-grow: 1;
      width: 130px;
      /* height: 30%; */
      margin-left: 20px;
      margin-bottom: 8%;
      padding: 5px;
      border-radius: 25px;
      transition: 0.1s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    .btn:active {
      transform: scale(0.8);
    }
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
}
</style>
