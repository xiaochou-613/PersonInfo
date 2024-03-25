import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Layout/index.vue'
import Music from '@/views/Right/Music/index.vue'
import Search from '@/views/Right/Search/index.vue'
import music_home from '@/views/Right/Music/components/music_home.vue'
import music_lyric from '@/views/Right/Music/components/music_lyric.vue'
import myself from '@/views/Right/Myself/index.vue'
import set from '@/views/Right/Set/index.vue'
import undefined404 from '@/views/404/index.vue'
import nav from '@/views/Right/Navigation/index.vue'
import plan from '@/views/Right/Plan/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: myself
        },
        {
          path: '/baidu',
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
