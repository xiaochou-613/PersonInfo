<script setup>
import { getSpeakeveryday2 } from '@/apis/index'
import { ref, watch } from 'vue'

//文心一言
const text = ref('正在加载中.. .. ..')
const getText = async () => {
  const res = await getSpeakeveryday2()
  text.value = res.data.content
}
getText()

//联系方式卡片
const showInfo = ref(false)

//实现拖拽info卡片
const infoDiv = ref(null)
const onDrag = ({ movementX, movementY }) => {
  const getstyle = window.getComputedStyle(infoDiv.value)
  const left = parseInt(getstyle.left)
  const top = parseInt(getstyle.top)

  infoDiv.value.style.left = `${left + movementX}px `
  infoDiv.value.style.top = `${top + movementY}px `
}
watch(infoDiv, () => {
  if (infoDiv.value) {
    infoDiv.value.addEventListener('mousedown', () => {
      infoDiv.value.classList.add('info_active')
      infoDiv.value.addEventListener('mousemove', onDrag)
    })
    infoDiv.value.addEventListener('mouseup', () => {
      infoDiv.value.classList.remove('info_active')
      infoDiv.value.removeEventListener('mousemove', onDrag)
    })
  }
})
</script>

<template>
  <div class="homepage">
    <header>
      <img src="@/image/雷神.png" alt="" />
    </header>
    <button class="btn">个人信息</button>
    <main>
      <div class="image&name">
        <img src="@/image/QQ.jpg" alt="" />
        <div class="text">
          <h3 class="animate__animated animate__bounceInDown">小丑</h3>
          <p>{{ text }}</p>
        </div>

        <div class="contact">
          <h3>联系我</h3>
          <div class="icon" @click="showInfo = true">
            <span class="newicon iconfont icon-QQ"></span>
            <span class="newicon iconfont icon-weixin"></span>
            <span class="newicon iconfont icon-14"></span>
          </div>
          <div class="icon" @click="showInfo = true">
            <span class="newicon iconfont icon-GitHub"></span>
            <span class="newicon iconfont icon-bilibili"></span>
            <span class="newicon iconfont icon-douyin"></span>
          </div>
        </div>

        <!-- 使用transition包裹要显示的div -->
        <transition name="fade">
          <div
            v-if="showInfo"
            ref="infoDiv"
            class="info fade-in"
            @dblclick="showInfo = false"
          >
            <div>
              <!-- 不可拖拽 -->
              <img src="@/image/wx.jpg" draggable="false" />
              <p>要开始我们的故事了吗？，想要其他联系方式，得靠你的实力咯 ~</p>
            </div>
          </div>
        </transition>
      </div>
    </main>

    <div class="myInfo">
      <hr />
      <!-- 自我介绍 -->
      <div class="myself">
        <div class="infoTitle">
          <h3>自我介绍</h3>
        </div>
        <div class="infoContent animate__animated animate__flipInX">
          <p>NAME:&emsp;&emsp;&emsp;小江子</p>
          <p>SEX:&emsp;&emsp;&emsp;&emsp;显而易见</p>
          <p>HEIGHT:&emsp;&emsp;&nbsp;迄今为止不到3m</p>
          <p>LENGTH:&emsp;&emsp;目前暂时不超过18cm</p>
          <p>
            HOBBY:&emsp;&emsp;&nbsp;&nbsp;&nbsp;女，其次最近看荒天帝有点无法自拔。可惜已经看完了
          </p>
          <p>
            DREAM:&emsp;&emsp;&nbsp;&nbsp;大不不谈，我想买摩动核敖丙带灯框，希望龙王和仆人双双不歪，
            但愿能在暑假前找到实习，最好是能财源滚滚，别遇上裁员滚滚
          </p>
        </div>
      </div>
      <!-- 专业技能 -->
      <div class="myself">
        <div class="infoTitle">
          <h3 style="margin-top: 228px">专业技能</h3>
        </div>
        <div class="infoContent animate__animated animate__flipInX">
          <p>HTML/CSS:&emsp; 能看懂，能写出来</p>
          <p>JavaScript:&emsp;&nbsp; 能看懂，能写出来</p>
          <p>Vue:&emsp;&emsp;&emsp;&emsp;&nbsp; 能看懂，能写出来</p>
          <p>微信小程序:&emsp; 看不懂，写不出来</p>
          <p>
            PS:&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp; 能看懂，能写出来
          </p>
          <p>
            AI:&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;
            以上内容全皆有AI自动生成，可见会用
          </p>
        </div>
      </div>
      <!-- 荣誉证书 -->
      <div class="myself">
        <div class="infoTitle">
          <h3 style="margin-top: 228px">荣誉证书</h3>
        </div>
        <div class="prize">
          <img src="@/image/金奖.png" />
          <img src="@/image/鸽子奖.png" />
          <img src="@/image/学生模范.png" />
        </div>
      </div>
    </div>

    <footer>
      <span>已经到底啦，对我这么感兴趣？</span>
      <p>&copy;版权归我所有</p>
    </footer>
  </div>
</template>

<style scoped>
footer {
  width: 100%;
  height: 30px;
  /* line-height: 30px; */
  text-align: center;
  float: left;
  margin-top: 20px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
}
.prize {
  float: left;
  img {
    width: 250px;
    max-height: 300px;
    margin-left: 58px;
    margin-top: 20px;
  }
}
/* 定义动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s; /* 过渡动画时间 */
}
.fade-enter,
.fade-leave-to {
  opacity: 0; /* 初始状态或离开时状态 */
}

header {
  max-height: 211px;
  overflow: hidden;
  img {
    width: 100%;
    border-top-right-radius: 25px;
  }
}
.btn {
  position: relative;
  left: 416px;
  top: -22px;
  background-color: #6e5475;
  border-radius: 15px;
  border: none;
  width: 120px;
  height: 41px;
  color: white;
}
main {
  max-height: 200px;
  margin-left: 50px;
  img {
    width: 150px;
    height: 150px;
    float: left;
    border-radius: 15px;
  }
  .text {
    width: 300px;
    height: 150px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    margin-left: 51px;
    vertical-align: middle;
    float: left;
    h3 {
      font-size: xx-large;
    }
    p {
      margin-top: 10px;
      /* font-size: larger; */
    }
  }
  .contact {
    .newicon {
      margin-right: 30px;
      font-size: 40px;
    }
    .icon :hover {
      /* transform: scale(1.1); */
      /* font-size: 50px; */
      color: #6e5475;
    }
  }
}
.info {
  position: absolute; /* 修改为绝对定位 */
  top: 386px; /* 调整位置 */
  right: 573px;
  width: 300px;
  height: 200px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px); /* 调整模糊程度 */
  border-radius: 10px; /* 可选：使边角更圆润 */
  overflow: hidden;
  -webkit-backdrop-filter: blur(3px);
  user-select: none;
  box-sizing: border-box;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 150px;
      height: 100%;
    }
    p {
      font-weight: bolder;
      font-size: 18px;
      line-height: 26px;
      font-family: cursive;
    }
  }
}
.info.info_active {
  cursor: move;
}
.invisible {
  display: none;
}

.myInfo {
  clear: both;
  hr {
    border: 2px solid #6e5475;
    margin-top: 51px;
  }
  .myself {
    width: 100%;

    .infoTitle {
      width: 30%;
      float: left;
      h3 {
        margin-top: 60px;
        margin-left: 100px;
        font-size: xx-large;

        color: #6e5475;
        background: linear-gradient(60deg, #ffbac3, #c5c1ff, #6e5475) center;
        background-size: 100% 35%;
        background-position-y: 88%;
        background-repeat: no-repeat;
        transition: all 0.5s;
      }
      h3:hover {
        background-size: 100% 10%;
        background-position-y: 88%;
        padding-left: 29px;
      }
    }
    .infoContent {
      width: 70%;
      margin-top: 60px;
      float: right;
      p {
        text-align: left;
        line-height: 30px;
        text-indent: 2em;
        text-shadow: 10px 10px 10px #909090;
        border-bottom: 1px dashed rgba(40, 40, 40, 0.2);
        max-width: 650px;
      }
    }
  }
}
</style>
