<template>
  <div class="config-drugs">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="configVisible"
      width="20%"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        label-width="80px"
        :model="form"
        size="mini"
        ref="form"
        :rules="rules"
      >
        <el-form-item
          label="计费项目"
          prop="orderItem"
        >
          <!-- <el-input v-model="form.orderItem" /> -->
          <el-select
            v-model="form.orderItem"
            placeholder="请选择"
            :disabled="editDisabled"
          >
            <el-option
              v-for="item in orderItemList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="科室"
          prop="dept"
        >
          <el-select
            :disabled="editDisabled"
            v-model="form.dept"
            placeholder="请选择"
          >
            <el-option
              v-for="item in deptList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="可用数量"
          prop="invalidNum"
        >
          <el-input
            type="number"
            v-model="form.invalidNum"
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
          type="primary"
          size="mini"
          @click="handleSubmit"
        >还 原</el-button>
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
import {getDictCharge, getChargeItemNameList, saveConsumablesDrug} from '@/api/charge'
export default {
  name: 'AddGroup',
  data () {
    return {
      form: {
        orderItem: '',
        invalidNum: '',
        dept: ''
      },
      rules: {
        orderItem: [
          { required: true, message: '请输入计费项目', trigger: 'blur' }
        ],
        dept: [
          { required: true, message: '请输入科室', trigger: 'blur' }
        ],
        invalidNum: [
          { required: true, message: '请输入可用数量', trigger: 'blur' }
        ]
      },
      orderItemList: [],
      deptList: [],
      editDisabled: false,
      query: '植发术'
    }
  },
  props: {
    configVisible: {
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
  async created () {
    await this.getDeptList()
    await this.getItemNameList()
    this.initEditData()
  },
  mounted () {
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    initEditData () {
      if (this.editData.id) {
        this.form.dept = this.editData.deptName
        this.form.invalidNum = parseInt(this.editData.availableQuantity)
        this.form.orderItem = this.editData.code
        this.editDisabled = true
      }
    },
    getDeptList () {
      request({
        url: getDictCharge + '/' + 'DEPARTMENT',
        method: 'get'
      }).then(res => {
        this.deptList = res.data.data
      })
    },
    getItemNameList () {
      request({
        url: getChargeItemNameList + '/' + this.query,
        method: 'get'
      }).then(res => {
        this.orderItemList = res.data.data
      })
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let obj = {
            dictDeptId: this.form.dept,
            chargeBasicId: this.form.orderItem,
            availableQuantity: this.form.invalidNum
          }
          if (this.editData.id) {
            obj.id = this.editData.id
          }
          request({
            url: saveConsumablesDrug,
            method: 'post',
            data: obj
          }).then(res => {
            if (res.data.code === 200) {
              if (this.editData.id) {
                this.$message({type: 'success', message: '修改成功'})
              } else {
                this.$message({type: 'success', message: '新增成功'})
              }
              this.$emit('getConsumablesDrugData')
              this.handleClose()
            } else {
              this.$message({type: 'error', message: res.data.msg})
            }
          })
        } else {
          return false
        }
      })
    }
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
