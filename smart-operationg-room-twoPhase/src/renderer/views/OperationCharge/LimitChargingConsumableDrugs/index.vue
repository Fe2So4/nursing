<template>
  <!-- 限制耗材药品计费 -->
  <div class="limit-drugs">
    <div class="ld-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="计费项目">
          <el-input
            v-model="form.orderItem"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="科室"
        >
          <el-input
            v-model="form.department"
            clearable
          />
        </el-form-item>
        <el-form-item label=" ">
          <el-button
            type="primary"
            @click="getConsumablesDrugData"
          >
            查 询
          </el-button>
          <el-button
            type="info"
            plain
            @click="handleAddNew"
          >
            添 加
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        size="mini"
        :inline="true"
      >
        <el-form-item>
          <el-button
            type="info"
            plain
            @click="handleExport"
          >
            导 出
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ld-bottom">
      <div class="ld-table">
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          size="mini"
          class="mytable-scrollbar"
          height="auto"
          auto-resize
        >
          <vxe-table-column
            field="code"
            title="项目编号"
          />
          <vxe-table-column
            field="chargeName"
            title="项目名称"
          />
          <vxe-table-column
            field="unit"
            title="单位"
          />
          <vxe-table-column
            field="deptName"
            title="科室名称"
          />
          <vxe-table-column
            field="availableQuantity"
            title="可用数量"
          />
          <vxe-table-column
            field="usedQuantity"
            title="已用数量"
          />
          <vxe-table-column
            field="createBy"
            title="录入人"
          />
          <vxe-table-column
            field="createTime"
            title="录入时间"
          />
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <span class="option-line">|</span>
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
      <Pagination
        ref="pag"
        :children-data="paginationData"
        @searchTableList="getConsumablesDrugData"
      />
    </div>
    <ConfigDrug
      :config-visible="configVisible"
      v-if="configVisible"
      :dialog-title="dialogTitle"
      :edit-data="editData"
      @handleClose="handleClose"
      @getConsumablesDrugData="getConsumablesDrugData"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/pagination'
import ConfigDrug from './components/config-drug'
import request from '@/utils/request'
import {getConsumablesDrugData, exportExcel, deleteConsumablesDrugData} from '@/api/charge'
export default {
  name: 'LimitDrugs',
  data () {
    return {
      form: {
        name: '',
        orderItem: '',
        workTime: [],
        workTimeStart: '',
        workTimeEnd: '',
        department: ''
      },
      configVisible: false,
      deptList: [],
      dialogTitle: '手术止血耗材配置',
      tableData: [],
      showData: {},
      paginationData: {
        total: 0,
        pages: 0
      },
      editData: {}
    }
  },
  mounted () {
    this.getConsumablesDrugData()
  },
  created () {
  },
  methods: {
    handleAddNew () {
      this.editData = {}
      this.configVisible = true
    },
    handleEdit (row) {
      this.editData = row
      this.configVisible = true
    },
    handleClose () {
      this.configVisible = false
    },
    handleExport () {
      request({
        method: 'get',
        url: exportExcel,
        params: {
          chargeBasicName: this.form.orderItem,
          dictDeptName: this.form.department
        }
      })
    },
    handleDelete (row) {
      let text = '是否确认删除[' + row.chargeName + ']?'
      this.$confirm(text, '询问', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'el-icon-question'
      }).then(() => {
        request({
          url: deleteConsumablesDrugData + '/' + row.id,
          method: 'get'
        }).then(res => {
          if (res.data.code === 200) {
            this.getConsumablesDrugData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
      })
    },
    getConsumablesDrugData () {
      request({
        url: getConsumablesDrugData,
        method: 'post',
        data: {
          chargeBasicName: this.form.orderItem,
          dictDeptName: this.form.department,
          pageIndex: this.$refs.pag.currentPage,
          pageSize: this.$refs.pag.pageSize
        }
      }).then(res => {
        let data = res.data.data
        this.tableData = data.list
        this.paginationData.pages = res.data.data.pages
        this.paginationData.total = res.data.data.total
      })
    }
  },
  components: {Pagination, ConfigDrug}
}
</script>

<style lang="scss" scoped>
  .limit-drugs{
    height: 100%;
    display: flex;
    flex-direction: column;
    .ld-top{
      padding: 20px 20px;
      background-color: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      .el-form{
        .el-form-item{
          margin-bottom: unset;
        }
      }
    }
    .ld-bottom{
      margin-top: 10px;
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      .ld-table{
        flex: 1;
        // height: 112px;
        .option-line{
          // vertical-align: middle;
          // font-size: 20px;
          display: inline-block;
        }
        .el-button{
          vertical-align: middle;
          &:nth-last-child(1){
            // color:#FF5454;
          }
        }
      }
      .ld-pagination{
        // padding: 40px 0;
        display: flex;
        justify-content: center;
        // .el-form{
        //   .el-form-item{
        //     margin-bottom:unset;
        //   }
        // }
      }
    }
  }

</style>
<style>

</style>
