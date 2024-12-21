<script setup>
import navCard from './component/navCard.vue'
import { navData, getAllNav, navTitleList } from './index'
import { addNav, delNav } from '@/apis/nav'
import { ref } from 'vue'
import Toast from '@/components/index'

console.log(navTitleList)

const addPlate = ref(null)
const delPlate = ref(null)

//添加逻辑开始
const navModel = ref({
  title: '',
  xtitle: '',
  tag: '',
  image: '',
  url: ''
})

const sbumitbtn = () => {
  addPlate.value.close()
  if (
    !navModel.value.title ||
    !navModel.value.xtitle ||
    !navModel.value.tag ||
    !navModel.value.url ||
    !navModel.value.image
  ) {
    Toast('请填写完整信息')
    return
  }
  //修改数据库
  addNav(navModel.value).then((res) => {
    if (res.status === 200) {
      Toast('添加成功')
      getAllNav()
    }
  })
}
//添加逻辑结束

//删除逻辑开始
const deltitle = ref('')
const delbtn = () => {
  delPlate.value.close()

  if (!deltitle.value) {
    Toast('删除失败，请重试')
    return
  } else if (deltitle.value === '不删除') {
    Toast('取消成功')
    return
  }
  //修改数据库
  delNav(deltitle.value).then((res) => {
    if (res.status === 200) {
      Toast('删除成功')
      getAllNav()
    }
  })
}
//删除逻辑结束
</script>

<template>
  <div style="position: relative; width: 100%; height: 100%" class="navwindow">
    <img src="@/image/剑仙问情.png" class="head_image" draggable="false" />
    <div class="add">
      <button class="btn" title="新增项目" @click="addPlate.showModal()">
        New
      </button>
      <button class="btn" title="删除项目" @click="delPlate.showModal()">
        Del
      </button>
    </div>
    <div
      class="nav_cycontent top0"
      v-for="(item, index) in navData"
      :key="index"
    >
      <h3>---&nbsp;&nbsp;{{ item.title }}&nbsp;&nbsp; ---</h3>
      <navCard
        class="navcard"
        v-for="(i, indexNum) in item.webList"
        :key="indexNum"
        :webInfo="i"
        :color="item.color"
        :tag="i.tag"
      ></navCard>
    </div>

    <!-- 添加窗口 -->
    <dialog ref="addPlate" class="addplate adddialog">
      <h4>添加新导航</h4>
      <form class="nav-form">
        <div class="nav-form-row">
          <label for="siteName">网页标签:</label>
          <input type="text" v-model="navModel.tag" required />
        </div>

        <div class="nav-form-row">
          <label for="siteName">网站名称:</label>
          <input type="text" v-model="navModel.title" required />
        </div>

        <div class="nav-form-row">
          <label for="siteDescription">网站描述:</label>
          <input
            type="text"
            maxlength="30"
            v-model="navModel.xtitle"
            required
          />
        </div>

        <div class="nav-form-row">
          <label for="siteUrl">网站URL:</label>
          <input type="text" id="siteUrl" v-model="navModel.url" required />
        </div>

        <div class="nav-form-row inp">
          <label for="siteLogo">logo地址:</label>
          <input type="text" v-model="navModel.image" required />
        </div>
      </form>
      <div class="flexcenter">
        <button class="sbumitbtn" @click="sbumitbtn">确 认</button>
      </div>
    </dialog>
    <!-- 删除窗口 -->
    <dialog ref="delPlate" class="addplate del">
      <h4>删除导航站</h4>
      <div class="nav-form-row topdowm10">
        <label for="siteName">选择网站名称:</label>
        <select name="" id="" v-model="deltitle">
          <option value="不删除">-- 不删除 --</option>
          <option
            v-for="(item, index) in navTitleList"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div class="flexcenter">
        <button class="sbumitbtn red" @click="delbtn">删 除</button>
      </div>
    </dialog>
  </div>
</template>

<style scoped lang="scss">
*,
body {
  margin: 0px;
  padding: 0px;
}
.head_image {
  width: 100%;
}
.nav_cycontent {
  padding-top: 50px;
  float: left;
  width: 100%;
  /* height: 100%; */
  background-color: rgb(247, 249, 254);

  h3 {
    text-align: center;
    margin-bottom: 40px;
  }
  .navcard {
    float: left;
    margin-left: 25px;
    margin-top: 10px;
    margin-bottom: 8px;
  }
}
.top0 {
  padding-top: 0;
}
.add {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: rgb(247, 249, 254);
}
.btn {
  width: 60px;
  height: 35px;
  border-radius: 10px;
  background-color: rgb(73, 113, 167);
  color: white;
  margin-left: 10px;
}
input[type='text'] {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid rgb(0, 0, 0, 0.3);
  margin-bottom: 10px;
  padding-left: 10px;
  font-size: 15px;
  outline: none;
  transition: all 0.3s;
}
.addplate {
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgb(0, 0, 0, 0.3);
  padding: 10px;
  overflow: hidden;
  h4 {
    /* display: inline-block;
    width: 100px; */
    text-align: center;
    margin-bottom: 10px;
    background-image: linear-gradient(45deg, #92a3c1, #4d75ae 30%, #eaf4fe);
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .nav-form-row {
    display: flex;
    margin-bottom: 5px;
  }
  label {
    margin-right: 10px;
    white-space: nowrap;
    line-height: 30px; /* 设置行高以垂直居中 */
  }
  .sbumitbtn {
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgb(0, 0, 0, 0.3);
    line-height: 30px;
    background-color: rgb(138, 183, 244);
    border: none;
    color: white;
  }
}
.red {
  background-color: rgb(205, 122, 144) !important;
}
.inp {
  margin-bottom: 0px !important;
}
.del {
  width: 350px;
  height: 150px;
  /* display: flex; */
  flex-direction: column;
  border: none;
  .topdowm10 {
    margin: 21px 0;
  }
  &::backdrop {
    backdrop-filter: blur(10px);
  }
  select {
    width: 100px;
    padding-left: 15px;
    border: 1px solid rgb(0, 0, 0, 0.3);
    outline: none;
  }
}
.adddialog {
  border: none;
  &::backdrop {
    backdrop-filter: blur(10px);
  }
}
@media screen and (max-width: 1500px) {
  @import '@/mobileCSS/nav';
}
</style>
