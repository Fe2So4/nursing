<template>
  <div class="menu">
    <van-popup v-model="show" position="left" :style="{ width: '40%',height: '100%' }" closeable
    close-icon-position="top-right" close="handleClose" click-overlay="handleClose">
      <div class="menu-list">
        <ul>
          <li>
            帮助
          </li>
          <li>
            关于
          </li>
          <li @click="handleExit">
            退出
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: this.showMenu
    }
  },
  props: {
    showMenu: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    showMenu: {
      handler (val) {
        this.show = this.showMenu
      },
      imediate: true
    }
  },
  methods: {
    handleClose () {
      this.show = false
      // this.$emit('update', false)
    },
    handleExit () {
      navigator.app.exitApp()
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu{
    .menu-list{
      overflow: hidden;
      ul{
        margin-top: 80px;
        border-top: 1PX solid #e2e2e2;
        li{
          line-height: 80px;
          border-bottom: 1PX solid #e2e2e2;
          text-indent: 15px;
          cursor: pointer;
        }
      }
    }
  }
</style>
