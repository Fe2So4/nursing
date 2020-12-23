<template>
  <div class="nursing-info">
    <div class="option">
      <span>
        <el-form
          :inline="true"
          size="mini"
        >
          <el-form-item
            label="类型："
          >
            <el-select
              v-model="form.type"
              clearable
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="名称"
          >
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item
            label="数量"
          >
            <el-input-number
              v-model="form.count"
              :min="1"
              :controls="false"
            />
          </el-form-item>
          <el-form-item />
        </el-form>
      </span>
      <span>
        <el-button
          type="primary"
          size="mini"
          @click="handleAdd"
        >
          添 加
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
        title="序号"
      />
      <vxe-table-column
        field="sampleType"
        title="类型"
      >
        <template v-slot="{row}">
          <span>
            {{ formatType(row) }}
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="sampleName"
        title="名称"
      />
      <vxe-table-column
        field="sampleAmount"
        title="数量"
      >
        <template v-slot="{row}">
          <el-input-number
            size="mini"
            v-model="row.sampleAmount"
            :min="1"
            @blur="handleUpdate(row)"
            :controls="false"
          />
        </template>
      </vxe-table-column>
      <vxe-table-column
        title="操作"
      >
        <template v-slot="{row}">
          <el-button
            type="text"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import {sendSample, getSample, deleteSample, addSample} from '@/api/record'
import request from '@/utils/request'
import {mapState} from 'vuex'
export default {
  name: 'NursingInfo',
  data () {
    return {
      tableData: [],
      form: {
        count: 1,
        name: '',
        type: ''
      },
      typeList: []
    }
  },
  computed: {
    ...mapState('Base', ['currentPatient'])
  },
  mounted () {
    this.getSampleDict()
    this.getSample()
  },
  methods: {
    formatType (row) {
      let name = ''
      this.typeList.forEach(item => {
        if (item.id === row.sampleType) {
          name = item.name
        }
      })
      return name
    },
    cellClickEvent () {

    },
    clearForm () {
      this.form = {
        count: 1,
        name: '',
        type: ''
      }
    },
    handleUpdate (row) {
      if (row.count !== row.sampleAmount) {
        let arr = [{
          id: row.id,
          operSchNo: this.currentPatient.operSchNum,
          sampleAmount: row.sampleAmount,
          sampleName: row.sampleName,
          sampleType: row.sampleType
        }]
        request({
          url: addSample,
          method: 'post',
          // "id": 0,
          data: arr
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({type: 'success', message: '修改成功'})
            this.getSample()
          }
        })
      }
    },
    handleAdd () {
      let arr = [{
        operSchNo: this.currentPatient.operSchNum,
        sampleAmount: this.form.count,
        sampleName: this.form.name,
        sampleType: this.form.type
      }]
      request({
        url: addSample,
        method: 'post',
        // "id": 0,
        data: arr
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({type: 'success', message: '新增成功'})
          this.getSample()
          this.clearForm()
        }
      })
    },
    getSampleDict () {
      request({
        url: sendSample,
        method: 'get'
      }).then(res => {
        this.typeList = res.data.data
      })
    },
    getSample () {
      request({
        url: getSample + '/' + this.currentPatient.operSchNum,
        method: 'get'
      }).then(res => {
        let arr = res.data.data
        arr.forEach(item => {
          item.count = parseInt(item.sampleAmount)
        })
        this.tableData = arr
      })
    },
    handleDelete (row) {
      request({
        url: deleteSample,
        method: 'post',
        data: {
          idList: [row.id]
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({type: 'success', message: '删除成功'})
          this.getSample()
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
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
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
