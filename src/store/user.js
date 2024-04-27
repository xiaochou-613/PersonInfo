import {
  getPersonInfo,
  updatePersonImage,
  updatePersonName
} from '@/apis/person'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref([])

  //获取用户信息
  const getUserInfo = async () => {
    const res = await getPersonInfo()
    user.value = res.data
  }

  //修改用户头像
  const updateUserInfoimage = async (image) => {
    const res = await updatePersonImage({ ...user.value[0], ...image })
    if (res.status === 200) getUserInfo()
  }

  //修改用户名称
  const updateUserInfoname = async (name) => {
    const res = await updatePersonName({ ...user.value[0], ...name, image: '' })
    if (res.status === 200) getUserInfo()
  }

  return {
    user,

    getUserInfo,
    updateUserInfoimage,
    updateUserInfoname
  }
})
