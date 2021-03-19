<template>
  <div class="statistical-table">
    <div class="baobiaodan" />
    <div class="table-conten">
      <!-- <vxe-table
        highlight-current-row
        ref="xTable"
        class="mytable-scrollbar"
        height="100%"
        border="none"
        :data="runningTableList"
      >
        <vxe-table-column
          type="seq"
          width="60"
        />
        <vxe-table-column
          field="hospitalNo"
          title="住院号"
          width="85"
        />
        <vxe-table-column
          field="patientName"
          title="患者姓名"
          width="80"
        />
        <vxe-table-column
          field="operateDate"
          title="手术时间"
          width="120"
        />
        <vxe-table-column
          field="anesDoc"
          title="麻醉医师"
          width="80"
        />
        <vxe-table-column
          center
          field="categpry"
          title="病区-科室"
          width="100"
        />
        <vxe-table-column
          field="washNurseName"
          title="洗手护士"
          width="80"
        />
        <vxe-table-column
          field="surgeon"
          title="主刀医师"
          width="80"
        />
        <vxe-table-column
          field="runNurseName"
          title="巡回护士"
          width="80"
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
      </vxe-table> -->
      <table
        style="color:#606266"
        class="vxe-table--header"
      >
        <thead>
          <tr>
            <th style="display:flex;justifyContent: center;font-weight: 500;">
              手术患者转运交接报表单
            </th>
          </tr>
          <tr class="header-tr">
            <th style="width:50px;text-align:left;">
              台次
            </th>
            <th style="width:75px;text-align:left;">
              住院号
            </th>
            <th style="width:70px;text-align:left;">
              患者姓名
            </th>
            <th style="width:90px;text-align:left;">
              手术时间
            </th>
            <!-- <th style="width:80px">
              麻醉医师
            </th> -->
            <th style="width:80px;text-align:left;">
              病区-科室
            </th>
            <!-- <th style="width:80px">
              洗手护士
            </th>
            <th style="width:80px">
              主刀医师
            </th>
            <th style="width:80px">
              巡回护士
            </th> -->
            <th style="width:90px;text-align:left;">
              派单时间
            </th>
            <th style="width:90px;text-align:left;">
              接单时间
            </th>
            <th style="width:90px;text-align:left;">
              到达病房时间
            </th>
            <th style="width:90px;text-align:left;">
              到达缓冲区时间
            </th>
            <th style="width:90px;text-align:left;">
              入术前pacu时间
            </th>
            <th style="width:90px;text-align:left;">
              出术前pacu时间
            </th>
            <th style="width:90px;text-align:left;">
              进手术室时间
            </th>
            <th style="width:90px;text-align:left;">
              麻醉开始前时间
            </th>
            <th style="width:90px;text-align:left;">
              手术开始前时间
            </th>
            <th style="width:90px;text-align:left;">
              离开手术室前时间
            </th>
            <!-- <th style="width:90px;text-align:left;">
              出手术室时间
            </th> -->
            <th style="width:90px;text-align:left;">
              术后入pacu时间
            </th>
            <th style="width:90px;text-align:left;">
              术后出pacu时间
            </th>
            <th style="width:90px;text-align:left;">
              病房收治时间
            </th>
          </tr>
        </thead>
        <tbody
          id="scrollBody"
          v-if="runningTableList.length !== 0"
        >
          <tr
            v-for="(item, index) in runningTableList"
            :key="index"
          >
            <td style="width:50px;textAlign:left">
              {{ item.sequenceNo || '' }}
            </td>
            <td style="width:75px;textAlign:left">
              {{ item.hospitalNo || '' }}
            </td>
            <td style="width:65px;textAlign:left">
              {{ item.patientName || '' }}
            </td>
            <td style="width:90px;textAlign:center">
              {{ item.operateDate || '' }}
            </td>
            <!-- <td style="width:80px;textAlign:center">
              {{ item.anesDoc || '' }}
            </td> -->
            <td style="width:85px;textAlign:left">
              {{ item.categpry || '' }}
            </td>
            <!-- <td style="width:80px;textAlign:left">
              {{ item.washNurseName || '' }}
            </td>
            <td style="width:80px;textAlign:left">
              {{ item.surgeon || '' }}
            </td>
            <td style="width:80px;textAlign:left">
              {{ item.runNurseName || '' }}
            </td> -->
            <td style="width:90px;textAlign:left">
              {{ item.sendOrderTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.receivingOrderTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.outWardTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.inBufferTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.inInductionRoomTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.outInductionRoomTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.pointInRoomTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.anesBeforeChkTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.beforeOperChkTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.leaveBeforeChkUpdateTime || '' }}
            </td>
            <!-- <td style="width:90px;textAlign:left">
              {{ item.pointOutRoomTime || '' }}
            </td> -->
            <td style="width:90px;textAlign:left">
              {{ item.pointPacuTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.outPacuTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.arrivalTime || '' }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <div class="noneData">
            暂无数据
          </div>
        </tbody>
      </table>
    </div>
    <div v-show="false">
      <table id="statistical-running-table">
        <thead style="display:table-header-group">
          <tr style="display:flex;justifyContent: center;font-weight: 500;">
            <th>
              手术患者转运交接报表单
            </th>
          </tr>
          <tr class="header-tr">
            <th style="width:50px;text-align:left;">
              台次
            </th>
            <th style="width:75px;text-align:left;">
              住院号
            </th>
            <th style="width:70px;text-align:left;">
              患者姓名
            </th>
            <th style="width:90px;text-align:left;">
              手术时间
            </th>
            <!-- <th style="width:80px">
              麻醉医师
            </th> -->
            <th style="width:80px;text-align:left;">
              病区-科室
            </th>
            <!-- <th style="width:80px">
              洗手护士
            </th>
            <th style="width:80px">
              主刀医师
            </th>
            <th style="width:80px">
              巡回护士
            </th> -->
            <th style="width:85px;text-align:left;">
              派单时间
            </th>
            <th style="width:85px;text-align:left;">
              接单时间
            </th>
            <th style="width:85px;text-align:left;">
              到达病房时间
            </th>
            <th style="width:85px;text-align:left;">
              到达缓冲区时间
            </th>
            <th style="width:85px;text-align:left;">
              入术前pacu时间
            </th>
            <th style="width:85px;text-align:left;">
              出术前pacu时间
            </th>
            <th style="width:85px;text-align:left;">
              进手术室时间
            </th>
            <th style="width:85px;text-align:left;">
              麻醉开始前时间
            </th>
            <th style="width:85px;text-align:left;">
              手术开始前时间
            </th>
            <th style="width:85px;text-align:left;">
              离开手术室前时间
            </th>
            <!-- <th style="width:85px;text-align:left;">
              出手术室时间
            </th> -->
            <th style="width:85px;text-align:left;">
              术后入pacu时间
            </th>
            <th style="width:85px;text-align:left;">
              术后出pacu时间
            </th>
            <th style="width:85px;text-align:left;">
              病房收治时间
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in runningTableList"
            :key="index"
          >
            <td style="width:50px;textAlign:left">
              {{ item.sequenceNo || '' }}
            </td>
            <td style="width:75px;textAlign:left">
              {{ item.hospitalNo || '' }}
            </td>
            <td style="width:65px;textAlign:left">
              {{ item.patientName || '' }}
            </td>
            <td style="width:90px;textAlign:center">
              {{ item.operateDate || '' }}
            </td>
            <!-- <td style="width:80px;textAlign:center">
              {{ item.anesDoc || '' }}
            </td> -->
            <td style="width:85px;textAlign:left">
              {{ item.categpry || '' }}
            </td>
            <!-- <td style="width:80px;textAlign:left">
              {{ item.washNurseName || '' }}
            </td>
            <td style="width:80px;textAlign:left">
              {{ item.surgeon || '' }}
            </td>
            <td style="width:80px;textAlign:left">
              {{ item.runNurseName || '' }}
            </td> -->
            <td style="width:70px;textAlign:left">
              {{ item.sendOrderTime || '' }}
            </td>
            <td style="width:90px;textAlign:left">
              {{ item.receivingOrderTime || '' }}
            </td>
            <td style="width:80px;textAlign:left">
              {{ item.outWardTime || '' }}
            </td>
            <td style="width:85px;textAlign:left">
              {{ item.inBufferTime || '' }}
            </td>
            <td style="width:85px;textAlign:left">
              {{ item.inInductionRoomTime || '' }}
            </td>
            <td style="width:85px;textAlign:left">
              {{ item.outInductionRoomTime || '' }}
            </td>
            <td style="width:85px;textAlign:left">
              {{ item.pointInRoomTime || '' }}
            </td>
            <td style="width:85px;textAlign:left">
              {{ item.anesBeforeChkTime || '' }}
            </td>
            <td style="width:85px;textAlign:left">
              {{ item.beforeOperChkTime || '' }}
            </td>
            <td style="width:85px;textAlign:left">
              {{ item.leaveBeforeChkUpdateTime || '' }}
            </td>
            <!-- <td style="width:90px;textAlign:left">
              {{ item.pointOutRoomTime || '' }}
            </td> -->
            <td style="width:85px;textAlign:left">
              {{ item.pointPacuTime || '' }}
            </td>
            <td style="width:85px;textAlign:left">
              {{ item.outPacuTime || '' }}
            </td>
            <td style="width:85px;textAlign:left">
              {{ item.arrivalTime || '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
import { ipcRenderer } from 'electron'
export default {
  name: 'StatisticalTable',
  props: {
    runningTableList: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      pageItem: {},
      busy: true,
      currentRow: {}
    }
  },
  mounted () {
    Bus.$on('statistical', res => {
      this.utilsDebounce(() => {
        this.dayin()
      }, 1000)
    })
  },
  methods: {
    dayin () {
      this.utilsDebounce(() => {
        this.printCurrent()
      }, 1000)
    },
    // 打印
    printCurrent () {
      const printHtml = document.getElementById('statistical-running-table')
        .outerHTML
      console.log(printHtml)
      const options = { silent: true }
      // options = JSON.stringify(options)
      ipcRenderer.send(
        'printChannel',
        printHtml,
        'statistical-running-table.css',
        options
      )
    }
    // load () {
    //   console.log(132)
    //   this.getTableData(this.pageItem)
    // },
    // // 获取数据
    // getTableData (res) {
    //   this.$store.dispatch('ReqNursingDocumentTable', res).then(result => {
    //     console.log(result)
    //     this.tableData.push(...result.data.data.list)
    //     this.pageItem.pageIndex++
    //     this.busy = false
    //   })
    // },
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_handle.scss';

.statistical-table {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
  height: 100%;
  // background-color: #fff;
  @include background('search_header_bgc');
  @include font_color('search_header_font');
  width: 100%;
  .table-conten {
    height: calc(100% - 25px);
    display: flex;
    justify-content: center;
  }
}
.baobiaodan {
  color: #333333;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
}

.vxe-table--header {
  font-size: 14px;
  height: calc(100% - 0px);
}
/deep/ .vxe-table--header thead {
  display: table-header-group;
}

table tbody {
  color: #000;
  display: block;
  height: calc(100% - 25px); //高度根据实际自定义
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; // 为了滚动顺畅
}

table tbody::-webkit-scrollbar {
  // display: none; // 隐藏滚动条，不需要可取消
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
table tbody::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
table tbody::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
table thead th,
table tbody tr {
  display: table;
  // width:100%;
  table-layout: fixed; //fixed：固定表格布局
}
table tbody tr td {
  text-align: left;
}
table thead {
  width: calc(100% - 1em); //函数计算宽度
}
.header-tr {
  display: flex;
}
.noneData {
  text-align: center;
  margin-top: 30%;
  // font-weight: 600;
  font-size: 14px;
  // color: #ccc;
}
/deep/ th {
  color: #333333;
}
/deep/ td {
  color: #606266;
  padding: 10px 0;
}
tbody tr:nth-child(2n) {
  background: #f9fafc;
}
</style>
