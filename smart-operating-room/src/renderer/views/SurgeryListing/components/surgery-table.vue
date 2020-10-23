<template>
  <div
    class="surgery-table"
  >
    <div class="baobiaodan">
      连台手术清洁检查表
    </div>
    <div class="table-conten">
      <vxe-table
        highlight-current-row
        ref="xTable2"
        class="mytable-scrollbar"
        height="100%"
        border="none"
        :data="surgeryTableList"
        @current-change="currentChangeEvent"
      >
        <vxe-table-column
          type="seq"
          width="60"
        />
        <vxe-table-column
          field="operateDate"
          title="日期"
          width="120"
        />
        <vxe-table-column
          field="roomNo"
          title="房间号"
          width="80"
        />
        <vxe-table-column
          field="sequenceNo"
          title="手术序号"
          width="90"
        />
        <vxe-table-column
          field="patient"
          title="病人信息"
          width="130"
        />
        <vxe-table-column
          width="260"
          title="每台手术必须清洁物品"
        >
          <template>
            <vxe-checkbox-group
              disabled
              v-model="value12"
            >
              <vxe-checkbox

                label="1"
                content="手术床"
              />
              <vxe-checkbox

                label="2"
                content="吸引器"
              />
              <vxe-checkbox

                label="3"
                content="麻醉车"
              />
              <vxe-checkbox

                label="4"
                content="输液架"
              />
              <vxe-checkbox

                label="5"
                content="地面"
              />
            </vxe-checkbox-group>
          </template>
        </vxe-table-column>
        <vxe-table-colgroup
          title="手术时使用过的需"
        >
          <vxe-table-column
            field="age"
            title="要清洁的消毒物品"
            width="220"
          >
            <template>
              <vxe-checkbox-group
                disabled
                v-model="value12"
              >
                <vxe-checkbox
                  label="1"
                  content="手术台车"
                />
                <vxe-checkbox
                  label="2"
                  content="设备仪器"
                />
                <vxe-checkbox
                  label="3"
                  content="体位垫"
                />
              </vxe-checkbox-group>
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-colgroup
          title="每台手术后需要"
        >
          <vxe-table-column
            field="age1"
            width="260"
            title="重点清洁消毒物品"
          >
            <template>
              <vxe-checkbox-group
                disabled
                v-model="value12"
              >
                <vxe-checkbox
                  label="1"
                  content="电脑"
                />
                <vxe-checkbox
                  label="2"
                  content="踩脚凳"
                />
                <vxe-checkbox
                  label="3"
                  content="垃圾桶"
                />
                <vxe-checkbox
                  label="4"
                  content="电源开关"
                />
                <vxe-checkbox
                  label="5"
                  content="手术门"
                />
                <vxe-checkbox
                  label="6"
                  content="凳子"
                />
              </vxe-checkbox-group>
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-colgroup
          title="如果有污染"
        >
          <vxe-table-column
            field="age2"
            width="180"
            title="及时清洁消毒"
          >
            <template>
              <vxe-checkbox-group
                disabled
                v-model="value12"
              >
                <vxe-checkbox
                  label="1"
                  content="地面"
                />
                <vxe-checkbox
                  label="2"
                  content="墙面"
                />
              </vxe-checkbox-group>
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>

        <vxe-table-column
          field="pointInRoomTime"
          width="120"
          title="进手术室时间"
        />
        <vxe-table-column
          field="pointOutRoomTime"
          width="120"
          title="出手术室时间"
        />
      </vxe-table>
    </div>
    <div v-show="false">
      <table id="surgery-table">
        <thead style="display:table-header-group">
          <tr style="display:flex;justifyContent: center">
            <th>
              连台手术清洁检查表
            </th>
          </tr>
          <tr class="header-tr">
            <th
              rowspan="2"
              style="width:40px"
            />
            <th
              rowspan="2"
              style="width:85px"
            >
              日期
            </th>
            <th
              rowspan="2"
              style="width:60px;marginLeft: 10px;"
            >
              房间号
            </th>
            <th
              rowspan="2"
              style="width:60px"
            >
              手术序号
            </th>
            <th
              rowspan="2"
              style="width:100px"
            >
              病人信息
            </th>
            <th
              rowspan="2"
              style="width:160px;marginLeft: 20px"
            >
              每台手术必须清洁物品
            </th>
            <th style="width:120px;">
              手术时使用过的需要清洁的消毒物品
            </th>
            <th style="width:120px;">
              每台手术后需要重点清洁消毒物品
            </th>
            <th style="width:100px;margin-left: 40px">
              如果有污染及时清洁消毒
            </th>
            <th
              rowspan="2"
              style="width:100px;margin-left: 20px"
            >
              进手术室时间
            </th>
            <th
              rowspan="2"
              style="width:100px"
            >
              出手术室时间
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in surgeryTableList"
            :key="index"
          >
            <td style="width:40px">
              {{ index }}
            </td>
            <td style="width:85px">
              {{ item.operateDate }}
            </td>
            <td style="width:60px">
              {{ item.roomNo }}
            </td>
            <td style="width:60px">
              {{ item.sequenceNo }}
            </td>
            <td style="width:115px">
              {{ item.patient }}
            </td>
            <td style="width:160px;textAlign: left;">
              <template>
                <vxe-checkbox-group
                  disabled
                  v-model="value12"
                >
                  <vxe-checkbox

                    label="1"
                    content="手术床"
                  />
                  <vxe-checkbox

                    label="2"
                    content="吸引器"
                  />
                  <vxe-checkbox

                    label="3"
                    content="麻醉车"
                  />
                  <vxe-checkbox

                    label="4"
                    content="输液架"
                  />
                  <vxe-checkbox

                    label="5"
                    content="地面"
                  />
                </vxe-checkbox-group>
              </template>
            </td>
            <td style="width:120px;textAlign: left;paddingLeft: 10px;">
              <template>
                <vxe-checkbox-group
                  disabled
                  v-model="value12"
                >
                  <vxe-checkbox
                    label="1"
                    content="手术台车"
                  />
                  <vxe-checkbox
                    label="2"
                    content="设备仪器"
                  />
                  <vxe-checkbox
                    label="3"
                    content="体位垫"
                  />
                </vxe-checkbox-group>
              </template>
            </td>
            <td style="width:170px;textAlign: left;">
              <template>
                <vxe-checkbox-group
                  disabled
                  v-model="value12"
                >
                  <vxe-checkbox
                    label="1"
                    content="踩脚凳"
                  />
                  <vxe-checkbox
                    label="2"
                    content="电脑"
                  />
                  <vxe-checkbox
                    label="3"
                    content="垃圾桶"
                  />
                  <vxe-checkbox
                    label="4"
                    content="电源开关"
                  />
                  <vxe-checkbox
                    label="5"
                    content="手术门"
                  />
                  <vxe-checkbox
                    label="6"
                    content="凳子"
                  />
                </vxe-checkbox-group>
              </template>
            </td>
            <td style="width:130px;textAlign: left;">
              <template>
                <vxe-checkbox-group
                  disabled
                  v-model="value12"
                >
                  <vxe-checkbox
                    label="1"
                    content="地面"
                  />
                  <vxe-checkbox
                    label="2"
                    content="墙面"
                  />
                </vxe-checkbox-group>
              </template>
            </td>
            <td style="width:90px;marginLeft:10px">
              {{ item.pointInRoomTime }}
            </td>
            <td style="width:90px;">
              {{ item.pointInRoomTime }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
import {ipcRenderer} from 'electron'
export default {
  name: 'SurgeryTable',
  props: ['surgeryTableList'],
  data () {
    return {
      value12: []
    }
  },
  mounted () {
    // this.addScrollHandle()
    Bus.$on('continuous', res => {
      this.dayin()
    })
  },

  methods: {
    // addScrollHandle () {
    //   this.dom = this.$refs.xTable.elemStore['main-body-wrapper']
    //   this.dom.addEventListener('scroll', () => {
    //   // 滚动距离
    //     let scrollTop = this.dom.scrollTop
    //     // 变量windowHeight是可视区的高度
    //     let windowHeight = this.dom.clientHeight || this.dom.clientHeight
    //     // 变量scrollHeight是滚动条的总高度
    //     let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight
    //     if (scrollTop + windowHeight === scrollHeight) {
    //       // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
    //       if (!this.allData) this.getMoreLog()
    //     }
    //   })
    // },
    // getMoreLog () {
    //   this.load()
    // },
    // load () {
    //   console.log(123)
    //   // this.tableData = this.tableData.concat(this.tableData)
    // },
    dayin () {
      this.utilsDebounce(() => { this.printCurrent() }, 1000)
    },
    // 打印
    printCurrent () {
      const printHtml = document.getElementById('surgery-table').outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      ipcRenderer.send('printChannel', printHtml, 'surgery-table.css', options)
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

.surgery-table {
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
/deep/ .vxe-checkbox {
  margin-left: 10px;
}
/deep/ .col--group {
  padding-bottom: 0 !important;
}
/deep/ .vxe-header--row th {
  padding: 0 !important;
}
/deep/ .vxe-checkbox.is--disabled>input+.vxe-checkbox--icon {
  border-color: none;
  background-color: unset;
}
/deep/ .vxe-checkbox.is--disabled>input+.vxe-checkbox--icon+.vxe-checkbox--label {
  color: unset;
  font-weight: 500;
}
table thead {
  font-size: 14px;
}
table tbody {
  font-size: 14px;
  color: #000;
  display: table;
  /* display: block; */
  height: 100%;
  /* overflow-y: scroll; */
  /* -webkit-overflow-scrolling: touch; */
}
table tbody::-webkit-scrollbar {
  display: none;
}
table thead th, table tbody tr {
    display:table;
    // width:100%;
    table-layout:fixed;//fixed：固定表格布局
}
.header-tr {
  display: flex;
}
td {
  text-align: center;
}
</style>
