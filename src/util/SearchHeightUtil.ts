import { ref } from 'vue'

const searchRef = ref(null)
let layoutObserver: ResizeObserver | null = null
let height_ = 0
// 定义一个方法数组,保存监听高度回调方法
const resizeCallbacks: Array<Function> = []

// 监听组件的高度变化
const handleResize = (entries: any) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    if (height_ !== height){
      height_ = height
      resizeCallbacks.forEach(callback => callback(height))
    }
  }
}

const searchInit = () =>{
  layoutObserver = new ResizeObserver(handleResize);
  if (searchRef.value){
    layoutObserver.observe(searchRef.value)
  }
}

const searchDestroy = () =>{
  layoutObserver?.disconnect();
}

const searchAddResizeCallback = (callback: Function) => {
  callback(height_)
  resizeCallbacks.push(callback)
}
const searchRemoveResizeCallback = (callback: Function) => resizeCallbacks.splice(resizeCallbacks.indexOf(callback), 1)

export { searchRef, searchInit, searchDestroy, searchAddResizeCallback, searchRemoveResizeCallback}