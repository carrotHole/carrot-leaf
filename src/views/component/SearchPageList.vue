<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowRightBold, ArrowDownBold } from '@element-plus/icons-vue'
import { ElCollapseTransition } from 'element-plus'
import {
  searchRef,
  searchInit,
  searchDestroy,
  searchAddResizeCallback
} from '@/util/SearchHeightUtil'
import { mainAddResizeCallback, mainRemoveResizeCallback, height_ } from '@/util/MainHeightUtil'


const props = withDefaults(defineProps<{
  title: string
  showSearch:boolean
  pageSize: number
  getDataList:(page: Page)=>PageData
}>(), {
  title: '',
  showSearch:true,
  pageSize: 20,
})

const dataList_ = ref<UserResult[]>([])
const pageSize_ = ref<number>(props.pageSize)
const totalRow_ = ref<number>(0)
const pageNumber_ = ref<number>(1)
const showSearch_ = ref(props.showSearch)
const pageLoading_ = ref(false)

const mainHeight = ref<number>(height_)
const searchHeight = ref<number>(50)
const pageListHeight = ref<number>(200)

const emit = defineEmits(['getList','reset'])


const getDataList_ = async () => {
  if (pageLoading_.value){
    return
  }
  pageLoading_.value = true
  const data = await props.getDataList(
    {
      pageNumber: pageNumber_.value,
      pageSize: pageSize_.value
    }
  )

  dataList_.value = data.records
  totalRow_.value = data.totalRow
  pageNumber_.value = data.pageNumber
  pageSize_.value = data.pageSize
  pageLoading_.value = false
}

const pageSizeChanged = (pSize: number) => {
  pageSize_.value = pSize
  getDataList_()
}

const pageNumberChanged = (pNumber: number) => {
  pageNumber_.value = pNumber
  getDataList_()
}

// 计算高度
const calcHeight = () => {
  let number = mainHeight.value - searchHeight.value - 142
  pageListHeight.value = number
}

/**
 * 监听pageList容器变化
 * @param height
 */
const watchSearchResize = (height: number) => {
  searchHeight.value = height
  calcHeight()
}
/**
 * 监听main容器高度变化
 * @param height
 */
const watchMainResize = (height: number) => {
  mainHeight.value = height
  calcHeight()
}

onMounted(() => {
  searchInit()
  searchAddResizeCallback(watchSearchResize)
  mainAddResizeCallback(watchMainResize)
  calcHeight()
  getDataList_()
})

onUnmounted(() => {
  // 在组件销毁前取消观察
  mainRemoveResizeCallback(watchMainResize)
  searchDestroy()
})

defineExpose({
  refresh: () => getDataList_(),
  getList: () => dataList_.value,
})

</script>

<template>
  <div class="carrot-main-container">
    <div class="search-card" ref="searchRef">
      <div @click="showSearch_ = !showSearch_">
        <el-button link>
          <el-icon>
            <ArrowRightBold v-if="!showSearch_" />
            <ArrowDownBold v-if="showSearch_" />
          </el-icon>
          &nbsp;搜索
        </el-button>
      </div>
      <el-collapse-transition>
        <div v-show="showSearch_">
          <!--    起padding-top作用,防止展开动画卡顿    -->
          <div style="height: 16px"></div>
          <el-form label-width="20%" size="default">
            <el-row :gutter="16">
              <slot name="search"></slot>

              <el-col :span="6" class="search-button">
                <el-button plain icon="Refresh" @click="emit('reset')">重置</el-button>
                <el-button type="primary" plain icon="Search" @click="getDataList_">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="page-list">
      <div class="page-list-title">
        <span class="page-list-title-left"> {{props.title}} </span>
        <span class="page-list-title-right">
          <slot name="button"></slot>
        </span>
      </div>
      <div class="page-list-content" >
        <el-table :data="dataList_" :height="pageListHeight" v-loading="pageLoading_">
            <slot name="pageList"></slot>
        </el-table>

      </div>
      <div class="page-list-foot">
        <el-pagination
          :current-page="pageNumber_"
          :page-size="pageSize_"
          :total="totalRow_"
          layout="total,prev, pager, next, jumper,   sizes "
          @size-change="pageSizeChanged"
          @current-change="pageNumberChanged"
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
.search-card {
  background-color: #ffffff;
  border-radius: 5px;
  padding: 12px 16px;

  .el-col {
  }

  .search-button {
    margin-left: auto;
    text-align: right;
  }
}

.page-list {
  border-radius: 5px;
  margin-top: 16px;
  background-color: #fff;

  .page-list-title {
    padding: 12px 16px 2px;
    display: flex;
    justify-content: space-between;
    height: 50px;
    font-size: 16px;
  }

  .page-list-content {
    padding: 0 12px;
  }

  .page-list-foot {
    height: 56px;
    padding: 12px 16px;
    display: flex;
    justify-content: flex-end;
    .el-pagination {
      width: fit-content;

    }
  }
}
</style>
