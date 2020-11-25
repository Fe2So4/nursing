<template>
  <div class="info-detail">
    <el-dialog
      title="人员信息详情"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div class="file-content">
        <el-scrollbar style="height:100%;">
          <InfoDetailDocument :show-data="showData" />
        </el-scrollbar>
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
import InfoDetailDocument from './info-detal-document'
export default {
  data () {
    return {
      form: {
        department: '',
        time: '',
        input: ''
      },
      deptList: [
        {
          label: '部门1',
          value: '1'
        }, {
          label: '部门2',
          value: '2'
        }
      ]
    }
  },
  components: {InfoDetailDocument},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    showData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-detail{
    .file-content{
      height: 60vh;
    }
  }
  /deep/ .el-scrollbar__wrap{
   overflow-x: hidden;
  }
</style>
