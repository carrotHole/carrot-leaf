<script setup lang="ts">

import { Bell, Fold, Menu } from '@element-plus/icons-vue'
import { logoutRequest } from '@/api/loginRequest'
import router from '@/router'
import SessionStoreUtil from '@/util/SessionStoreUtil'

const handleLogout = async () => {
  await logoutRequest()
  SessionStoreUtil.logout()
  router.push('/login')
}

// todo 动态加载logo,title
</script>

<template>
  <div class="layout-header">

    <div class="layout-header-left">
      <div class="layout-header-title">
        <img class="layout-header-title-logo" src="@/assets/logo.png" alt="萝卜坑" />
        <span class="layout-header-title-name">carrot hole</span>
      </div>

      <div class="layout-header-button">
        <el-button :icon="Fold" text size="large" />
      </div>
    </div>

    <div class="layout-header-right">
      <div class="layout-header-msg">
        <el-button :icon="Bell" text size="large" />
      </div>
      <div class="layout-header-avatar">
        <img class="layout-header-avatar-img" src="@/assets/avatar.png" alt="avatar" />
        <div class="layout-header-avatar-name" @click="handleLogout">管理员</div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.layout-header {
  border-bottom: 1px solid var(--carrot-color-14);
  justify-content: space-between;
  display: flex;
  height: 55px;
  width: 100%;
  text-align: center;

  .layout-header-left{
    display: flex;
    .layout-header-title {
      width: 220px;
      background-color: var(--carrot-color-14);

      .layout-header-title-logo {
        width: 40px;
        height: 40px;
        vertical-align: middle;
        display: inline-block;
      }

      .layout-header-title-name {
        color: #D14104;
        font-size: 30px;
        font-weight: bold;
        margin-left: 10px;
        line-height: 55px;
        vertical-align: middle;
        display: inline-block;
      }
    }

    .layout-header-button {
      display: flex;
      justify-content: center;
      align-items: center;

      .el-button {
        font-size: 20px;
        width: 55px;
        height: 54px;
      }
    }
  }

  .layout-header-right{
    display: flex;
    margin-right: 20px;

    .layout-header-msg{
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-button {
        font-size: 20px;
        width: 55px;
        height: 54px;
      }
    }


    .layout-header-avatar {

      .layout-header-avatar-img {
        width: 35px;
        height: 35px;
        vertical-align: middle;
        display: inline-block;
        justify-content: center;
      }

      .layout-header-avatar-name {
        font-size: 20px;
        margin-left: 10px;
        line-height: 55px;
        vertical-align: middle;
        display: inline-block;
      }
    }
  }



}
</style>