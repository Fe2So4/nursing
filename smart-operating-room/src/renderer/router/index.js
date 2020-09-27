import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/home',
      name: 'Home',
      component: Layout,
      redirect: '/home/large-screen',
      children: [
        {
          path: 'large-screen',
          name: 'LargeScreen',
          component: () => import('@/views/LargeScreen/index'),
          meta: {
            title: '术中大屏',
            noNavs: true,
            parent: 'Home'
          }
        },
        {
          path: 'receiving-orders',
          name: 'ReceivingOrders',
          component: () => import('@/views/ReceivingOrders/index'),
          meta: {
            title: '接单中心',
            noNavs: true,
            parent: 'Home'
          }
        },
        {
          path: 'operation-orders',
          name: 'OperationOrders',
          component: () => import('@/views/OperationOrders/index'),
          meta: {
            title: '手术派单',
            noNavs: false,
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
