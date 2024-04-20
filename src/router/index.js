import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Layout/index.vue')
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/myPage',
          component: myself
        },
        {
          path: '',
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
          component: about,
          meta: { keepAlive: true }
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

export default router
