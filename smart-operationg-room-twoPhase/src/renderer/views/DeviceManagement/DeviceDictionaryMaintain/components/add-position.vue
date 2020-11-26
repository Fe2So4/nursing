<template>
  <div class="add-position">
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
          label="位置信息"
          prop="position"
        >
          <el-input
            v-model="form.position"
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
  name: 'AddPosition',
  data () {
    return {
      form: {
        position: ''
      },
      rules: {
        position: [
          { required: true, message: '请输入位置信息', trigger: 'blur' }
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
      let obj = {name: this.form.position, type: 'POSITION'}
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
          this.$emit('getPositionData')
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
        this.form.position = this.editData.name
      }
    }
  },
  mounted () {
    this.initEditData()
  }
}
</script>

<style lang="scss" scoped>
.add-position{
  .el-form{
    .el-form-item{
      margin-bottom:unset;
    }
  }
}
</style>
