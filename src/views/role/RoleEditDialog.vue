<script setup lang="ts">
import { roleSave, roleUpdate } from '@/api/role'
import MessageUtil from '@/util/MessageUtil'
import {RoleInfo, RoleResult } from '@/entity/au/Role'


const props = defineProps({
  searchPageListRef: {type: Object, required: true},
})

const editData = defineModel<RoleResult>('editData',{default:()=>{}});
const editDialogVisible_ = defineModel()
/**
 * 点击编辑保存按钮
 */
const handleEditSubmit = async (data: RoleInfo) => {
  data.id ? await roleUpdate(data) : await roleSave(data)
  editDialogVisible_.value = false
  MessageUtil.success('保存成功')
  props.searchPageListRef.refresh()
}

</script>

<template>
  <el-dialog v-model="editDialogVisible_" draggable title="角色编辑" width="500">
    <el-form :data="editData" label-width="auto" style="padding: 16px">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="角色名">
            <el-input v-model="editData.roleName"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所属应用">
            <el-input v-model="editData.projectId" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea"  v-model="editData.remark" />
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