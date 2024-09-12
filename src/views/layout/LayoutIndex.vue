  <script setup lang="ts">
  import Header from '@/views/layout/component/Header.vue'
  import Aside from '@/views/layout/component/Aside.vue'
  import Main from '@/views/layout/component/Main.vue'
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
            <Main></Main>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-header {
  padding: 0;
  height: 55px;
}
.el-aside{
  background-color: #FDE3C0;
}
.el-main{
  height: calc(100vh - 110px);
  background-color: #f8f8f8;
}
.el-footer{
  height: 50px;
}
</style>
