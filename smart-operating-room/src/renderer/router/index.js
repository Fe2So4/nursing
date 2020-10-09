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
        },
        {
          path: 'pathological-application',
          name: 'PathologicalApplication',
          component: () => import('@/views/PathologicalApplication/index'),
          meta: {
            title: '病理申请',
            noNavs: false,
            parent: 'Home'
          }
        },
        {
          path: 'nursing-document',
          name: 'PathologicalApplication',
          component: () => import('@/views/NursingDocument/index'),
          meta: {
            title: '护理列表',
            noNavs: false,
            parent: 'Home'
          }
        },
        {
          path: 'statistical-query',
          name: 'StatisticalQuery',
          component: () => import('@/views/StatisticalQuery/index'),
          meta: {
            title: '统计查询',
            noNavs: false,
            parent: 'Home'
          }
        },
        {
          path: 'statistical-query-running',
          name: 'StatisticalQueryRunning',
          component: () => import('@/views/StatisticalQueryRunning/index'),
          meta: {
            title: '统计查询报表',
            noNavs: false,
            parent: 'Home'
          }
        },
        {
          path: 'continuous-surgery',
          name: 'ContinuousSurgery',
          component: () => import('@/views/ContinuousSurgery/index'),
          meta: {
            title: '连台手术',
            noNavs: false,
            parent: 'Home'
          }
        },
        {
          path: 'surgery-listing',
          name: 'SurgeryListing',
          component: () => import('@/views/SurgeryListing/index'),
          meta: {
            title: '连台手术清单',
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
