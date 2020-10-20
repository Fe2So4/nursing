<template>
  <div class="statistical-table">
    <div class="baobiaodan">
      手术患者转运交接报表单
    </div>
    <div class="table-conten">
      <vxe-table
        highlight-current-row
        ref="xTable"
        class="mytable-scrollbar"
        height="100%"
        border="none"
        :data="runningTableList"
      >
        <vxe-table-column
          type="seq"
          width="50"
        />
        <vxe-table-column
          field="hospitalNo"
          title="住院号"
          width="90"
        />
        <vxe-table-column
          field="patientName"
          title="患者姓名"
          width="90"
        />
        <vxe-table-column
          field="operateDate"
          title="手术时间"
          width="120"
        />
        <vxe-table-column
          field="anesDoc"
          title="麻醉医师"
          width="90"
        />
        <vxe-table-column
          field="categpry"
          title="病区-科室"
          width="180"
        />
        <vxe-table-column
          field="washNurseName"
          title="洗手护士"
          width="90"
        />
        <vxe-table-column
          field="surgeon"
          title="主刀医师"
          width="90"
        />
        <vxe-table-column
          field="runNurseName"
          title="巡回护士"
          width="90"
        />
        <vxe-table-column
          field="pointInRoomTime"
          title="进手术室时间"
          width="120"
        />
        <vxe-table-column
          field="pointOutRoomTime"
          title="出手术室前时间"
          width="120"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticalTable',
  props: ['runningTableList'],
  data () {
    return {
      pageItem: {},
      busy: true,
      currentRow: {}
    }
  },
  methods: {
    load () {
      console.log(132)
      this.getTableData(this.pageItem)
    },
    // 获取数据
    getTableData (res) {
      this.$store.dispatch('ReqNursingDocumentTable', res).then(result => {
        console.log(result)
        this.tableData.push(...result.data.data.list)
        this.pageItem.pageIndex++
        this.busy = false
      })
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },

    dbSelected ({row}) {
      this.$router.push({
        path: '/home/nursing-document-list/security-check',
        query: {
          row
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.statistical-table {
    height: 100%;
    padding-left: 20px;
    padding-top: 20px;
    background-color: #fff;
    width: 100%;
    .table-conten {
      height: 100%;
    }
}
.baobiaodan {
  color: #333333;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
}
.mytable-scrollbar {
  display: flex;
  justify-content: center;
}
/deep/ .table-conten .vxe-table .vxe-body--row.row--current {
    background-color:#D6DCE8 !important;
}
/deep/ .el-table__header-wrapper {
    position: fixed;
    z-index: 1;
}
/deep/ .el-table__body-wrapper {
  margin-top: 50px;
}
</style>
