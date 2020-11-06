<template>
  <div class="demo">
    <h3>扫码</h3>
    <div>{{text}}</div>
    <div>{{keyCode}}</div>
    <div @click="handleClick">触发</div>
    <div>{{result}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      text: '扫码显示区域',
      keyCode: '',
      result: ''
    }
  },
  mounted () {
    document.addEventListener('deviceready', onDeviceReady, false)
    let that = this
    function onDeviceReady () {
      cordova.ScanCode.getCode('12', e => {
        if (e) {
          that.text = e
        }
      })
    }
  },
  methods: {
    handleClick () {
      cordova.ScanCode.getCode('12', e => {
        if (e) {
          this.text = e
        } else {
          alert('扫码失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .demo{
    text-align: center;
    div{
      border: 1PX solid black;
      line-height: 100px;
    }
  }
</style>
