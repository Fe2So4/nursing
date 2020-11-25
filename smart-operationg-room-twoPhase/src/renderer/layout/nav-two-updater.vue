<template>
  <div class="layout-aside">
    <el-menu
      default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
    >
      <menu-tree :menu-data="menuList" />
    </el-menu>
    <div
      :class="fold"
      class="collapse-icon"
      @click="handleCollapse"
    />
  </div>
</template>

<script>
import MenuTree from './submenu'
export default {
  name: 'Navs',
  data () {
    return {
      isCollapse: false,
      fold: 'el-icon-s-fold',
      activeIndex: '手术派单',
      menuList: [
        {
          icon: 'iconfont icon-caidanxiangdao-',
          title: '人员管理',
          path: '/personnel',
          children: [
            {
              icon: 'iconfont icon-guanli',
              title: '人员档案管理',
              path: '/personnel/personnel-file',
              children: [
                {
                  icon: 'iconfont icon-guanli',
                  title: '档案信息维护',
                  path: '/personnel/personnel-file/files-info-maintain'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '档案信息查询',
                  path: '/personnel/personnel-file/files-info-select'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '公务员信息维护',
                  path: '/personnel/personnel-file/civil-servant-info-maintain'
                }
              ]
            },
            {
              icon: 'iconfont icon-guanli',
              title: '基础字典维护',
              path: '/personnel/basic-dictionary-maintain'
            },
            {
              icon: 'iconfont icon-wenjuan',
              title: '出勤排班管理',
              path: '/personnel/attendance',
              children: [
                {
                  icon: 'iconfont icon-guanli',
                  title: '排班规则维护',
                  path: '/personnel/attendance/maintenance',
                  children: [
                    {
                      icon: 'iconfont icon-guanli',
                      title: '班次时段维护',
                      path: '/personnel/attendance/maintenance/attendance-maintenance'
                    },
                    {
                      icon: 'iconfont icon-guanli',
                      title: '业务分组管理',
                      path: '/personnel/attendance/maintenance/attendance-management'
                    },
                    {
                      icon: 'iconfont icon-guanli',
                      title: '业务带教班次对照',
                      path: '/personnel/attendance/maintenance/contrast'
                    }
                  ]
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '出勤排班发布',
                  path: '/personnel/attendance/maintenance1',
                  children: [
                    {
                      icon: 'iconfont icon-guanli',
                      title: '人员排班日常维护',
                      path: '/personnel/attendance/maintenance1/attendance-daily'
                    },
                    {
                      icon: 'iconfont icon-guanli',
                      title: '排班结果展示发布',
                      path: '/personnel/attendance/maintenance1/attendance-scheduling'
                    }
                  ]

                }
              ]
            },
            {
              icon: 'iconfont icon-gongneng',
              title: '请假查询',
              path: '/personnel/search-leave'
            }
          ]
        },
        {
          icon: 'iconfont icon-caidanxiangdao-',
          title: '设备管理',
          path: '/device',
          children: [
            {
              icon: 'iconfont icon-guanli',
              title: '设备查询',
              path: '/device/device-select'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '设备登记',
              path: '/device/device-register'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '设备组套',
              path: '/device/device-group'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '设备字典信息维护',
              path: '/device/device-dictionary-maintain'
            }
          ]
        },
        {
          icon: 'iconfont icon-caidanxiangdao-',
          title: '科室管理',
          path: '/department',
          children: [
            {
              icon: 'iconfont icon-guanli',
              title: '手术查询',
              path: '/department/search',
              children: [
                {
                  icon: 'iconfont icon-guanli',
                  title: '手术明细查询',
                  path: '/department/search/department-search'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '多次手术查询',
                  path: '/department/search/department-moresearch'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '房间状态查询',
                  path: '/department/search/department-roomsearch'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '手术状态查询',
                  path: '/department/search/department-surgeryStatus'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '护理记录单查询',
                  path: '/department/search/nursing-record-search'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '手术接病人时间查询',
                  path: '/department/search/nursing-receive-search'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '手术接台间隔时间查询',
                  path: '/department/search/surgery-interval-search'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '每日房间结束时间查询',
                  path: '/department/search/daily-endtime-search'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '术后手术信息登记查询',
                  path: '/department/search/endsurgery-info-search'
                }
              ]
            }

          ]
        },
        {
          icon: 'iconfont icon-caidanxiangdao-',
          title: '手术计费',
          path: '/charge',
          children: [
            {
              icon: 'iconfont icon-guanli',
              title: '模板维护',
              path: '/charge/template-maintain'
            }
          ]
        }
      ]
    }
  },
  watch: {
    isCollapse: {
      handler (newVal, old) {
        if (newVal) {
          this.fold = 'el-icon-s-unfold'
        } else {
          this.fold = 'el-icon-s-fold'
        }
      }
    }
  },
  mounted () {

  },
  methods: {
    handleOpen (index) {
      this.activeIndex = index
    },
    handleSelect (index) {
      this.activeIndex = index
    },
    handleClose () {

    },
    handleCollapse () {
      this.isCollapse = !this.isCollapse
    }

  },
  computed: {
    defaultActive () {
      console.log(this.$route.path)
      return this.$route.path
    }
  },
  components: {
    // SideBarItem
    MenuTree
  }
}
</script>

<style scoped lang="scss">
@import './../assets/iconfont/iconfont.css';
@import '@/variable.scss';
.layout-aside {
  height: 100%;
  position: relative;
  background: $nav-bgc;
  overflow: hidden;
  /deep/ .el-menu {
    background-color: unset;
    border-right: unset;
    /deep/ .el-menu-item:focus, .el-menu-item:hover{
      background: linear-gradient(90deg, #3269CE, #2E5287);
      color: $nav-font;
      i{
        color: $nav-font;
      }
    }
    /deep/ .el-submenu__title{
      color: #E2E9F2;
      i{
        color: #E2E9F2;
      }
    }
    /deep/ .el-submenu__title:hover{
      background: linear-gradient(90deg, #3269CE, #2E5287);
      color: $nav-font;
      i{
        color: $nav-font;
      }
      }
    }
  }
.el-menu-item {
  color: $nav-font;
  font-size: 16px !important;
}
.line{
  width: 6px;
  position: absolute;
  left: 0;
  top: 0;
  height: 56px;
  background: #6699FF;
}
.collapse-icon{
  position:absolute;
  right: 20px;
  bottom: 20px;
  font-size: 28px;
  color: #C7DFFF;
  cursor: pointer;
}
.my-el-menu-item div {
  font-size: 18px;
  color: $nav-font;
}
  // .layout-aside{
  //   height: 100%;
  //   // width: 100%;
  //   position: relative;
  //   background: linear-gradient(180deg, #666666, #4A4A4A);
  //   .el-menu{
  //     background-color: unset;
  //     border-right: unset;
  //     .el-submenu,
  //     .el-menu-item{
  //       color: #C6DEFF;
  //       font-size: 18px;
  //       i{
  //         color: #C6DEFF;
  //         font-size: 20px;
  //       }
  //       &.is-active{
  //         background: linear-gradient(90deg, #3269CE, #2E5287);
  //         color: #fff;
  //         i{
  //           color: #fff;
  //         }
  //       }
  //     }
  //     .el-submenu:focus,
  //     .el-menu-item:focus, .el-menu-item:hover{
  //       background: linear-gradient(90deg, #3269CE, #2E5287);
  //       color: #fff;
  //       i{
  //         color: #fff;
  //       }
  //     }
  //   }
  //   .line{
  //     width: 6px;
  //     position: absolute;
  //     left: 0;
  //     top: 0;
  //     height: 56px;
  //     background: #6699FF;
  //   }
  //   .collapse-icon{
  //     position:absolute;
  //     right: 20px;
  //     bottom: 20px;
  //     font-size: 28px;
  //     color: #C7DFFF;
  //     cursor: pointer;
  //   }
  // }
</style>
<style>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
