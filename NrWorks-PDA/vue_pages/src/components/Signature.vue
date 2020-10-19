<template>
  <div class="signature">
    <div class="signature-body">
      <h3>巡回护士签名</h3>
      <h3>电子签名板</h3>
      <div class="signature-content" ref="canvasHW">
          <vue-esign ref="esign" :isCrop="isCrop" :height="680" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" />
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
      lineWidth: 4,
      lineColor: 'blue',
      bgColor: '',
      resultImg: '',
      isCrop: false
    }
  },
  props: {
    // visible: {
    //   type: Boolean,
    //   required: true
    // }
  },
  methods: {
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      // Toast(item.name)
    },
    init () {
      var canvas = document.querySelector('canvas')
      console.log(canvas)
    },
    handleClose () {
      this.$emit('handleClose')
    },
    undo () {
      // this.$refs.signaturePad.undoSignature()
    },
    save () {
      // const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      // console.log(isEmpty)
      // console.log(data)
    },
    handleRefresh () {
      this.handleReset()
    },
    handleSaveImg () {
      this.commit()
    },
    handleReset () {
      this.$refs.esign.reset()
    },
    handleGenerate () {
      this.$refs.esign.generate().then(res => {
        this.resultImg = res
      }).catch(err => {
        alert(err) // 画布没有签字时会执行这里 'Not Signned'
      })
    }
  },
  mounted () {

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
    // height: 100%;
    padding: 20px 15px;
    z-index: 99999;
    box-sizing: border-box;
    .signature-body{
      background: #ffffff;
      height: 100%;
      overflow: hidden;
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
        // canvas{
        //   // height: 100% !important;
        //   height: 680px !important;
        //   width: 100% !important;
        // }
      }
      .option{
        display: flex;
        .van-button{
          flex: 1;
          // line-height: 60px !important;
          line-height: 60px;
          font-size: 30px;
          height: 60px;
          /deep/ .van-button__icon{
            font-size: 26px;
          }
          &:nth-child(2){
            margin:0 20px;
          }
        }
      }
    }
  }
</style>
