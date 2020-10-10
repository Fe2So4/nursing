import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/index'
import Login from '@/views/Login/index'
import SignIn from '@/views/SignIn/index'
import SignOut from '@/views/SignOut/index'
import TimeOut from '@/views/TimeOut/index'
import Record from '@/views/Record/index'
// import Home from '@/views/Login/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/sign-in'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/sign-out',
      name: 'SignOut',
      component: SignOut
    },
    {
      path: '/record',
      name: 'Record',
      component: Record
    },
    {
      path: '/time-out',
      name: 'TimeOut',
      component: TimeOut
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
