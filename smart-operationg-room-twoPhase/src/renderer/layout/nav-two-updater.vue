<template>
  <div class="layout-aside">
    <el-menu
      default-active="/personnel/personnel-file"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <template
        v-for="item in menuList"
      >
        <el-submenu
          :index="item.path"
          :key="item.path"
          v-if="item.children.length>0&&item.children"
        >
          <template slot="title">
            <i class="el-icon-location" />
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="_item in item.children">
            <el-submenu
              :index="_item.path"
              :key="_item.path"
              v-if="_item.children&&_item.children.length>0"
            >
              <span slot="title">{{ _item.title }}</span>
              <el-menu-item
                :index="__item.path"
                v-for="__item in _item.children"
                :key="__item.path"
              >
                {{ __item.title }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item
              :key="_item.path"
              :index="_item.path"
              v-else
            >
              {{ _item.title }}
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item
          :index="item.path"
          :key="item.path"
          v-else
        >
          <i class="el-icon-menu" />
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <div
      :class="fold"
      class="collapse-icon"
      @click="handleCollapse"
    />
  </div>
</template>

<script>
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
              icon: 'iconfont icon-wenjuan',
              title: '出勤排班管理',
              path: '/home/client-nursing-document'
            },
            {
              icon: 'iconfont icon-gongneng',
              title: '请假查询',
              path: '/personnel/search-leave'
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
