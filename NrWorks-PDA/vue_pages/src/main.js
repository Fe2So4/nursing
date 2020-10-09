// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// rem响应式适配
import 'amfe-flexible'
import 'vant/lib/index.css'
import './styles/index.css'
import { Button, Dialog, Grid, GridItem, Field, Form, Notify } from 'vant'
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(Notify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
