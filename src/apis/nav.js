import request from '@/tools/request.js'

//获取所有导航
export const getallNav = () => {
  const res = request.get('api/getnavlist')
  return res
}

//添加导航
export const addNav = (data) => {
  const res = request.post('api/addnav', data)
  return res
}

//删除导航
export const delNav = (data) => {
  const res = request.post('api/delnav', { title: data })
  return res
}
