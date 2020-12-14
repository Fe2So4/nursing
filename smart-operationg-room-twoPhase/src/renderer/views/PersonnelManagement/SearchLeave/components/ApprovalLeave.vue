<template>
  <el-dialog
    :close-on-click-modal="false"
    title="请假审批"
    :visible.sync="approvalVisible"
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
          placeholder="姓名"
          v-model="selectRow.leavePersonnelName"
        />
      </el-form-item>
      <el-form-item
        label="请假类型:"
      >
        <el-input
          disabled
          placeholder=""
          v-model="selectRow.leaveType"
        />
      </el-form-item>
      <el-form-item
        label="开始日期"
      >
        <el-date-picker
          disabled
          v-model="selectRow.restStartDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder=""
        />
        <el-time-select
          disabled
          v-model="selectRow.restStartTime"
          format="HH:mm"
          value-format="HH:mm"
          :picker-options="{
            start: '06:00',
            step: '00:30',
            end: '24:00'
          }"
          placeholder=""
        />
      </el-form-item>
      <el-form-item
        label="结束日期"
      >
        <el-date-picker
          disabled
          style="width:178px"
          v-model="selectRow.restEndDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder=""
        />
        <el-time-select
          disabled
          v-model="selectRow.restEndTime"
          format="HH:mm"
          value-format="HH:mm"
          :picker-options="{
            start: '06:00',
            step: '00:30',
            end: '24:00'
          }"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="请假原因:">
        <el-input
          disabled
          placeholder=""
          v-model="selectRow.leaveReason"
        />
      </el-form-item>
      <el-form-item
        label="审批:"
      >
        <el-select
          v-model="form.approvalStatus"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        size="mini"
        @click="save"
      >保 存</el-button>

      <el-button
        @click="handleClose"
        size="mini"
      >取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      form: {
        userName: '',
        leaveType: '',
        restStartDate: '',
        restStartTime: '',
        restEndDate: '',
        restEndTime: '',
        leaveReason: '',
        approvalStatus: 1
      },
      options: [{label: '通过', value: 1}, {label: '不通过', value: 2}]
    }
  },
  props: {
    approvalVisible: {
      type: Boolean,
      default: false
    },
    selectRow: {
      type: Object,
      default: function () {
        return {
          approvalStatus: '',
          leaveNo: '',
          leavePersonnelCode: '',
          leavePersonnelName: '',
          leaveType: '',
          restDays: '',
          restStartDate: '',
          restStartTime: '',
          restEndDate: '',
          restEndTime: ''

        }
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleSearchLeave')
    },
    save () {
      let obj = {
        leaveNo: this.selectRow.leaveNo,
        leavePersonnelCode: this.selectRow.leavePersonnelCode,
        leavePersonnelName: this.selectRow.leavePersonnelName,
        approvalStatus: this.form.approvalStatus
      }
      this.$store.dispatch('ReqLeaveReview', obj).then(res => {
        this.handleClose()
        if (res.data.code === 200) {
          this.openToast('success', '审核成功')
        } else {
          this.openToast('error', res.data.msg)
        }
        this.form.approvalStatus = 1
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
/deep/ .el-input,.el-select {
  width: 178px;
}
</style>
