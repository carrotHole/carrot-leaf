<script setup lang="ts">
import { ref } from 'vue'
import { ElIcon } from 'element-plus'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

const isCollapse = ref(false) // 确保提供了 isCollapse 的值

const menuTree = ref<Menu[]>([
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
        children: []
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
          >
            <el-icon><component :is="child.icon" /></el-icon>
            <span>{{ child.menuName }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else-if="item.menuType === 2"
          >" :key="item.id" :index="item.id" :>
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </span>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
.el-menu-item.is-active {
  background-color: #F8AA42 !important;
}
.el-menu {
  background: var(--carrot-menu-bg-color);
}


</style>
