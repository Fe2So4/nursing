<template>
  <div class="attendance-contarst-container">
    <div class="container-left">
      <div class="left-top">
        <el-scrollbar style="height:100%">
          <div class="contarst-title">
            业务分组
          </div>
          <div class="contarst-content">
            <el-radio-group
              v-model="topRadio"
            >
              <el-radio
                style="width:160px;margin-top:5px"
                v-for="item in topRadioList"
                :key="item.id"
                :label="item.id"
              >
                {{ item.transactionGroupName }}
              </el-radio>
            </el-radio-group>
          </div>
        </el-scrollbar>
      </div>
      <div class="left-content">
        <el-scrollbar style="height:100%">
          <div class="contarst-title">
            班次名称
          </div>
          <div class="contarst-content">
            <el-checkbox-group
              v-model="selectCheckList"
            >
              <el-checkbox
                @change="changeShift(item)"
                style="width:120px"
                :label="item.typeName"
                v-for="item in checkList"
                :key="item.typeName"
              />
            </el-checkbox-group>
          </div>
        </el-scrollbar>
      </div>
      <div class="left-bottom">
        <vxe-table
          size="mini"
          height="420"
          stripe
          ref="xTable"
          class="mytable-scrollbar"

          align="center"
          :data="selectTableList"
        >
          <vxe-table-column
            field="order"
            title="班次顺序"
            width="100"
          />
          <vxe-table-column
            field="className"
            title="业务分组"
          />
          <vxe-table-column
            field="className"
            title="班次名称"
          />
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                style="color:#3377FF;font-size:16px;"
                @click="changeRowInfo('1',row)"
                type="text"
              >
                <i class="el-icon-top" />
              </el-button>
              <span class="option-line" />
              <el-button
                @click="changeRowInfo('2',row)"
                style="color:#74A2FF;font-size:16px"
                type="text"
              >
                <i class="el-icon-bottom" />
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        <div style="width:100%;text-align:center;margin-top:5px">
          <el-button
            @click="getBottomTableList"
            type="primary"
            size="mini"
          >
            保 存
          </el-button>
        </div>
      </div>
    </div>
    <div class="container-right">
      <vxe-table
        size="mini"
        height="auto"
        auto-resize
        stripe
        ref="xTable"
        class="mytable-scrollbar"
        highlight-current-row
        highlight-hover-row
        align="center"
        :data="rightTableList"
      >
        <vxe-table-column
          type="seq"
          title="序号"
          width="100"
        />
        <vxe-table-column
          width="180px"
          field="groupName"
          title="业务分组"
        />
        <vxe-table-column
          field="groupClassTime"
          title="班次顺序"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceContrast',
  data () {
    return {

      topRadio: '',
      topRadioList: [

      ],
      checkList: [

      ],
      selectCheckList: [],
      selectTableList: [

      ],
      rightTableList: [

      ]
    }
  },
  mounted () {
    this.getTransactionGroupTeachResult()
    this.getTransactionGroup()
    this.getSelectList()
  },
  methods: {
    // 获取右边展示数据
    getTransactionGroupTeachResult () {
      this.$store.dispatch('ReqGetTransactionGroupTeachResult').then(res => {
        if (res.data.code === 200) {
          this.rightTableList = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 获取业务分组列表
    getTransactionGroup () {
      this.$store.dispatch('ReqgetTransactionGroup').then(res => {
        if (res.data.code === 200) {
          this.topRadioList = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击分组获取列表
    getTransactionGroupTeach (newVal) {
      let obj = {
        id: newVal
      }
      this.$store.dispatch('ReqGetTransactionGroupTeach', obj).then(res => {
        if (res.data.code === 200) {
          this.selectTableList = res.data.data
          this.orderList()
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 进行班次排序
    orderList () {
      this.selectCheckList = []
      this.selectTableList.forEach((item, index) => {
        item.order = index + 1

        this.checkList.forEach(v => {
          v.checkFlag = '2'
          if (v.typeName === item.className) {
            v.checkFlag = '1'
            this.selectCheckList.push(item.className)
          }
        })
      })
    },
    // 点击添加班次
    changeShift (item) {
      console.log(item)
      if (this.IsEmpty(this.topRadio)) {
        this.$alert('请先选择业务分组')
        this.selectCheckList = []
        return false
      }
    },
    // 调用接口添加班次
    getAddTransactionGroupTeach () {
      let obj = {}
      this.$store.dispatch('ReqAddTransactionGroupTeach', obj).then(res => {
        if (res.data.code === 200) {
          console.log(res)
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    changeRowInfo (type, row) {
      // 点击向上
      if (type === '1') {
        this.upGo(row.index)
      } else { // 点击向下
        this.downGo(row.index)
      }
    },
    upGo (index) {
      if (index !== 0) {
        this.selectCheckList[index] = this.selectCheckList.splice(index - 1, 1, this.selectCheckList[index])[0]
      } else {
        this.selectCheckList.push(this.selectCheckList.shift())
      }
      this.changeShift()
    },
    downGo (index) {
      console.log(index, this.selectCheckList.length - 1)
      if (index !== this.selectCheckList.length - 1) {
        this.selectCheckList[index] = this.selectCheckList.splice(index + 1, 1, this.selectCheckList[index])[0]
      } else {
        this.selectCheckList.unshift(this.selectCheckList.splice(index, 1)[0])
      }
      this.changeShift()
    },
    // 获取下拉框数据字典
    getSelectList () {
      let obj = {
        belongSerialNumber: '006'
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          this.checkList = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    getBottomTableList () {
      console.log(this.topRadio)
    }
  },
  watch: {
    'topRadio': function (newVal, oldVal) {
      if (this.IsEmpty(newVal)) {
        this.selectTableList = []
      } else {
        this.getTransactionGroupTeach(newVal)
      }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden !important;
}
/deep/ .el-checkbox {
  margin-right: 0px;
}
/deep/ .vxe-cell--title {
  color: #000;
}
/deep/ .vxe-table .vxe-table--border-line {
  border: none;
}
.attendance-contarst-container {
  width:100%;
  height: 100%;
  display: flex;
  .container-left {
    flex: 3;
    display: flex;
    flex-direction: column;
    .left-top {
      background-color: #fff;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      padding: 10px;
      min-height: 90px;
      display: flex;
      flex-direction: column;
      .contarst-title {
        flex: 3;
        color: #333333;
        font-weight: Bold;
        font-size: 14px;
      }
      .contarst-content {
        display: flex;
        align-items: center;
        flex: 6;
      }
    }
    .left-content {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      margin-top: 20px;
      padding: 10px;
      min-height: 230px;
      .contarst-title {
        flex: 1;
        color: #333333;
        font-weight: Bold;
        font-size: 14px;
      }
      .contarst-content {
        // display: flex;
        // align-items: center;
        flex: 9;
      }
    }
    .left-bottom {
      background-color: #fff;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      // height: 580px;
      flex: 1;
      margin-top: 20px;
      // padding: 10px;
    }
  }
  .container-right {
    padding: 0 5px;
    background-color: #fff;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 5px;
    margin-left: 20px;
    flex: 5;
    // padding: 20px 20px;/* */
    // box-sizing: border-box;
  }
}
</style>
