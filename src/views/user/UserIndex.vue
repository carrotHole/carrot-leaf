<script setup lang="ts">
import SearchPageList from '@/views/component/SearchPageList.vue'
import { ref, shallowRef } from 'vue'
import { userSave, userRemove, userPage, userUpdate, userUpdateStatus } from '@/api/user'
import MessageUtil from '@/util/MessageUtil'
import AdminUtil from '@/util/AdminUtil'


const searchPageListRef = shallowRef<InstanceType<typeof SearchPageList>>()
const queryParams = ref<UserQuery>({})
const editDialogVisible = ref(false)
const editData = ref<UserInfo>({})

const getDataList = async (page: Page, params: MenuQuery) => {
  const { data } = await userPage(page,params)
  return data
}
/**
 * 点击详情按钮
 */
const handleEdit = (user : UserInfo) => {
  editData.value = user
  console.log(editData.value)
  editDialogVisible.value = true
}
/**
 * 点击编辑保存按钮
 */
const handleEditSubmit = async (data: UserInfo) => {
  data.id ? await userUpdate(data) : await userSave(data)
  editDialogVisible.value = false
  MessageUtil.success('保存成功')
  searchPageListRef.value?.refresh()
}

/**
 * 点击删除按钮
 */
const handDelete = async (data: UserInfo) => {

  if (await MessageUtil.confirm('确定删除当前用户？') ){
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
    await userUpdateStatus({id:user.id, status:status})
    MessageUtil.success('修改成功')
    searchPageListRef.value?.refresh()
  }
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
      <template #button>
        <el-button size="default" icon="Plus" type="primary" @click="handleEdit({realUser:1, status:1, sort:0, createdType:1})"> 新增 </el-button>
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
    <el-dialog v-model="editDialogVisible" draggable title="用户编辑" width="700">
      <el-form :data="editData" label-width="auto" style="padding: 16px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="editData.username" :disabled="editData.id"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称">
              <el-input v-model="editData.nickname" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="部门">
              <el-input v-model="editData.deptId" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序">
              <el-input-number v-model="editData.sort" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="真实用户">
              <el-radio-group  v-model="editData.realUser"  :disabled="editData.id">
                <el-radio :value="0" size="large">否</el-radio>
                <el-radio :value="1" size="large">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <template #footer>
        <el-button icon="Close" @click="editDialogVisible=false">取消</el-button>
        <el-button type="primary" icon="Check" @click="handleEditSubmit(editData)">保存</el-button>
      </template>
    </el-dialog>
<!--  详情dialog  -->

  </div>
</template>

<style scoped>

</style>
