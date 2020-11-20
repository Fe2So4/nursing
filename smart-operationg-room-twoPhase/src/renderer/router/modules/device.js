import Layout from '@/layout/index'
const deviceRoutes = {
  path: '/device',
  name: 'Device',
  component: Layout,
  redirect: '/device/device-register',
  meta: {
    title: '设备管理',
    noNavs: false
  },
  children: [
    {
      path: 'device-select',
      name: 'DeviceSelect',
      meta: {
        title: '设备查询',
        noNavs: false,
        parent: 'Device'
      },
      component: () => import('@/views/DeviceManagement/DeviceSelect/index')
      // redirect: '/personnel/personnel-file/files-info-select',
    },
    {
      path: 'device-register',
      name: 'DeviceRegister',
      meta: {
        title: '设备登记',
        noNavs: false,
        parent: 'Device'
      },
      component: () => import('@/views/DeviceManagement/DeviceRegister/index')
      // redirect: '/personnel/personnel-file/files-info-select',
    },
    {
      path: 'device-group',
      name: 'DeviceGroup',
      meta: {
        title: '设备组套',
        noNavs: false,
        parent: 'Device'
      },
      component: () => import('@/views/DeviceManagement/DeviceGroup/index')
      // redirect: '/personnel/personnel-file/files-info-select',
    },
    {
      path: 'device-dictionary-maintain',
      name: 'DeviceDictionaryMaintain',
      meta: {
        title: '设备字典信息维护',
        noNavs: false,
        parent: 'Device'
      },
      component: () => import('@/views/DeviceManagement/DeviceDictionaryMaintain/index')
      // redirect: '/personnel/personnel-file/files-info-select',
    }
  ]
}
export default deviceRoutes
