<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :title="`${selectDay.date}请假列表`"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose"
    >
      <div class="dr-table">
        <vxe-table
          align="center"
          :data="selectDay.timeList"
          class="mytable-scrollbar"
          size="mini"
          height="500px"
          auto-resize
          stripe
        >
          <vxe-table-column
            field="leavePersonnelName"
            title="姓名"
          />
          <vxe-table-column
            field="leaveType"
            title="类型"
          />
          <vxe-table-column
            field="leaveReason"
            title="请假原因"
          />
          <vxe-table-column
            field="restStartDate"
            title="开始日期"
          />
          <vxe-table-column
            field="restStartTime"
            title="开始时间"
          />
          <vxe-table-column
            field="restEndDate"
            title="结束日期"
          />
          <vxe-table-column
            field="restEndTime"
            title="结束时间"
          />
        </vxe-table>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >

        <el-button
          type="primary"
          @click="handleClose"
          size="mini"
        >关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    selectDay: {
      type: Object,
      default () {
        return {
          timeList: [],
          date: '',
          day: ''
        }
      }
    }
  },
  data () {
    return {
      approvalVisible: false,
      selectRow: {

      }
    }
  },

  methods: {
    handleClose () {
      this.$emit('handleClose')
      // this.dialogVisible = false
    },
    handleSearchLeave () {
      this.approvalVisible = false
      this.$emit('handleClose')
    },
    handleApproval (row) {
      this.approvalVisible = true
      this.selectRow = row
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
