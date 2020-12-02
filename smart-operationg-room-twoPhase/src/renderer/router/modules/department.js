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
        },
        {
          path: 'interoperative-utilization',
          name: 'InteroperativeUtilization',
          meta: {
            title: '手术间利用率统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/InteroperativeUtilization/index')
        },
        {
          path: 'height-value-charge',
          name: 'HeightValueCharge',
          meta: {
            title: '高值耗材收费统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/HeightValueCharge/index')
        },
        {
          path: 'stapling-number',
          name: 'StaplingNumber',
          meta: {
            title: '吻合器使用登记统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/StaplingNumber/index')
        },
        {
          path: 'charge-project-statistical',
          name: 'ChargeProjectStatistical',
          meta: {
            title: '收费项目统计手术收费',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/ChargeProjectStatistical/index')
        },
        {
          path: 'disinfection-time-statistical',
          name: 'DisinfectionTimeStatistical',
          meta: {
            title: '手术房间消毒时间统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/SurgerySearch1/DisinfectionTimeStatistical/index')
        },
        {
          path: 'cumulative-vacation-moon',
          name: 'CumulativeVacationMoon',
          meta: {
            title: '积休按月统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/DepartmentReport/CumulativeVacationMoon/index')
        },
        {
          path: 'cumulative-vacation-year',
          name: 'CumulativeVacationYear',
          meta: {
            title: '积休按年统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/DepartmentReport/CumulativeVacationYear/index')
        },
        {
          path: 'nursing-staff-billing',
          name: 'NursingStaffBilling',
          meta: {
            title: '护理人员计费统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/DepartmentReport/NursingStaffBilling/index')
        },
        {
          path: 'personnel-department-work',
          name: 'PersonnelDepartmentWork',
          meta: {
            title: '科室人员分工统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/DepartmentReport/PersonnelDepartmentWork/index')
        },
        {
          path: 'personnel-department-holiday',
          name: 'PersonnelDepartmentHoliday',
          meta: {
            title: '科室人员休假统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/DepartmentReport/PersonnelDepartmentHoliday/index')
        },
        {
          path: 'indepartment-calculate-cost',
          name: 'InDepartmentCalculateCost',
          meta: {
            title: '按科室统计手术费用',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/DepartmentReport/InDepartmentCalculateCost/index')
        },
        {
          path: 'indepartment-calculate-number',
          name: 'InDepartmentCalculateNumber',
          meta: {
            title: '按科室统计手术数量',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/DepartmentReport/InDepartmentCalculateNumber/index')
        },
        {
          path: 'innursing-calculate-number',
          name: 'InNursingCalculateNumber',
          meta: {
            title: '按护士统计手术数量',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/DepartmentReport/InNursingCalculateNumber/index')
        },
        {
          path: 'indoctor-calculate-number',
          name: 'InDoctorCalculateNumber',
          meta: {
            title: '按主刀医生统计手术数量',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/DepartmentReport/InDoctorCalculateNumber/index')
        },
        {
          path: 'room-equipment',
          name: 'RoomEquipment',
          meta: {
            title: '房间设备使用登记',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/InstrumentEquipment/RoomEquipment/index')
        },
        {
          path: 'medical-equipment-use',
          name: 'MedicalEquipmentUse',
          meta: {
            title: '房间设备使用登记',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/InstrumentEquipment/MedicalEquipmentUse/index')
        },
        {
          path: 'patient-instrument-search',
          name: 'PatientInstrumentSearch',
          meta: {
            title: '病人器械叫包查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/InstrumentEquipment/PatientInstrumentSearch/index')
        },
        {
          path: 'intraoperative-device-search',
          name: 'IntraoperativeDeviceSearch',
          meta: {
            title: '术中器械补包查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/InstrumentEquipment/IntraoperativeDeviceSearch/index')
        },
        {
          path: 'use-detail-statistics',
          name: 'UseDetailStatistics',
          meta: {
            title: '器械包使用明细统计',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/InstrumentEquipment/UseDetailStatistics/index')
        }
      ]
      // redirect: '/personnel/personnel-file/files-info-select',
      // component: () => import('@/views/DepartmentManagement/SurgerySearch/index')
    }

  ]
}
export default departmentRoutes
