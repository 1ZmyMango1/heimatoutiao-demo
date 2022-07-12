import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/demo',
    component: () => import('../views/Demo/index.vue')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('../views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import('../views/Home')
      },
      {
        path: 'qa',
        component: () => import('../views/Qa')
      },
      {
        path: 'video',
        component: () => import('../views/Video')
      },
      {
        path: 'my',
        component: () => import('../views/My')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('../views/Search')
  },
  {
    path: '/article/:articleId',
    component: () => import('../views/article/index.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
