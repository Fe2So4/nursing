<template>
  <div class="civil-servant-info-maintain">
    <div class="csim-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="工作时间">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            range-separator="至"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
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
            @click="searchTableList"
            type="primary"
          >
            查 询
          </el-button>
          <el-button>新 增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="csim-bottom">
      <div class="csim-table">
        <vxe-table
          align="center"
          :data="tableData"
          size="mini"
          height="100%"
        >
          <vxe-table-column
            field="name"
            title="工号"
          />
          <vxe-table-column
            field="name"
            title="编号"
          />
          <vxe-table-column
            field="sex"
            title="姓名"
          />
          <vxe-table-column
            field="age"
            title="职务"
          />
          <vxe-table-column
            field="age"
            title="科室"
          />
          <vxe-table-column
            field="age"
            title="所属院区"
          />
          <vxe-table-column
            field="age"
            title="入职时间"
          />
          <vxe-table-column
            field="age"
            title="公种"
          />
          <vxe-table-column
            field="age"
            title="操作"
          >
            <template>
              <el-button
                type="text"
                @click="handleShowDialog"
              >
                编辑
              </el-button>
              <span class="option-line">|</span>
              <el-button type="text">
                删除
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <Pagination ref="pagination" />
    </div>
    <InfoDialog
      :dialog-visible="dialogVisible"
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
      tableData: [{name: 'ad', sex: 'ada', age: 'ad'}, {name: 'ad', sex: 'ada', age: 'ad'}]
    }
  },
  components: {
    Pagination, InfoDialog
  },
  methods: {
    searchTableList () {
      console.log(this.form.time)
      let obj = {
        pageIndex: '1',
        pageSize: '20',
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
        console.log(res)
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleShowDialog () {
      this.dialogVisible = true
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
