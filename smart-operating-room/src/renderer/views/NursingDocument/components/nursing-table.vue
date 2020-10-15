<template>
  <div class="nursing-table">
    <div
      class="table-conten"
    >
      <vxe-table
        highlight-current-row
        ref="xTable"
        height="100%"
        class="mytable-scrollbar"
        border="none"
        :data="tableData"
        @cell-dblclick="dbSelected"
        @current-change="currentChangeEvent"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <vxe-table-column
          type="seq"
          width="80"
        />
        <vxe-table-column
          field="hospitalNo"
          title="住院号"
        />
        <vxe-table-column
          field="patientName"
          title="病人姓名"
        />
        <vxe-table-column
          field="createTime"
          title="创建时间"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'NursingTable',
  data () {
    return {
      tableData: [

      ],
      pageItem: {},
      busy: true
    }
  },
  mounted () {
    Bus.$on('searchNursing-document-table', res => {
      this.pageItem = res
      this.tableData = []
      // this.getTableData(this.pageItem)
      this.loadMore()
    })
  },
  methods: {
    loadMore () {
      console.log(132)
      this.getTableData(this.pageItem)
    },
    // 获取数据
    getTableData (res) {
      this.$store.dispatch('ReqNursingDocumentTable', res).then(result => {
        console.log(result)
        this.tableData = this.tableData.concat(result.data.data.list)
        this.pageItem.pageIndex++
        this.busy = false
      })
    },

    // 获取高亮行
    getCurrentEvent () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable.getCurrentRecord()))
    },
    currentChangeEvent ({ row }) {
      console.log('行选中事件')
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
/deep/ .table-conten .vxe-table .vxe-body--row.row--current {
    background-color:#D6DCE8 !important;
}
.table-conten {
  height: 100%;
}
.nursing-table {
    padding-left: 20px;
    background-color: #fff;
    width: 100%;
    height: 100%;
}
</style>
