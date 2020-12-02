<template>
  <!-- 档案信息查询 -->
  <div class="files-info-select">
    <div class="fis-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="工作时间">
          <el-date-picker
            v-model="form.workTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="姓名"
        >
          <el-input
            clearable
            v-model="form.name"
          />
        </el-form-item>
        <el-form-item
          label="工作部门"
        >
          <el-select
            clearable
            v-model="form.department"
          >
            <el-option
              v-for="item in deptList"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.typeName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button
            type="primary"
            @click="getTableData"
          >
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
      :show-dayin="dayinType"
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
      dayinType: false,
      form: {
        name: '',
        workTime: [],
        workTimeStart: '',
        workTimeEnd: '',
        department: ''
      },
      // nurseListVisible: true,
      dialogVisible: false,
      deptList: [

      ],
      tableData: [

      ],
      showData: {}
    }
  },
  mounted () {
    if (!this.IsEmpty(this.$route.query.form)) {
      this.form.name = this.$route.query.form.name || ''
      this.form.workTime = this.$route.query.form.workTime || ''
      this.form.workTimeStart = this.$route.query.form.workTimeStart || ''
      this.form.workTimeEnd = this.$route.query.form.workTimeEnd || ''
      this.form.department = this.$route.query.form.department || ''
    }
    this.getTableData()
    this.getSelectList('011')
  },
  methods: {
    // 获取列表数据
    getTableData () {
      let obj = {
        name: this.form.name || '',
        department: this.form.department || ''
      }
      if (!this.IsEmpty(this.form.workTime)) {
        obj.workTimeStart = this.form.workTime[0]
        obj.workTimeEnd = this.form.workTime[1]
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
    // 获取数据字典列表
    getSelectList (num) {
      let obj = {
        belongSerialNumber: num
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          if (num === '011') {
            this.deptList = res.data.data
          }
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
          chuandiType: '0',
          userCode: row.userCode || '',
          form: {
            name: this.form.name || '',
            workTime: this.form.workTime || '',
            workTimeStart: this.form.workTimeStart || '',
            workTimeEnd: this.form.workTimeEnd || '',
            department: this.form.department || ''
          }
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
