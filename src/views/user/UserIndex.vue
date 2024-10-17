<script setup lang="ts">
import SearchPageList from '@/views/component/SearchPageList.vue'
import UserEditDialog from './UserEditDialog.vue'
import { ref, shallowRef } from 'vue'
import { userRemove, userPage, userUpdateStatus } from '@/api/user'
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

const searchPageListRef = ref<FormInstance>({})
const queryParams = ref<UserQuery>({
  createdType: undefined,
  deptId: undefined,
  nickname: undefined,
  realUser: undefined,
  status: undefined,
  tenantId: undefined,
  username: undefined
})
const editDialogVisible = ref(false)
const editData = ref<UserInfo>()
const dictContentList = ref<DictContent[]>()
const deptList = ref<DeptTreeResult[]>()

const getDataList = async (page: Page) => {
  const { data } = await userPage(page,queryParams.value)
  return data
}

const getDeptList = async () => {
  deptList.value = await DeptUtil.getDeptTreeList()
}

/**
 * 点击编辑
 */
const handleEdit = (user : UserInfo) => {
  editData.value = BeanUtil.deepCopy(user)
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
    await userRemove(data.id)
    MessageUtil.success('删除成功')
    searchPageListRef.value?.refresh()
  }
}

/**
 * 修改用户状态
 */
const handleUpdateStatus = async (user: UserInfo, status:number, text:string) => {
  if (await MessageUtil.confirm(`确定${text}当前用户？`)){
    if (!user.id){
      return
    }
    await userUpdateStatus({id:user.id, status:status})
    MessageUtil.success('修改成功')
    searchPageListRef.value?.refresh()
  }
}

/**
 * 点击查询重置按钮
 */
const queryParamsReset = async () => {
  queryParams.value = {
    createdType: undefined,
    deptId: undefined,
    nickname: undefined,
    realUser: undefined,
    status: undefined,
    tenantId: undefined,
    username: undefined
  }
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
    <SearchPageList :get-data-list="getDataList" @reset="queryParamsReset" title="用户列表" ref="searchPageListRef">
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
            <DictSelect v-model="queryParams.status" :dict-content-list="dictContentList"></DictSelect>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门">
            <DeptSelect v-model="queryParams.deptId" :dept-list="deptList" placeholder="组织机构" :clearable="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="昵称">
            <el-input v-model="queryParams.nickname" />
          </el-form-item>
        </el-col>
      </template>
      <template #button>
        <el-button size="default" icon="Plus" type="primary" @click="handleEdit({deptId: undefined ,id: undefined ,nickname: undefined ,tenantId: undefined ,username: undefined, realUser:1, status:1, sort:0, createdType:1})"> 新增 </el-button>
        <el-button size="default" icon="Download"> 导出 </el-button>
        <el-button size="default" icon="Refresh" @click="searchPageListRef?.refresh()"> 刷新 </el-button>
        <el-button size="default" icon="Delete" type="danger"> 批量删除 </el-button>
      </template>
      <template #pageList>
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="nickname" label="昵称" width="180" />
        <el-table-column prop="realUserValue" label="真实用户" width="180" />
        <el-table-column prop="statusValue" label="状态" />
        <el-table-column prop="createdTime" label="创建时间" />
        <el-table-column  label="操作"  fixed="right" align="center">
          <template #default="{ row }">
            <el-button @click="handleEdit(row)" type="primary" v-if="!AdminUtil.isAdmin(row.username)">编辑</el-button>
            <el-button @click="handDelete(row)" type="danger" v-if="!AdminUtil.isAdmin(row.username)">删除</el-button>
            <el-button @click="handleUpdateStatus(row,0,'禁用')" v-if="row.status == 1 && !AdminUtil.isAdmin(row.username)">禁用</el-button>
            <el-button @click="handleUpdateStatus(row, 1, '解禁')" v-if="row.status !== 1 && !AdminUtil.isAdmin(row.username)">解禁</el-button>
          </template>
        </el-table-column>
      </template>
    </SearchPageList>
<!--  新增修改  -->
      <UserEditDialog :edit-data="editData"  v-model="editDialogVisible" :search-page-list-ref="searchPageListRef" :dept-list="deptList"></UserEditDialog>

<!--  详情dialog  -->

  </div>
</template>

<style scoped>

</style>
