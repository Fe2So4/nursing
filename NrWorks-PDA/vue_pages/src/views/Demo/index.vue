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
      text: '',
      keyCode: '',
      result: ''
    }
  },
  methods: {
    handleClick () {
      // alert(cordova, ToastShow)
      ToastShow.show('45566555')
    }
  },
  mounted () {
    this.text = '扫码结果显示区域。。。。'
    // window['scanBarcodeHandler'] = (barcode) => {
    //   this.text = barcode
    // }
    // window.onkeypress = (e) => {
    //   alert(e)
    //   this.text = e
    //   console.log(e.which, '按键')
    // }
    // document.onkeypress = (e) => {
    //   this.text = e
    // this._nextCode = e.which;
    // this._nextTime = new Date().getTime();

    // if (this._lastCode != null && this._lastTime != null && this._nextTime - this._lastTime <= 30) {
    //     this._code += String.fromCharCode(this._lastCode);
    // } else if (this._lastCode != null && this._lastTime != null && this._nextTime - this._lastTime > 100) {
    //     this._code = '';
    // }

    // this._lastCode = this._nextCode;
    // this._lastTime = this._nextTime;
    // }
    document.addEventListener('deviceready', onDeviceReady, false)
    function onDeviceReady () {
      console.log('console.log works well')
      // console.log(ToastShow)
      // ToastShow.show('45566555')
      // window.addEventListener('getqrdata', getQRData, false)
      // window.onkeypress = (e) => {
      //   this.text = e.which
      //   console.log(e.which, '按键')
      // }
    }
  //   window.addEventListener('getqrdata', getQRData, false)
  //   function getQRData (data) {
  //     console.log(data.data)
  //     this.text = data.data
  //   }
  //   document.οnkeydοwn = function (event) {
  //     var e = event || window.event
  //     console.log(e)
  //     this.keyCode = e.keyCode
  //     if (e && e.keyCode == 27) { // 按 Esc
  //       // 要做的事情
  //     }
  //     if (e && e.keyCode == 113) { // 按 F2
  //       // 要做的事情
  //     }
  //     if (e && e.keyCode == 13) { // enter 键
  //       // 要做的事情
  //       // login()
  //       this.text = '回车事件触发' + e.keyCode
  //     }
  //   }
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
