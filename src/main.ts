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
(window as any).appConfig = config;

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus,{ size: 'small', zIndex: 3000, })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
