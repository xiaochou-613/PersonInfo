import request from '@/tools/request.js'

//获取音乐信息
export const getmusicInfo = () => {
  const res = request.get('api/getmusicInfo')
  return res
}

//获取歌词
export const getlyric = (id) => {
  const res = request.get(`api/getlyric/?id=${id}`)
  return res
}

// //获取歌词路径
// export const getlyricPath = (id) => {
//   const res = request.get(`api/getlyricPosition/?id=${id}`)
//   return res
// }
