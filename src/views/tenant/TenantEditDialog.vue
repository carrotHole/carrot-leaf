<script setup lang="ts">
import MessageUtil from '@/util/MessageUtil'
import { saveTenant, updateTenant } from '@/api/tenant'
import type { TenantInfo } from '@/entity/au/Tenant'

const props = defineProps({
  searchPageListRef: {type: Object, required: true},
})

const editData = defineModel<TenantInfo>('editData',{default:()=>{}});
const editDialogUpdate_ = defineModel<boolean>('editDialogUpdate')
const editDialogVisible_ = defineModel()
/**
 * 点击编辑保存按钮
 */
const handleEditSubmit = async (data: TenantInfo|undefined) => {
  if (!data){
    return
  }
  editDialogUpdate_.value ? await updateTenant(data) : await saveTenant(data)
  editDialogVisible_.value = false
  MessageUtil.success('保存成功')
  props.searchPageListRef.refresh()
}

</script>

<template>
  <el-dialog v-model="editDialogVisible_" draggable title="用户编辑" width="400">
    <el-form :data="editData" label-width="auto" style="padding: 16px">
      <el-row>

        <el-col :span="24">
          <el-form-item label="租户名称">
            <el-input v-model="editData.tenantName" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="租户标志">
            <el-input v-model="editData.tenantMark" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系人">
            <el-input v-model="editData.linkUser" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系电话">
            <el-input v-model="editData.linkCellphone" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="状态">
            <el-radio-group  v-model="editData.status">
              <el-radio :value="0" size="large">正常</el-radio>
              <el-radio :value="1" size="large">禁用</el-radio>
            </el-radio-group>
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