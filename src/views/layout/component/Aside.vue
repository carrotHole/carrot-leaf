<script setup lang="ts">
import { ref } from 'vue'
import { ElIcon } from 'element-plus'
import router from '@/router'

const isCollapse = ref(false) // 确保提供了 isCollapse 的值

const menuTree = ref<MenuResult[]>([
  {
    menuName: '基础管理',
    icon: 'More',
    permissionCode: '',
    menuType: 1,
    id: '1',
    children: [
      {
        menuName: '用户',
        icon: 'UserFilled',
        permissionCode: '',
        menuType: 2,
        id: '11',
        children: [],
        menuUrl:"/user"
      },
      {
        menuName: '角色',
        icon: 'Discount',
        permissionCode: '',
        menuType: 2,
        id: '12',
        children: [],
        menuUrl:"/role"
      },
      {
        menuName: '菜单',
        icon: 'OfficeBuilding',
        permissionCode: '',
        menuType: 2,
        id: '13',
        children: [],
        menuUrl:"/menu"
      }
    ]
  },
  {
    menuName: '系统管理',
    icon: 'More',
    permissionCode: '',
    menuType: 1,
    id: '2',
    children: [
      {
        menuName: '测试',
        icon: 'UserFilled',
        permissionCode: '',
        menuType: 2,
        id: '21',
        children: []
      }
    ]
  }
])

const menuClick = (item: MenuResult) => {
  router.push(item.menuUrl)
}
</script>

<template>
  <el-scrollbar class="layout-aside">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <span v-for="item in menuTree" :key="item.id">
        <el-sub-menu v-if="item.menuType === 1" :index="item.id">
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.menuName }}</span>
          </template>

          <el-menu-item
            vi-if="item.children.length>0"
            v-for="child in item.children"
            :key="child.id"
            :index="child.id"
            @click="menuClick(child)"
          >
            <el-icon><component :is="child.icon" /></el-icon>
            <span>{{ child.menuName }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else-if="item.menuType === 2"
                      @click="menuClick(child)"
                      :key="item.id"
                      :index="item.id">
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </span>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>

.layout-aside{
  height: calc(100vh - var(--carrot-header-height));
}

.el-menu-item.is-active {
  background-color: var(--carrot-color-16);
}
.el-menu {
  background: var(--carrot-color-19);
  border-right: 0;
}
.el-menu-item {
  background-color: var(--carrot-color-18);
}

.el-menu-item:hover{
  background-color: #EFF3FE;
}
.el-sub-menu__title:hover{
  background-color: #FFF5E5;
}

</style>
