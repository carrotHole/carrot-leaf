import { ref } from 'vue'

const mainRef = ref(null)
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

const mainInit = () =>{
  layoutObserver = new ResizeObserver(handleResize);
  if (mainRef.value){
    layoutObserver.observe(mainRef.value)
  }
}

const mainDestroy = () =>{
  layoutObserver?.disconnect();
}

const mainAddResizeCallback = (callback: Function) => resizeCallbacks.push(callback)
const mainRemoveResizeCallback = (callback: Function) => resizeCallbacks.splice(resizeCallbacks.indexOf(callback), 1)

export { height_, mainRef, mainInit, mainDestroy, mainAddResizeCallback, mainRemoveResizeCallback}