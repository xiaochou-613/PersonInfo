<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
const router = useRouter()
router.replace('/myPage')
const isPC = inject('device')
const content = ref()
content.value = [
  { title: '个人主页', color: 'rgb(248, 221, 218)', address: '/myPage' },
  { title: '百度一下', color: 'rgb(255, 117, 117)', address: '/' },
  { title: '播放音乐', color: 'rgb(0, 207, 162)', address: '/music' },
  { title: '我的计划', color: 'rgb(99, 127, 132)', address: '/plan' },
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

//初始样式
const emunStart = ref()
const slid1 = ref()
const slid2 = ref()
onMounted(() => {
  if (!emunStart.value) return
  const currentWidth = emunStart.value.offsetWidth
  const currentLeft = emunStart.value.offsetLeft
  slid1.value.style.left = currentLeft + 'px' // 设置 left 值时添加 'px' 后缀
  slid1.value.style.width = currentWidth + 'px' // 设置 width 值时添加 'px' 后缀
})

//点击导航
const nav = async (e, index) => {
  await router.push(content.value[index - 1].address)
  const currentLeft = e.target.parentNode.offsetLeft
  const currentWidth = e.target.parentNode.offsetWidth
  slid1.value.style.left = currentLeft + 'px'
  slid1.value.style.width = currentWidth + 'px'
  router.push(content.value[index - 1].address)
}
const mouseover = (e) => {
  const position = e.target.parentNode.offsetLeft
  const width = e.target.parentNode.offsetWidth
  slid2.value.style.left = position + 'px'
  slid2.value.style.width = width + 'px'
  slid2.value.style.opacity = 1
  slid2.value.classList.add('squeeze')
}
const mouseout = () => {
  slid2.value.style.opacity = 0
  slid2.value.classList.remove('squeeze')
}
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
    <ul id="nav">
      <li class="slide1" ref="slid1"></li>
      <li class="slide2" ref="slid2"></li>
      <!-- <li ref="emunStart" v-for="item in content.slice(0, 4)" :key="item.title"> -->
      <li ref="emunStart">
        <a
          @click="(e) => nav(e, 1)"
          @mouseover="mouseover"
          @mouseout="mouseout"
          href="#"
          >Home</a
        >
      </li>
      <li>
        <a
          @click="(e) => nav(e, 2)"
          @mouseover="mouseover"
          @mouseout="mouseout"
          href="#"
          >Search</a
        >
      </li>
      <li>
        <a
          @click="(e) => nav(e, 3)"
          @mouseover="mouseover"
          @mouseout="mouseout"
          href="#"
          >Music</a
        >
      </li>
      <li>
        <a
          @click="(e) => nav(e, 4)"
          @mouseover="mouseover"
          @mouseout="mouseout"
          href="#"
          >Plan</a
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
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

/* @media screen and (max-width: 1500px) {
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
} */
@media screen and (max-width: 1500px) {
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  /* body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('@/image/image.png') no-repeat center center fixed;
    background-size: cover;
  } */
  .emun {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    margin-bottom: 40px;
  }

  #nav {
    position: relative;
    border: none;
    border-radius: 10em;
    display: flex;
    justify-content: space-between;
    list-style: none;
    background: #f5f5f5;
    box-shadow: 20px 40px 40px #00000033;
    padding: 0 10px 0 10px;
  }

  #nav li a {
    position: relative;
    padding: 15px 20px;
    font: 500 24px '优设标题黑';
    border: none;
    outline: none;
    color: rgb(70, 100, 180);
    display: inline-block;
    text-decoration: none;
    z-index: 3;
    /* font-size: 13px; */
  }

  .slide1,
  .slide2 {
    position: absolute;
    display: inline-block;
    width: 0;
    left: 0;
    height: 60px;
    border-radius: 10em;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
  }

  .slide1 {
    background-color: rgb(170, 190, 255);
    z-index: 2;
  }

  .slide2 {
    opacity: 0;
    background-color: rgba(170, 190, 255, 0.5);
    z-index: 1;
    box-shadow: 0 0 20px #ffffffaa inset;
  }

  .squeeze {
    transform: scale(0.9);
  }
}
</style>
