import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/index'
import Login from '@/views/Login/index'
import SignIn from '@/views/SignIn/index'
import SignOut from '@/views/SignOut/index'
import TimeOut from '@/views/TimeOut/index'
import Record2 from '@/views/Record2/index'
import Record3 from '@/views/Record3/index'
import TransferHandover from '@/views/TransferHandover/index'
import HandoverRecord from '@/views/HandoverRecord/index'
import DeviceBasicList from '@/views/DeviceBasicList/index'
import DeviceSpecialList from '@/views/DeviceSpecialList/index'
import Transfer from '@/views/Transfer/index'
import PatientHome from '@/views/PatientHome/index'
import Signature from '@/components/Signature'
import Hello from '@/components/Signature2'
import Demo from '@/views/Demo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/signature',
      name: 'Signature',
      component: Signature
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
      path: '/record2',
      name: 'Record2',
      component: Record2
    },
    {
      path: '/record3',
      name: 'Record3',
      component: Record3
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
    },
    {
      path: '/transfer-handover',
      name: 'TransferHandover',
      component: TransferHandover
    },
    {
      path: '/device-basic',
      name: 'DeviceBasicList',
      component: DeviceBasicList
    },
    {
      path: '/device-special',
      name: 'DeviceSpecialList',
      component: DeviceSpecialList
    },
    {
      path: '/handover-record',
      name: 'HandoverRecord',
      component: HandoverRecord
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: Transfer
    },
    {
      path: '/patient-home',
      name: 'PatientHome',
      component: PatientHome
    }
  ]
})
