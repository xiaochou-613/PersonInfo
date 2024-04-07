import request from '@/tools/request.js'

//获取用户信息
export const getPersonInfo = () => {
  const res = request.get('api/getpersonInfo')
  return res
}

//更新用户信息
export const updatePersonInfo = (data) => {
  const res = request.post('api/updatePersonInfo', data)
  return res
}
