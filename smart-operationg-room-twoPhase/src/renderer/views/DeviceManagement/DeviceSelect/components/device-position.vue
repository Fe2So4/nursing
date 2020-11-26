<template>
  <div class="device-position">
    <el-dialog
      title="修改设备位置"
      :visible.sync="deviceVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
        :model="form"
      >
        <el-form-item label="设备名称">
          <!-- <el-input v-model="form.value" /> -->
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
        <el-form-item label="序列号">
          <el-input
            v-model="form.serialNo"
            disabled
          />
        </el-form-item>
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
        <el-form-item label="设备编号">
          <el-input
            disabled
            v-model="form.deviceNo"
          />
        </el-form-item>
        <el-form-item label="型号">
          <el-input
            disabled
            v-model="form.model"
          />
          <!-- <el-button @click="handleClick">
            test
          </el-button> -->
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
import {getDict, changePosition} from '@/api/device'
import request from '@/utils/request'
export default {
  name: 'DevicePosition',
  data () {
    return {
      value: '',
      form: {
        position: '',
        name: '',
        status: '',
        serialNo: '',
        model: '',
        deviceNo: ''
      },
      positionList: [],
      nameList: [],
      statusList: []
    }
  },
  props: {
    deviceVisible: {
      type: Boolean,
      required: true
    },
    devicePosition: {
      type: Object,
      required: true
    }
  },
  created () {
    this.getDevicePosition()
    this.getDeviceStatus()
    this.getDeviceName()
  },
  mounted () {
    this.form.position = this.devicePosition.position
    this.form.name = this.devicePosition.name
    this.form.status = this.devicePosition.status
    this.form.serialNo = this.devicePosition.serialNo
    this.form.model = this.devicePosition.model
    this.form.deviceNo = this.devicePosition.deviceNo
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    getDevicePosition () {
      request(
        {
          method: 'get',
          url: getDict + '/' + 'POSITION'
        }).then(res => {
        this.positionList = res.data.data
      })
    },
    handleSubmit () {
      request({
        method: 'post',
        url: changePosition,
        data: {
          deviceNo: this.form.deviceNo,
          id: this.devicePosition.id,
          model: this.form.model,
          name: this.form.name,
          position: this.form.position,
          serialNo: this.form.serialNo,
          status: this.devicePosition.status
        }
      }).then(res => {
        if (res.data.code) {
          this.$message({message: '修改成功', type: 'success'})
        } else {
          this.$message({message: '修改失败', type: res.data.data})
        }
      })
    },
    getDeviceStatus () {
      request(
        {
          method: 'get',
          url: getDict + '/' + 'STATUS'
        }).then(res => {
        this.statusList = res.data.data
      })
    },
    getDeviceName () {
      request(
        {
          method: 'get',
          url: getDict + '/' + 'NAME'
        }).then(res => {
        this.nameList = res.data.data
      })
    }
    // handleClick () {
    //   this.$http({
    //     method: 'post',
    //     headers: {
    //       Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MDU5MjEzMzcsInN1YiI6ImI5MDA3Nzk2LEFDSVMs566h55CG5ZGYLWYyMzI0M2IsIiwiaWF0IjoxNjA1NjYyMTM3NDI1fQ.Wr0zZGZLL7osEkbQNutV5M1aJrS4EeUGwcrDJxPAYNQfElFBQqykYjrze8QPuVo8WxJU90j38hffjB0J490v_g'
    //     },
    //     url: 'http://192.168.1.106:2080/ocis/portfolio/deleteClassTimeInfo',
    //     data: [1]
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
  .device-position{
    .el-select{
      width: 178px;
    }
  }
</style>
