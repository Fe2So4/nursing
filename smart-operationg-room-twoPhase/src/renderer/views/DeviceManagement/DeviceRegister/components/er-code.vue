<template>
  <div class="er-code">
    <el-dialog
      title="二维码"
      :visible.sync="codeVisible"
      width="20%"
      :before-close="handleClose"
    >
      <div class="content">
        <div
          class="left"
          ref="qrCodeDiv"
        />
        <div class="right">
          <p>BK超声诊断扫描机</p>
          <p>5007949</p>
          <p>2号楼9号门口</p>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="handleClose"
        >保 存</el-button>
        <el-button
          @click="handleClose"
          size="mini"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'ErCode',
  data () {
    return {

    }
  },
  props: {
    codeVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handleCreateCode () {
      this.$nextTick(() => {
        let text = `123456`
        // let text = '1010'
        // eslint-disable-next-line no-new
        new QRCode(this.$refs.qrCodeDiv, {
          text: text,
          width: 120,
          height: 120,
          colorDark: '#333333', // 二维码颜色
          colorLight: '#ffffff', // 二维码背景色
          correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
        })
      })
    }
  },
  mounted () {
    this.handleCreateCode()
  }
}
</script>

<style lang="scss" scoped>
.er-code{
  .content{
    display: flex;
    .left{

    }
    .right{
      flex: 1;
      display: flex;
      margin-left: 10px;
      flex-direction: column;
      justify-content: space-between;
      p{
        font-size: 18px;
        color: #444444;
        &:first-child{
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
