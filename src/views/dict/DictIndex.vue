<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Search, Plus, Delete } from '@element-plus/icons-vue'
import { deleteDict, getDictContentList, getDictList } from '@/api/dict'
import DictEditDialog from './DictEditDialog.vue'
import MessageUtil from '@/util/MessageUtil'

const dictQueryParam = ref<string|undefined>(undefined)
const currentType = ref<Dict>()
const currentDictClass = ref('proj')
const dictList = ref<Dict[]>([])
const dictContentList = ref<DictContent[]>([])
const dictLoading = ref(false)
const dictContentLoading = ref(false)
const editDict = ref<Dict|{}>()
const editDictDialogVisible = ref(false)

/**
 * 获取字典类型列表
 */
const getDictDataList = async () => {

  if (dictLoading.value){
    return
  }

  dictLoading.value = true
  const { data } = await getDictList(dictQueryParam.value)
  dictList.value = data
  dictContentList.value = []
  currentType.value = undefined
  dictLoading.value = false
}
/**
 * 获取字典数据列表
 */
const getDictContentDataList = async () => {
  dictContentLoading.value= true
  if (currentType.value == undefined){
    return
  }
  const {data} = await getDictContentList(currentType.value.type)
  dictContentList.value = data
  dictContentLoading.value= false
}


/**
 * 点击字典类型
 */
const handleClickType = async (item: Dict) =>{
  if (dictContentLoading.value && item === currentType.value){
    return
  }
  currentType.value = item
  await getDictContentDataList()
}

const handleChangeDictClass = async () =>{

}

/**
 * 点击新增/编辑字典按钮
 */
const handleEditDict = (dict:Dict|{})=>{
  console.log(dict)
  editDict.value = dict
  console.log(editDict.value)
  editDictDialogVisible.value = true
}

const handleDeleteDict = async (dict:Dict)=>{
  if (await MessageUtil.confirm("确定删除当前字典？", '提示')){
    const {data} = await deleteDict(dict.id)
    MessageUtil.success("删除成功")
    await getDictDataList()
  }
}

onMounted(()=>{
  getDictDataList()
})

</script>

<template>
  <div class="carrot-main-container">
    <div class="dict-left ">
      <div class="dict-left-search border-radius-6">
        <el-input v-model="dictQueryParam" clearable placeholder="名称/类型/备注" class="input-with-select">
        <template #append>
          <el-button :icon="Search"  @click="getDictDataList" />
        </template>
      </el-input>
      </div>


      <el-tabs v-model="currentDictClass" class="dict-left-tables" @tab-click="handleChangeDictClass">
        <el-tab-pane label="应用" name="proj"></el-tab-pane>
        <el-tab-pane label="系统" name="sys"></el-tab-pane>
      </el-tabs>

      <div class="dict-left-button">
        <el-button icon="Plus" type="primary" size="small" @click="handleEditDict({})">新增字典</el-button>
      </div>
      <div class="dict-left-scrollbar">
        <el-scrollbar height="100%" class="dict-left-scrollbar border-radius-6">
          <ul class="dict-ul">
            <li v-for="item in dictList" :key="item.id" class="dict-li" @click="handleClickType(item)">
              <div class="li-title">{{item.type}}（{{item.name}}）</div>
              <div class="li-button">
                  <el-button text type="danger" icon="Edit" @click="handleEditDict(item)"></el-button>
                  <el-button text type="primary" icon="Delete" @click="handleDeleteDict(item)"></el-button>
              </div>
            </li>
          </ul>

        </el-scrollbar>
      </div>
    </div>

    <div class="dict-right border-radius-6">
      <div class="dict-right-title" >
        <div class="dict-right-title-left" >
          <span v-if="currentType != undefined" style="font-weight: bold">{{currentType.type}}（{{currentType.name}}）</span>
          <span  v-if="currentType != undefined && currentType.remark !=undefined && currentType.remark != ''">  {{currentType.remark}}</span>
        </div>
        <div class="dict-right-title-right">
          <el-button icon="Plus" type="primary">新增字典内容</el-button>
        </div>
      </div>

      <div class="dict-right-content">
        <el-table :data="dictContentList"  style="width: 100%">
          <el-table-column prop="mark" label="标志" width="180" />
          <el-table-column prop="name" label="名称" width="180" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column  label="操作" right width="180" >
            <template #default="{row}">
              <el-button type="danger" size="small" icon="Delete" @click="handleDeleteDictContent(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

    <DictEditDialog :edit-dialog-visible="editDictDialogVisible" :refresh="getDictContentDataList" :edit-data="editDict" @update:editDialogVisible="editDictDialogVisible=false"></DictEditDialog>

  </div>
</template>

<style scoped>
.carrot-main-container{
  display: flex;
}
.dict-left {

  width: 250px;
  display: flex;
  flex-direction: column;

  .dict-left-search{
    padding: 12px 16px;
    background-color: #fff;
  }

  .dict-left-tables{
    padding: 0 16px 0;
  }

  .dict-left-button{
    padding: 12px 16px;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;

  }

  .dict-left-scrollbar{
    background-color: #fff;
    height: calc(100vh - var(--carrot-header-height) - var(--carrot-footer-height) - 190px);
    .dict-ul{
      list-style: none;
      padding: 12px 16px;

      .dict-li{
        height: 30px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        .li-title{
          cursor: pointer;
        }
        .li-button{
          display: none;
          .el-button{
            padding: 0 5px;
            margin: 0 5px;
          }
        }

      }
      .dict-li:hover .li-button {
        display: block;
      }
      .dict-li:hover{
        background-color: #f5f7fa;
      }

    }
  }

  .el-menu-item {
    height: 35px;
  }

  .el-button-group{
    margin-left: auto;
    margin-top: auto;
    justify-self: flex-end;
  }
}

.dict-right {
  padding: 12px 16px;
  margin-left: 16px;
  width: calc(100% - 250px - 16px);
  background-color: #fff;

  .dict-right-title{
    display: flex;
    justify-content: space-between;
  }
}
</style>
