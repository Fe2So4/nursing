import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/index')
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/index-tab',
      name: 'indexTab',
      component: () => import('@/views/indexTab/indexTab.vue')
    },
    {
      path: '/personnel',
      name: 'Personnel',
      component: Layout,
      redirect: '/personnel/search-leave',
      children: [
        {
          path: '/personnel/search-leave',
          name: 'PersonnelManagement',
          // component: () => import('@/views/PersonnelManagement/PersonnelFiles/FilesInfoSelect/index'),
          component: () => import('@/views/PersonnelManagement/SearchLeave/index'),
          children: [
            {
              path: '/personnel/search-leave/personnel-file',
              name: 'PersonnelFile',
              component: () => import('@/views/PersonnelManagement/PersonnelFiles/index'),
              redirect: '/personnel/search-leave/personnel-file/files-info-select',
              meta: {
                title: '人员档案管理',
                noNavs: false,
                parent: 'PersonnelManagement'
              },
              children: [
                {
                  path: '/personnel/search-leave/personnel-file/files-info-select',
                  name: 'FilesInfoSelect',
                  component: () => import('@/views/PersonnelManagement/PersonnelFiles/FilesInfoSelect/index'),
                  meta: {
                    title: '档案信息查询',
                    noNavs: false,
                    parent: 'PersonnelFile'
                  }
                }
              ]
            }
          ],
          meta: {
            title: '人员管理',
            noNavs: false,
            parent: 'Personnel'
          }

        }
      ]
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
          path: 'client-operation-orders',
          name: 'OperationOrders',
          component: () => import('@/views/OperationOrders/index'),
          meta: {
            title: '手术派单',
            noNavs: false,
            parent: 'Home'
          }
        },
        {
          path: 'client-pathological-application',
          name: 'PathologicalApplication',
          component: () => import('@/views/PathologicalApplication/index'),
          meta: {
            title: '病理申请',
            noNavs: false,
            parent: 'Home'
          }
        },
        {
          path: 'client-nursing-document',
          name: 'PathologicalApplication',
          component: () => import('@/views/NursingDocument/index'),
          meta: {
            title: '护理列表',
            noNavs: false,
            parent: 'Home'
          }
        },
        {
          path: 'client-statistical-query',
          name: 'StatisticalQuery',
          component: () => import('@/views/StatisticalQuery/index'),
          meta: {
            title: '统计查询',
            noNavs: false,
            parent: 'Home'
          }
        },
        // {
        //   path: 'statistical-query-running',
        //   name: 'StatisticalQueryRunning',
        //   component: () => import('@/views/StatisticalQueryRunning/index'),
        //   meta: {
        //     title: '统计查询报表',
        //     noNavs: false,
        //     parent: 'Home'
        //   }
        // },
        {
          path: 'client-continuous-surgery',
          name: 'ContinuousSurgery',
          component: () => import('@/views/ContinuousSurgery/index'),
          meta: {
            title: '连台手术',
            noNavs: false,
            parent: 'Home'
          }
        },
        // {
        //   path: 'surgery-listing',
        //   name: 'SurgeryListing',
        //   component: () => import('@/views/SurgeryListing/index'),
        //   meta: {
        //     title: '连台手术清单',
        //     noNavs: false,
        //     parent: 'Home'
        //   }
        // },
        {
          path: 'client-nursing-document-list',
          name: 'NursingDocumentList',
          component: () => import('@/views/NursingDocumentList/index'),
          meta: {
            title: '护理单据列表',
            noNavs: false,
            parent: 'Home'
          },
          redirect: '/home/client-nursing-document-list/client-security-check',
          children: [
            {
              path: 'client-security-check',
              name: 'SecurityCheck',
              component: () => import('@/views/NursingDocumentList/components/security-check'),
              meta: {
                title: '安全护理',
                noNavs: false,
                parent: 'NursingDocumentList'
              }
            },
            {
              path: 'client-nursing-one',
              name: 'NursingDocumentOne',
              component: () => import('@/views/NursingDocumentList/components/nursing-document-one'),
              meta: {
                title: '护理记录一',
                noNavs: false,
                parent: 'NursingDocumentList'
              }
            },
            {
              path: 'client-nursing-two',
              name: 'NursingDocumentTwo',
              component: () => import('@/views/NursingDocumentList/components/nursing-document-two'),
              meta: {
                title: '护理记录二',
                noNavs: false,
                parent: 'NursingDocumentList'
              }
            },
            {
              path: 'client-nursing-jichu',
              name: 'NursingDocumentJiChu',
              component: () => import('@/views/NursingDocumentList/components/nursing-document-jichu'),
              meta: {
                title: '护理记录基础',
                noNavs: false,
                parent: 'NursingDocumentList'
              }
            },
            {
              path: 'client-nursing-teshu',
              name: 'NursingDocumentTeshu',
              component: () => import('@/views/NursingDocumentList/components/nursing-document-teshu'),
              meta: {
                title: '护理记录特殊',
                noNavs: false,
                parent: 'NursingDocumentList'
              }
            },
            {
              path: 'client-nursing-transit-transfer',
              name: 'TransitTransfer',
              component: () => import('@/views/NursingDocumentList/components/transit-transfer'),
              meta: {
                title: '患者转运交接',
                noNavs: false,
                parent: 'NursingDocumentList'
              }
            }
          ]
        }
      ]
    }
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
