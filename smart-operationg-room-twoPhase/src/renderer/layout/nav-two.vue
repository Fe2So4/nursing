<template>
  <div class="layout-aside">
    <!-- <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      router
      @open="handleOpen"
      @select="handleSelect"
      @close="handleClose"
    >
      <el-menu-item
        v-for="item in menuList"
        :key="item.path"
        :index="item.path"
      >
        <i :class="item.icon" />
        <span slot="title">{{ item.title }}</span>
        <div
          slot="title"
          class="line"
          v-show="activeIndex === item.path"
        />
      </el-menu-item>
    </el-menu> -->
    <el-menu
      class="el-menu-vertical-demo"
      router
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <side-bar-item
        :collapse="isCollapse"
        :key="item.id"
        :children="item"
        :menu="1"
        v-for="item in menuList"
        class="firstMenu"
      />
    </el-menu>
    <div
      :class="fold"
      class="collapse-icon"
      @click="handleCollapse"
    />
  </div>
</template>

<script>
import SideBarItem from './sideBarItem.vue'
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
          title: '手术派单',
          path: '/personnel/search-leave',
          children: [
            {
              icon: 'iconfont icon-guanli',
              title: '病理申请',
              path: '/home/client-pathological-application',
              children: [
                {
                  icon: 'iconfont icon-guanli',
                  title: '病理申请',
                  path: '/home/client-pathological-application'
                }
              ]
            },
            {
              icon: 'iconfont icon-wenjuan',
              title: '护理列表',
              path: '/home/client-nursing-document'
            }
          ]
        },
        {
          icon: 'iconfont icon-caidanxiangdao-',
          title: '人员管理',
          path: '/personnel/search-leave',
          children: [
            {
              icon: 'iconfont icon-guanli',
              title: '人员档案管理',
              path: '/home/client-pathological-application',
              children: [
                {
                  icon: 'iconfont icon-guanli',
                  title: '档案信息维护',
                  path: '/home/client-pathological-application'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '档案信息查询',
                  path: '/personnel/search-leave/personnel-file/files-info-select'
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '公务员信息维护',
                  path: '/home/client-pathological-application'
                }
              ]
            },
            {
              icon: 'iconfont icon-wenjuan',
              title: '出勤排班管理',
              path: '/home/client-nursing-document'
            }
          ]
        },
        {
          icon: 'iconfont icon-guanli',
          title: '病理申请',
          path: '/home/client-pathological-application'
        },
        {
          icon: 'iconfont icon-wenjuan',
          title: '护理列表',
          path: '/home/client-nursing-document'
        },
        {
          icon: 'iconfont icon-shuju',
          title: '统计查询',
          path: '/home/client-statistical-query'
        },
        {
          icon: 'iconfont icon-gongneng',
          title: '连台手术',
          path: '/home/client-continuous-surgery'
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
    SideBarItem
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
  .el-menu {
    background-color: unset;
    border-right: unset;
    .el-menu-item:focus, .el-menu-item:hover{
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
