<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Toast from '@/components/index'

const router = useRouter()
const password = ref('')

onMounted(() => {
  document
    .getElementsByClassName('js-unmask')[0]
    .addEventListener('click', function () {
      const field = this.parentNode.querySelector('.js-inputField')
      field.type = field.type == 'password' ? 'text' : 'password'
    })
})

const go = () => {
  if (password.value !== 'jiangkai') {
    Toast('密码错误,请重试')
    return
  }
  router.replace('/')
  localStorage.setItem(
    'Token',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJuYW1lXCI6XCLlsI_pu5HkuI3pu5FcIixcImlkXCI6XCIxNjYzMzc1Mzg1NTMxNzgxMTIyXCIsXCJ1c2VybmFtZVwiOlwieGlhb3R1eGlhbjAwMVwifSIsImlhdCI6MTczNDU4NzA0NiwiZXhwIjoxNzM0ODQ2MjQ2fQ.VRpNb3T2n7y1RTTPqZC4gncXfrpIqP6jim6PJy9TRoU'
  )
}
</script>

<template>
  <div class="bg">
    <div class="cover">
      <!-- 窗口 -->
      <div class="container">
        <!-- <form class="c-form" action="">
          <input
            class="c-form__emailInput js-inputField"
            type="email"
            placeholder="Email"
            autofocus
          />
        </form> -->
        <input type="checkbox" class="c-checkbox" id="unmask" />
        <form class="c-form" action="">
          <input
            class="c-form__input js-inputField"
            type="password"
            placeholder="Password"
            v-model="password"
            autofocus
          />
          <span class="c-form__lockIcon"></span>
          <label class="c-form__eyeIcon js-unmask" for="unmask">
            <b class="c-form__eyeIconBar"></b>
          </label>
        </form>
        <button class="c-button" @click="go">Login In</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('@/image/bg.jpeg');
  .cover {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
body {
  font-size: 10px;
  background-color: #6fa5f6;
  font-family: 'Open Sans', sans-serif;
  display: grid;
  height: 100vh;
  place-items: center;
}

.c-checkbox {
  display: none;
}

.c-checkbox:checked ~ .c-form {
  .c-form__eyeIcon::before {
    transform: scale(20);
  }

  .c-form__eyeIconBar::before {
    transform: scaleX(0);
  }

  .c-form__lockIcon {
    color: #121726;
  }
}

.c-form {
  position: relative;
  overflow: hidden;
  width: 370px;
  height: 80px;
  padding: 20px 31.25px;
  box-sizing: border-box;
  border-radius: 12.5px;
  background-color: #121726;
  box-shadow:
    0 1.25px 1.25px 0 rgba(0, 0, 0, 0.14),
    0 2.375px 0.625px -1.25px rgba(0, 0, 0, 0.12),
    0 0.625px 3.125px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  margin: 10px 0;
}

.c-form__input {
  flex-grow: 1;
  font-size: 15.625px;
  font-family: inherit;
  color: #565cc0;
  border: 0;
  outline: 0;
  padding: 0 8.8px;
  box-sizing: border-box;
  background-color: transparent;
  z-index: 2;
}

.c-form__input::placeholder {
  color: #cccccc;
}

.c-form__eyeIcon {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #575dbe;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-form__eyeIcon::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: #ffffff;
  transition: 0.15s;
  pointer-events: none;
}

.c-form__eyeIcon::after {
  content: '';
  height: 8.75px;
  width: 8.75px;
  border-radius: 50%;
  background-color: currentColor;
  box-shadow:
    0 0 0 3.75px #ffffff,
    0 0 0 6.25px;
  z-index: 1;
}

.c-form__eyeIconBar {
  position: absolute;
  width: 28.125px;
  height: 2.5px;
  transform: rotate(45deg);
  z-index: 2;
}

.c-form__eyeIconBar::before {
  content: '';
  display: block;
  width: inherit;
  height: inherit;
  background-color: currentColor;
  transform-origin: bottom right;
  transform: scaleY(1);
  transition: transform 0.15s;
}

.c-form__lockIcon {
  order: -1;
  position: relative;
  width: 40px;
  height: 40px;
  color: #ffffff;
  z-index: 1;
  transition: 0s 0.1s;
}

.c-form__lockIcon::before,
.c-form__lockIcon::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.c-form__lockIcon::before {
  bottom: 8.75px;
  width: 17.5px;
  height: 12.5px;
  border-radius: 3.125px 3.125px 0 0;
  background-color: currentColor;
}

.c-form__lockIcon::after {
  bottom: 8.75px + 11.25px;
  width: 15px;
  height: 11.25px;
  border: 2.5px solid;
  border-bottom: 0;
  box-sizing: border-box;
  border-radius: 15px 15px 0 0;
}

.c-form__emailInput {
  flex-grow: 1;
  font-size: 15.625px;
  font-family: inherit;
  color: #565cc0;
  border: 0;
  outline: 0;
  padding: 0 8.8px;
  box-sizing: border-box;
  background-color: transparent;
  z-index: 2;
}

.c-form__emailInput::placeholder {
  color: #cccccc;
}
.c-button {
  padding: 15px 20px; /* 调整按钮的内边距 */
  font-size: 16px; /* 按钮字体大小 */
  font-family: 'Open Sans', sans-serif; /* 按钮字体家族 */
  color: #ffffff; /* 按钮文字颜色 */
  background-color: #121726; /* 按钮背景颜色 */
  border: none; /* 无边框 */
  border-radius: 12.5px; /* 圆角边框 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition:
    background-color 0.3s ease,
    transform 0.2s ease; /* 平滑过渡效果 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  outline: none; /* 无轮廓线 */
  margin-top: 15px; /* 与输入框的间距 */
  text-transform: uppercase; /* 文字大写 */
  letter-spacing: 0.5px; /* 字间距 */
}

.c-button:hover {
  background-color: #000000; /* 悬停时背景颜色变深 */
  transform: translateY(-1px); /* 轻微上移 */
}

.c-button:active {
  background-color: #000000; /* 点击时背景颜色不变 */
  transform: translateY(0); /* 点击时回到原位 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); /* 阴影变小 */
}
</style>
