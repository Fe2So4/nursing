<template>
  <div
    class="layout-header"
  >
    <div
      class="left"
      @click="backRouter"
    >
      <img
        src="../assets/logo-tq.png"
        alt=""
      >
      <span>Dandelion 智慧手术中心<i />临床护理</span>
    </div>

    <div class="right">
      <div class="userInfo">
        <span
          @click="showType"
          v-if="leaveList.length > 0"
          style="margin-right:40px;cursor: pointer;"
        >
          <el-badge
            :value="leaveList.length"
            class="item"
          >
            <i class="el-icon-message-solid" />
          </el-badge>
        </span>
        <span
          @click="showType"
          v-else
          style="margin-right:40px;cursor: pointer;"
        >

          <i class="el-icon-message-solid" />
        </span>
        <span>
          <i class="el-icon-user-solid" />
          {{ userName }}
        </span>
        <span
          class="leave"
          @click="dialogVisibleShow"
        >
          <i class="el-icon-edit" />
          我要请假
        </span>
        <span
          class="leave"
          @click="showeditVisible"
        >
          <i class="el-icon-refresh-left" />
          请假撤销
        </span>
      </div>

      <div class="caozuo">
        <Operation />
      </div>
    </div>
    <!-- 点击我要请假 -->
    <el-dialog
      :close-on-click-modal="false"
      title="请假申请"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form
        class="form"
        size="mini"
        label-width="120px"
      >
        <el-form-item label="请假人员:">
          <el-input
            disabled
            placeholder="请输入姓名"
            v-model="form.userName"
          />
        </el-form-item>
        <el-form-item
          label="请假类型:"
        >
          <el-select
            v-model="form.leaveType"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in deptList"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.typeName"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="开始日期"
        >
          <el-date-picker
            v-model="form.restStartDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
          <el-time-select
            v-model="form.restStartTime"
            format="HH:mm"
            value-format="HH:mm"
            :picker-options="{
              start: '06:00',
              step: '00:30',
              end: '24:00'
            }"
            placeholder="选择时间"
          />
        </el-form-item>
        <el-form-item
          label="结束日期"
        >
          <el-date-picker
            style="width:178px"
            v-model="form.restEndDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
          <el-time-select
            v-model="form.restEndTime"
            format="HH:mm"
            value-format="HH:mm"
            :picker-options="{
              start: '06:00',
              step: '00:30',
              end: '24:00'
            }"
            placeholder="选择时间"
          />
        </el-form-item>

        <el-form-item label="请假原因:">
          <el-input
            placeholder="请输入请假原因"
            v-model="form.leaveReason"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="saveLeave"
          type="primary"
          size="mini"
        >提 交</el-button>

        <el-button
          @click="gotoSearch"
          type="primary"
          size="mini"
        >请假查询</el-button>
        <el-button
          @click="handleClose"
          size="mini"
        >取 消</el-button>
      </span>
    </el-dialog>

    <!-- 消息通知 -->
    <el-dialog
      :close-on-click-modal="false"
      title="请假列表"
      :visible.sync="showleave"
      width="90%"
      :before-close="leaveClose"
    >
      <div class="dr-table">
        <vxe-table
          align="center"
          :data="leaveList"
          class="mytable-scrollbar"
          size="mini"
          height="500px"
          auto-resize
          stripe
        >
          <vxe-table-column
            field="leaveNo"
            title="请假单号"
          />
          <vxe-table-column
            field="message"
            title="信息"
          />
        </vxe-table>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >

        <el-button
          @click="leaveClose"
          size="mini"
        >关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 撤销请假 -->
    <el-dialog
      :close-on-click-modal="false"
      title="请假列表"
      :visible.sync="editVisible"
      width="90%"
      :before-close="editClose"
    >
      <div class="dr-table">
        <vxe-table
          align="center"
          :data="myLeaveList"
          class="mytable-scrollbar"
          size="mini"
          height="500px"
          auto-resize
          stripe
        >
          <vxe-table-column
            field="leaveNo"
            title="请假单号"
          />
          <vxe-table-column
            field="leavePersonnelName"
            title="请假人"
          />
          <vxe-table-column
            field="leaveType"
            title="请假类型"
          />
          <vxe-table-column
            field="leaveReason"
            title="请假原因"
          />
          <vxe-table-column
            field="approvalStatusStr"
            title="审核状态"
          />

          <vxe-table-column
            field="restStartDate"
            title="请假开始日期"
          />
          <vxe-table-column
            field="restStartTime"
            title="请假开始时间"
          />
          <vxe-table-column
            field="restEndDate"
            title="请假结束日期"
          />
          <vxe-table-column
            field="restEndTime"
            title="请假结束时间"
          />
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                size="mini"
                type="text"
                @click="editLevae(row)"
              >
                撤销
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >

        <el-button
          @click="editClose"
          size="mini"
        >关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Operation from '@/components/win-operation'
import { reqleaveApplication } from '@/api/login'

export default {
  data () {
    return {
      myLeaveList: [],
      editVisible: false,
      leaveNos: [],
      leaveList: [],
      showleave: false,
      deptList: [],
      form: {
        userName: '',
        leaveType: '',
        restStartDate: '',
        restStartTime: '',
        restEndDate: '',
        restEndTime: '',
        leaveReason: ''
      },
      dialogVisible: false,
      options: [{label: '提前走', value: 0}, {label: '准点走', value: 1}]

    }
  },
  mounted () {
    this.form.userName = this.$store.state['Base'].userName
    this.getSelectList('007')
    this.getshowTypeData()
    this.setTimefive()
  },
  methods: {
    // 每5分钟调用一次信息
    setTimefive () {
      let time = null
      if (time) {
        time = null
      }
      time = setInterval(() => {
        this.getshowTypeData()
      }, 300000)
    },
    handleChange (param) {
      switch (param) {
        case 1:
          this.$router.push('/home/large-screen')
          break
        case 2:
          this.$router.push('/home/receiving-orders')
          break
        case 3:
          this.$router.push('/home/client-operation-orders')
      }
    },
    handleClose () {
      this.dialogVisible = false
    },
    leaveClose () {
      this.showleave = false
      this.changeInfo()
    },
    editClose () {
      this.editVisible = false
    },
    // 点击我要请假
    dialogVisibleShow () {
      this.form.leaveType = ''
      this.form.restStartDate = ''
      this.form.restStartTime = ''
      this.form.restEndTime = ''
      this.form.restEndDate = ''
      this.form.leaveReason = ''
      this.dialogVisible = true
    },
    // 点击铃铛

    // 点击保存申请
    saveLeave () {
      if (this.IsEmpty(this.form.leaveType)) {
        this.$alert('请选择请假类型')
        return false
      }
      if (this.IsEmpty(this.form.restStartDate)) {
        this.$alert('请选择开始日期')
        return false
      }
      if (this.IsEmpty(this.form.restStartTime)) {
        this.$alert('请选择开始时间')
        return false
      }
      if (this.IsEmpty(this.form.restEndDate)) {
        this.$alert('请选择结束日期')
        return false
      }
      if (this.IsEmpty(this.form.restEndTime)) {
        this.$alert('请选择结束时间')
        return false
      }
      if (this.IsEmpty(this.form.leaveReason)) {
        this.$alert('请填写请假原因')
        return false
      }
      let obj = {
        leaveReason: this.form.leaveReason,
        leaveType: this.form.leaveType,
        restStartDate: this.form.restStartDate,
        restStartTime: this.form.restStartTime,
        restEndDate: this.form.restEndDate,
        restEndTime: this.form.restEndTime
      }
      reqleaveApplication(obj).then(res => {
        if (res.data.code === 200) {
          this.dialogVisible = false
          this.options('success', '请假成功')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击信息
    showType () {
      this.showleave = true
      this.getshowTypeData()
    },
    // 转换已读状态
    changeInfo () {
      console.log(1)

      this.$store.dispatch('ReqsetMessageRead', this.leaveNos).then(res => {
        if (res.data.code === 200) {
          this.getshowTypeData()
        }
      })
    },
    // 获取信息列表
    getshowTypeData () {
      let obj = {}
      this.$store.dispatch('ReqmessageTips', obj).then(res => {
        if (res.data.code === 200) {
          this.leaveList = res.data.data
          this.leaveNos = []
          this.leaveList.forEach(item => {
            this.leaveNos.push(item.leaveNo)
          })
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 跳转请假查询
    gotoSearch () {
      this.handleClose()
      this.$router.push('/personnel/search-leave')
    },
    backRouter () {
      this.$router.push('/index-tab')
    },
    // 获取数据字典列表
    getSelectList (num) {
      let obj = {
        belongSerialNumber: num
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          if (num === '007') {
            this.deptList = res.data.data
          }
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击请假撤销
    showeditVisible () {
      this.editVisible = true
      this.getMyLeaveTable()
    },
    // 获取我的请假列表
    getMyLeaveTable () {
      let obj = {}
      this.$store.dispatch('ReqgetUserLeaveList', obj).then(res => {
        if (res.data.code === 200) {
          this.myLeaveList = res.data.data
        } else {
          this.options('error', res.data.msg)
        }
      })
    },
    // 点击撤销请假
    editLevae (row) {
      this.$confirm('是否撤销此条请假', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            let obj = {
              approvalStatus: row.approvalStatus,
              leaveNo: row.leaveNo,
              leavePersonnelCode: row.leavePersonnelCode,
              leavePersonnelName: row.leavePersonnelName
            }
            this.$store.dispatch('ReqcancelLeave', obj).then(res => {
              if (res.data.code === 200) {
                this.openToast('success', '撤销成功')
                this.getMyLeaveTable()
              } else {
                this.openToast('error', res.data.msg)
              }
            })
          } else {

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
  components: {
    Operation
  },

  destroyed () {
  },
  computed: {
    'userName': function () {
      return this.$store.state['Base'].userName
    }
  }

}
</script>

<style lang="scss" scoped>
  .layout-header{
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #666666, #303030);
    color: #fff;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    .left{
      cursor: pointer;
      font-size: 16px;
      img{
        vertical-align: middle;
      }
      span{
        margin-left:19px;
        i{
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          vertical-align: middle;
          background: #fff;
          margin:0 4px;
        }
      }
    }
    .right{
      position: relative;
      display: flex;
      font-size: 16px;
      margin-right: 21px;
      .userInfo {
        font-size: 14px;
        margin-right: 150px;
        .leave {
          cursor: pointer;
          margin-left: 20px;
        }
      }
      .caozuo {
        position: absolute;
        // top: -15px;
        right: 0;
      }
    }
    .form {
      .el-input {
        width: 178px;
      }
      .el-select {
        width: 178px;
      }

    }
  }
/deep/ .el-badge__content.is-fixed {
  top:15px
}
</style>>
