//获取导航列表
import { getallNav } from '@/apis/nav'
import { ref, computed } from 'vue'

const navlist = ref([])

export const navData = ref([])

export const getAllNav = async () => {
  const res = await getallNav()
  navlist.value = res.data

  const commonlyUsed = navlist.value.filter((item) => item.tag === '常用')
  const vueUsed = navlist.value.filter((item) => item.tag === 'Vue')
  const blog = navlist.value.filter((item) => item.tag === '博客')
  const add = navlist.value.filter((item) => item.tag === '搜索')

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
    },
    {
      title: '搜索',
      color: {
        textColor: '#5a3e5a', // 文字颜色，深一点的粉色，以确保可读性
        backColor: '#ffe0f0', // 背景颜色，浅粉色，柔和且不刺眼
        tagColor: '#ffafbd', // 标签背景颜色，比背景色稍深的粉色，增加层次感
        tagTextColor: '#ffffff' // 标签文字颜色，白色，以确保与标签背景形成对比
      },
      webList: add
    }
  ]
  if (add.length === 0) {
    navData.value.pop()
  }
}
getAllNav()
export const navTitleList = computed(() => {
  return navlist.value.map((item) => item.title)
})
