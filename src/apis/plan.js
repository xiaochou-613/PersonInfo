import request from '@/tools/request.js'

//获取所有计划
export const getallPlan = () => {
  const res = request.get('api/allPlan')
  return res
}

//添加计划  data = {content : ''}
export const addPlan = (data) => {
  const res = request.post('api/addPlan', data)
  return res
}
