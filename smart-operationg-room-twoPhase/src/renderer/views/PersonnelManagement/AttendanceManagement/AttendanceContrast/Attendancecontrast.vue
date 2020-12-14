<template>
  <!-- 业务带教班次管理 -->
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
        <div class="contarst-title">
          班次名称
        </div>
        <el-scrollbar style="height:100%">
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
          height="auto"
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
                <i
                  class="el-icon-top"
                  style="color:#3377FF;font-weight:600"
                />
              </el-button>
              <span class="option-line" />
              <el-button
                @click="changeRowInfo('2',row)"
                style="color:#74A2FF;font-size:16px"
                type="text"
              >
                <i
                  class="el-icon-bottom"
                  style="color:#74A2FF;font-weight:600"
                />
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <div class="container-right">
      <vxe-table
        size="mini"
        height="auto"
        auto-resize

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
    // 进行设置选择值班次排序
    orderList () {
      this.selectCheckList = []
      this.checkList.forEach(item => {
        item.checkFlag = '2'
      })
      this.selectTableList.forEach((item, index) => {
        item.order = index + 1
        item.index = index
        this.checkList.forEach(v => {
          if (v.typeName === item.className) {
            v.checkFlag = '1'
            this.selectCheckList.push(item.className)
          }
        })
      })
    },
    // 进行班次顺序排列
    orderByList () {
      this.selectTableList.forEach((item, index) => {
        item.order = index + 1
        item.index = index
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
      // 改变列表
      if (item.checkFlag === '1') {
        // 删除
        let arr = []
        this.selectTableList.forEach((v, index) => {
          if (v.className === item.typeName) {
            arr.push(v.id)
          }
        })
        let idList = {
          idList: arr
        }
        this.$store.dispatch('ReqDeleteTransactionGroupTeach', idList).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.openToast('success', `删除${item.typeName}班次成功`)
            this.getTransactionGroupTeachResult()
          } else {
            this.openToast('error', `删除${item.typeName}班次失败`)
          }
          this.getTransactionGroupTeach(this.topRadio)
        })
      } else {
        // 添加

        let obj = {
          className: item.typeName,
          transactionBelongCode: String(this.topRadio),
          id: null,
          classSortNo: this.selectCheckList.length
        }
        this.selectTableList.push(obj)
        this.orderByList()
        this.changeTransactionGroupTeach()

        // this.$store.dispatch('ReqAddTransactionGroupTeach', arr).then(res => {
        //   if (res.data.code === 200) {
        //     this.openToast('success', `添加${item.typeName}班次成功`)
        //     this.getTransactionGroupTeachResult()
        //   } else {
        //     this.openToast('error', `添加${item.typeName}班次失败`)
        //   }
        //   this.getTransactionGroupTeach(this.topRadio)
        // })
      }
    },
    // 调用接口修改信息
    changeTransactionGroupTeach () {
      let arr = []
      this.selectTableList.forEach(item => {
        let obj = {
          className: item.className,
          transactionBelongCode: item.transactionBelongCode,
          id: item.id,
          classSortNo: item.order
        }
        arr.push(obj)
      })

      this.$store.dispatch('ReqAddTransactionGroupTeach', arr).then(res => {
        if (res.data.code === 200) {
          this.getTransactionGroupTeachResult()
        } else {
          this.openToast('error', res.data.msg)
        }
        this.getTransactionGroupTeach(this.topRadio)
      })
    },
    changeRowInfo (type, row) {
      console.log(row)
      // 点击向上
      if (type === '1') {
        this.upGo(row.index)
      } else { // 点击向下
        this.downGo(row.index)
      }
    },
    upGo (index) {
      if (index !== 0) {
        this.selectTableList[index] = this.selectTableList.splice(index - 1, 1, this.selectTableList[index])[0]
      } else {
        this.selectTableList.push(this.selectTableList.shift())
      }
      this.orderByList()
      this.changeTransactionGroupTeach()
    },
    downGo (index) {
      console.log(index, this.selectTableList.length - 1)
      if (index !== this.selectTableList.length - 1) {
        this.selectTableList[index] = this.selectTableList.splice(index + 1, 1, this.selectTableList[index])[0]
      } else {
        this.selectTableList.unshift(this.selectTableList.splice(index, 1)[0])
      }
      this.orderByList()
      this.changeTransactionGroupTeach()
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
/deep/ .vxe-table--header-wrapper.body--wrapper {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15) !important;
  border-radius: 5px !important;
}
/deep/.vxe-table--body-wrapper.body--wrapper {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15) !important;
  border-radius: 5px !important;
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
        margin-top: 10px;
        display: flex;
        align-items: center;
        flex: 6;
      }
    }
    .left-content {
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      background-color: #fff;
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
        margin-top: 10px;
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
    // padding: 0 5px;
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
