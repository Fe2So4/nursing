<template>
  <div class="device-info">
    <div class="option">
      <span>
        <el-select
          v-model="deviceNo"
          size="mini"
          filterable
          clearable
          remote
          :remote-method="remoteMethod"
          @keyup.enter.native="remoteMethod"
          placeholder="扫描或输入设备条码回车"
        >
          <!-- :remote-method="remoteMethod" -->
          <el-option
            v-for="item in deviceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </span>
      <span>
        <el-button
          type="primary"
          size="mini"
          @click="addDevice"
        >
          添 加
        </el-button>
        <!-- <el-button
          type="primary"
          size="mini"
        >
          解 锁
        </el-button> -->
      </span>
    </div>
    <vxe-table
      stripe
      align="center"
      :data="tableData"
      highlight-hover-row
      @cell-click="cellClickEvent"
      size="mini"
      class="mytable-scrollbar"
      height="300px"
      auto-resize
    >
      <vxe-table-column
        field="name"
        title="设备名称"
      />
      <vxe-table-column
        field="barCode"
        title="条码"
      />
      <vxe-table-column
        field="deviceNoAndModel"
        title="设备编号|型号"
      />
      <vxe-table-column
        field="position"
        title="位置"
      />
      <vxe-table-column
        field="status"
        title="位置状态"
      />
      <vxe-table-column
        title="操作"
      >
        <template v-slot="{row}">
          <el-button
            type="text"
            style="color:#ff5454;"
            @click="deleteDevice(row)"
          >
            删除
          </el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import {deleteDevice, getDevice, getDeviceList, addDevice} from '@/api/record'
import request from '@/utils/request'
import {mapState} from 'vuex'
export default {
  name: 'NursingInfo',
  data () {
    return {
      tableData: [],
      deviceNo: '',
      deviceList: []
    }
  },
  computed: {
    ...mapState('Base', ['currentPatient'])
  },
  created () {
    this.getDeviceList()
  },
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        this.getDevice(query)
      }
    },
    cellClickEvent () {

    },
    deleteDevice (row) {
      let text = '是否确认删除[' + row.name + ']?'
      this.$confirm(text, '询问', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'el-icon-question'
      }).then(() => {
        request(
          {
            url: deleteDevice + '/' + row.id,
            method: 'get'
          }
        ).then(res => {
          if (res.data.code === 200) {
            this.$message({message: '删除成功', type: 'success'})
            this.getDeviceList()
          }
        })
      }).catch(() => {
      })
    },
    addDevice () {
      request({
        url: addDevice,
        method: 'post',
        data: {
          cureNo: this.currentPatient.cureNo,
          hospitalNo: this.currentPatient.hospitalNo,
          medicalEquipmentId: this.deviceNo,
          operSchNum: this.currentPatient.operSchNum
          // returnTime: '',
          // usageTime: '',
          // useDuration: ''
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({type: 'success', message: '新增成功'})
          this.getDeviceList()
        } else {
          this.$message({type: 'error', message: res.data.msg})
        }
      })
    },
    getDevice (query) {
      request({
        url: getDevice + '/' + query,
        method: 'get'
      }).then(res => {
        let arr = []
        arr.push(res.data.data)
        this.deviceList = arr
      })
    },
    getDeviceList () {
      request({
        url: getDeviceList + '/' + this.currentPatient.cureNo + '/' + this.currentPatient.hospitalNo,
        method: 'get'
      }).then(res => {
        this.tableData = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .device-info{
    .option{
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      padding-bottom: 20px;
      span{
        &:nth-child(1){
          flex: 0.3;
          .el-select{
            width: 100%;
          }
        }
      }
    }
    table{
      width: 100%;
      // height: 100%;
      border-bottom: 1px solid #E8E8E8;
      border-left: 1px solid #E8E8E8;
      tbody{
        // text-align: center;
        tr{
          td{
            border-top: 1px solid #E8E8E8;
            border-right: 1px solid #E8E8E8;
            color: #444444;
            font-size: 14px;
            height: 40px;
            padding:10px 0 10px 20px;
            line-height:26px;
            &.left{
              text-align: left;
              padding-left: 20px;
            }
            &.center{
              text-align: center;
              padding-left: unset;
            }
            .right{
              text-align: right;
              padding-right: 20px;
            }
            .el-checkbox-group{
              display: inline-block;
            }
            .el-icon-success{
              color: #0BBE4A;
            }
            &:nth-last-child(3){
              /deep/ .el-radio__label{
                padding: unset;
              }
            }
            &:nth-last-child(2){
              /deep/ .el-radio__label{
                padding: unset;
              }
            }
            &:nth-last-child(){

            }
          }
      }
      }
        }
  }
</style>
