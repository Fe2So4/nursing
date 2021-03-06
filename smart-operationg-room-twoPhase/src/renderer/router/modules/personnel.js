import Layout from '@/layout/index'
const personnelRoutes = {
  path: '/personnel',
  name: 'Personnel',
  component: Layout,
  redirect: '/personnel/personnel-file',
  meta: {
    title: '人员管理',
    noNavs: false
  },
  children: [
    {
      path: 'personnel-file',
      name: 'PersonnelManagement',
      meta: {
        title: '人员档案管理',
        noNavs: false,
        parent: 'Personnel'
      },
      component: () => import('@/views/PersonnelManagement/index'),
      // redirect: '/personnel/personnel-file/files-info-select',
      children: [
        {
          path: 'files-info-select',
          name: 'FilesInfoSelect',
          component: () => import('@/views/PersonnelManagement/PersonnelFiles/FilesInfoSelect/index'),
          meta: {
            title: '档案信息查询',
            noNavs: false,
            parent: 'PersonnelManagement'
          }
        },
        {
          path: 'files-info-maintain',
          name: 'FilesInfoMaintain',
          component: () => import('@/views/PersonnelManagement/PersonnelFiles/FilesInfoMaintain/index'),
          meta: {
            title: '档案信息维护',
            noNavs: false,
            parent: 'PersonnelManagement'
          }
        },
        {
          path: 'civil-servant-info-maintain',
          name: 'CivilServantInfoMaintain',
          component: () => import('@/views/PersonnelManagement/PersonnelFiles/CivilServantInfoMaintain/index'),
          meta: {
            title: '工务员信息维护',
            noNavs: false,
            parent: 'PersonnelManagement'
          }
        }
      ]
    },
    {
      path: 'basic-dictionary-maintain',
      name: 'basicDictionaryMaintain',
      meta: {
        title: '基础字典维护',
        noNavs: false,
        parent: 'Personnel'
      },
      component: () => import('@/views/PersonnelManagement/BasicDictionaryMaintain/index')
    },
    {
      path: 'attendance',
      name: 'attendanceManagement',
      meta: {
        title: '出勤排班管理',
        noNavs: false,
        parent: 'Personnel'
      },
      component: () => import('@/views/PersonnelManagement/index'),
      children: [
        {
          path: 'maintenance',
          name: 'maintenance',
          meta: {
            title: '排班规则维护',
            noNavs: false,
            parent: 'attendanceManagement'
          },
          component: () => import('@/views/PersonnelManagement/AttendanceManagement/index'),
          redirect: '/personnel/attendance/maintenance/attendance-maintenance',
          children: [
            {
              path: 'attendance-maintenance',
              name: 'attendanceMaintenance',
              component: () => import('@/views/PersonnelManagement/AttendanceManagement/AttendanceMaintenance/AttendanceMaintenance.vue'),
              meta: {
                title: '班次时段维护',
                noNavs: false,
                parent: 'maintenance'
              }
            },
            {
              path: 'attendance-management',
              name: 'attendance',
              component: () => import('@/views/PersonnelManagement/AttendanceManagement/AttendanceManagement/index.vue'),
              meta: {
                title: '业务分组管理',
                noNavs: false,
                parent: 'maintenance'
              }
            },
            {
              path: 'contrast',
              name: 'attendanceContrast',
              component: () => import('@/views/PersonnelManagement/AttendanceManagement/AttendanceContrast/Attendancecontrast.vue'),
              meta: {
                title: '业务带教班次对照',
                noNavs: false,
                parent: 'maintenance'
              }
            }

          ]
        },
        {
          path: 'maintenance1',
          name: 'maintenance1',
          meta: {
            title: '出勤排班发布',
            noNavs: false,
            parent: 'attendanceManagement'
          },
          component: () => import('@/views/PersonnelManagement/AttendanceManagement/index'),
          redirect: '/personnel/attendance/maintenance/attendance-maintenance',
          children: [
            {
              path: 'attendance-daily',
              name: 'attendanceDaily',
              component: () => import('@/views/PersonnelManagement/AttendanceManagement/AttendanceDaily/index.vue'),
              meta: {
                title: '人员排班日常维护',
                noNavs: false,
                parent: 'maintenance1'
              }
            },
            {
              path: 'attendance-scheduling',
              name: 'attendanceScheduling',
              component: () => import('@/views/PersonnelManagement/AttendanceManagement/AttendanceScheduling/index.vue'),
              meta: {
                title: '排班结果展示发布',
                noNavs: false,
                parent: 'maintenance1'
              }
            }
          ]
        }
        // {
        //   path: 'files-info-maintain',
        //   name: 'FilesInfoMaintain',
        //   component: () => import('@/views/PersonnelManagement/PersonnelFiles/FilesInfoMaintain/index'),
        //   meta: {
        //     title: '档案信息维护',
        //     noNavs: false,
        //     parent: 'attendanceManagement'
        //   }
        // }
      ]
    },
    {
      path: 'search-leave',
      name: 'searchLeave',
      meta: {
        title: '请假查询',
        noNavs: false,
        parent: 'Personnel'
      },
      component: () => import('@/views/PersonnelManagement/SearchLeave/index')
    },
    {
      path: 'search-leave-approval',
      name: 'SearchLeaveApproval',
      meta: {
        title: '请假审批',
        noNavs: false,
        parent: 'Personnel'
      },
      component: () => import('@/views/PersonnelManagement/SearchLeaveApproval/index')
    }
  ]
}
export default personnelRoutes
