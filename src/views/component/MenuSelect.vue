<script setup lang="ts">

import type { MenuTreeResult } from '@/entity/au/Menu'

const props = defineProps<{
  clearable?: boolean|true
  placeholder?: string|'请选择'
}>()

const data = defineModel<string>()
const menuList = defineModel<MenuTreeResult[]>('menuList')
const labelProps = {
  label: (data: { menuName: string; }) => {
    return data.menuName;
  },
}

</script>

<template>
  <el-tree-select
    :check-strictly="true"
    v-model="data"
    :data="menuList"
    node-key="id"
    :placeholder="placeholder"
    :props="labelProps"
  >
  </el-tree-select>
</template>

<style scoped>

</style>