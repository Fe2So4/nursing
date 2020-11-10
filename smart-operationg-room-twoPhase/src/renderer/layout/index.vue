<template>
  <el-container>
    <el-header height="60px">
      <!-- <Header v-if="!$route.path.includes('client')" /> -->
      <WinHeader />
    </el-header>
    <el-container>
      <el-aside v-show="hasNavs">
        <Nav v-if="$route.path.includes('home')" />
        <NavTwo v-else />
      </el-aside>
      <el-main>
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
import NavTwo from './nav-two'
import Nav from './nav'
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
  components: {Nav, WinHeader, NavTwo}
}
</script>

<style lang="scss" scoped>
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
      padding-bottom: 34px;
      position: relative;
      box-sizing: border-box;
      height: 100%;
      .copyright{
        position: absolute;
        color: #929498;
        font-size: 14px;
        line-height: 34px;
        bottom: 0;
        right: 20px;
      }
    }
  }
</style>>
