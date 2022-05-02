import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import vGanttChart from 'v-gantt-chart'

import 'element-ui/lib/theme-chalk/index.css'
// 自定义指令
import install from '@/utils/directive/install'
import empty from '@/utils/directive/empty'
import drag from '@/utils/directive/drag'
import debounce from '@/utils/directive/debounce'

 // 函数式组件使用
import ComponentsMessage from './plugins'

import '@/styles/index.scss'
import '@/permission'
import '@/assets/icons'
import '@/components/Message/message'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(install)
Vue.use(empty)
Vue.use(drag)
Vue.use(debounce)
Vue.use(vGanttChart)
Vue.use(ComponentsMessage)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
