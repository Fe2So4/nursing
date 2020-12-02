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
          <p>{{ codeData.name }}</p>
          <p>{{ codeData.barCode }}</p>
          <p>{{ codeData.position }}</p>
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
        >打 印</el-button>
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
    },
    codeData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handleCreateCode () {
      this.$nextTick(() => {
        let text = this.codeData.barCode
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
