import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'
Vue.use(Router)
let router = null
router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Layout,
      redirect: '/home/receiving-orders',
      children: [
        {
          path: 'receiving-orders',
          name: 'ReceivingOrders',
          component: () => import('@/views/ReceivingOrders'),
          meta: {
            title: '接单中心',
            noNavs: true,
            parent: 'Home'
          }
        }
      ]
    }
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
