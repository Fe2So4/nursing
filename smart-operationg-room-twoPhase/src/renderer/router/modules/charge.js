import Layout from '@/layout/index'
const chargeRoutes = {
  path: '/charge',
  name: 'Charge',
  component: Layout,
  redirect: '/charge/template-maintain',
  meta: {
    noNavs: false,
    title: '手术计费'
  },
  children: [
    {
      path: 'template-maintain',
      name: 'TemplateMaintain',
      meta: {
        title: '模板维护',
        noNavs: false,
        parent: 'Charge'
      },
      component: () => import('@/views/OperationCharge/TemplateMaintain/index')
    }
  ]
}
export default chargeRoutes
