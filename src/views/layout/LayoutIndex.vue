<script setup lang="ts">
import Header from '@/views/layout/component/Header.vue'
import Aside from '@/views/layout/component/Aside.vue'
import Main from '@/views/layout/component/Main.vue'
import Footer from '@/views/layout/component/Footer.vue'
import { ref } from 'vue'
import { menuPage } from '@/api/menu'
import router from '@/router'
// 获取菜单


</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <Aside></Aside>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-header {
  padding: 0;
  height: var(--carrot-header-height);
}

.el-footer {
  height: var(--carrot-footer-height);
}

.el-main {
  height: calc(100vh - var(--carrot-header-height) - var(--carrot-footer-height));
  min-height: var(--carrot-main-height);
}

.el-aside {
  height: calc(100vh - var(--carrot-header-height));
  min-height: calc(var(--carrot-main-height) + var(--carrot-footer-height));
  background-color: var(--carrot-color-19);
}
</style>
