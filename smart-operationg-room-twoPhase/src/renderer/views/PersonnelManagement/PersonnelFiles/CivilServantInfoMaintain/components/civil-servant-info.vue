<template>
  <div class="civil-servant-info">
    <el-dialog
      title="公务员信息"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
      >
        <el-form-item label="工号">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="所属院区">
          <el-select v-model="form.department">
            <el-option
              v-for="item in deptList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="入职日期">
          <el-date-picker
            v-model="form.time"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="公种">
          <el-select v-model="form.department">
            <el-option
              v-for="item in deptList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.department">
            <el-option
              v-for="item in deptList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
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
