import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import SessionStoreUtil from '@/util/SessionStoreUtil'

const routers = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/LayoutIndex.vue'),
    children: []
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

const subMenus = [
  {
    menuName: '用户',
    icon: 'UserFilled',
    permissionCode: '',
    menuType: 2,
    id: '11',
    children: [],
    menuUrl: '/user',
    componentPath: '/menu/MenuIndex'
  },
  {
    menuName: '角色',
    icon: 'Discount',
    permissionCode: '',
    menuType: 2,
    id: '12',
    children: [],
    menuUrl: '/role',
    componentPath: '/menu/MenuIndex'
  },
  {
    menuName: '菜单',
    icon: 'OfficeBuilding',
    permissionCode: '',
    menuType: 2,
    id: '13',
    children: [],
    menuUrl: '/menu',
    componentPath: '/menu/MenuIndex'
  }
]

router.beforeEach((to, from, next) => {
  console.log('------')
  console.log(to)

  if (whiteList.includes(to.name?.toString() || '')){
    return next()
  }

  if (SessionStoreUtil.getToken()) {
    alert(1)
    if (to.path === '/login') {
      return next({ path: '/' })
    } else {

      // todo 权限校验
      const layout = router.getRoutes().find(item => item.name === 'layout')
      if (layout && layout.children.length < 1) {
        subMenus.forEach(item => {
          router.addRoute(
            layout.name ? layout.name : 'layout',
            {
              name: item.menuName,
              path: item.menuUrl,
              component: defineAsyncComponent(() => import(`../views/${item.componentPath}.vue`))
            })
        })
      }
      console.log(router.getRoutes())
      return next()
    }
  } else {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

})

export default router
