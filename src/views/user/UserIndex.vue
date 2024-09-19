<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { userPage } from '@/api/user'
import { ArrowRightBold, ArrowDownBold } from '@element-plus/icons-vue'
import { ElCollapseTransition } from 'element-plus'
import {
  searchRef,
  searchInit,
  searchDestroy,
  searchAddResizeCallback
} from '@/util/SearchHeightUtil'
import { mainAddResizeCallback, mainRemoveResizeCallback, height_ } from '@/util/MainHeightUtil'
import { get } from 'axios'

const dataList = ref<UserResult[]>([])
const pageSize = ref<number>(20)
const totalRow = ref<number>(1)
const pageNumber = ref<number>(1)
const showSearch = ref(true)
const searchCardRef = ref(100)
const mainHeight = ref<number>(height_)
const searchHeight = ref<number>(50)
const pageListHeight = ref<number>(200)

const queryParams = ref<UserQuery>({})

const getDataList = async () => {
  const { data } = await userPage(
    {
      pageNumber: pageNumber.value,
      pageSize: pageSize.value
    },
    queryParams.value
  )
  dataList.value = data.records
  totalRow.value = data.totalRow
  pageNumber.value = data.pageNumber
  pageSize.value = data.pageSize
}

const pageSizeChanged = (pSize: number) => {
  pageSize.value = pSize
  getDataList()
}

const pageNumberChanged = (pNumber: number) => {
  pageNumber.value = pNumber
  getDataList()
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
      <div @click="showSearch = !showSearch">
        <el-button link>
          <el-icon>
            <ArrowRightBold v-if="!showSearch" />
            <ArrowDownBold v-if="showSearch" />
          </el-icon>
          &nbsp;搜索
        </el-button>
      </div>
      <el-collapse-transition>
        <div v-show="showSearch">
          <!--    起padding-top作用,防止展开动画卡顿    -->
          <div style="height: 16px"></div>
          <el-form :model="queryParams" label-width="20%" size="default">
            <el-row :gutter="16">
              <el-col :span="6">
                <el-form-item label="用户名">
                  <el-input v-model="queryParams.username" />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="真实用户">
                  <el-input v-model="queryParams.realUser" />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="创建方式">
                  <el-input v-model="queryParams.createdType" />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="状态">
                  <el-input v-model="queryParams.status" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门">
                  <el-input v-model="queryParams.deptId" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="昵称">
                  <el-input v-model="queryParams.nickname" />
                </el-form-item>
              </el-col>

              <el-col :span="6" class="search-button">
                <el-button plain icon="Refresh" @click="queryParams = {}">重置</el-button>
                <el-button type="primary" plain icon="Search" @click="getDataList">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="page-list">
      <div class="page-list-title">
        <span class="page-list-title-left"> 菜单分页列表 </span>
        <span class="page-list-title-right">
          <el-button size="default" icon="Plus" type="primary"> 新增 </el-button>
          <el-button size="default" icon="Download"> 导出 </el-button>
          <el-button size="default" icon="Delete" type="danger"> 批量删除 </el-button>
        </span>
      </div>
      <div class="page-list-content" >
          <el-table :data="dataList" :height="pageListHeight">
            <el-table-column prop="username" label="用户名" width="180" />
            <el-table-column prop="nickname" label="昵称" width="180" />
            <el-table-column prop="realUserValue" label="真实用户" width="180" />
            <el-table-column prop="statusValue" label="状态" />
            <el-table-column prop="createdTime" label="创建时间" />
          </el-table>

      </div>
      <div class="page-list-foot">
        <el-pagination
          :current-page="pageNumber"
          :page-size="pageSize"
          :total="totalRow"
          layout="total, sizes, prev, pager, next, jumper"
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
