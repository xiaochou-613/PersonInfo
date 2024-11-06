import { createApp } from 'vue'
import Toast from './smartIsland.vue'

const showToast = (message) => {
  const div = document.createElement('div')
  const componentInstance = createApp(Toast, { message })

  componentInstance.mount(div)
  document.body.appendChild(div)

  let timer = null
  timer = setTimeout(() => {
    //销毁
    componentInstance.unmount(div) //会触发distory钩子函数
    document.body.removeChild(div)
    clearTimeout(timer)
  }, 4000)
}

export default showToast
