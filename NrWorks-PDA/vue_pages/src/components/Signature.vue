<template>
  <div class="signature">
    <div class="signature-body">
      <h3>巡回护士签名</h3>
      <h3>电子签名板</h3>
      <div class="signature-content" ref="canvasBox">
        <canvas ref="canvasF" @touchstart="touchStart" @touchmove="touchMove"
        @touchend="touchEnd"></canvas>
      </div>
      <h4>请在此处签名</h4>
      <div class="option">
        <van-button round color="#3377FF" icon="success" @click="handleSaveImg">确定</van-button>
        <van-button round color="#D5DDF1" icon="replay" @click="handleRefresh">清屏</van-button>
        <van-button round color="#FF4E4E" @click="handleClose" icon="cross">取消</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signature',
  data () {
    return {
      show: true,
      signature: null,
      moving: true,
      stageInfo: '',
      imgUrl: '',
      imgUrlList: [],
      client: {},
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false
    }
  },
  props: {

  },
  watch: {
  },
  methods: {
    init () {
      var canvas = this.$refs.canvasF
      canvas.width = this.$refs.canvasBox.offsetWidth - 0 // 设置画布宽
      canvas.height = this.$refs.canvasBox.offsetHeight - 0 // 设置画布高
      this.canvasTxt = canvas.getContext('2d')
      this.canvasTxt.strokeStyle = 'blue'
      this.canvasTxt.lineWidth = 4
      this.stageInfo = canvas.getBoundingClientRect()
    },
    touchStart (ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length === 1) {
        let obj = {
          x: ev.targetTouches[0].clienX,
          y: ev.targetTouches[0].clientY
        }
        this.startX = obj.x
        this.startY = obj.y
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
      }
    },
    touchMove (ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length === 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stageInfo.left,
          y: ev.targetTouches[0].clientY - this.stageInfo.top
        }
        this.moveY = obj.y
        this.moveX = obj.x
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.startY = obj.y
        this.startX = obj.x
        this.points.push(obj)
      }
    },
    touchEnd (ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length === 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stageInfo.left,
          y: ev.targetTouches[0].clientY - this.stageInfo.top
        }
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
      }
    },
    handleClose () {
      this.$emit('handleClose')
    },
    handleRefresh () {
      var c = this.$refs.canvasF
      var cxt = c.getContext('2d')
      cxt.clearRect(0, 0, c.width, c.height)
    },
    handleSaveImg () {
      let img = this.$refs.canvasF.toDataURL('image/png')
      // setTimeout(function () {
      //   /* html2canvas 1.0.5 版本 */
      // console.log(img)
      // }, 500)
      this.$emit('handleSubmit', img)
      this.$emit('handleClose')
    },
    handleReset () {
      var c = this.$refs.canvasF
      var cxt = c.getContext('2d')
      cxt.clearRect(0, 0, c.width, c.height)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .signature{
    background: #F2F2F2;
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    padding: 20px 15px;
    z-index: 999;
    box-sizing: border-box;
    .signature-body{
      background: #ffffff;
      height: 100%;
      overflow: hidden;
      position: relative;
      padding: 0 20px;
      box-sizing: border-box;
      h3{
        font-size: 36px;
        text-align: center;
        color: #2E2E2E;
        &:nth-child(1){
          font-weight:lighter;
          margin-top: 40px;
        }
        &:nth-child(2){
          margin:40px 0;
        }
      }
      h4{
        text-align: center;
        color: #7F7F7F;
        line-height: 66px;
        font-size: 26px;
        font-weight: lighter;
      }
      .signature-content{
        position: relative;
        height: 680px;
        margin: 0 auto;
        box-sizing: border-box;
        background: #EBEBEB;
        border: 1px solid #A9A9A9;
      }
      .option{
        display: flex;
        .van-button{
          flex: 1;
          line-height: 80px;
          font-size: 30px;
          height: 80px;
          /deep/ .van-button__icon{
            font-size: 28px;
          }
          &:nth-child(2){
            margin:0 20px;
          }
        }
      }
    }
  }
</style>
