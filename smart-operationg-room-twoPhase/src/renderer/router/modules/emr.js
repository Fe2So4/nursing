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
    },
    {
      path: 'record-before-nursing',
      name: 'RecordBeforeNursing',
      meta: {
        title: '术前护理评估单',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/RecordBeforeNursing/index')
    },
    {
      path: 'record-before-interview',
      name: 'RecordBeforeInterview',
      meta: {
        title: '术前访视记录单',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/RecordBeforeInterview/index')
    },
    {
      path: 'record-after-check',
      name: 'RecordAfterCheck',
      meta: {
        title: '术后检查交接记录',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/RecordAfterCheck/index')
    },
    {
      path: 'record-after-interview',
      name: 'RecordAfterInterview',
      meta: {
        title: '术后访视记录单',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/RecordAfterInterview/index')
    },
    {
      path: 'record-nurse-handover',
      name: 'RecordNurseHandover',
      meta: {
        title: '手术室护士交接单',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/RecordNurseHandover/index')
    },
    {
      path: 'patient-operation-info',
      name: 'PatientOperationInfo',
      meta: {
        title: '患者手术信息',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/PatientOperationInfo/index')
    },
    {
      path: 'record-risk-monroe-assessment',
      name: 'RecordRiskMonroeAssessment',
      meta: {
        title: '风险门罗评估单',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/RiskMonroeAssessment/index')
    },
    {
      path: 'operation-security-assessment',
      name: 'OperationSecurityAssessment',
      meta: {
        title: '手术室安全风险评估',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/OperationSecurityAssessment/index')
    },
    {
      path: 'operation-bad-event',
      name: 'OperationBadEvent',
      meta: {
        title: '手术不良事件上报',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/OperationBadEvent/index')
    },
    {
      path: 'record-nursing',
      name: 'RecordNursing',
      meta: {
        title: '手术护理记录单',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/RecordNursing/index')
    },
    {
      path: 'family-call',
      name: 'FamilyCall',
      meta: {
        title: '家属呼叫',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/FamilyCall/index')
    },
    {
      path: 'cancel-device-package-back',
      name: 'CancelDevicePackageBack',
      meta: {
        title: '取消手术器械包退包',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/CancelDevicePackageBack/index')
    },
    {
      path: 'emergency-day',
      name: 'EmergencyDay',
      meta: {
        title: '急诊与日间手术',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/EmergencyAndDay/index')
    },
    {
      path: 'emr-home',
      name: 'EmrHome',
      meta: {
        title: '电子病历主页',
        noNavs: false,
        parent: 'EMR'
      },
      component: () => import('@/views/NursingEmr/EmrHome/index')
    }
  ]
}
export default chargeRoutes
