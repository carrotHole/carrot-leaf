<script setup lang="ts">
import SearchPageList from '@/views/component/SearchPageList.vue'
import RoleEditDialog from './RoleEditDialog.vue'
import { ref, shallowRef } from 'vue'
import { roleRemove, rolePage, roleUpdateStatus } from '@/api/role'
import MessageUtil from '@/util/MessageUtil'
import AdminUtil from '@/util/AdminUtil'
import BeanUtil from '@/util/BeanUtil'
import { listContentByType } from '@/api/dict'
import DictClassConstant from '@/constant/DictClassConstant'
import DictSelect from '@/views/component/DictSelect.vue'
import type { FormInstance } from 'element-plus'
import DeptSelect from '@/views/component/DeptSelect.vue'
import type { DictContent } from '@/entity/sys/DictContent'
import type { DeptTreeResult } from '@/entity/au/Dept'
import { DeptUtil } from '@/util/DeptUtil'
import { RoleInfo, RoleQuery } from '@/entity/au/Role'

const searchPageListRef = ref<FormInstance>({})
const queryParams = ref<RoleQuery>(new RoleQuery())
const editDialogVisible = ref(false)
const authorizeDialogVisible = ref(false)
const editData = ref<RoleInfo>()
const dictContentList = ref<DictContent[]>()
const deptList = ref<DeptTreeResult[]>()

const getDataList = async (page: Page) => {
  const { data } = await rolePage(page,queryParams.value)
  return data
}

const getDeptList = async () => {
  deptList.value = await DeptUtil.getDeptTreeList()
}

/**
 * 点击编辑按钮
 */
const handleEdit = (role : RoleInfo) => {
  editData.value = BeanUtil.deepCopy(role)
  editDialogVisible.value = true
}


/**
 * 点击删除按钮
 */
const handDelete = async (data: RoleInfo) => {

  if (await MessageUtil.confirm('确定删除当前角色？') ){
    if (!data.id){
      return
    }
    await roleRemove(data.id)
    MessageUtil.success('删除成功')
    searchPageListRef.value?.refresh()
  }
}

/**
 * 点击授权按钮
 */
const handAuthrize = (role: RoleInfo) => {
  editData.value = role
  authorizeDialogVisible.value = true
}


/**
 * 修改角色状态
 */
const handleUpdateStatus = async (role: RoleInfo, status:number, text:string) => {
  if (await MessageUtil.confirm(`确定${text}当前角色？`)){
    if (!role.id){
      return
    }
    await roleUpdateStatus({id:role.id, status:status})
    MessageUtil.success('修改成功')
    searchPageListRef.value?.refresh()
  }
}

/**
 * 点击查询重置按钮
 */
const queryParamsReset = async () => {
  queryParams.value = new RoleQuery()
  searchPageListRef.value?.refresh()
}


const getDictContentList= async ()=>{
  const {data} = await listContentByType('STATUS', DictClassConstant.SYS)
  dictContentList.value = data
}

getDictContentList()
getDeptList()
</script>

<template>
  <div>
    <SearchPageList :get-data-list="getDataList" @reset="queryParamsReset" title="角色列表" ref="searchPageListRef">
      <template #search>
        <el-col :span="6">
          <el-form-item label="角色名">
            <el-input v-model="queryParams.roleName" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="应用">
            <el-input v-model="queryParams.projectId" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="组织机构">
            <DeptSelect v-model="queryParams.deptId" :dept-list="deptList" placeholder="组织机构" :clearable="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-input v-model="queryParams.status" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备注">
            <el-input v-model="queryParams.remark" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="权限范围">
            <el-input v-model="queryParams.menuRange" />
          </el-form-item>
        </el-col>
      </template>
      <template #button>
        <el-button size="default" icon="Plus" type="primary" @click="handleEdit(new RoleInfo())"> 新增 </el-button>
        <el-button size="default" icon="Download"> 导出 </el-button>
        <el-button size="default" icon="Refresh" @click="searchPageListRef?.refresh()"> 刷新 </el-button>
        <el-button size="default" icon="Delete" type="danger"> 批量删除 </el-button>
      </template>
      <template #pageList>
        <el-table-column prop="roleName" label="角色名" />
        <el-table-column prop="projectId" label="所属应用" />
        <el-table-column prop="deptId" label="组织机构" />
        <el-table-column prop="statusValue" label="状态" />
        <el-table-column  label="操作"  fixed="right" align="center">
          <template #default="{ row }">
            <el-button-group>
              <el-button @click="handleEdit(row)" text type="primary" >编辑</el-button>
              <el-button @click="handDelete(row)" text type="danger">删除</el-button>
              <el-button @click="handAuthrize(row)" text type="success">授权</el-button>
              <el-button @click="handleUpdateStatus(row,0,'禁用')" text v-if="row.status == 1 ">禁用</el-button>
              <el-button @click="handleUpdateStatus(row, 1, '解禁')" text v-if="row.status !== 1 && row.menuRange !== 0">解禁</el-button>
            </el-button-group>

          </template>
        </el-table-column>
      </template>
    </SearchPageList>
    <!--  新增修改  -->
    <RoleEditDialog :edit-data="editData"  v-model="editDialogVisible" :search-page-list-ref="searchPageListRef" :dept-list="deptList"></RoleEditDialog>

    <!--  详情dialog  -->

  </div>
</template>

<style scoped>

</style>
