<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'SmartOperatingRoom',
  data () {
    return {}
  },
  mounted () {
    // this.getBaseDictDetailList()
  },
  methods: {
    // 获取排班数据字典
    getBaseDictDetailList () {
      let obj = {
        belongSerialNumber: '006'
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {

        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 提示方法
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: 3000
      })
    }
  }
}
</script>

<style>
/* CSS */

</style>
