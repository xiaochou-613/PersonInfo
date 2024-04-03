/**
 *  计划
 *  所有关于计划的数据
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getallPlan, addPlan, updatePlan, deletePlan } from '@/apis/plan'

export const usePlanStore = defineStore('Plan', () => {
  //所有计划
  const planData = ref([])

  //所有已完成的计划
  const doneData = computed(() => {
    return planData.value.filter((item) => item.isDone === 1)
  })

  //获取所有计划
  const get_Plan = async () => {
    const res = await getallPlan()
    planData.value = res.data
    sort()
  }
  //添加计划
  const add_Plan = async (content) => {
    const res = await addPlan({ content })
    if (res.status === 200) get_Plan()
  }
  //更新计划
  const update_Plan = async (data) => {
    const res = await updatePlan(data)
    if (res.status === 200) get_Plan()
  }
  //删除计划
  const delete_Plan = async (planId) => {
    const res = await deletePlan(planId)
    if (res.status === 200) get_Plan()
  }

  //排序
  const sort = () => {
    //将已经完成的放在后面，未完成的放在前面
    const doneItems = planData.value.filter((item) => item.isDone)
    const undoneItems = planData.value.filter((item) => !item.isDone)
    planData.value = [...undoneItems, ...doneItems]
  }

  return {
    planData,
    doneData,

    //方法
    get_Plan,
    add_Plan,
    update_Plan,
    delete_Plan
  }
})
