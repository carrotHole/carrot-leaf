import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import {SessionStoreUtil} from '@/util/SessionStoreUtil'

const routers = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/LayoutIndex.vue'),
    children: [
      {
        name: '用户',
        path: '/user',
        component: () => import('@/views/user/UserIndex.vue')
      },
      {
        name: '应用',
        path: '/project',
        component: () => import('@/views/project/ProjectIndex.vue')
      },
      {
        name: '角色',
        path: '/role',
        component: () => import('@/views/menu/MenuIndex.vue')
      },
      {
        name: '菜单',
        path: '/menu',
        component: () => import('@/views/menu/MenuIndex.vue')
      },
      {
        name: '字典',
        path: '/dict',
        component: () => import('@/views/dict/DictIndex.vue')
      }
    ],
    redirect: '/user'
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/AboutView.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginIndex.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: { name: '404' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routers
})

const whiteList = ['login']


router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.name?.toString() || '')){
    return next()
  }

  if (SessionStoreUtil.getToken()) {
    // todo 权限校验
    return next()
  } else {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

})

export default router
