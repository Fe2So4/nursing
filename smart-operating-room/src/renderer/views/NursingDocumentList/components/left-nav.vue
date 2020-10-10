<template>
  <div class="left-nav-container">
    <div class="nav-title">
      单据护理
    </div>
    <div class="nav-content">
      <el-menu
        style="width:180px"
        :default-active="defaultRouter"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @select="handleSelect"
        @close="handleClose"
        :default-openeds="defaultArray"
      >
        <el-menu-item index="/home/nursing-document-list/security-check">
          安全检查
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <span>护理记录</span>
          </template>
          <el-menu-item index="/home/nursing-document-list/nursing-one">
            护理记录(一)
          </el-menu-item>
          <el-menu-item index="/home/nursing-document-list/nursing-two">
            护理记录(二)
          </el-menu-item>
          <el-menu-item index="/home/nursing-document-list/nursing-jichu">
            护理记录基础
          </el-menu-item>
          <el-menu-item index="/home/nursing-document-list/nursing-teshu">
            护理记录特殊
          </el-menu-item>
          <el-menu-item index="/home/nursing-document-list/nursing-transit-transfer">
            患者转运交接
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftNav',
  data () {
    return {
      defaultArray: [2],
      defaultRouter: '/home/nursing-document-list/security-check',
      menuList: [
        {
          icon: 'el-icon-s-order',
          title: '安全检查',
          path: '/home/nursing-document-list/security-check'
        },
        {
          icon: 'el-icon-s-order',
          title: '护理记录',
          children: [
            {
              icon: 'el-icon-s-order',
              title: '护理记录一',
              path: '/home/nursing-document-list/nursing-one'
            },
            {
              icon: 'el-icon-s-order',
              title: '护理记录二',
              path: '/home/nursing-document-list/nursing-two'
            },
            {
              icon: 'el-icon-s-order',
              title: '护理记录基础',
              path: '/home/nursing-document-list/nursing-jichu'
            },
            {
              icon: 'el-icon-s-order',
              title: '护理记录特殊',
              path: '/home/nursing-document-list/nursing-teshu'
            },
            {
              icon: 'el-icon-s-order',
              title: '患者转运交接',
              path: '/home/nursing-document-list/nursing-transit-transfer'
            }
          ]
        }

      ]
    }
  },
  mounted () {
    console.log(this.$route.path)
    this.defaultRouter = this.$route.path
  },
  methods: {
    handleOpen (index) {
      console.log('点击打开')
      this.activeIndex = index
    },
    handleSelect (index) {
      this.defaultRouter = index
      this.$router.push(index)
    },
    handleClose () {

    }
  }
}
</script>

<style scoped lang="scss">
.left-nav-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .nav-title {
    padding: 20px 0 20px 20px;
    color: #444444;
    font-weight: 600;
  }
  .nav-content {
    margin-top: 20px;
  }
}
.el-menu-item:focus, .el-menu-item:hover {
  background-color: #D6DCE8;
  color: #000;
}
.el-menu-item {
  height: 35px;
  line-height: 35px;
  padding: 0;
  min-width: 160px;
  &.is-active{
    background-color: #D6DCE8;
    color: #000;
  }
}
</style>
