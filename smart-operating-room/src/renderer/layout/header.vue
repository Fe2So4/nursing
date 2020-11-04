<template>
  <div class="layout-header">
    <div class="left">
      <img
        src="../assets/logo-tq.png"
        alt=""
        @click="()=>{$router.push('/login')}"
      >
      <span>Dandelion 智慧手术中心<i />临床护理</span>
      <span>
        <el-radio-group
          v-model="radio"
          @change="handleChange"
        >
          <el-radio :label="1">大屏</el-radio>
          <el-radio :label="2">接单</el-radio>
          <el-radio :label="3">派单</el-radio>
        </el-radio-group>
      </span>
    </div>
    <div class="right">
      {{ time }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: '',
      interval: null,
      radio: 1
    }
  },
  methods: {
    updateTime () {
      var cd = new Date()
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
    },
    zeroPadding (num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
    handleChange (param) {
      switch (param) {
        case 1:
          this.$router.push('/home/large-screen')
          break
        case 2:
          this.$router.push('/home/receiving-orders')
          break
        case 3:
          this.$router.push('/home/client-operation-orders')
      }
    }
  },
  mounted () {
    this.updateTime()
    this.interval = setInterval(this.updateTime, 1000)
  },
  destroyed () {
    this.interval = null
  }
}
</script>

<style lang="scss" scoped>
  .layout-header{
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #666666, #303030);
    color: #fff;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    .left{
      font-size: 20px;
      img{
        vertical-align: middle;
      }
      span{
        margin-left:19px;
        i{
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          vertical-align: middle;
          background: #fff;
          margin:0 4px;
        }
      }
    }
    .right{
      font-size: 24px;
      margin-right: 21px;
    }
  }
</style>>
