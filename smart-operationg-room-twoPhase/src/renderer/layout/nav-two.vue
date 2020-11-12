<template>
  <div
    id="sideBar"
    class="layout-aside"
  >
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
    <transition name="slide-left">
      <div v-show="show">
        <el-menu
          default-active="/personnel/search-leave"
          class="el-menu-vertical-demo"
          router
          :collapse="false"
          @open="handleOpen"
          @select="handleSelect"
          @close="handleClose"
        >
          <side-bar-item
            :active-index="activeIndex"
            :collapse="isCollapse"
            :key="item.path"
            :children="item"
            :menu="1"
            v-for="item in menuList"
            class="firstMenu"
          />
        </el-menu>
      </div>
    </transition>
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
      show: true,
      isCollapse: false,
      fold: 'el-icon-s-fold',
      activeIndex: '/personnel/search-leave',
      menuList: [
        {
          icon: 'iconfont icon-gongneng',
          title: '请假查询',
          path: '/personnel/search-leave'
        },
        {
          icon: 'iconfont icon-caidanxiangdao-',
          title: '人员管理',
          path: '/personnel/personnel-file',
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
                  path: '/home/client-pathological-application'
                }
              ]
            },
            {
              icon: 'iconfont icon-guanli',
              title: '基础字典维护',
              path: '/personnel/basic-dictionary-maintain'
            },
            {
              icon: 'iconfont icon-wenjuan',
              title: '出勤排班管理',
              children: [
                {
                  icon: 'iconfont icon-guanli',
                  title: '排班规则维护',
                  children: [
                    {
                      icon: 'iconfont icon-guanli',
                      title: '班次时段维护',
                      path: '/personnel/attendance/maintenance/attendance-maintenance'
                    },
                    {
                      icon: 'iconfont icon-guanli',
                      title: '业务分组管理',
                      path: '/personnel/business/management'
                    },
                    {
                      icon: 'iconfont icon-guanli',
                      title: '业务带教班次对照',
                      path: '/personnel/business/contrast'
                    }
                  ]
                },
                {
                  icon: 'iconfont icon-guanli',
                  title: '出勤排班发布',
                  children: [
                  ]

                }
              ]

            }

          ]
        }

      ]
    }
  },

  mounted () {
    this.clacMargin()
    window.onresize = this.clacMargin()
  },
  methods: {
    handleOpen (index) {
      this.activeIndex = index
    },
    handleSelect (index) {
      console.log('index', index)
      this.activeIndex = index
    },
    handleClose () {

    },
    clacMargin () {
      setTimeout(() => {
        var width = document.getElementById('sideBar') ? document.getElementById('sideBar').clientWidth : 0
        console.log(width)
        if (this.show) {
          this.$store.dispatch('changeView', width + 20)
        } else {
          this.$store.dispatch('changeView', 0)
        }
      }, 150)
    },
    // handleCollapse () {
    //   this.isCollapse = !this.isCollapse
    // },
    handleCollapse () {
      this.show = !this.show
      if (this.show) {
        this.fold = 'el-icon-s-fold'
      } else {
        this.fold = 'el-icon-s-unfold'
      }
      this.clacMargin()
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
.nav-top {
  color: #fff;
  width: 100%;
  // justify-content: center;
  padding: 0 20px;
  height: 40px;
  display: flex;
  align-items: center;
}
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

.collapse-icon{
  position: fixed;
  left: 0;
  top: 45%;
  bottom: 0;
  width: 20px;
  color: white;
  background: $nav-bgc;
  height: 40px;
  vertical-align: middle;
  display: table-cell;
  z-index: 1;
  font-size: 18px;
  line-height: 40px;
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
.slide-left-enter-active {
  transition: all .1s ease;
}
.slide-left-leave-active {
  transition: all .1s ease-out;
}
.slide-left-enter, .slide-left-leave-active {
  transform: translateX(-150px);
  opacity: 0;
}
</style>
<style>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
