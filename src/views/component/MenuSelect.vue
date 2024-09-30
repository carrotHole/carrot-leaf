<script setup lang="ts">

import type { MenuTreeResult } from '@/entity/au/Menu'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  clearable?: boolean|true
  placeholder?: string|'请选择'
}>()

const data = defineModel<string>()
const menuList = defineModel<MenuTreeResult[]>('menuList')


</script>

<template>
  <el-select
    v-model="data"
    :clearable="clearable"
    value-key="id"
    :placeholder="placeholder"
  >
    <el-option
      v-for="item in menuList"
      :key="item.id"
      :label="item.menuName"
      :value="item.id"
    />
  </el-select>
</template>

<style scoped>

</style>