<template>
  <div class="nurse-list">
    <el-dialog
      title="护士列表"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <el-form
          size="mini"
          :inline="true"
          label-width="80px"
        >
          <el-form-item label="姓名/简称">
            <el-input v-model="form.input" />
          </el-form-item>
        </el-form>
        <vxe-table
          align="center"
          :data="tableData"
          size="mini"
          height="400px"
          auto-resize
        >
          <vxe-table-column
            field="name"
            title="工号"
          />
          <vxe-table-column
            field="sex"
            title="姓名"
          />
          <vxe-table-column
            field="age"
            title="部门"
          />
          <vxe-table-column
            field="age"
            title="选择"
          >
            <template>
              <el-checkbox />
            </template>
          </vxe-table-column>
        </vxe-table>
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
export default {
  data () {
    return {
      form: {
        department: '',
        time: '',
        input: ''
      },
      tableData: [{name: 'asd', age: 20, sex: '男'}],
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
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
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
  .nurse-list{
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
