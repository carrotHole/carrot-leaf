<script setup lang="ts">
import { onMounted, ref } from 'vue'
const props = defineProps({
  title: String,
  show: Boolean
})

const showContent = ref(false)

onMounted(()=>{
  showContent.value = props.show
})

</script>

<template>
  <div class="box-card" ref="searchRef">
    <div @click="showContent = !showContent" class="box-card-title">
      <el-button link>
        <el-icon>
          <ArrowRightBold v-if="!showContent" />
          <ArrowDownBold v-if="showContent" />
        </el-icon>
        &nbsp;{{title}}
      </el-button>
    </div>
    <el-collapse-transition class="box-card-content">
      <div v-show="showContent">
        <!--    起padding-top作用,防止展开动画卡顿    -->
        <div style="height: 16px"></div>
        <el-form label-width="auto" size="default">
          <el-row :gutter="16">
            <slot name="content"></slot>
          </el-row>
        </el-form>
      </div>
    </el-collapse-transition>
  </div>
</template>

<style scoped>
.box-card{
  width: 80%;
  .box-card-title{
    background-color: #fcfcfc;
  }
.box-card-content{
  padding-left: 16px;
}

}
</style>