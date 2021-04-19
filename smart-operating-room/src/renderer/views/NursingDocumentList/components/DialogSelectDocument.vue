<template>
  <el-dialog
    title="请选择需要打印的文档"
    :visible="visible"
    width="30%"
    @closed="onClosed"
  >
    <el-checkbox-group v-model="checkDocumentList">
      <el-checkbox
        v-for="d in documentList"
        :key="d.label"
        :label="d.value"
      >
        {{ d.label }}
      </el-checkbox>
    </el-checkbox-group>
    <div
      v-if="visible"
      id="print_content"
      class="print-content"
      ref="printContent"
    >
      <SecurityCheck
        :need-bus="false"
        v-if="checkDocumentList.includes(1)"
      />
      <NursingDocumentTwo
        :need-bus="false"
        v-if="checkDocumentList.includes(2)"
      />
      <NursingDocumentJiChu
        :need-bus="false"
        v-if="checkDocumentList.includes(3)"
      />
      <NursingDocumentTeshu
        :need-bus="false"
        v-if="checkDocumentList.includes(4)"
      />
      <TransitTransfer
        :need-bus="false"
        v-if="checkDocumentList.includes(5)"
      />
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <vxe-button @click="$emit('closeVisible')">取 消</vxe-button>
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
      checkDocumentList: [1, 2, 3, 4, 5],
      documentList: [
        {
          label: '安全核查',
          value: 1
        },
        {
          label: '护理记录单二',
          value: 2
        },
        {
          label: '护理记录单基础',
          value: 3
        },
        {
          label: '护理记录单特殊',
          value: 4
        },
        {
          label: '转运交接',
          value: 5
        }
      ],
      isAll: false
    }
  },
  methods: {
    onConfirm () {
      const options = { silent: true }
      this.utilsDebounce(() => {
        ipcRenderer.send(
          'printDocument', // 打印
          // 'print-documentPDF', // PDF上传
          this.$refs.printContent.innerHTML,
          options
        )
        // this.$emit('closeVisible')
        setTimeout(() => {
          this.onUpdata()
        }, 3000)
      }, 300)
    },
    onUpdata () {
      const options = { silent: true }
      this.utilsDebounce(() => {
        ipcRenderer.send(
          // 'printDocument', // 打印
          'print-documentPDF', // PDF上传
          this.$refs.printContent.innerHTML,
          options
        )
        this.$emit('closeVisible')
      }, 300)
    },
    onClosed () {
      this.checkDocumentList = [1, 2, 3, 4, 5]
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
