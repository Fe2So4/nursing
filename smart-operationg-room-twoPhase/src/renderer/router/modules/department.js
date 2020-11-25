import Layout from '@/layout/index'
const departmentRoutes = {
  path: '/department',
  name: 'Department',
  component: Layout,
  redirect: '/department/search/department-search',
  meta: {
    title: '科室管理',
    noNavs: false
  },
  children: [
    {
      path: 'search',
      name: 'Search',
      meta: {
        title: '手术查询',
        noNavs: false,
        parent: 'Department'
      },
      component: () => import('@/views/DepartmentManagement/index'),
      children: [
        {
          path: 'department-search',
          name: 'DepartmentSearch',
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/SurgeryDetailSearch/index'),
          meta: {
            title: '手术明细查询',
            noNavs: false,
            parent: 'Search'
          }
        },
        {
          path: 'department-moresearch',
          name: 'DepartmentMoresearch',
          meta: {
            title: '多次手术查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/MoreSurgerySearch/index')
        },
        {
          path: 'department-roomsearch',
          name: 'DepartmentRoomsearch',
          meta: {
            title: '房间状态查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/RoomStatusSearch/index')
        },
        {
          path: 'department-surgeryStatus',
          name: 'departmentSurgeryStatus',
          meta: {
            title: '手术状态查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/SurgeryStatus/index')
        },
        {
          path: 'nursing-record-search',
          name: 'NursingRecordSearch',
          meta: {
            title: '护理记录单查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/NursingRecordSearch/index')
        },
        {
          path: 'nursing-receive-search',
          name: 'NursingReceiveSearch',
          meta: {
            title: '手术接病人时间查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/NursingReceiveSearch/index')
        },
        {
          path: 'surgery-interval-search',
          name: 'SurgeryIntervalSearch',
          meta: {
            title: '手术接台间隔时间查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/SurgeryIntervalSearch/index')
        },
        {
          path: 'daily-endtime-search',
          name: 'DailyEndTimeSearch',
          meta: {
            title: '手术接台间隔时间查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/DailyEndTimeSearch/index')
        },
        {
          path: 'endsurgery-info-search',
          name: 'EndSurgeryInfoSearch',
          meta: {
            title: '术后手术信息登记查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/EndSurgeryInfoSearch/index')
        },
        {
          path: 'surgery-level-statistical',
          name: 'SurgeryLevelStatistical',
          meta: {
            title: '手术分级统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/SurgeryLevelStatistical/index')
        },
        {
          path: 'duty-search',
          name: 'DutySearch',
          meta: {
            title: '一值班二值班',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/OneDutyTwoDuty/index')
        },
        {
          path: 'statistical-detail-search',
          name: 'StatisticalDetailSearch',
          meta: {
            title: '积休统计明细表',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/StatisticalDetailSearch/index')
        },
        {
          path: 'surgery-interval-time',
          name: 'SurgeryIntervalTime',
          meta: {
            title: '手术间隔时长统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/SurgeryIntervalTime/index')
        },
        {
          path: 'work-overtime-search',
          name: 'WorkOvertimeSearch',
          meta: {
            title: '夜间加班积修统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/WorkOvertimeSearch/index')
        },
        {
          path: 'surgery-name-number',
          name: 'SurgeryNameNumber',
          meta: {
            title: '手术名称数量统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/SurgeryNameNumber/index')
        },
        {
          path: 'surgery-score',
          name: 'SurgeryScore',
          meta: {
            title: '手术分值记录统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/SurgeryScore/index')
        }
      ]
      // redirect: '/personnel/personnel-file/files-info-select',
      // component: () => import('@/views/DepartmentManagement/SurgerySearch/index')
    }

  ]
}
export default departmentRoutes
