import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Layout/index.vue'
const Music = () => import('@/views/Right/Music/index.vue')
const Search = () => import('@/views/Right/Search/index.vue')
const music_home = () => import('@/views/Right/Music/components/music_home.vue')
const music_lyric = () =>
  import('@/views/Right/Music/components/music_lyric.vue')
const myself = () => import('@/views/Right/Myself/index.vue')
const set = () => import('@/views/Right/Set/index.vue')
const undefined404 = () => import('@/views/404/index.vue')
const nav = () => import('@/views/Right/Navigation/index.vue')
const plan = () => import('@/views/Right/Plan/index.vue')
const about = () => import('@/views/Right/About/index.vue')
const diary = () => import('@/views/Right/Diary/index.vue')
const diary_home = () => import('@/views/Right/Diary/diaryHome.vue')
const login = () => import('@/views/Login/index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/person',
          component: myself
        },
        {
          path: '/',
          component: Search
        },
        {
          path: '/music',
          component: Music,
          children: [
            {
              path: '',
              component: music_home
            },
            {
              path: 'lyric',
              component: music_lyric
            }
          ]
        },
        {
          path: '/diary',
          component: diary
        },
        {
          path: '/diary-home',
          component: diary_home
        },
        {
          path: '/nav',
          component: nav
        },
        {
          path: '/plan',
          component: plan
        },
        {
          path: '/set',
          component: set
        },
        {
          path: '/about',
          component: about
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: undefined404
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 获取token
  const token = localStorage.getItem('Token') // 确保这里的键名与您存储 token 时使用的键名一致

  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next() // 确保一定要调用 next()，否则钩子就不会被resolved
  }
})

export default router
