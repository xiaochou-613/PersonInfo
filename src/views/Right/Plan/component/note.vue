<script setup>
defineOptions({
  name: 'nodeComponent'
})
import { ref } from 'vue'
import radio from './radio.vue'
import { getallPlan, addPlan } from '@/apis/plan'

//显示哪部分
const show = ref('await')
const showAwait = () => {
  show.value = 'await'
}

//获取所有计划
const noteData = ref()
const doneData = ref()
const getplan = async () => {
  const res = await getallPlan()
  noteData.value = res.data
  console.log(noteData.value)
  sort()
}
getplan()

//将数组排序
const sort = () => {
  //将已经完成的放在后面，未完成的放在前面
  const doneItems = noteData.value.filter((item) => item.isDone)
  const undoneItems = noteData.value.filter((item) => !item.isDone)
  noteData.value = [...undoneItems, ...doneItems]
}

//双向绑定
const updata_idDone = (index, isDone) => {
  noteData.value[index].isDone = isDone
  sort()
}
//已完成的绑定部分
const updata_Done = (plan, isDone) => {
  const planInfo = noteData.value.find((item) => item.plan === plan)
  planInfo.isDone = isDone
}

// ----添加按钮部分
//添加计划
const add = ref()
const inp = ref()
const inputContent = ref('')
//点击输入
const startInp = () => {
  add.value.style.width = '231px'
  add.value.innerText = ''
  inp.value.style.display = 'block'
  inp.value.focus()
}
//添加计划
const addnewPlan = async () => {
  if (inputContent.value) {
    await addPlan({ content: inputContent.value })

    inputContent.value = ''
    getplan()
  }
  revert()
}
//失焦还原
const revert = () => {
  add.value.style.width = '70px'
  add.value.innerText = '+'
  inp.value.style.display = 'none'
}

//  -----已完成部分
const showDone = () => {
  doneData.value = noteData.value?.filter((item) => item.isDone)
  show.value = 'done'
}

//  -----添加功能***************************************************************
// 待办事项上面点击可以修改
// 已完成的或者没完成的hover过去有一个删除的按钮
// 第二天今天完成的统一移到已完成
// 添加置顶，置顶的颜色变色红色
// 已完成的按时间排序
// ...
</script>

<template>
  <div>
    <header>
      <h1 :class="{ active: show === 'await' }" @click="showAwait">待办</h1>
      <h1 :class="{ active: show === 'done' }" @click="showDone">已完成</h1>
    </header>
    <main>
      <ul v-if="show === 'await'">
        <!-- 这个地方如果key是index，那么不会改变，那么数组就算变化了组件也不会重新渲染，如果key变了可以起到重新渲染的作用 -->
        <li class="note" v-for="(item, index) in noteData" :key="item.planId">
          <radio
            class="radio"
            :isDone="item.isDone"
            @update_isDone="(isDone) => updata_idDone(index, isDone)"
          ></radio>
          <span :class="{ del: item.isDone }">{{ item.content }}</span>
        </li>
        <li>
          <div class="add" @click="startInp" ref="add">+</div>
          <input
            ref="inp"
            type="text"
            class="inp"
            placeholder="Enter your plan"
            v-model="inputContent"
            @keydown.enter="addnewPlan"
            @blur="revert"
          />
        </li>
      </ul>
      <ul v-if="show === 'done'">
        <template v-if="doneData.length !== 0">
          <li class="note" v-for="item in doneData" :key="item.planId">
            <radio
              class="radio"
              :isDone="item.isDone"
              @update_isDone="(isDone) => updata_Done(item.plan, isDone)"
            ></radio>
            <span :class="{ del: item.isDone }">{{ item.content }}</span>
          </li>
        </template>
        <li class="Nodone" v-else>
          <div class="noDatac">暂无数据，向着目目标前进吧</div>
        </li>
      </ul>
    </main>
  </div>
</template>

<style lang="scss" scoped>
header {
  margin-top: 10px;
  h1 {
    display: inline;
    margin-left: 25px;
    font-size: 19px;
    color: rgb(100, 100, 100);
  }
  h1.active {
    font-size: 29px;
    color: rgb(213, 233, 250);
  }
}
main {
  height: 547px;
  overflow: auto;

  ul {
    width: 100%;
    list-style: none;
    li:last-child {
      width: 100%;
      height: 40px;
      position: relative;
      text-align: center;
      margin-bottom: 20px;
      .inp {
        width: 220px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        border-radius: 15px;
        border: 1px solid rgb(196, 196, 196);
        padding-left: 10px;
        display: none;
      }
      .inp:focus {
        outline: none;
      }
    }
  }
  li:first-child {
    margin-top: 20px;
  }
  .note {
    height: 40px;
    margin-left: 26px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .radio {
      min-width: 30px;
      min-height: 30px;
    }
    span {
      margin-left: 20px;
      //超出隐藏
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span:hover {
      color: cornflowerblue;
    }
    .del {
      text-decoration: line-through;
    }
  }
  li > .add {
    width: 70px;
    // width: 231px;
    height: 35px;
    color: rgb(213, 233, 250);
    border-radius: 20px;
    // box-shadow: 0px 0px 1px #3d3434;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    // margin-top: 5px;
    transition: all 0.5s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
}

.add:hover {
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
}
::-webkit-scrollbar {
  //隐藏滚动条
  width: 0;
  height: 0;
  background-color: transparent;
}

.noDatac {
  color: #999;
  // font-size: 20px;
  margin-top: 239px;
}
</style>
