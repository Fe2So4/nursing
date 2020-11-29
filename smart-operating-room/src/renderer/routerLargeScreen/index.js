import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'
Vue.use(Router)
let router = null
router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
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
