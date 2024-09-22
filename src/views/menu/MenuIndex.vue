<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { menuPage } from '@/api/menu'
import { ArrowRightBold, ArrowDownBold } from '@element-plus/icons-vue'
import { ElCollapseTransition } from 'element-plus'
import {
  searchRef,
  searchInit,
  searchDestroy,
  searchAddResizeCallback
} from '@/util/SearchHeightUtil'
import { mainAddResizeCallback, mainRemoveResizeCallback, height_ } from '@/util/MainHeightUtil'

const dataList = ref<MenuResult[]>([])
const pageSize = ref(10)
const totalRow = ref(0)
const pageNumber = ref(1)
const showSearch = ref(true)
const searchCardRef = ref(100)
const mainHeight = ref(height_)
const searchHeight = ref(50)
const pageListHeight = ref(200)

const queryParams = ref<MenuQuery>({})

const getDataList = async () => {
  const { data } = await menuPage(
    {
      pageNumber: pageNumber.value,
      pageSize: pageSize.value
    },
    queryParams.value
  )
}

// 计算高度
const calcHeight = () => {
  let number = mainHeight.value - searchHeight.value - 36
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
  getDataList()
})

onUnmounted(() => {
  // 在组件销毁前取消观察
  searchDestroy()
})
</script>

<template>
  <div class="main-container">
    <div class="search-card" ref="searchRef">
<!--      <div @click="showSearch = !showSearch">-->
<!--        <el-button link>-->
<!--          <el-icon>-->
<!--            <ArrowRightBold v-if="!showSearch" />-->
<!--            <ArrowDownBold v-if="showSearch" />-->
<!--          </el-icon>-->
<!--          &nbsp;搜索-->
<!--        </el-button>-->
<!--      </div>-->
<!--      <el-collapse-transition>-->
<!--        <div v-show="showSearch">-->
<!--          &lt;!&ndash;    起padding-top作用,防止展开动画卡顿    &ndash;&gt;-->
<!--          <div style="height: 16px"></div>-->
<!--          <el-form :model="queryParams" label-width="20%" size="default">-->
<!--            <el-row :gutter="16">-->
<!--              <el-col :span="6">-->
<!--                <el-form-item label="菜单名称">-->
<!--                  <el-input v-model="queryParams.menuName" />-->
<!--                </el-form-item>-->
<!--              </el-col>-->

<!--              <el-col :span="6">-->
<!--                <el-form-item label="路由地址">-->
<!--                  <el-input v-model="queryParams.menuName" />-->
<!--                </el-form-item>-->
<!--              </el-col>-->

<!--              <el-col :span="6">-->
<!--                <el-form-item label="路径">-->
<!--                  <el-input v-model="queryParams.menuName" />-->
<!--                </el-form-item>-->
<!--              </el-col>-->

<!--              <el-col :span="6">-->
<!--                <el-form-item label="父主键">-->
<!--                  <el-input v-model="queryParams.menuName" />-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="6">-->
<!--                <el-form-item label="父主键">-->
<!--                  <el-input v-model="queryParams.menuName" />-->
<!--                </el-form-item>-->
<!--              </el-col>-->

<!--              <el-col :span="6" class="search-button">-->
<!--                <el-button plain icon="Refresh">重置</el-button>-->
<!--                <el-button type="primary" plain icon="Search">查询</el-button>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-form>-->
<!--        </div>-->
<!--      </el-collapse-transition>-->
    </div>

  </div>
</template>

<style scoped>
.search-card {
  width: 50%;
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
  height: 200px;

  .page-list-title {
    padding: 12px 16px 2px;
    display: flex;
    justify-content: space-between;
    height: 50px;
    font-size: 16px;
  }

  .page-list-content{
    padding: 0 12px ;
  }

}
</style>