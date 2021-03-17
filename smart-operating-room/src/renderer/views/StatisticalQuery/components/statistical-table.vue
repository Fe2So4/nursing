<template>
  <div class="statistical-table">
    <div class="table-conten">
      <!-- :loading="loading" -->
      <vxe-table
        stripe
        highlight-current-row
        ref="xTable"
        class="mytable-scrollbar"

        height="100%"
        border="none"
        :data="tableList"
        @current-change="currentChangeEvent"
      >
        <vxe-table-column
          type="seq"
          width="50"
          title="序号"
        />
        <vxe-table-column
          width="100px"
          field="hospitalNo"
          title="住院号"
        />
        <vxe-table-column
          width="100px"
          field="patientName"
          title="患者姓名"
        />
        <vxe-table-column
          width="100px"
          field="operateDate"
          title="手术日期"
        />
        <!-- <vxe-table-column
          width="100px"
          field="anesDoc"
          title="麻醉医师"
        /> -->
        <vxe-table-column
          width="130px"
          field="categpry"
          title="病区-科室"
        />
        <!-- <vxe-table-column
          width="100px"
          field="washNurseName"
          title="洗手护士"
        />
        <vxe-table-column
          width="100px"
          field="surgeon"
          title="主刀医师"
        />
        <vxe-table-column
          width="100px"
          field="runNurseName"
          title="巡回护士"
        /> -->
        <vxe-table-column
          width="110px"
          field="sendOrderTime"
          title="派单时间"
        />
        <vxe-table-column
          width="110px"
          field="receivingOrderTime"
          title="接单时间"
        />
        <vxe-table-column
          width="110px"
          field="outWardTime"
          title="到达病房时间"
        />
        <vxe-table-column
          width="100px"
          field="inBufferTime"
          title="到达缓冲区时间"
        />
        <vxe-table-column
          width="100px"
          field="inInductionRoomTime"
          title="入术前pacu时间"
        />
        <vxe-table-column
          width="100px"
          field="outInductionRoomTime"
          title="出术前pacu时间"
        />
        <vxe-table-column
          width="100px"
          field="pointInRoomTime"
          title="进手术室时间"
        />
        <vxe-table-column
          width="100px"
          field="anesBeforeChkTime"
          title="麻醉开始前时间"
        />

        <vxe-table-column
          width="100px"
          field="beforeOperChkTime"
          title="手术开始前时间"
        />
        <vxe-table-column
          width="100px"
          field="leaveBeforeChkUpdateTime"
          title="离开手术室前时间"
        />
        <vxe-table-column
          width="100px"
          field="pointOutRoomTime"
          title="出手术室时间"
        />
        <vxe-table-column
          width="100px"
          field="pointPacuTime"
          title="术后入pacu时间"
        />
        <vxe-table-column
          field="outPacuTime"
          width="100px"
          title="术后出pacu时间"
        />

        <vxe-table-column
          width="100px"
          field="arrivalTime"
          title="病房收治时间"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticalTable',
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    tableList: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      tableData: [],
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
@import '@/styles/_handle.scss';
.statistical-table {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
  height: 100%;
  padding-left: 5px;
  padding-right: 5px;
  // background-color: #fff;
  @include background('search_header_bgc');
  @include font_color('search_header_font');
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
