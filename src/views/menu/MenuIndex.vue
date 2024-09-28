<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { MenuQuery, MenuInfo, MenuResult } from '@/entity/au/Menu'
import SearchPageList from '@/views/component/SearchPageList.vue'
import MenuEditDialog from './MenuEditDialog.vue'
import AdminUtil from '@/util/AdminUtil'
import { getMenuTree, removeMenu } from '@/api/menu'
import BeanUtil from '@/util/BeanUtil'
import MessageUtil from '@/util/MessageUtil'
import type { FormInstance } from 'element-plus'
import type { ProjectResult } from '@/entity/au/Project'
import { getProjectList } from '@/api/project'

const queryParams = ref<MenuQuery>(new MenuQuery())
const searchPageListRef = ref<FormInstance>({})
const editData = ref<MenuInfo>(new MenuInfo(0))
const editDialogVisible = ref(false)
const editDialogUpdate = ref(false)
const projectList = ref<ProjectResult[]>()

/**
 * 获取列表数据
 * @param page
 */
const getDataList = async (page: Page) => {
  if (!queryParams.value?.projectId){
    return []
  }
  console.log(queryParams.value?.projectId)
  const { data } = await getMenuTree(queryParams.value?.projectId)
  return data
}

/**
 * 点击重置查询按钮
 */
const queryParamsReset = () => {
  queryParams.value = new MenuQuery()
  searchPageListRef.value?.refresh()
}

/**
 * 点击编辑/新增按钮
 */
const handleEdit = (row: MenuResult|undefined, update: boolean) => {
  editDialogUpdate.value = update
  editData.value = row ? BeanUtil.deepCopy(row) : new MenuInfo(0)
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
    await removeMenu(data.id)
    MessageUtil.success('删除成功')
    searchPageListRef.value?.refresh()
  }
}

/**
 * 获取应用列表
 */
const getProject = async () => {
  // 获取应用考评表
  const { data } = await getProjectList({})
  if (data){
    // 列表第一个为默认应用
    queryParams.value.projectId = data[0].id
  }
  // 赋值
  projectList.value = data
  // 获取菜单列表
  if (!searchPageListRef.value.getList()){
    searchPageListRef.value.refresh()
  }
}

onMounted(async ()=>{
  console.log('mounted')
  await getProject()
})
</script>

<template>
  <div>
    <SearchPageList :get-data-list="getDataList" @reset="queryParamsReset" title="菜单树" ref="searchPageListRef" :showPage="false">
      <template #search>
        <el-col :span="6">
          <el-form-item label="所属应用">
            <el-input v-model="queryParams.tenantName" />
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
        <el-table-column prop="tenantName" label="租户名称"  />
        <el-table-column prop="tenantMark" label="租户标志"  />
        <el-table-column prop="linkUser" label="联系人"  />
        <el-table-column prop="linkCellphone" label="联系电话"  />
        <el-table-column prop="statusValue" label="状态"  />
        <el-table-column prop="createdTime" label="创建时间" />
        <el-table-column  label="操作"  fixed="right" align="center">
          <template #default="{ row }">
            <el-button @click="handleEdit(row, true)" type="primary" v-if="!AdminUtil.isSuperAdmin(row.username)">编辑</el-button>
            <el-button @click="handDelete(row)" type="danger" v-if="!AdminUtil.isSuperAdmin(row.username)">删除</el-button>
            <!--            <el-button @click="handleUpdateStatus(row,0,'禁用')" v-if="row.status == 1 && !AdminUtil.isAdmin(row.username)">禁用</el-button>-->
            <!--            <el-button @click="handleUpdateStatus(row, 1, '解禁')" v-if="row.status !== 1 && !AdminUtil.isAdmin(row.username)">解禁</el-button>-->
          </template>
        </el-table-column>
      </template>
    </SearchPageList>
    <!--  新增修改  -->
    <MenuEditDialog :edit-data="editData" :editDialogUpdate="editDialogUpdate" v-model="editDialogVisible" :search-page-list-ref="searchPageListRef" ></MenuEditDialog>

    <!--  详情dialog  -->

  </div>
</template>

<style scoped>

</style>