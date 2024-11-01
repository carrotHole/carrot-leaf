<script setup lang="ts">
import {ref,onUpdated} from 'vue'
import { MenuTreeResult } from '@/entity/au/Menu'
import { RoleAuthorityGroup, RoleResult } from '@/entity/au/Role'
import DialogCard from '@/views/component/DialogCard.vue'
import CollapseBox from './CollapseBox.vue'
import type { DeptTreeResult } from '@/entity/au/Dept'

const props = defineProps({
  menuTree: Array<MenuTreeResult>,
  editData: Object
})
const auRangeOptions = ref([
  { label: '全部', value: 0 , disable: false, mutex:[1,2,3,4]},
  { label: '自定义', value: 1 , disable:false, mutex: [0,2,3,4]},
  { label: '用户所在组织机构', value: 2 , disable:false, mutex: [0,1]},
  { label: '用户所在组织机构的所有上级组织机构', value: 3 , disable:false , mutex: [0,1,4]},
  { label: '用户所在组织机构的所有下级组织机构', value: 4 , disable:false, mutex: [0,1,3]}
])

const dialogVisible = defineModel()
const authorizeGroup = defineModel<RoleAuthorityGroup>('authorizeGroup',{ default:()=> new RoleAuthorityGroup(), })
const deptTreeList = defineModel<DeptTreeResult[]>('deptTreeList')

const auRangeChange = (val: number[]) => {
  auRangeOptionsDisabled(val)
}

const auRangeOptionsDisabled = (val: number[]) => {
  auRangeOptions.value.forEach(item=>{
    item.disable=false
  })
  val.forEach(inx=>{
    auRangeOptions.value[inx].mutex.forEach(mutex=>{
      auRangeOptions.value[mutex].disable = true
    })
  })
  console.log(auRangeOptions.value)
}

onUpdated(() => {
  auRangeOptionsDisabled(authorizeGroup.value.roleAuthority.auRangeList)

})
</script>
<template>
  <el-dialog v-model="dialogVisible" draggable title="角色授权" width="1100px">
    <DialogCard title="默认授权">
      <template #content>
        <el-form :model="authorizeGroup.roleAuthority" label-width="auto" >
          <el-form-item label="菜单范围：">
            <el-radio-group v-model="authorizeGroup.roleAuthority.auMenu">
              <el-radio :value='1'>自定义</el-radio>
              <el-radio :value='2'>全部</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="数据范围：">
            <el-checkbox-group v-model="authorizeGroup.roleAuthority.auRangeList" @change="auRangeChange">
              <el-checkbox v-for="item in auRangeOptions" :key="item.value" :label="item.label" :disabled="item.disable" :value='item.value' />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label=" " v-if="authorizeGroup.roleAuthority.auRangeList.includes(1)">

               <CollapseBox title="配置数据范围" :show="true">
                 <template #content>
                   <el-tree
                     style="min-width: 500px"
                     :default-checked-keys="authorizeGroup.deptIdList"
                     :data="deptTreeList"
                     show-checkbox
                     check-strictly
                     node-key="id"
                     :expand-on-click-node="false">
                      <template #default="{ node, data }">
                      <span   class="custom-tree-node">
                          <div class="node">{{ data.deptName }}</div>
                          <div class="button">
                            <el-button link type="primary" @click="handleSelectAllDeptByNode(data)"> 全选 </el-button>
                            <el-button link type="warning" @click="handleRemoveAllDeptByNode(data)"> 清空 </el-button>
                        </div>
                      </span>
                     </template>
                   </el-tree>
                 </template>
               </CollapseBox>

          </el-form-item>
        </el-form>

      </template>
    </DialogCard>
  </el-dialog>
</template>


<style scoped>
.custom-tree-node{
  display: flex;
  justify-content: space-between;
  .button{
    margin-left: 100px;

  }
}
</style>