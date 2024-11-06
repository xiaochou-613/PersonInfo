import request from '@/tools/request.js'

//获取日记
export const getDiary = () => {
  const res = request.get('/api/getAllDiary')
  return res
}

//添加日记
export const addDiary = (data) => {
  const res = request.post('/api/addDiary', data)
  return res
}
