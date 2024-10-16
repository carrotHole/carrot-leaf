<script setup lang="ts">
import MessageUtil from '@/util/MessageUtil'
import { saveDept, updateDept } from '@/api/dept'
import type { DeptInfo } from '@/entity/au/Dept'
import DictSelect from '@/views/component/DictSelect.vue'
import DeptSelect from '@/views/component/DeptSelect.vue'
import DeptConstant from '@/constant/DeptConstant'

const props = defineProps({
  searchPageListRef: { type: Object, required: true },
})

const editData = defineModel<DeptInfo>('editData', {
  default: () => {
  }
})
const editDialogVisible_ = defineModel()
const editDialogUpdate_ = defineModel<boolean>('editDialogUpdate')
const deptList = defineModel('deptList',)
/**
 * 点击编辑保存按钮
 */
const handleEditSubmit = async (data: DeptInfo | undefined) => {
  if (!data) {
    return
  }
  editDialogUpdate_.value ? await updateDept(data) : await saveDept(data)
  editDialogVisible_.value = false
  MessageUtil.success('保存成功')
  props.searchPageListRef.refresh()
}

</script>

<template>
  <el-dialog v-model="editDialogVisible_" draggable title="组织机构编辑" width="500">
    <el-form :data="editData" label-width="auto" style="padding: 16px">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="父级组织机构">
            <DeptSelect v-model="editData.parentId" :dept-list="deptList" :placeholder="DeptConstant.ROOT_DEPT_NAME"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="部门名称">
            <el-input v-model="editData.deptName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序">
            <el-input-number controls-position="right" v-model="editData.sort" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <template #footer>
      <el-button icon="Close" @click="editDialogVisible_=false">取消</el-button>
      <el-button type="primary" icon="Check" @click="handleEditSubmit(editData)">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>