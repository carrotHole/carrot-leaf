<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { menuPage } from '@/api/menu'



const dataList = ref<MenuResult[]>([])
const pageSize = ref(10)
const totalRow = ref(0)
const pageNumber = ref(1)
const queryParams = ref<MenuQuery>({

})


const getDataList = async ()=>{
  const {data} = await menuPage({
    pageNumber: pageNumber.value,
    pageSize: pageSize.value,
  }, queryParams.value)
  console.log(data)

}


onMounted(getDataList)


</script>

<template>
<div class="main-container">
  <div class="search"> 44444</div>
  <div class="page-list">

  </div>
</div>
</template>

<style scoped>

</style>