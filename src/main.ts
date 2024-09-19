import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 读取配置文件
import config from './config.json';

const app = createApp(App)

app.config.globalProperties.$config = config;

app.use(createPinia())
app.use(router)
app.use(ElementPlus,{ size: 'default', zIndex: 3000, })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
