<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { userSave, userUpdate } from '@/api/user'
import MessageUtil from '@/util/MessageUtil'

const emit = defineEmits(['update:editDialogVisible'])
const props = defineProps({
  editData: {type: Object, required: true},
  searchPageListRef: {type: Object, required: true},
  editDialogVisible: {type: Boolean, required: true},
})

const editData = ref(computed({
  get: () => props.editData
}))
const editDialogVisible_ = ref(computed({
  get: () => props.editDialogVisible,
  set: (value) => {emit('update:editDialogVisible', value)}
}))
/**
 * 点击编辑保存按钮
 */
const handleEditSubmit = async (data: UserInfo) => {
  data.id ? await userUpdate(data) : await userSave(data)
  editDialogVisible_.value = false
  MessageUtil.success('保存成功')
  props.searchPageListRef.refresh()
}

</script>

<template>
  <el-dialog v-model="editDialogVisible_" draggable title="用户编辑" width="700">
    <el-form :data="editData" label-width="auto" style="padding: 16px">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="用户名">
            <el-input v-model="editData.username" :disabled="editData.id!==undefined"/>
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
      <el-button icon="Close" @click="editDialogVisible_=false">取消</el-button>
      <el-button type="primary" icon="Check" @click="handleEditSubmit(editData)">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>