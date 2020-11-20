<template>
  <div class="add-name">
    <el-dialog
      title="新增设备名称信息"
      :visible.sync="addVisible"
      width="20%"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        :model="form"
        size="mini"
        ref="form"
        :rules="rules"
      >
        <el-form-item
          label="名称信息"
          prop="nameInfo"
        >
          <el-input v-model="form.nameInfo" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="handleSubmit"
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
  name: 'AddName',
  data () {
    return {
      form: {
        nameInfo: ''
      },
      rules: {
        nameInfo: [
          { required: true, message: '请输入设备名称信息', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    addVisible: {
      type: Boolean,
      required: true
    },
    dialogTitle: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.add-name{
  .el-form{
    .el-form-item{
      margin-bottom:unset;
    }
  }
}
</style>
