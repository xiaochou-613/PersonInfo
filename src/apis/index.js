import axios from 'axios'

//文心一言 ***已经失效了
export const getSpeakeveryday = () => {
  const res = axios.get('https://v.api.aa1.cn/api/yiyan/index.php', {
    timeout: 10000
  })
  return res
}

//动画随机图片
export const getGirliamge = () => {
  return axios.get('https://v2.api-m.com/api/randomAcgPic', {
    params: {
      type: 'pc',
      return: 'json'
    }
  })
}

//文心一言Plus
export const getSpeakeveryday2 = () => {
  const res = axios.get('https://api.nnxv.cn/api/yiyan.php', {
    timeout: 10000
  })
  return res
}

// 动画随机图片实现代码
// const animeImg = ref(null)
// const getImage = async () => {
//   animeImg.value = await getGirliamge()
//   animeImg.value = animeImg.value.data.data
// }
// getImage()
