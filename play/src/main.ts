import { createApp } from 'vue'
import App from './App.vue'

import Icon from '@jasin-y/components/icon'
import '@jasin-y/theme-chalk/src/index.scss'
import Ytree from '@jasin-y/components/tree/index'
import Checkbox from '@jasin-y/components/checkbox'

const plugins = [Icon, Ytree, Checkbox]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin)) //将组件注册成全局组件

app.mount('#app')
