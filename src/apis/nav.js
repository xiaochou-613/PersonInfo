import request from '@/tools/request.js'

//获取所有导航
export const getallNav = () => {
  const res = request.get('api/getnavlist')
  return res
}
