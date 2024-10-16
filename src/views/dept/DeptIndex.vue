<script setup lang="ts">
import { ref } from 'vue'
import { DeptInfo, DeptResult, DeptTreeResult } from '@/entity/au/Dept'
import SearchPageList from '@/views/component/SearchPageList.vue'
import DeptEditDialog from './DeptEditDialog.vue'
import AdminUtil from '@/util/AdminUtil'
import { removeDept } from '@/api/dept'
import BeanUtil from '@/util/BeanUtil'
import MessageUtil from '@/util/MessageUtil'
import type { FormInstance } from 'element-plus'
import type { DictContent } from '@/entity/sys/DictContent'
import { DeptUtil } from '@/util/DeptUtil'
const searchPageListRef = ref<FormInstance>({})
const editData = ref<DeptInfo>(new DeptInfo())
const editDialogVisible = ref(false)
const editDialogUpdate = ref(false)
const deptTypeList = ref<DictContent>()
const deptList = ref<DeptTreeResult[]>()

/**
 * 获取列表数据
 */
const getDataList = async () => {
  const data = await DeptUtil.getDeptTreeList(true)
  deptList.value = await DeptUtil.formatSelectorTree()
  return data
}

/**
 * 点击编辑/新增按钮
 */
const handleEdit = (row: DeptResult|undefined, update: boolean) => {
  editDialogUpdate.value = update
  if (row){
    editData.value =BeanUtil.deepCopy(row)
  }else {
    const deptInfo = new DeptInfo();
    deptInfo.deptType = '1';
    deptInfo.sort = 1;
    deptInfo.status = 1
    editData.value = deptInfo;
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

</script>

<template>
  <div>
    <SearchPageList :get-data-list="getDataList"  title="组织机构" ref="searchPageListRef" :showPage="false" :showResetButton="false" :showSearchButton="false">

      <template #button>
        <el-button size="default" icon="Plus" type="primary" @click="handleEdit(undefined, false)"> 新增 </el-button>
        <el-button size="default" icon="Download"> 导出 </el-button>
        <el-button size="default" icon="Refresh" @click="searchPageListRef?.refresh()"> 刷新 </el-button>
        <el-button size="default" icon="Delete" type="danger"> 批量删除 </el-button>
      </template>
      <template #pageList>
        <el-table-column prop="deptName" label="名称" />
        <el-table-column prop="deptTypeValue" label="类型"  />
        <el-table-column  label="操作"  fixed="right" align="center">
          <template #default="{ row }">
            <el-button @click="handleEdit(row, true)" type="primary" v-if="!AdminUtil.isSuperAdmin(row.username)">编辑</el-button>
            <el-button @click="handDelete(row)" type="danger" v-if="!AdminUtil.isSuperAdmin(row.username)">删除</el-button>
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