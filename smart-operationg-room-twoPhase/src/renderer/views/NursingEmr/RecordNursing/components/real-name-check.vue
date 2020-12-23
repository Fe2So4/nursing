<template>
  <div class="nursing-info">
    <div class="option">
      <span>
        <el-form
          :inline="true"
          size="mini"
        >
          <el-form-item label="实际手术" />
          <el-form-item>
            <el-select
              v-model="form.cx1"
              clearable
            >
              <el-option
                v-for="item in cx1List"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.cx2"
              clearable
            >
              <el-option
                v-for="item in cx2List"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.cx3"
              clearable
            >
              <el-option
                v-for="item in cx3List"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item v-model="form.dept" clearable>
            <el-select>
              <el-option />
              <el-option />
              <el-option />
            </el-select>
          </el-form-item> -->
          <el-form-item label="手术名称">
            <el-input
              v-model="form.opeName"
              @keyup.enter.native="handleAdd"
            />
          </el-form-item>
        </el-form>
      </span>
      <span>
        <el-button
          type="primary"
          size="mini"
        >
          解 锁
        </el-button>
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
        type="seq"
        title="主手术"
      />
      <vxe-table-column
        field="userName"
        title="侧性1"
      />
      <vxe-table-column
        field="userName"
        title="侧性2"
      />
      <vxe-table-column
        field="userName"
        title="侧性3"
      />
      <vxe-table-column
        field="workDepartmentName"
        title="手术名称"
      />
      <vxe-table-column
        field="specifications"
        title="手术等级"
      />
    </vxe-table>
  </div>
</template>

<script>
import {storageRealName, getRealName, deleteRealName} from '@/api/record'
import request from '@/utils/request'
import {mapState} from 'vuex'
export default {
  name: 'NursingInfo',
  data () {
    return {
      tableData: [],
      form: {
        cx1: '',
        cx2: '',
        cx3: '',
        opeName: '',
        dept: ''
      },
      cx1List: [{label: '左', value: '左'}, {label: '右', value: '右'}, {label: '双', value: '双'}],
      cx2List: [{label: '上', value: '上'}, {label: '下', value: '下'}, {label: '中', value: '中'},
        {label: '内', value: '内'}, {label: '外', value: '外'}, {label: '前', value: '前'}, {label: '后', value: '后'}, {label: '近', value: '近'}, {label: '远', value: '远'}],
      cx3List: [{label: '侧', value: '侧'}, {label: '极', value: '极'}, {label: '缘', value: '缘'}, {label: '段', value: '段'}, {label: '端', value: '端'}]
    }
  },
  computed: {
    ...mapState('Base', ['currentPatient'])
  },
  mounted () {
    this.getNameList()
  },
  method: {
    handleAdd () {
      request({
        url: storageRealName,
        method: 'post',
        data: {
          operSchNo: this.currentPatient.operSchNum,
          operationName: this.form.opeName,
          lateralityThree: this.form.cx3,
          lateralityTwo: this.form.cx2,
          lateralityOne: this.form.cx1
          // realnameId:''
          // id:''
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({type: 'success', message: '新增成功'})
          this.getNameList()
        }
      })
    },
    getNameList () {
      request({
        url: getRealName + '/' + this.currentPatient.operSchNum,
        method: 'get'
      }).then(res => {
        this.tableData = res.data.data
      })
    },
    handleDelete (row) {
      request({
        url: deleteRealName + '/' + row.id,
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({type: 'success', message: '删除成功'})
          this.getNameList()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .nursing-info{
    .option{
      // text-align: right;
      padding-right: 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
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
