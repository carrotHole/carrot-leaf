<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { ProjectQuery, ProjectInfo, ProjectResult } from '@/entity/au/Project'

import SearchPageList from '@/views/component/SearchPageList.vue'
import ProjectEditDialog from './ProjectEditDialog.vue'



import AdminUtil from '@/util/AdminUtil'
import { getProjectPage, removeProject } from '@/api/project'
import BeanUtil from '@/util/BeanUtil'
import MessageUtil from '@/util/MessageUtil'

const queryParams = ref<ProjectQuery>(new ProjectQuery())
const searchPageListRef = shallowRef<InstanceType<typeof SearchPageList>>()
const editData = ref<ProjectInfo>(new ProjectInfo(0))
const editDialogVisible = ref(false)
const editDialogUpdate = ref(false)

/**
 * 获取列表数据
 * @param page
 */
const getDataList = async (page: Page) => {
  const { data } = await getProjectPage(page,queryParams.value)
  return data
}

/**
 * 点击重置查询按钮
 */
const queryParamsReset = () => {
  queryParams.value = new ProjectQuery()
  searchPageListRef.value?.refresh()
}

/**
 * 点击编辑/新增按钮
 */
const handleEdit = (row: ProjectResult|undefined, update: boolean) => {
  editDialogUpdate.value = update
  editData.value = row ? BeanUtil.deepCopy(row) : new ProjectInfo(0)
  editDialogVisible.value = true
}
/**
 * 点击删除按钮
 */
const handDelete = async (data: UserInfo) => {

  if (await MessageUtil.confirm('确定删除当前用户？') ){
    if (!data.id){
      return
    }
    await removeProject(data.id)
    MessageUtil.success('删除成功')
    searchPageListRef.value?.refresh()
  }
}
</script>

<template>
  <div>
    <SearchPageList :get-data-list="getDataList" @reset="queryParamsReset" title="用户列表" ref="searchPageListRef">
      <template #search>
        <el-col :span="6">
          <el-form-item label="项目名">
            <el-input v-model="queryParams.projectName" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="状态">
            <el-input v-model="queryParams.status" />
          </el-form-item>
        </el-col>
      </template>
      <template #button>
        <el-button size="default" icon="Plus" type="primary" @click="handleEdit(undefined, false)"> 新增 </el-button>
        <el-button size="default" icon="Download"> 导出 </el-button>
        <el-button size="default" icon="Refresh" @click="searchPageListRef?.refresh()"> 刷新 </el-button>
        <el-button size="default" icon="Delete" type="danger"> 批量删除 </el-button>
      </template>
      <template #pageList>
        <el-table-column prop="id" label="主键" />
        <el-table-column prop="projectName" label="应用名称"  />
        <el-table-column prop="statusValue" label="状态"  />
        <el-table-column prop="createdTime" label="创建时间" />
        <el-table-column  label="操作"  fixed="right" align="center">
          <template #default="{ row }">
            <el-button @click="handleEdit(row, true)" type="primary" v-if="!AdminUtil.isAdmin(row.username)">编辑</el-button>
            <el-button @click="handDelete(row)" type="danger" v-if="!AdminUtil.isAdmin(row.username)">删除</el-button>
<!--            <el-button @click="handleUpdateStatus(row,0,'禁用')" v-if="row.status == 1 && !AdminUtil.isAdmin(row.username)">禁用</el-button>-->
<!--            <el-button @click="handleUpdateStatus(row, 1, '解禁')" v-if="row.status !== 1 && !AdminUtil.isAdmin(row.username)">解禁</el-button>-->
          </template>
        </el-table-column>
      </template>
    </SearchPageList>
    <!--  新增修改  -->
    <ProjectEditDialog :edit-data="editData" :editDialogUpdate="editDialogUpdate" v-model="editDialogVisible" :search-page-list-ref="searchPageListRef" ></ProjectEditDialog>

    <!--  详情dialog  -->

  </div>
</template>

<style scoped>

</style>