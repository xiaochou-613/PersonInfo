/**
 *  计划
 *  所有关于计划的数据
 */
import { ElNotification } from 'element-plus'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  getallPlan,
  addPlan,
  updatePlan,
  deletePlan,
  updatePlanlevel
} from '@/apis/plan'

export const usePlanStore = defineStore('Plan', () => {
  //所有计划
  const planData = ref([])

  const readyData = ref([])

  const finishData = ref([{}])

  //所有已完成的计划
  const doneData = computed(() => {
    return planData.value.filter((item) => item.isDone === 1)
  })

  //获取所有计划
  const get_Plan = async () => {
    const res = await getallPlan()
    planData.value = res.data
    readyData.value = planData.value
    sort()
    splitPlan()
  }
  //添加计划
  const add_Plan = async (content) => {
    const res = await addPlan({ content })
    if (res.status === 200) get_Plan()
  }
  //更新计划 - 是否完成
  const update_Plan = async (data) => {
    const res = await updatePlan(data)
    if (res.status === 200) get_Plan()
  }

  //置顶计划
  const stick_Plan = async (data) => {
    const res = await updatePlanlevel(data)
    if (res.status === 200) get_Plan()
  }

  //删除计划
  const delete_Plan = async (planId, level) => {
    if (level === '最高') {
      ElNotification({
        title: '提示',
        message: '最高等级的任务无法被删除。'
      })
      return
    }

    const res = await deletePlan(planId)
    if (res.status === 200) get_Plan()
  }

  //排序
  const sort = () => {
    //所有未完成
    const undoneItems = planData.value.filter((item) => !item.isDone)
    //未完成中最高的
    const highItems = undoneItems.filter((item) => item.level === '最高')
    //未完成中普通的
    const normalItems = undoneItems.filter((item) => item.level !== '最高')
    //已经完成的
    const doneItems = planData.value.filter((item) => item.isDone)
    planData.value = [...highItems, ...normalItems, ...doneItems]

    remove_Done()
  }
  //移除昨日已完成
  const remove_Done = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    //过滤未完成
    const done = planData.value.filter((item) => item.isDone)
    const todo = planData.value.filter((item) => !item.isDone)

    const overDone = done.filter((item) => {
      return new Date(item.endTime) > today
    })
    readyData.value = [...todo, ...overDone]
  }

  //将已完成的数据 - 按时间分割
  const splitPlan = () => {
    let finishTime = []
    //set只存不同的数据
    const uniqueEndTimes = new Set()
    doneData.value.forEach((item) => {
      uniqueEndTimes.add(item.endTime.slice(0, 10))
    })

    //这里面的时间是否有排序呢
    finishTime = Array.from(uniqueEndTimes).map((endTime) => ({
      endTime
    }))
    //排序时间
    finishTime.sort((a, b) => new Date(b.endTime) - new Date(a.endTime))

    //将数据重组
    for (let i = 0; i < finishTime.length; i++) {
      finishData.value[i] = {
        time: finishTime[i].endTime,
        data: doneData.value.filter(
          (item) => item.endTime.slice(0, 10) === finishTime[i].endTime
        )
      }
    }
  }

  return {
    readyData,
    doneData,
    finishData,

    //方法
    get_Plan,
    add_Plan,
    update_Plan,
    delete_Plan,
    stick_Plan
  }
})
