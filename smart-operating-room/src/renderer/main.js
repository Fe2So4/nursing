import Vue from 'vue'
import axios from 'axios'

import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import './styles/scrollbar.scss'
import router from './router'
import store from './store'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import * as voicePromptFun from './utils/voicePrompt'
Vue.prototype.voicePrompt = voicePromptFun.voicePrompt // 语音提醒

Vue.use(ElementUI)
Vue.use(VXETable)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
