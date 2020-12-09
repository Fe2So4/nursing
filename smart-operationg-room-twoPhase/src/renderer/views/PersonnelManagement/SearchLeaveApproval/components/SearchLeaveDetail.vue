<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :title="`${selectDay}请假列表`"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose"
    >
      <div class="dr-table">
        <vxe-table
          align="center"
          :data="tableData"
          class="mytable-scrollbar"
          size="mini"
          height="auto"
          auto-resize
          stripe
        >
          <vxe-table-column
            field="operate_date"
            title="姓名"
          />
          <vxe-table-column
            field="type"
            title="类型"
          />
          <vxe-table-column
            field="room_no"
            title="开始时间"
          />
          <vxe-table-column
            field="sequence_no"
            title="结束时间"
          />
          <vxe-table-column
            title="操作"
          >
            <template>
              <el-button
                @click="handleApproval"
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
          size="mini"
        >保 存</el-button>

        <el-button
          type="primary"
          size="mini"
        >请假查询</el-button>
        <el-button
          @click="handleClose"
          size="mini"
        >取 消</el-button>
      </span>
    </el-dialog>
    <ApprovalLeave
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
      type: String,
      default: ''
    }
  },
  data () {
    return {
      approvalVisible: false,
      tableData: [{}]
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
    },
    handleApproval () {
      this.approvalVisible = true
      console.log(this.selectDay)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
