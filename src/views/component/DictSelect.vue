<script setup lang="ts">

import type { DictContent } from '@/entity/sys/DictContent'

const data = defineModel<string>()
const dictContentList = defineModel<DictContent[]>('dictContentList')

</script>

<template>
  <el-select
    v-model="data"
    clearable
    value-key="mark"
    placeholder="请选择"
  >
    <el-option
      v-for="item in dictContentList"
      :key="item.mark"
      :label="item.name"
      :value="item.mark"
    />
  </el-select>
</template>

<style scoped>

</style>