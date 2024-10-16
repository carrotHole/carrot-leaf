<script setup lang="ts">


import type { DeptTreeResult } from '@/entity/au/Dept'

const props = defineProps<{
  clearable?: boolean|true
  placeholder?: string|'请选择'
}>()

const data = defineModel<string>()
const deptList = defineModel<DeptTreeResult[]>('deptList')
const labelProps = {
  label: (data: { deptName: string; }) => {
    return data.deptName;
  },
}

</script>

<template>
  <el-tree-select
    :check-strictly="true"
    v-model="data"
    :data="deptList"
    node-key="id"
    :placeholder="placeholder"
    :props="labelProps"
    :clearable="clearable"
  >
  </el-tree-select>
</template>

<style scoped>

</style>