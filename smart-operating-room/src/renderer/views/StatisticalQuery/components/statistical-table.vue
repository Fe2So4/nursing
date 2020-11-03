<template>
  <div class="statistical-table">
    <div class="table-conten">
      <vxe-table
        stripe
        highlight-current-row
        ref="xTable"
        class="mytable-scrollbar"
        :loading="loading"
        height="100%"
        border="none"
        :data="tableList"
        @current-change="currentChangeEvent"
      >
        <vxe-table-column
          type="index"
          width="50"
        />
        <vxe-table-column
          field="hospitalNo"
          title="住院号"
        />
        <vxe-table-column
          field="patientName"
          title="患者姓名"
        />
        <vxe-table-column
          field="operateDate"
          title="手术时间"
        />
        <vxe-table-column
          field="anesDoc"
          title="麻醉医师"
        />
        <vxe-table-column
          field="categpry"
          title="病区-科室"
        />
        <vxe-table-column
          field="washNurseName"
          title="洗手护士"
        />
        <vxe-table-column
          field="surgeon"
          title="主刀医师"
        />
        <vxe-table-column
          field="runNurseName"
          title="巡回护士"
        />
        <vxe-table-column
          field="anesBeforeChkTime"
          title="麻醉开始前时间"
        />
        <vxe-table-column
          field="beforeOperChkTime"
          title="手术开始前时间"
        />
        <vxe-table-column
          field="leaveBeforeChkUpdateTime"
          width="140"
          title="离开手术室前时间"
        />
        <vxe-table-column
          field="pointInRoomTime"
          title="进手术室时间"
        />
        <vxe-table-column
          field="pointOutRoomTime"
          title="出手术室时间"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticalTable',
  props: ['tableList', 'loading'],
  data () {
    return {
      tableData: [
      ],
      pageItem: {},
      busy: true,
      currentRow: {}
    }
  },
  mounted () {
    // this.addScrollHandle()
    console.log(this.tableData)
  },
  methods: {
    addScrollHandle () {
      this.dom = this.$refs.xTable.elemStore['main-body-wrapper']
      this.dom.addEventListener('scroll', () => {
      // 滚动距离
        let scrollTop = this.dom.scrollTop
        // 变量windowHeight是可视区的高度
        let windowHeight = this.dom.clientHeight || this.dom.clientHeight
        // 变量scrollHeight是滚动条的总高度
        let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight
        if (scrollTop + windowHeight === scrollHeight) {
          // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
          if (!this.allData) this.getMoreLog()
        }
      })
    },
    getMoreLog () {
      this.load()
    },
    load () {

      // this.tableData = this.tableData.concat(this.tableData)
    },
    // 获取数据
    getTableData (res) {
      this.loading = true
      this.$store.dispatch('ReqNursingDocumentTable', res).then(result => {
        this.tableData.push(...result.data.data.list)
        this.pageItem.pageIndex++
        this.busy = false
        this.loading = false
      })
    },
    currentChangeEvent (val) {
      this.currentRow = val
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .table-conten .vxe-table .vxe-body--row.row--current {
    background-color:#D6DCE8 !important;
}
.statistical-table {
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    height: 100%;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #fff;
    width: 100%;
    .table-conten {
      height: 100%;
    }
}
/deep/ .vxe-table .vxe-body--row.row--stripe {
      background-color: #f9fafc;
}
/deep/ th {
  color: #333333;
}
</style>
