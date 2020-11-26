<template>
  <div class="add-device">
    <el-dialog
      :title="title"
      :visible.sync="addVisible"
      width="35%"
      :before-close="handleClose"
    >
      <div class="radio-group">
        <el-radio
          v-model="form.radio"
          label="1"
        >
          单件
        </el-radio>
        <el-radio
          v-model="form.radio"
          label="2"
        >
          套件
        </el-radio>
      </div>
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
        :model="form"
      >
        <el-form-item label="设备名称">
          <el-select
            v-model="form.name"
            placeholder="请选择"
          >
            <el-option
              v-for="item in nameList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
        :model="form"
        :rules="rules"
        ref="formSimple"
      >
        <el-form-item label="设备位置">
          <el-select
            v-model="form.position"
            placeholder="请选择"
          >
            <el-option
              v-for="item in positionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select
            v-model="form.status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="设备编号"
          v-if="form.radio==='1'"
          prop="deviceNo"
        >
          <el-input
            v-model="form.deviceNo"
          />
        </el-form-item>
        <el-form-item
          label="型号"
          v-if="form.radio==='1'"
        >
          <el-input
            v-model="form.model"
          />
        </el-form-item>
      </el-form>
      <div
        v-if="form.radio==='2'"
      >
        <el-form
          size="mini"
          :inline="true"
          label-width="80px"
          :model="item"
          v-for="(item,index) in formGroup"
          :key="index+'form'"
          ref="formGroup"
          :rules="rules"
        >
          <el-form-item label="设备名称">
            <el-input v-model="item.name" />
          </el-form-item>
          <el-form-item
            label="设备编号"
            prop="deviceNo"
          >
            <el-input v-model="item.deviceNo" />
          </el-form-item>
          <el-form-item label="型号">
            <el-input v-model="item.model" />
          </el-form-item>
        </el-form>
      </div>
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
import { getDict, submitDeviceRegister } from '@/api/device'
import request from '@/utils/request'
export default {
  name: 'AddDevice',
  data () {
    return {
      form: {
        name: '',
        status: '',
        position: '',
        deviceNo: '',
        model: '',
        value: '',
        radio: '1'
      },
      value: '',
      rules: {
        deviceNo: [
          {
            required: true,
            message: '请输入设备名称',
            trigger: 'blur'
          }
        ]
      },
      formGroup: [

      ],
      nameList: []
    }
  },
  props: {
    addVisible: {
      type: Boolean,
      required: true
    },
    statusList: {
      type: Array,
      required: true
    },
    positionList: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  created () {
    this.initFormGroup()
    this.getNameList()
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    initFormGroup () {
      for (let i = 0; i < 6; i++) {
        this.formGroup.push({name: '', deviceNo: '', model: ''})
      }
    },
    // 新增单件或者组套
    newAdd () {
      if (this.form.radio === '1') {
        this.$refs.formSimple.validate((valid) => {
          if (valid) {
            request({
              url: submitDeviceRegister,
              method: 'post',
              data: {
                deviceNo: this.form.deviceNo,
                model: this.form.model,
                dictPositionId: this.form.position,
                dictStatusId: this.form.status,
                type: this.form.radio,
                dictNameId: this.form.name
              }
            }).then(res => {
              if (res.data.code === 200) {
                this.$message({message: '新增成功', type: 'success'})
                this.handleClose()
              } else {
                this.$message({message: '新增失败', type: 'error'})
              }
            })
          } else {
            return false
          }
        })
      } else {
        // 新增套件
        let formGroups = this.$refs['formGroup']
        let arr = []
        formGroups.forEach(item => {
          item.validate((valid) => {
            if (valid) {
              arr.push(1)
            } else {
              arr.push(0)
            }
          })
        })
        if (arr.includes(0)) {
          return false
        }
        request({
          url: submitDeviceRegister,
          method: 'post',
          data: {
            // deviceNo: this.form.deviceNo,
            dictPositionId: this.form.position,
            dictStatusId: this.form.status,
            type: this.form.radio,
            dictNameId: this.form.name,
            equipmentKits: this.formGroup
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({message: '新增成功', type: 'success'})
            this.handleClose()
          } else {
            this.$message({message: '新增失败', type: 'error'})
          }
        })
      }
    },
    // 编辑单件或者组套
    edit () {

    },
    // 提交新增/修改
    handleSubmit () {
      this.newAdd()
    },
    getNameList () {
      request({
        url: getDict + '/' + 'NAME',
        method: 'get'
      }).then(res => {
        this.nameList = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-device{
    overflow: hidden;
    .radio-group{
      margin-bottom: 10px;
      padding-left: 12px;
    }
    .el-form{
      .el-select{
        max-width: 178px;
      }
      .el-form-item{
        margin-bottom: 10px;
      }
    }
  }
</style>
