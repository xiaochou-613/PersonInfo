<script setup>
defineOptions({
  name: 'nodeComponent'
})
import { ref } from 'vue'
import radio from './radio.vue'
import { usePlanStore } from '@/store/plan'
const planStore = usePlanStore()

//显示哪部分
const show = ref('await')
const showAwait = () => {
  show.value = 'await'
}

//获取所有计划
planStore.get_Plan()

//双向绑定(更新计划)
const updata_isDone = (planId, isDone) => {
  planStore.update_Plan({ planId, isDone })
}
//置顶计划(更新等级)

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
const addnewPlan = () => {
  if (inputContent.value) {
    planStore.add_Plan(inputContent.value)
    inputContent.value = ''
  }
  revert()
}
//失焦还原
const revert = () => {
  add.value.style.width = '70px'
  add.value.innerText = '+'
  inp.value.style.display = 'none'
}

//  -----添加功能***************************************************************
// 待办事项上面点击可以修改  -- 费

// 追求完美的话还可以将时间改为今天昨天
// 考虑已完成的可以删除
// ...
</script>

<template>
  <div>
    <header>
      <h1 :class="{ active: show === 'await' }" @click="showAwait">待办</h1>
      <h1 :class="{ active: show === 'done' }" @click="show = 'done'">
        已完成
      </h1>
    </header>
    <main>
      <ul v-if="show === 'await'">
        <!-- 这个地方如果key是index，那么不会改变，那么数组就算变化了组件也不会重新渲染，如果key变了可以起到重新渲染的作用 -->
        <li class="note" v-for="item in planStore.readyData" :key="item.planId">
          <radio
            class="radio"
            :isDone="item.isDone"
            @update_isDone="(isDone) => updata_isDone(item.planId, isDone)"
          ></radio>
          <span
            :class="{
              del: item.isDone,
              highlevel: item.level === '最高' && !item.isDone
            }"
            >{{ item.content }}</span
          >

          <!-- 功能选择 -->
          <div class="icon">
            <v-icon
              v-if="!item.isDone"
              icon="mdi-arrow-up-circle"
              class="top"
              :title="item.level !== '最高' ? '置顶' : '取消置顶'"
              @click="
                planStore.stick_Plan({
                  planId: item.planId,
                  level: item.level === '最高' ? '中' : '最高'
                })
              "
            ></v-icon>
            <v-icon
              @click="planStore.delete_Plan(item.planId, item.level)"
              icon="mdi-delete-circle"
              class="delicon"
              title="删除"
            ></v-icon>
          </div>
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
      <div v-if="show === 'done'">
        <ul v-for="(i, index) in planStore.finishData" :key="index">
          <h4 class="finishtime">{{ i.time }}</h4>
          <template v-if="i.data.length !== 0">
            <li
              class="note"
              v-for="item in i.data"
              :key="item.planId"
              style="margin-bottom: 0px"
            >
              <radio
                class="radio"
                :isDone="item.isDone"
                @update_isDone="(isDone) => updata_isDone(item.planId, isDone)"
              ></radio>
              <span :class="{ del: item.isDone }">{{ item.content }}</span>
            </li>
          </template>
          <li class="Nodone" v-else>
            <div class="noDatac">暂无数据，向着目目标前进吧</div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.finishtime {
  margin: 10px;
  color: #444;
}
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
  height: 545px;
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
      color: #999;
    }
    .highlevel {
      color: rgb(173, 47, 47);
    }
    .icon {
      margin-left: auto;
      margin-right: 20px;
      display: none;
      .delicon,
      .top {
        color: #999;
        font-size: 22px;
        transition: 0.1s;
        margin-right: auto;
      }
      .delicon:hover {
        color: rgb(219, 114, 114);
      }
      .top:hover {
        color: rgb(191, 241, 73);
      }
    }
  }
  .note:hover .icon {
    display: block;
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
