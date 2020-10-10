import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/index'
import Login from '@/views/Login/index'
import SignIn from '@/views/SignIn/index'
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
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
