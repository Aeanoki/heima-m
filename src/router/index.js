import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/login/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: index
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        // redirect: '/',
        component: () => import('@/views/home/')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'wenda',
        name: 'wenda',
        component: () => import('@/views/wenda')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    // props: ['articleID'],
    path: '/aritcle/:articleID',
    name: 'aritcle',
    component: () => import('@/views/aritcle'),
    props: true
  },

  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user/')
  }
]
const router = new VueRouter({
  routes
})

export default router
