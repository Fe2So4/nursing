<template>
  <div class="layout-aside">
    <div style="height:100%">
      <el-scrollbar :class="{'reduceHeight':true}">
        <el-menu
          :unique-opened="true"
          default-active="defaultActive"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
        >
          <menu-tree :menu-data="menuList" />
        </el-menu>
      </el-scrollbar>
    </div>

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
            },
            {
              icon: 'iconfont icon-guanli',
              title: '日常统计',
              // path: '/department/search',
              children: [
                {
                  icon: 'iconfont icon-guanli',
                  title: '手术分级统计',
                  path: '/department/search/surgery-level-statistical'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '一值班二值班',
                  path: '/department/search/duty-search'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '积休统计明细表',
                  path: '/department/search/statistical-detail-search'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '手术间隔时长统计',
                  path: '/department/search/surgery-interval-time'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '夜间加班积修统计',
                  path: '/department/search/work-overtime-search'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '手术名称数量统计',
                  path: '/department/search/surgery-name-number'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '手术分值记录统计',
                  path: '/department/search/surgery-score'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '手术间利用率统计',
                  path: '/department/search/interoperative-utilization'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '高值耗材收费统计',
                  path: '/department/search/height-value-charge'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '吻合器使用登记统计',
                  path: '/department/search/stapling-number'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '收费项目统计手术收费',
                  path: '/department/search/charge-project-statistical'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '手术房间消毒时间统计',
                  path: '/department/search/disinfection-time-statistical'
                }
              ]
            },
            {
              icon: 'iconfont icon-guanli',
              title: '科室报表',
              path: '/department/baobiao',
              children: [
                {
                  icon: 'iconfont icon-guanli',
                  title: '积休按月统计',
                  path: '/department/search/cumulative-vacation-moon'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '积休按年统计',
                  path: '/department/search/cumulative-vacation-year'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '护理人员计费统计',
                  path: '/department/search/nursing-staff-billing'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '科室人员分工统计',
                  path: '/department/search/personnel-department-work'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '科室人员休假统计',
                  path: '/department/search/personnel-department-holiday'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '按科室统计手术费用',
                  path: '/department/search/indepartment-calculate-cost'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '按科室统计手术数量',
                  path: '/department/search/indepartment-calculate-number'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '按护士统计手术数量',
                  path: '/department/search/innursing-calculate-number'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '按主刀医生统计手术数量',
                  path: '/department/search/indoctor-calculate-number'
                }
              ]
            },
            {
              icon: 'iconfont icon-guanli',
              title: '器械设备报表',
              path: '/department/qixie',
              children: [
                {
                  icon: 'iconfont icon-guanli',
                  title: '房间设备使用登记',
                  path: '/department/search/room-equipment'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '医疗设备使用统计',
                  path: '/department/search/medical-equipment-use'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '病人器械叫包查询',
                  path: '/department/search/patient-instrument-search'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '术中器械补包查询',
                  path: '/department/search/intraoperative-device-search'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '器械包使用明细统计',
                  path: '/department/search/use-detail-statistics'
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
            },
            {
              icon: 'iconfont icon-guanli',
              title: '限制耗材药品计费',
              path: '/charge/limit-drugs'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '计费审核',
              path: '/charge/billing-audit'
            }
          ]
        },
        {
          icon: 'iconfont icon-caidanxiangdao-',
          title: '护理电子病历',
          path: '/emr',
          children: [
            {
              icon: 'iconfont icon-guanli',
              title: '术前准备交接记录',
              path: '/emr/record-ready'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '术前护理评估单',
              path: '/emr/record-before-nursing'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '术前访视记录单',
              path: '/emr/record-before-interview'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '术后检查交接记录',
              path: '/emr/record-after-check'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '术后访视记录单',
              path: '/emr/record-after-interview'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '手术室护士交接单',
              path: '/emr/record-nurse-handover'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '患者手术信息',
              path: '/emr/patient-operation-info'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '风险门罗评估单',
              path: '/emr/record-risk-monroe-assessment'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '手术安全风险评估',
              path: '/emr/operation-security-assessment'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '手术不良事件上报',
              path: '/emr/operation-bad-event'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '手术护理记录单',
              path: '/emr/record-nursing'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '家属呼叫',
              path: '/emr/family-call'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '取消手术器械包退包',
              path: '/emr/cancel-device-package-back'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '急诊与日间手术',
              path: '/emr/emergency-day'
            },
            {
              icon: 'iconfont icon-guanli',
              title: '电子病历首页',
              path: '/emr/emr-basic'
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
  background: $nav-bgc;
  height: 100%;
  position: relative;
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
/deep/ .el-scrollbar__view {
  height: 100%;
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.reduceHeight {
  height: calc(100% - 50px);
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
