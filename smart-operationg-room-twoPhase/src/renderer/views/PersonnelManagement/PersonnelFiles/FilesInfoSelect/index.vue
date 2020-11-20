<template>
  <div class="files-info-select">
    <div class="fis-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="工作时间">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="工作部门">
          <el-select v-model="form.department">
            <el-option
              v-for="item in deptList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            查 询
          </el-button>
          <el-button
            type="info"
            plain
            @click="handleGo({})"
          >
            新 增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="fis-bottom">
      <div class="fis-table">
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
            field="userCode"
            title="工号"
          />
          <vxe-table-column
            field="userName"
            title="姓名"
          />
          <vxe-table-column
            field="workDepartmentName"
            title="工作部门"
          />
          <vxe-table-column
            field="energyLevels"
            title="层级"
          />
          <vxe-table-column
            field="workTime"
            title="参加工作时间"
          />
          <vxe-table-column
            field="annualLeave"
            title="年假"
          />
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                @click="handleShow(row)"
              >
                查看
              </el-button>
              <span class="option-line">|</span>
              <el-button
                @click="handleGo(row)"
                type="text"
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
      <!-- <Pagination /> -->
      <!-- <div class="fis-pagination">
      </div> -->
    </div>
    <InfoDetail
      :show-data="showData"
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"
    />
    <!-- <NurseList
      :dialog-visible="nurseListVisible"
      @handleClose="handleCloseNurseList"
    /> -->
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination/pagination'
import InfoDetail from './components/info-detail'
// import NurseList from './components/nurse-list'
export default {
  name: 'FilesInfoSelect',
  data () {
    return {
      form: {
        name: '',
        time: '',
        startTime: '',
        endTime: '',
        department: ''
      },
      // nurseListVisible: true,
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
      tableData: [

      ],
      showData: {}
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    // 获取列表数据
    getTableData () {
      let obj = {

      }
      this.$store.dispatch('ReqGetNurList', obj).then(res => {
        if (res.data.code === 200) {
          let arr = res.data.data
          this.tableData = arr
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },

    handleClose () {
      this.dialogVisible = false
    },
    handleShow (row) {
      this.showData = row
      this.dialogVisible = true
    },
    // handleShowNurseList () {
    //   this.nurseListVisible = true
    // },
    handleCloseNurseList () {
      this.nurseListVisible = false
    },
    // 编辑或添加
    handleGo (row) {
      this.$router.push({
        path: '/personnel/personnel-file/files-info-maintain',
        query: {
          userCode: row.userCode
        }
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
  },
  components: {InfoDetail},
  created () {

  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/scrollbar.scss';
  .files-info-select{
    height: 100%;
    display: flex;
    flex-direction: column;
    .fis-top{
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
    .fis-bottom{
      margin-top: 10px;
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      .fis-table{
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
            color:#FF5454;
          }
        }
      }
      .fis-pagination{
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
