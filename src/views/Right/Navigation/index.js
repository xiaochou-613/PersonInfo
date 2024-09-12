//获取导航列表
import { getallNav } from '@/apis/nav'
import { ref } from 'vue'

const navlist = ref([])

export const navData = ref([])

const getAllNav = async () => {
  const res = await getallNav()
  navlist.value = res.data

  const commonlyUsed = navlist.value.filter((item) => item.tag === '常用')
  const vueUsed = navlist.value.filter((item) => item.tag === 'Vue')
  const blog = navlist.value.filter((item) => item.tag === '博客')

  navData.value = [
    {
      title: '常用网站',
      color: {
        textColor: '#fff',
        backColor: 'rgb(68, 94, 232)',
        tagColor: '#27a13d',
        tagTextColor: '#fff'
      },

      webList: commonlyUsed
    },
    {
      title: 'Vue学习网站',
      color: {
        textColor: '#000000',
        backColor: '#7CFC00',
        tagColor: '#FFF44F',
        tagTextColor: '#000000'
      },
      webList: vueUsed
    },
    {
      title: '个人博客',
      color: {
        textColor: '#fff',
        backColor: '#212529',
        tagColor: '#FF5722',
        tagTextColor: '#fff'
      },
      webList: blog
    }
  ]
}
getAllNav()
