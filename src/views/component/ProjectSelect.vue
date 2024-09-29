<script setup lang="ts">

import type { ProjectResult } from '@/entity/au/Project'

const props = defineProps<{
  clearable?: boolean|true
}>()

const data = defineModel<string>()
const projectList = defineModel<ProjectResult[]>('projectList')

</script>

<template>
  <el-select
    v-model="data"
    :clearable="clearable"
    value-key="id"
    placeholder="所属应用"
  >
    <el-option
      v-for="item in projectList"
      :key="item.id"
      :label="item.projectName"
      :value="item.id"
    />
  </el-select>
</template>

<style scoped>

</style>