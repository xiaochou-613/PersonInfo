<script setup>
import Switch_theme from './component/switch.vue'
import NavButton from './component/NavButton.vue'
import upload from './component/upload/index.vue'
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
//将姓名和图片存入本地
const name = ref()

const uploadName = async () => {
  await userStore.updateUserInfoname({ name: name.value })
}
</script>

<template>
  <div class="set_content">
    <div class="container">
      <ul>
        <li>
          <h3 style="text-align: center; margin: 10px 0px">设置</h3>
        </li>
        <li>
          <div class="set">
            <span>更换昵称：</span>
            <input
              type="text"
              v-model="name"
              @blur="uploadName"
              class="reach inp"
              placeholder="小江子"
            />
          </div>
        </li>
        <li>
          <div class="set">
            <span>修改头像：</span>
            <upload class="reach"></upload>
          </div>
        </li>
        <li>
          <div class="set">
            <span>切换主题：</span>
            <Switch_theme
              class="reach"
              style="margin-right: 14px"
            ></Switch_theme>
          </div>
        </li>
        <li>
          <div>
            <NavButton class="navbtn"></NavButton>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.set_content {
  padding: 100px 300px 0px 300px;
  font-size: 20px;
  font-family: monospace;
  .container {
    /* width: 400px; */
    height: 600px;
    border-radius: 15px;
    /* border: 1px solid black; */
    padding: 20px;
    box-shadow: 0px 0px 10px 1px rgba(241, 54, 127, 0.4);
  }
  .set {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    /* background-color: antiquewhite; */
  }
  ul {
    list-style: none;

    .reach {
      float: right;
    }
    .inp {
      font-size: 16px;
      width: 100px;
      height: 46px;
      border: 2px dashed rgb(252, 213, 228);
      border-radius: 22px;
      outline: none;
      color: rgb(255 78 146);
      font-weight: bold;
      padding-left: 22px;
    }
  }
}
.navbtn {
  margin-left: 86px;
}
</style>
