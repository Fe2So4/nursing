import Vue from 'vue'
import axios from 'axios'

import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import './styles/el-style.scss'
import './styles/vxe-style.scss'
import './styles/scrollbar.scss'
import router from './router'
import store from './store'
import 'xe-utils'
import VXETable from 'vxe-table'
import Moment from 'moment'
import 'vxe-table/lib/style.css'
import * as voicePromptFun from './utils/voicePrompt'
import htmlToPdf from './utils/htmlToPdf'
import IsEmpty from './utils/isEmpty'
import utilsGetNewDate from './utils/utilsTime'
import utilsGetNowDay from './utils/utilsNowDay'
import utilsNewTime from './utils/utilsNewTime'
import utilsGetWeek from './utils/getWeek'
import utilsDebounce from './utils/utilsDebounce'
import vueiInfinite from 'vue-infinite-scroll'
// 处理element-ui vxe-table样式兼容问题
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import Fragment from 'vue-fragment'

Vue.use(Fragment.Plugin)
VXETable.use(VXETablePluginElement)

Vue.prototype.IsEmpty = IsEmpty
Vue.prototype.utilsGetNewDate = utilsGetNewDate
Vue.prototype.utilsNewTime = utilsNewTime
Vue.prototype.utilsDebounce = utilsDebounce
Vue.prototype.utilsGetNowDay = utilsGetNowDay
Vue.prototype.Moment = Moment
Vue.prototype.utilsGetWeek = utilsGetWeek
Vue.prototype.voicePrompt = voicePromptFun.voicePrompt // 语音提醒

Vue.use(ElementUI)
Vue.use(VXETable)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(htmlToPdf)
Vue.use(vueiInfinite)
Vue.directive('loadmore', {
  bind (el, binding) {
    var p = 0
    var t = 0
    var down = true
    var selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function () {
      // 判断是否向下滚动
      p = this.scrollTop
      if (t < p) {
        down = true
      } else {
        down = false
      }
      t = p
      // 判断是否到底
      const sign = 10
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign && down) {
        binding.value()
      }
    })
  }
})
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
