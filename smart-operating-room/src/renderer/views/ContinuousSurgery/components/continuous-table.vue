<template>
  <div class="continuous-table">
    <div class="table-conten">
      <vxe-table
        stripe
        highlight-current-row
        :loading="loading"
        ref="xTable"
        class="mytable-scrollbar"
        height="100%"
        border="none"
        :data="tableList"
        @current-change="currentChangeEvent"
      >
        <vxe-table-column
          type="seq"
          width="80"
        />
        <vxe-table-column
          field="operateDate"
          title="日期"
        />
        <vxe-table-column
          field="roomNo"
          title="房间号"
        />
        <vxe-table-column
          field="sequenceNo"
          title="手术序号"
        />
        <vxe-table-column
          field="patient"
          title="病人信息"
        />
        <vxe-table-column
          field="pointInRoomTime"
          title="入室时间"
        />
        <vxe-table-column
          field="pointOutRoomTime"
          title="出室时间"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContinuousTable',
  props: ['tableList', 'loading'],
  data () {
    return {

    }
  },
  mounted () {
    this.addScrollHandle()
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
      console.log(123)
      // this.tableData = this.tableData.concat(this.tableData)
    },
    // 获取高亮行
    getCurrentEvent () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable.getCurrentRecord()))
    },
    currentChangeEvent ({ row }) {
      console.log('行选中事件')
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .table-conten .vxe-table .vxe-body--row.row--current {
    background-color:#D6DCE8 !important;
}

.continuous-table {
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
