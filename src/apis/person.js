import request from '@/tools/request.js'

//获取用户信息
export const getPersonInfo = () => {
  const res = request.get('api/getpersonInfo')
  return res
}

//更新用户头像
export const updatePersonImage = (data) => {
  const res = request.post('api/updatePersonImage', data)
  return res
}

//更新用户名字
export const updatePersonName = (data) => {
  const res = request.post('api/updatePersonName', data)
  return res
}
