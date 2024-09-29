<script setup lang="ts">
import MessageUtil from '@/util/MessageUtil'
import { saveMenu, updateMenu } from '@/api/menu'
import type { DictContent } from '@/entity/sys/DictContent'
import type { MenuInfo } from '@/entity/au/Menu'
import DictSelect from '@/views/component/DictSelect.vue'

const props = defineProps({
  searchPageListRef: { type: Object, required: true },
  menuTypeList: { type: Array<DictContent>, required: true },
})

const editData = defineModel<MenuInfo>('editData', {
  default: () => {
  }
})
const editDialogUpdate_ = defineModel<boolean>('editDialogUpdate')
const editDialogVisible_ = defineModel()
/**
 * 点击编辑保存按钮
 */
const handleEditSubmit = async (data: MenuInfo | undefined) => {
  if (!data) {
    return
  }
  editDialogUpdate_.value ? await updateMenu(data) : await saveMenu(data)
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
          <el-form-item label="父级菜单">
            <el-input v-model="editData.parentId" placeholder="顶级菜单"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名">
            <el-input v-model="editData.menuName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单类型">
            <DictSelect v-model="editData.menuType" :dict-content-list="menuTypeList"></DictSelect>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限编码">
            <el-input v-model="editData.permissionCode" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="editData.menuType === '1'">
          <el-form-item label="菜单地址">
            <el-input v-model="editData.menuUrl" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="editData.menuType === '1'">
          <el-form-item label="组件路径" >
            <el-input v-model="editData.componentPath" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-radio-group v-model="editData.status">
              <el-radio :value="0" size="large">正常</el-radio>
              <el-radio :value="1" size="large">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图标">
            <el-input v-model="editData.icon" />
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