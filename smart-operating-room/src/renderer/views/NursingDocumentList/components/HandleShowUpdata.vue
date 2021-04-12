<template>
  <el-dialog
    title="上传文档"
    :visible="visible"
    width="30%"
    @closed="onClosed"
  >
    <span>是否上传PDF文档</span>
    <div
      v-if="visible"
      id="print_content"
      class="print-content"
      ref="printContent"
    >
      <SecurityCheck :need-bus="false" />
      <NursingDocumentTwo :need-bus="false" />
      <NursingDocumentJiChu :need-bus="false" />
      <NursingDocumentTeshu :need-bus="false" />
      <TransitTransfer :need-bus="false" />
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <vxe-button @click="$emit('closeShowUpdata')">取 消</vxe-button>
      <vxe-button
        type="primary"
        @click="onConfirm"
      >确 定</vxe-button>
    </span>
  </el-dialog>
</template>

<script>
import NursingDocumentJiChu from './nursing-document-jichu'
import SecurityCheck from './security-check'
import NursingDocumentTwo from './nursing-document-two'
import NursingDocumentTeshu from './nursing-document-teshu'
import TransitTransfer from './transit-transfer'
import {ipcRenderer} from 'electron'
export default {
  name: 'DialogSelectDocument',
  components: {TransitTransfer, NursingDocumentTeshu, NursingDocumentTwo, SecurityCheck, NursingDocumentJiChu},
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    onConfirm () {
      const options = { silent: true }
      this.utilsDebounce(() => {
        ipcRenderer.send(
          // 'printDocument', // 打印
          'print-documentPDF', // PDF上传
          this.$refs.printContent.innerHTML,
          options
        )
        this.$emit('closeShowUpdata')
      }, 300)
    },
    onClosed () {

    },
    onBeforeClose (done) {
      done()
    }
  }
}
</script>

<style scoped lang="scss">
.print-content {
  display: none;
  @media print{
    display: block;
  }
}
.el-checkbox-group {
  ::v-deep  .el-checkbox {
    width: 100px;
    margin: 20px;
  }
}

</style>
