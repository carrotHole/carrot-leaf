<script setup lang="ts">
import PageList from './PageList.vue'


const props = withDefaults(defineProps<{
  param:any,
}>(),{
  param:{}
})



</script>

<template>
<div class="search-page">
  <div class="search">

  </div>

  <div class="page">
    <PageList></PageList>
  </div>
</div>
</template>

<style scoped>

</style>