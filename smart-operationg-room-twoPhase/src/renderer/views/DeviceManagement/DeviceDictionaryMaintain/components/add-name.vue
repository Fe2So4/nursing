<template>
  <div class="add-name">
    <el-dialog
      :title="dialogTitle"
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
          <el-input
            v-model="form.nameInfo"
            @keyup.enter.native="handleSubmit"
          />
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
import { addDict } from '@/api/device'
import request from '@/utils/request'
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
    },
    editData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    addDict () {
      let obj = { name: this.form.nameInfo, type: 'NAME' }
      if (this.editData.id && this.editData.id !== '') {
        obj.id = this.editData.id
      }
      request(
        {
          url: addDict,
          method: 'post',
          data: obj
        }
      ).then(res => {
        if (res.data.code === 200) {
          if (this.editData.id && this.editData.id !== '') {
            this.$message({message: '修改成功', type: 'success'})
          } else {
            this.$message({message: '新增成功', type: 'success'})
          }
          this.$emit('getNameData')
          this.$emit('handleClose')
          this.form.position = ''
        } else {
          this.$message({message: '新增失败', type: 'error'})
        }
      })
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addDict()
        } else {
          return false
        }
      })
    },
    initEditData () {
      if (this.editData.id && this.editData.id !== '') {
        this.form.nameInfo = this.editData.name
      }
    }
  },
  mounted () {
    this.initEditData()
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
