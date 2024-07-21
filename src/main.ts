import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App).use(router).mount('#app')
