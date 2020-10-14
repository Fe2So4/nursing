<template>
  <div class="signature">
    <div class="signature-body">
      <h3>巡回护士签名</h3>
      <h3>电子签名板</h3>
      <div class="signature-content">
          <VueSignaturePad width="100%" height="100%" ref="signaturePad" :options="{penColor:'blue'}"/>
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
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      // Toast(item.name)
    },
    handleClose () {
      this.$emit('handleClose')
    },
    undo () {
      this.$refs.signaturePad.undoSignature()
    },
    save () {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      console.log(isEmpty)
      console.log(data)
    },
    handleRefresh () {
      this.$refs.signaturePad.clearSignature()
    },
    handleSaveImg () {
      const {isEmpty, data} = this.$refs.signaturePad.saveSignature()
      console.log(isEmpty, data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .signature{
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: #F2F2F2;
    // width: 100%;
    z-index: 99999;
    padding: 20px 15px;
    .signature-body{
      background: #ffffff;
      height: 100%;
      overflow: hidden;
      padding: 0 20px;
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
        height: 680px;
        margin: 0 auto;
        background: #EBEBEB;
        border: 1px solid #A9A9A9;
      }
      .option{
        display: flex;
        .van-button{
          flex: 1;
          &:nth-child(2){
            margin:0 20px;
          }
        }
      }
    }
  }
</style>
