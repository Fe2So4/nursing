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
          component: () => import('@/views/DepartmentManagement/SurgerySearch/index'),
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
          component: () => import('@/views/DepartmentManagement/MoreSurgerySearch/index')
          // redirect: '/personnel/personnel-file/files-info-select',
        },
        {
          path: 'department-roomsearch',
          name: 'DepartmentRoomsearch',
          meta: {
            title: '房间状态查询',
            noNavs: false,
            parent: 'Department'
          },
          component: () => import('@/views/DepartmentManagement/RoomStatusSearch/index')
          // redirect: '/personnel/personnel-file/files-info-select',
        }
      ]
      // redirect: '/personnel/personnel-file/files-info-select',
      // component: () => import('@/views/DepartmentManagement/SurgerySearch/index')
    }

  ]
}
export default departmentRoutes
