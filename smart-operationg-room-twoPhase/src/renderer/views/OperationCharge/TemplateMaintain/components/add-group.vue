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
          label="模板名称"
          prop="groupName"
        >
          <el-input v-model="form.groupName" />
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
import request from '@/utils/request'
import {addTreeData} from '@/api/charge'
export default {
  name: 'AddGroup',
  data () {
    return {
      form: {
        groupName: ''
      },
      rules: {
        groupName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
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
    treeData: {
      type: Object,
      required: true
    }
  },
  methods: {
    addTreeData () {
      let id = this.treeData.id
      if (this.treeData.parentId === '0') {
        id = 0
      }
      request({
        url: addTreeData,
        method: 'post',
        data: {name: this.form.groupName, parentId: id}
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({type: 'success', message: '新增成功'})
          this.$emit('getTreeData')
          this.handleClose()
        } else {
          this.$message({type: 'error', message: res.data.msg})
        }
      })
    },
    handleClose () {
      this.$emit('handleClose')
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addTreeData()
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
