<script setup lang="ts">
  import {defineProps} from "vue";

  const props = defineProps({
    title: String,
    showFooter: Boolean,
  })
</script>

<template>
  <div class="dialog-card">
    <div class="card-title">
      <span class="card-left"> {{props.title}} </span>
      <span class="card-title-right">
          <slot name="button"></slot>
      </span>
    </div>
    <div class="card-content" >
      <slot name="content"></slot>
    </div>
    <div class="card-foot" v-if="props.showFooter">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<style scoped>

.dialog-card {
  border-radius: 5px;
  background-color: #fff;

  .card-title {
    padding: 8px 16px 2px;
    display: flex;
    justify-content: space-between;
    height: 50px;
    font-size: 16px;
    font-weight: bold;
  }

  .card-content {
    padding: 0 12px;
  }

  .card-foot {
    height: 56px;
    padding: 12px 16px;
    display: flex;
    justify-content: flex-end;

  }
}
</style>