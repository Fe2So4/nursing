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
            v-
            title="类型"
          >
            <template v-slot="{row}">
              <span v-if="row.leaveType === '1'">撤销未审批</span>
              <span v-else>请假未审批</span>
            </template>
          </vxe-table-column>
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
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                @click="handleApproval(row)"
                type="text"
              >
                审批
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
          type="primary"
          @click="handleClose"
          size="mini"
        >关 闭</el-button>
      </span>
    </el-dialog>
    <ApprovalLeave
      :select-row="selectRow"
      @handleSearchLeave="handleSearchLeave"
      :approval-visible="approvalVisible"
    />
  </div>
</template>

<script>
import ApprovalLeave from './ApprovalLeave'
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
  components: {
    ApprovalLeave
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
      // this.dialogVisible = false
    },
    handleSearchLeave () {
      this.approvalVisible = false
      this.$emit('handleClose')
      this.$emit('getmonthDays')
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
