  <script setup lang="ts">
  import Header from '@/views/layout/component/Header.vue'
  import Aside from '@/views/layout/component/Aside.vue'
  import Main from '@/views/layout/component/Main.vue'
  import Footer from '@/views/layout/component/Footer.vue'
  import { onMounted, onUnmounted, ref } from 'vue'
  import SessionStoreUtil from '@/util/SessionStoreUtil'
  import router from '@/router'
  import { getUserInfo } from '@/api/loginRequest'
  import {mainRef, mainInit, mainDestroy} from '@/util/MainHeightUtil'

  const getInfo = async ()=>{
    const {data} = await getUserInfo()
  }

  onMounted ( ()=>{
    mainInit()
    // 获取token
    const token = SessionStoreUtil.getToken()
    if (!token) {
      router.push("/login")
      return
    }
    // 后台获取用户信息
    getInfo()

  })


  onUnmounted(() => {
    // 在组件销毁前取消观察
    mainDestroy()
  })
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
            <div class="carrot-main" ref="mainRef">
              <Main></Main>
            </div>

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
  height: calc(var(--carrot-header-height) - 4px);
}
.el-footer {
  height: calc(var(--carrot-footer-height));
  text-align: center;
}
.el-main{
  padding: 0;
  margin: 0;
}
.carrot-main {
  height: calc(100vh - var(--carrot-header-height) - var(--carrot-footer-height) );
  min-height: var(--carrot-main-height);
  background-color: var(--carrot-color-20);
  padding: var(--carrot-main-padding);
}
.el-aside {
  height: calc(100vh - var(--carrot-header-height));
  min-height: calc(var(--carrot-main-height) + var(--carrot-footer-height));
  background-color: var(--carrot-color-19);
}
</style>
