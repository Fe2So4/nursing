<template>
  <div class="add-group">
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
          label="组套名称"
          prop="groupName"
        >
          <el-input
            v-model="form.groupName"
            @keyup.enter.native="addDict"
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
  name: 'AddGroup',
  data () {
    return {
      form: {
        groupName: ''
      },
      rules: {
        groupName: [
          { required: true, message: '请输入组套名称', trigger: 'blur' }
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
  created () {
    this.initEditData()
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    addDict () {
      let obj = {
        name: this.form.groupName,
        type: 'GROUP'
      }
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
          this.$emit('getTreeData')
          this.$emit('handleClose')
          this.form.groupName = ''
        } else {
          this.$message({message: res.data.msg, type: 'error'})
        }
      })
    },
    initEditData () {
      if (this.editData.id && this.editData.id !== '') {
        this.form.groupName = this.editData.name
      }
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.addDict()
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
.add-group{
  .el-form{
    .el-form-item{
      margin-bottom: unset;
    }
  }
}
</style>
