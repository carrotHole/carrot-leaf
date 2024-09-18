  <script setup lang="ts">
  import Header from '@/views/layout/component/Header.vue'
  import Aside from '@/views/layout/component/Aside.vue'
  import Main from '@/views/layout/component/Main.vue'
  import Footer from '@/views/layout/component/Footer.vue'
  import { onMounted , ref} from 'vue'
  import SessionStoreUtil from '@/util/SessionStoreUtil'
  import router from '@/router'
  import { getUserInfo } from '@/api/loginRequest'

  const currentComponent = ref('')

  onMounted (async ()=>{
    // 获取token
    const token = SessionStoreUtil.getToken()
    if (!token) {
      router.push("/login")
      return
    }
    // 后台获取用户信息
    const {data} = await getUserInfo()
    console.log(data)
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
