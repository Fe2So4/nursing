import Layout from '@/layout/index'
const chargeRoutes = {
  path: '/emr',
  name: 'EMR',
  component: Layout,
  redirect: '/emr/record-ready',
  meta: {
    noNavs: false,
    title: '护理电子病历'
  },
  children: [
    {
      path: 'record-ready',
      name: 'RecordReady',
      meta: {
        title: '术前准备交接记录',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/RecordBeforeReady/index')
    }
  ]
}
export default chargeRoutes
