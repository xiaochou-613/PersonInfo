import { getPersonInfo, updatePersonInfo } from '@/apis/person'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref([])

  //获取用户信息
  const getUserInfo = async () => {
    const res = await getPersonInfo()
    user.value = res.data
  }

  //修改用户信息  {name,image,userId}
  const updateUserInfo = async (data) => {
    const res = await updatePersonInfo({ ...user.value[0], ...data })
    if (res.status === 200) getUserInfo()
  }

  return {
    user,

    getUserInfo,
    updateUserInfo
  }
})
