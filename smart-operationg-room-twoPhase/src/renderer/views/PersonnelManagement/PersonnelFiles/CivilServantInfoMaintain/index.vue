<template>
  <!-- 公务员信息维护 -->
  <div class="civil-servant-info-maintain">
    <div class="csim-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="工作时间">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            clearable
            v-model="form.name"
          />
        </el-form-item>
        <!-- <el-form-item label="工作部门">
          <el-select v-model="form.department">
            <el-option
              v-for="item in deptList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button
            @click="getTable"
            type="primary"
          >
            查 询
          </el-button>
          <el-button @click="addTableItem">
            新 增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="csim-bottom">
      <div class="csim-table">
        <vxe-table
          align="center"
          :data="tableData"
          class="mytable-scrollbar"
          size="mini"
          height="100%"
          stripe
        >
          <vxe-table-column
            field="workerCode"
            title="工号"
          />
          <vxe-table-column
            field="workerNumber"
            title="编号"
          />
          <vxe-table-column

            field="workerName"
            title="姓名"
          />
          <vxe-table-column
            field="workerDuty"
            title="职务"
          />
          <vxe-table-column
            field="workerDept"
            title="科室"
          />
          <vxe-table-column
            field="subordinateCampus"
            title="所属院区"
          />
          <vxe-table-column
            field="workStartTime"
            title="入职时间"
          />
          <vxe-table-column
            field="workType"
            title="工种"
          >
            <template v-slot="{row}">
              {{ row.workType === 1?'长期':'临时' }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                @click="handleShowDialog(row)"
              >
                编辑
              </el-button>
              <span class="option-line">|</span>
              <el-button
                @click="deleteWorkmen(row)"
                type="text"
              >
                删除
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <Pagination
        ref="pagination"
        @searchTableList="searchTableList"
        :children-data="childrenData"
      />
    </div>
    <InfoDialog
      @saveAddItem="saveAddItem"
      @upDataItem="upDataItem"
      :dialog-visible="dialogVisible"
      :dialog-title="dialogTitle"
      :form="childrenForm"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/pagination'
import InfoDialog from './components/civil-servant-info'
export default {
  name: 'CivilServantInfoMaintain',
  data () {
    return {
      dialogTitle: '',
      childrenForm: {},
      childrenData: {},
      form: {
        name: '',
        time: '',
        startTime: '',
        endTime: '',
        department: ''
      },
      dialogVisible: false,
      pageList: [{value: '20', label: '20条/页'}, {value: '30', label: '30条/页'}],
      deptList: [
        {
          label: '部门1',
          value: '1'
        }, {
          label: '部门2',
          value: '2'
        }
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  components: {
    Pagination, InfoDialog
  },
  mounted () {
    this.getTable()
  },
  methods: {

    // 点击查询调用获取数据接口
    getTable () {
      this.$refs.pagination.currentPage = 1
      console.log(this.$refs.pagination.currentPage)
      let params = {
        currentPage: 1,
        pageSize: this.pageSize
      }
      console.log(params)
      this.searchTableList(params)
    },
    // 调用接口获取表格数据
    searchTableList (params) {
      this.pageSize = params.pageSize
      let obj = {
        pageIndex: params.currentPage,
        pageSize: params.pageSize,
        workerName: '',
        inWorkTimeBefore: '',
        inWorkTimeAfter: ''
      }
      if (!this.IsEmpty(this.form.time)) {
        obj.inWorkTimeBefore = this.form.time[0]
        obj.inWorkTimeAfter = this.form.time[1]
      }
      if (!this.IsEmpty(this.form.name)) {
        obj.workerName = this.form.name
      }
      this.$store.dispatch('ReqGetWorkerInfoList', obj).then(res => {
        if (res.data.code === 200) {
          this.childrenData = res.data.data
          this.tableData = res.data.data.list
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击添加按钮
    addTableItem () {
      this.childrenForm = {
        workerName: '',
        subordinateCampus: '',
        workStartTime: '',
        workType: '',
        workerCode: '',
        workerDept: '',
        workerNumber: '',
        workerState: '',
        workerDuty: ''
      }
      this.dialogTitle = '公务员信息-新增'
      this.dialogVisible = true
    },
    // 调用添加接口保存数据
    saveAddItem (params) {
      let obj = [
        params
      ]
      this.$store.dispatch('ReqAddWorkerInfot', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '添加成功')
        } else {
          this.openToast('error', res.data.msg)
        }
        this.handleClose()
        this.getTable()
      })
    },
    deleteWorkmen (row) {
      let arr = [row.id]
      let obj = {
        idList: arr
      }
      this.$store.dispatch('ReqDeleteWorkerInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '删除成功')
        } else {
          this.openToast('error', res.data.msg)
        }
        this.getTable()
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleShowDialog (row) {
      this.childrenForm = {
        id: row.id,
        workerName: row.workerName,
        subordinateCampus: row.subordinateCampus,
        workStartTime: row.workStartTime,
        workType: row.workType,
        workerCode: row.workerCode,
        workerDept: row.workerDept,
        workerNumber: row.workerNumber,
        workerState: row.workerState,
        workerDuty: row.workerDuty
      }
      this.dialogTitle = '公务员信息-修改'
      this.dialogVisible = true
    },
    upDataItem (params) {
      let obj = [
        params
      ]
      this.$store.dispatch('ReqUpdateWorkerInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '修改成功')
        } else {
          this.openToast('error', res.data.msg)
        }
        this.handleClose()
        this.getTable()
      })
    },
    // 提示方法
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: 3000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .civil-servant-info-maintain{
    height: 100%;
    display: flex;
    flex-direction: column;
    .csim-top{
      padding: 20px 20px;
      background-color: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      .el-form{
        .el-form-item{
          margin-bottom: unset;
        }
      }
    }
    .csim-bottom{
      margin-top: 10px;
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      .csim-table{
        flex: 1;
        .option-line{
          // vertical-align: middle;
          // font-size: 20px;
          display: inline-block;
        }
        .el-button{
          vertical-align: middle;
          &:nth-last-child(1){
            color:#FF5454;
          }
        }
      }
      .csim-pagination{
        padding: 40px 0;
        display: flex;
        justify-content: center;
        .el-form{
          .el-form-item{
            margin-bottom:unset;
          }
        }
      }
    }
  }
</style>
