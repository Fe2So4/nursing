<template>
<div class="signature-body">
  <div class="sign">
    <div class="header">
      <!-- <i class="el-icon-arrow-left backImg" @click="goBack"></i> -->
      <!-- <span class="title">个人签名</span> -->
      <h3>巡回护士电子签名</h3>
      <h3>电子签名板</h3>
    </div>
    <section class="signature">
      <div class="signatureBox">
        <div class="canvasBox" ref="canvasHW">
          <canvas ref="canvasF" class="canvasStyle" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>
        </div>
      </div>
    </section>
    <h4>请在此处签名</h4>
    <div class="btnBox">
        <van-button round color="#3377FF" icon="success" @click="commit">确定</van-button>
        <van-button round color="#D5DDF1" icon="replay" @click="overwrite">清屏</van-button>
        <van-button round color="#FF4E4E" @click="handleClose" icon="cross">取消</van-button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'personsign',
  data () {
    return {
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
      // isViewAutograph: this.$route.query.isViews > 0,
      // contractSuccess: this.$route.query.contractSuccess
    }
  },
  mounted () {
    this.$nextTick(() => {
      let canvas = this.$refs.canvasF
      canvas.height = this.$refs.canvasHW.offsetHeight - 0
      canvas.width = this.$refs.canvasHW.offsetWidth - 0
      this.canvasTxt = canvas.getContext('2d')
      this.canvasTxt.lineWidth = 4
      this.canvasTxt.strokeStyle = 'blue'
      this.stageInfo = canvas.getBoundingClientRect()
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    // session.clear()
    },
    // mobile
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
      if (ev.touches.length == 1) {
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
      if (ev.touches.length == 1) {
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
    // pc
    mouseDown (ev) {
      ev = ev || event
      ev.preventDefault()
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        }
        this.startX = obj.x
        this.startY = obj.y
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()

        // this.canvasTxt.strokeRect(20,20,80,100);
        this.canvasTxt.closePath()
        this.points.push(obj)
        this.isDown = true
      }
    },
    mouseMove (ev) {
      ev = ev || event
      ev.preventDefault()
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
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
    mouseUp (ev) {
      ev = ev || event
      ev.preventDefault()
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        }
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
        this.points.push({x: -1, y: -1})
        this.isDown = false
      }
    },
    // 重写
    overwrite () {
      this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
      this.points = []
    },
    handleClose () {
      this.$emit('handleClose')
    },
    // 确定签名
    commit () {
      this.imgUrl = this.$refs.canvasF.toDataURL()
      // this.imgUrlList.push(this.imgUrl)
      // if (this.imgUrlList.length > 0) {
      //   this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
      //   this.points = []
      // }
      console.log(this.imgUrl)
    },
    deleteAll () {
      this.imgUrlList = []
    },
    // 提交签名给前一页
    commitAll () {
    // 用canvas合并多张图片的base64为一张图的base64
      var canvas = document.createElement('canvas')
      canvas.width = 75 * this.imgUrlList.length
      canvas.height = 100
      var context = canvas.getContext('2d')

      context.rect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#fff'
      context.fill()

      var myImage = new Image()
      myImage.crossOrigin = 'Anonymous'
      // 当签名列表有值时
      if (this.imgUrlList.length > 0) {
        for (let i = 0; i < this.imgUrlList.length; i++) {
          myImage.src = this.imgUrlList[i]
          // 多张图片绘制成一张图片
          context.drawImage(myImage, 50 * i, 0, 75, 75) // context.drawImage(img,x,y,width,height);
          // context.font = "60px Courier New";
          // context.fillText("我是文字",350,450);
        }
        var base64 = canvas.toDataURL('image/jpg') // "image/jpg" 这里注意一下
        console.log(base64)
        this.$router.go(-1) // 要在bus之前写不然值传不回去
        // setTimeout(() => {
        //   // Bus.$emit('signImage', base64) // 签名base64传给前一页
        // }, 300)
      }
    }
  },
  beforeDestroy () {
    // 销毁bus
    // Bus.$off()
  }
}
</script>
<style scoped lang="scss">
// 签名样式很重要，会影响触点位置
.signature-body{
  background: #F2F2F2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding:20px 15px;
  height: 100vh;
  box-sizing: border-box;
}
.sign{
  width: 100%;
  height: 100%;
  min-height: 100%;
  position: relative;
  background: #FFFFFF;
  text-align: center;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  .header{
  //  margin-bottom: 20px;
   padding-top: 40px;
   h3{
      font-size: 36px;
      color: #2e2e2e;
      &:nth-child(1){
        font-weight:lighter;
        // margin-top: 40px;
      }
      &:nth-child(2){
        margin:40px 0;
      }
   }
  }
  .tijiao-box{
    width: 100%;
    text-align: center;
  }
  .tijiao{
    width: 90%;
    height: 84px;
    color: #fff;
    border-radius: 2px;
    background: #fa4b31;
    box-shadow: 0 0 0px 1px #fa4b31;
    font-size: 30px;

   }
}
.signature{
 width: 100%;
 height: 680px;
 padding: 0 20px;
 box-sizing: border-box;
}
.imglist-box{
 width: 90%;
 margin: 0 auto;
 margin-bottom: 20px;
 position: relative;
}
.imgCanvas{
 width: 150px;
 height: 150px;
}
.resign{
 width: 14%;
 position: absolute;
 top: 0;
 right: 0;
}
 .signatureBox {
    width: 100%;
    // width: 90%;
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background: #EBEBEB;
    z-index: 9999;
    border: 1px solid #A9A9A9;
    display: flex;
    flex-direction: column;
    align-items: center;
 }
 .canvasBox {
    width: 100%;
    align-items: center;
    box-sizing: border-box;
    flex: 1;
 }
 canvas {
  // background-image: url('../assets/login-bg.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-origin: border-box;
  background-size: 100% 100%;
  z-index:99999
 }
 h4{
   color: #7F7F7F;
   margin-bottom: 20px;
   margin-top: 20px;
 }
 .btnBox{
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .van-button{
    flex: 1;
    line-height: 80px;
    height: 80px;
    font-size: 30px;
    /deep/ .van-button__icon{
      font-size: 28px;
    }
    &:nth-child(2){
      margin:0 20px;
    }
  }
}
</style>
