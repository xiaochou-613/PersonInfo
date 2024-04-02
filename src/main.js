import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vuetify } from '@/tools/vuetify'
import '@/css/iconfont.css'
import '@/css/common.css'
import 'animate.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

app.use(router)
app.use(vuetify)
app.mount('#app')

// git add .
// git commit -m "..."
// git push -u origin master
