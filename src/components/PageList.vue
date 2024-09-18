<script setup lang="ts">
import { ref } from 'vue'


const emit = defineEmits(['refresh', ])
const props = withDefaults(defineProps<{
  dataList: any[],
  pageSize: number,
  totalRow: number,
}>(),{
  pageSize: 10,
  pageLoad: false,
})

const pSize = ref<number>(props.pageSize)
const pNumber = ref<number>(1)

const pChange = async (number:number, size:number)=>{
  pSize.value = size
  pNumber.value = number
  await refresh()
}

const pPrevClick = async (number:number)=>{
  pNumber.value = number
  await refresh()
}
const pNextClick = async (number:number)=>{
  pNumber.value = number
  await refresh()
}


const refresh =  async ()=>{
  await emit('refresh', pNumber.value, pSize.value)
}

</script>

<template>
<div class="page-list">
  <span>
    <el-table :data="dataList" style="width: 100%">
      <slot></slot>
    </el-table>
  </span>
  <span>
    <template>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="props.totalRow"
        :page-size="pSize"
        :current-page="pNumber"
        :change="pChange"
        :prev-click="pPrevClick"
        :next-click="pNextClick"
      />
    </template>
  </span>
</div>

</template>

<style scoped>

</style>