<template>
  <el-container>
    <el-header height="60px">
      <!-- <Header v-if="!$route.path.includes('client')" /> -->
      <WinHeader />
    </el-header>
    <el-container>
      <el-aside v-show="hasNavs">
        <Nav v-if="$route.path.includes('home')" />
        <!-- <NavTwo v-else /> -->
        <NavNew v-else />
      </el-aside>
      <el-main :class="{'el-main-mystyle':$route.path.includes('index-tab')?true:false}">
        <BreadCrumb v-if="!$route.path.includes('index-tab')" />
        <router-view />
        <div class="copyright">
          Copyright©2011-{{ time }}上海仝佥信息技术有限公司
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Header from './header'
import WinHeader from './win-header'
// import NavTwo from './nav-two'
import Nav from './nav'
import NavNew from './nav-two-updater'
import BreadCrumb from '@/components/BreadCrumb/bread-crumb'
import moment from 'moment'
export default {
  name: 'Layout',
  data () {
    return {
      hasNavs: true,
      time: moment(new Date()).format('YYYY')
    }
  },
  watch: {
    $route: {
      handler (route) {
        if (route.meta && route.meta.noNavs) {
          this.hasNavs = false
        } else {
          this.hasNavs = true
        }
      },
      immediate: true
    }
  },
  // Header
  // components: {Nav, WinHeader, NavTwo, BreadCrumb}
  components: {Nav, WinHeader, BreadCrumb, NavNew}
}
</script>

<style lang="scss" scoped>
  // /deep/ .el-main-mystyle {
  //   background-color: red !important;
  //       // padding: 0 0 34px 0 !important;
  //       // padding: none;
  // }
  .el-container{
    height: 100%;
    width: 100%;
    .el-header{
      padding: 0;
    }
    .el-aside{
      width: auto !important
    }
    .el-main{
      background: #f3f5fa;
      box-sizing: border-box;
      // height: calc(100% - 24px);
      padding-bottom: 34px;
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: 100%;
      padding:  10px 20px 34px 20px;
      .copyright{
        position: absolute;
        color: #929498;
        font-size: 14px;
        line-height: 34px;
        bottom: 0;
        right: 20px;
      }
      &.el-main-mystyle {
        background-color: #3D434C !important;
        padding: 0 0 34px 0 !important;
            // padding: none;
      }
      // &.el-main-mystyle {
      //   background-color: red !important;
      //   // padding: 0 0 34px 0 !important;
      //   // padding: none;
      // }
    }
  }
</style>>
