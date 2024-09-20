<script setup lang="ts">
import SearchPageList from '@/views/component/SearchPageList.vue'
import { ref } from 'vue'
import { userPage } from '@/api/user'


const queryParams = ref<UserQuery>({})
const searchPageListRef = ref(null)

const getDataList = async (page: Page, params: MenuQuery) => {
  const { data } = await userPage(page,params)
  return data
}


</script>

<template>
  <div>
    <SearchPageList :get-data-list="getDataList" title="用户列表" ref="searchPageListRef">
      <template #search>
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-input v-model="queryParams.username" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="真实用户">
            <el-input v-model="queryParams.realUser" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="创建方式">
            <el-input v-model="queryParams.createdType" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="状态">
            <el-input v-model="queryParams.status" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门">
            <el-input v-model="queryParams.deptId" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="昵称">
            <el-input v-model="queryParams.nickname" />
          </el-form-item>
        </el-col>
      </template>

      <template #pageList>
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="nickname" label="昵称" width="180" />
        <el-table-column prop="realUserValue" label="真实用户" width="180" />
        <el-table-column prop="statusValue" label="状态" />
        <el-table-column prop="createdTime" label="创建时间" />
      </template>
    </SearchPageList>
<!--  新增修改  -->
  </div>
</template>

<style scoped>

</style>
