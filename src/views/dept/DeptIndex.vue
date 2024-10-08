<script setup lang="ts">
import ProjectSelect from '@/views/component/ProjectSelect.vue'
import { onMounted, ref, shallowRef } from 'vue'
import { DeptQuery, DeptInfo, DeptResult, DeptTreeResult } from '@/entity/au/Dept'
import SearchPageList from '@/views/component/SearchPageList.vue'
import DeptEditDialog from './DeptEditDialog.vue'
import AdminUtil from '@/util/AdminUtil'
import { getDeptTree, removeDept } from '@/api/dept'
import BeanUtil from '@/util/BeanUtil'
import MessageUtil from '@/util/MessageUtil'
import type { FormInstance } from 'element-plus'
import { ProjectQuery, type ProjectResult } from '@/entity/au/Project'
import { getProjectList } from '@/api/project'
import { getDictContentList } from '@/api/dict'
import DictClassConstant from '@/constant/DictClassConstant'
import type { DictContent } from '@/entity/sys/DictContent'

const queryParams = ref<DeptQuery>(new DeptQuery())
const searchPageListRef = ref<FormInstance>({})
const editData = ref<DeptInfo>(new DeptInfo())
const editDialogVisible = ref(false)
const editDialogUpdate = ref(false)
const projectList = ref<ProjectResult[]>()
const deptTypeList = ref<DictContent>()
const deptList = ref<DeptTreeResult[]>()

/**
 * 获取列表数据
 * @param page
 */
const getDataList = async (page: Page) => {

  const { data } = await getDeptTree()
  deptList.value = data
  return data
}

/**
 * 点击重置查询按钮
 */
const queryParamsReset = () => {
  const temp = queryParams.value.projectId
  queryParams.value = new DeptQuery()
  queryParams.value.projectId = temp
  searchPageListRef.value?.refresh()
}

/**
 * 点击编辑/新增按钮
 */
const handleEdit = (row: DeptResult|undefined, update: boolean) => {
  editDialogUpdate.value = update
  if (row){
    editData.value =BeanUtil.deepCopy(row)
  }else {
    const r = new DeptInfo();
    r.projectId = queryParams.value?.projectId;
    r.deptType = '1';
    r.sort = 1;
    editData.value = r;
  }
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
    await removeDept(data.id)
    MessageUtil.success('删除成功')
    searchPageListRef.value?.refresh()
  }
}

/**
 * 获取应用列表
 */
const getProject = async () => {
  // 获取应用考评表
  const { data } = await getProjectList(new ProjectQuery())
  if (!data){
    return
  }

  // 列表第一个为默认应用
  queryParams.value.projectId = data[0].id

  // 赋值
  projectList.value = data
  console.log('---')
  console.log(searchPageListRef.value.getList())
  console.log('---')
  // 获取菜单列表
  if (!searchPageListRef.value.getList() || searchPageListRef.value.getList().length === 0){
    searchPageListRef.value.refresh()
  }
}

/**
 * 获取菜单类型
 */

const getDeptType = async () => {
  let {data} = await getDictContentList('Dept_TYPE', DictClassConstant.SYS)
  deptTypeList.value = data
}


onMounted(async ()=>{
  getDeptType()
  await getProject()
})
</script>

<template>
  <div>
    <SearchPageList :get-data-list="getDataList" @reset="queryParamsReset" title="菜单树" ref="searchPageListRef" :showPage="false">
      <template #search>
        <el-col :span="6">
          <el-form-item label="所属应用">
            <ProjectSelect v-model="queryParams.projectId" :projectList="projectList" :clearable="false"></ProjectSelect>
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
        <el-table-column prop="DeptName" label="名称"  />
        <el-table-column prop="permissionCode" label="权限编码"  />
        <el-table-column prop="DeptUrl" label="菜单路径"  />
        <el-table-column prop="componentPath" label="组件地址"  />
        <el-table-column prop="statusValue" label="状态"  />
        <el-table-column prop="DeptType" label="类型" />
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
    <DeptEditDialog :edit-data="editData" :editDialogUpdate="editDialogUpdate" v-model="editDialogVisible" :search-page-list-ref="searchPageListRef" :deptTypeList="deptTypeList" :deptList="deptList"></DeptEditDialog>

    <!--  详情dialog  -->

  </div>
</template>

<style scoped>

</style>