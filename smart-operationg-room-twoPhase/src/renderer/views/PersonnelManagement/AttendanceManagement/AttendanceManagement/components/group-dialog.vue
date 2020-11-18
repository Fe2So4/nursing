<template>
  <div class="group-dialog">
    <el-dialog
      title="分组编辑"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
      >
        <el-form-item label="分组名称">
          <el-input v-model="dialogChangeForm.transactionGroupName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="dialogChangeForm.transactionRemark" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="saveChangeFrom"
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
export default {
  data () {
    return {

    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogChangeForm: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    saveChangeFrom () {
      this.$emit('changeTitle', this.dialogChangeForm)
    }
  }
}
</script>

<style lang="scss" scoped>
  .civil-servant-info{
    .el-form{
      .el-input,.el-select{
        width: 200px;
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 200px;
      }
    }
  }
</style>
