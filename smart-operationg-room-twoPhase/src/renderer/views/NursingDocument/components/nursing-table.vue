<template>
  <div class="nursing-table">
    <div
      class="table-conten"
    >
      <vxe-table
        stripe
        highlight-current-row
        ref="xTable"
        class="mytable-scrollbar"
        height="100%"
        border="none"
        :loading="loading"
        :data="tableData"
        @current-change="currentChangeEvent"
        @cell-dblclick="dbSelected"
      >
        <!-- infinite-scroll-disabled="busy" -->
        <!-- infinite-scroll-immediate="false" -->
        <!-- v-infinite-scroll="load" -->
        <vxe-table-column
          type="seq"
          width="100"
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
      loading: false,
      tableData: [

      ],
      pageItem: {},
      busy: true,
      currentRow: {}
    }
  },
  mounted () {
    Bus.$on('searchNursing-document-table', res => {
      this.pageItem = res
      this.tableData = []
      // this.getTableData(this.pageItem)
      this.utilsDebounce(() => { this.load() }, 1000)
    })
    this.addScrollHandle()
  },
  methods: {
    // 添加滚动事件
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
      this.getTableData(this.pageItem)
    },
    // 获取数据
    getTableData (res) {
      this.loading = true
      this.$store.dispatch('ReqNursingDocumentTable', res).then(result => {
        this.loading = false
        if (result.data.data.list.length === 0) {
          this.openToast('warning', '暂无更多数据')
        }
        this.tableData.push(...result.data.data.list)
        this.pageItem.pageIndex++
        this.busy = false
      })
    },
    currentChangeEvent (val) {
      this.currentRow = val
    },

    dbSelected ({row}) {
      console.log(row)
      this.$store.commit('SAVE_HOSNO', row.hospitalNo)
      this.$store.commit('SAVE_PATLENTNAME', row.patientName)
      this.$store.commit('SAVE_CURENO', row.cureNo)
      this.$router.push({
        path: '/home/client-nursing-document-list/client-security-check'
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

<style scoped lang="scss">
/deep/ .table-conten .vxe-table .vxe-body--row.row--current {
    background-color:#D6DCE8 !important;
}
.table-conten {
  height: 100%;
}
.nursing-table {
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #fff;
    width: 100%;
    height: 100%;
}
/deep/ th {
  color: #333333;
}
/deep/ .vxe-table .vxe-body--row.row--stripe {
      background-color: #f9fafc;
}
</style>
