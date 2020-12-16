<template>
  <!-- <div class="menu-tree"> -->
  <fragment>
    <template v-for="menu in this.menuData">
      <el-submenu
        :key="menu.path"
        :index="menu.path + ''"
        v-if="menu.children"
      >
        <template slot="title">
          <i
            :class="menu.icon"
            v-if="menu.title==='人员管理'"
          />
          <span slot="title">{{ menu.title }}</span>
        </template>
        <menu-tree :menu-data="menu.children" />
      </el-submenu>
      <!-- @click="savePath(menu.path)" -->
      <el-menu-item
        :key="menu.path"
        :index="menu.path + ''"
        v-else
      >
        <!-- <i :class="menu.icon" /> -->
        <span slot="title">{{ menu.title }}</span>
        <!-- <div
          slot="title"
          class="line"
          v-show="activeIndex === menu.path"
        /> -->
      </el-menu-item>
    </template>
  </fragment>
  <!-- </div> -->
</template>
<script>
export default {
  name: 'MenuTree',
  data () {
    return {
      activeIndex: ''
    }
  },
  props: {
    menuData: {
      type: Array,
      required: true
    }
  },
  mounted () {
    this.activeIndex = this.$route.path
  },
  methods: {
    savePath (item) {
      this.activeIndex = item
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../assets/iconfont/iconfont.css';
@import '@/variable.scss';

  .active {
    background-color: #000;
  }
  .el-menu {
    background-color: unset;
    border-right: unset;
    .el-menu-item {
      color: $nav-font;
      font-size: 12px !important;
      &.is-active{
        background: linear-gradient(90deg, #3269CE, #2E5287);
      }
    }
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
    .line{
      width: 6px;
      position: absolute;
      left: 0;
      top: 0;
      height: 50px;
      background: #6699FF;
    }
</style>
