<script setup>
import { getSpeakeveryday2 } from '@/apis/index'
import { ref, watch } from 'vue'
import Toast from '@/components/index'

//文心一言
const text = ref('正在加载中.. .. ..')
const getText = async () => {
  const res = await getSpeakeveryday2()
  text.value = res.data.content
}
getText()

//联系方式卡片
const showInfo = ref(false)
const show = () => {
  showInfo.value = true
  open()
}

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

//提示双击关闭
const open = () => {
  Toast('双击可关闭')
}
const close = () => {
  showInfo.value = false
}
//其他链接
const addFriend = (type) => {
  switch (type) {
    case 'qq':
      window.open('https://qm.qq.com/q/Eu3bc8dOZq')
      break
    case 'twitter':
      window.open('https://twitter.com/zzz0613jk')
      break
    case 'github':
      window.open('https://github.com/xiaochou-613')
      break
    case 'bilibili':
      window.open('https://space.bilibili.com/302644526?spm_id_from=666.25.0.0')
      break
    case 'dy':
      window.open(
        'https://www.douyin.com/user/MS4wLjABAAAAXyra2HHZUHu7Z-gAKrxN21pUiXZQpDNuZb56ZvYJ1vg'
      )
      break
    default:
      break
  }
}
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
          <div class="icon">
            <span
              class="newicon iconfont icon-QQ"
              @click="addFriend('qq')"
            ></span>
            <span class="newicon iconfont icon-weixin" @click="show"></span>
            <span
              class="newicon iconfont icon-14"
              @click="addFriend('twitter')"
            ></span>
          </div>
          <div class="icon">
            <span
              class="newicon iconfont icon-GitHub"
              @click="addFriend('github')"
            ></span>
            <span
              class="newicon iconfont icon-bilibili"
              @click="addFriend('bilibili')"
            ></span>
            <span
              class="newicon iconfont icon-douyin"
              @click="addFriend('dy')"
            ></span>
          </div>
        </div>

        <!-- 使用transition包裹要显示的div -->
        <!-- <transition name="fade"> -->
        <div v-if="showInfo" ref="infoDiv" class="info" @dblclick="close">
          <div>
            <!-- 不可拖拽 -->
            <img src="@/image/wx.jpg" draggable="false" />
            <p>开始我们的故事</p>
          </div>
        </div>
        <!-- </transition> -->
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
          <pre>NAME:     小江子</pre>
          <pre>SEX:      显而易见</pre>
          <pre>HEIGHT:   迄今为止不到3m</pre>
          <pre>LENGTH:   目前暂时不超过18cm。</pre>
          <pre>HOBBY:    女，其次最近看荒天帝有点无法自拔。可惜已经看完了</pre>
          <pre>
DREAM:    大不不谈，我想买摩动核敖丙带灯框，希望龙王和仆人双双不歪，但愿能在暑假前找到实习，最好是能财源滚滚，别遇上裁员滚滚</pre
          >
        </div>
      </div>
      <!-- 专业技能 -->
      <div class="myself">
        <div class="infoTitle">
          <h3 class="marginTop">专业技能</h3>
        </div>
        <div class="infoContent animate__animated animate__flipInX">
          <pre>HTML/CSS:     能看懂，能写出来</pre>
          <pre>JavaScript:   能看懂，能写出来</pre>
          <pre>Vue:          能看懂，能写出来</pre>
          <pre>Uniapp:       看不懂，写不出来</pre>
          <pre>PS:           看不懂，写不出来</pre>
          <pre>AI:           以上内容全皆有AI自动生成，可见会用</pre>
        </div>
      </div>
      <!-- 荣誉证书 -->
      <div class="myself">
        <div class="infoTitle">
          <h3 class="marginTop" id="h3">荣誉证书</h3>
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

<style lang="scss" scoped>
@media screen and (min-width: 1500px) {
  .marginTop {
    margin-top: 228px;
  }
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

  header {
    // max-height: 211px;
    max-height: 144px;
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
    animation: optyin 0.5s ease-in-out forwards;
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

  @keyframes optyin {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes optyout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
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
        float: left;
        pre {
          text-align: left;
          line-height: 30px;
          text-indent: 2em;
          text-shadow: 10px 10px 10px #909090;
          border-bottom: 1px dashed rgba(40, 40, 40, 0.2);
          max-width: 650px;
          white-space: pre-wrap; /* 换行符会被视为换行 */
        }
      }
    }
  }
}

@media screen and (max-width: 1500px) {
  @import '@/mobileCSS/myself';
}
</style>
