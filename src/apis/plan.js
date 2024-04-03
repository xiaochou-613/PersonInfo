import request from '@/tools/request.js'

//获取所有计划
export const getallPlan = () => {
  const res = request.get('api/allPlan')
  return res
}

//添加计划  data = {id : ''}
export const addPlan = (data) => {
  const res = request.post('api/addPlan', data)
  return res
}

/**
 * 更新计划
 * @params content
 * @params level
 * @params isDone
 * @params planId
 */
export const updatePlan = (data) => {
  const res = request.post('api/updatePlan', data)
  return res
}

//删除计划  id
export const deletePlan = (planId) => {
  const res = request.delete('api/deletePlan', { data: { planId } })
  return res
}
