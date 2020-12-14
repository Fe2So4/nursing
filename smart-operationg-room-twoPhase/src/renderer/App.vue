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
.el-dialog {
  border-radius: 5px !important;
}
/* CSS */
.el-button--info.is-plain {
  /* background-color: #E9EDF7 !important; */
  color: #303133;
  font-weight: 600;
}
.el-dialog__footer {
  padding: 10px 20px 10px !important;
}
.el-dialog__title {
  font-size: 16px;
  color: #444444;
  font-weight: 600;
}
/* .el-button--info.is-plain:hover {
    color: #909399;
    background: #f4f4f5;
    border-color: #d3d4d6;
} */
</style>
