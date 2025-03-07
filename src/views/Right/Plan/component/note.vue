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

//双向绑定(更新计划)
const updata_isDone = (planId, isDone) => {
  planStore.update_Plan({ planId, isDone })
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

// 控制对话框显示状态
const dialogVisible = ref(false)
const selectedPlanId = ref(null)
const openDialog = (planId) => {
  selectedPlanId.value = planId
  dialogVisible.value = true
}

// 提交时间
//默认值为当前
const date = ref(new Date().toISOString().slice(0, 10))
const time = ref(new Date().toTimeString().slice(0, 5))
const submittime = () => {
  dialogVisible.value = false
  const dateTimeString = `${date.value} ${time.value}:00`
  planStore.updateRemind({
    planId: selectedPlanId.value,
    alarmTime: dateTimeString
  })
  //恢复当前时间
  date.value = new Date().toISOString().slice(0, 10)
  time.value = new Date().toTimeString().slice(0, 5)
}

// 格式化定时的时间
const formatAlarmTime = (alarmTime) => {
  if (!alarmTime) return ''
  const now = new Date()
  const alarmDate = new Date(alarmTime)
  const diffTime = now - alarmDate
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return `今天 ${alarmDate.getHours()}:${alarmDate.getMinutes()}`
  } else if (diffDays === 1) {
    return `昨天 ${alarmDate.getHours()}:${alarmDate.getMinutes()}`
  } else if (diffDays === 2) {
    return `前天 ${alarmDate.getHours()}:${alarmDate.getMinutes()}`
  } else if (diffDays === -1) {
    return `明天 ${alarmDate.getHours()}:${alarmDate.getMinutes()}`
  } else if (diffDays === -2) {
    return `后天 ${alarmDate.getHours()}:${alarmDate.getMinutes()}`
  } else if (alarmDate.getFullYear() === now.getFullYear()) {
    return `${alarmDate.getMonth() + 1}/${alarmDate.getDate()}`
  } else {
    return `${alarmDate.getFullYear()}`
  }
}
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
          <span class="alarm-time">{{ formatAlarmTime(item.alarmTime) }}</span>

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
            <!-- 闹钟功能 -->
            <v-icon
              v-if="!item.isDone"
              icon="mdi-alarm"
              class="alarm"
              title="定时提醒"
              @click="openDialog(item.planId)"
            >
            </v-icon>
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

    <!-- 时间选择对话框 -->
    <v-dialog
      v-model="dialogVisible"
      transition="dialog-top-transition"
      width="auto"
      persistent
    >
      <v-card>
        <v-card-text>
          <input type="date" v-model="date" />
          <input type="time" v-model="time" />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text @click="dialogVisible = false">取消</v-btn>
          <v-btn type="primary" @click="submittime()">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.alarm-time {
  margin-left: 10px !important;
  // font-style: italic;
  color: #888;
  font-size: 10px;
}
.v-overlay {
  z-index: 200 !important;
}
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
    cursor: pointer;
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
      cursor: default;
      max-width: 173px;
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
      position: relative;
      .delicon,
      .top,
      .alarm {
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
      .alarm:hover {
        color: rgb(214, 84, 186);
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

/* 确保日期选择器显示在对话框上方 */
.custom-datepicker-popper {
  z-index: 2500 !important;
}

.datetime-picker {
  display: flex;
  gap: 10px;
}

.v-dialog > .v-overlay__content,
.v-dialog > .v-overlay__content > form {
  border-radius: 30px;
}

.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > form > .v-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  box-shadow: 0px 0px 10px 0px rgb(0, 0, 0, 0.3);
}
body
  > div.v-overlay-container
  > div
  > div.v-overlay__content
  > div
  > div.v-card-actions.justify-end
  > button:nth-child(2) {
  background-color: rgb(78, 173, 240);
  border-radius: 12px;
}
</style>
