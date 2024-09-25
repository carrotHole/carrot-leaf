<script setup lang="ts">

import { ref, computed } from 'vue'
import { addDictContent, updateDictContent } from '@/api/dict'
import MessageUtil from '@/util/MessageUtil'

const emit = defineEmits(['update:editDialogVisible', 'refresh'])
const props = defineProps({
  editData: {type: Object, required: true},
  editDialogVisible: {type: Boolean, required: true},
})

const editData = ref(computed({
  get: () => props.editData,
}))
const editDialogVisible_ = ref(computed({
  get: () => props.editDialogVisible,
  set: (value) => {emit('update:editDialogVisible', value)}
}))

/**
 * 点击编辑保存按钮
 */
const handleEditSubmit = async (data: DictContent) => {
  data.id ? await updateDictContent(data) : await addDictContent(data)
  editDialogVisible_.value = false
  MessageUtil.success('保存成功')
  // 刷新列表
  emit('refresh')
}

</script>

<template>
  <el-dialog v-model="editDialogVisible_" draggable title="用户编辑" width="500">
    <el-form :data="editData" label-width="auto" style="padding: 16px">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="标志">
            <el-input v-model="editData.mark" :disabled="editData.id!==undefined"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="名称">
            <el-input v-model="editData.name" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="editData.remark" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="排序">
            <el-input type="number" v-model="editData.sort" />
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