<template>
  <div class="layout-aside">
    <el-menu
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
      activeIndex: '/home/operation-orders',
      menuList: [
        // {
        //   icon:'el-icon-data-line',
        //   title:'术中大屏',
        //   path:'/home/large-screen'
        // },
        {
          icon: 'el-icon-s-order',
          title: '手术派单',
          path: '/home/operation-orders'
        },
        {
          icon: 'el-icon-s-order',
          title: '病理申请',
          path: '/home/pathological-application'
        },
        {
          icon: 'el-icon-s-order',
          title: '护理列表',
          path: '/home/nursing-document'
        },
        {
          icon: 'el-icon-s-claim',
          title: '统计查询',
          path: '/home/statistical-query'
        },
        {
          icon: 'el-icon-s-claim',
          title: '连台手术',
          path: '/home/continuous-surgery'
        }
      ]
    }
  },
  computed: {
    // el-icon-s-unfold
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
  }
}
</script>

<style scoped lang="scss">
  .layout-aside{
    height: 100%;
    // width: 100%;
    position: relative;
    background: linear-gradient(180deg, #666666, #4A4A4A);
    .el-menu{
      background-color: unset;
      border-right: unset;
      .el-menu-item{
        color: #C6DEFF;
        font-size: 18px;
        i{
          color: #C6DEFF;
          font-size: 20px;
        }
        &.is-active{
          background: linear-gradient(90deg, #3269CE, #2E5287);
          color: #fff;
          i{
            color: #fff;
          }
        }
      }
      .el-menu-item:focus, .el-menu-item:hover{
        background: linear-gradient(90deg, #3269CE, #2E5287);
        color: #fff;
        i{
          color: #fff;
        }
      }
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
  }
</style>
<style>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
