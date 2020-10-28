<template>
  <div id="deviceready" class="demo blink">
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
    function onDeviceReady () {
      // eslint-disable-next-line no-undef
      cordova.ScanCode.getCode('12', e => {
        if (e) {
          this.text = e
        }
      })
    }
  },
  methods: {
    handleClick () {
    // eslint-disable-next-line no-undef
      console.log(cordova.ScanCode)
      // eslint-disable-next-line no-undef
      cordova.ScanCode.getCode('12', e => {
        if (e) {
          this.text = e
        } else {
          alert('扫码失败')
        }
      })
    }
  }
  // mounted () {
  //   document.addEventListener('deviceready', onDeviceReady, true)
  //   function onDeviceReady () {
  //     console.log('console.log works well')
  //     cordova.ScanCode.getCode('扫码', e => {
  //       if (e) {
  //         this.text = e
  //       } else {
  //         alert('扫码失败')
  //       }
  //     })
  //   }
  // }
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
