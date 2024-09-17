import { createRouter, createWebHistory } from 'vue-router'
import CommonLayout from '@/views/layout/LayoutIndex.vue' // 引入你的布局组件

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/layout' // 默认重定向到/home路由
    },
    {
      path: '/layout',
      name: 'layout',
      component: CommonLayout,
      meta: { // 路由元信息，用于传递需要加载的组件名
        componentName: 'Home'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: CommonLayout,
      meta: {
        componentName: 'About'
      }
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginIndex.vue')
    }
  ]
})

export default router
