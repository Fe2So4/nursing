<template>
  <el-scrollbar style="height:100%;">
    <div
      v-if="cardList.length !== 0"
      style="height:100%;"
    >
      <div
        ref="operation"
        class="operation-body-container"
      >
        <div
          v-for="item in cardList"
          @dblclick="operationCard(item)"
          @click="selectItem(item)"
          :key="item.id"
          class="card"
          :class="{ active: isSelectIndex == item.id }"
        >
          <div class="header">
            <div class="header-img" />
            <div
              class="mgl10 fontCss"
              style="overflow: unset;"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.hospitalNo"
                placement="top-start"
              >
                <span class="mgl10 text-one-row">{{ item.hospitalNo }}</span>
              </el-tooltip>
            </div>
            <div class="mgl15 fontCss">
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.patientName"
                placement="top-start"
              >
                <span class="mgl10 text-one-row">{{ item.patientName }}</span>
              </el-tooltip>
            </div>
          </div>
          <div class="body">
            <div class="body-one boxFlex mgb15">
              <div>
                <span class="tltle-span">楼层</span>
                <span class="mgl10">{{ item.floor }}</span>
              </div>
              <div>
                <span class="tltle-span">房间</span>
                <span class="mgl10">{{ item.roomNo }}</span>
              </div>
            </div>
            <div class="boxFlex mgb15">
              <div class="flexNoWarp">
                <span
                  class="tltle-span"
                  style="width:30px"
                >手术</span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.operationName"
                  placement="top-start"
                >
                  <span class="mgl10 text-one-row">{{
                    item.operationName
                  }}</span>
                </el-tooltip>
              </div>
            </div>
            <div class="boxFlex mgb15">
              <div>
                <span class="tltle-span">台次</span>
                <span class="red mgl10">{{ item.sequenceNo }}</span>
              </div>
              <div>
                <span class="tltle-span">床号</span>
                <span class="mgl10">{{ item.bedNo }}</span>
              </div>
            </div>
            <div class="boxFlex mgb15">
              <div>
                <span class="tltle-span">主刀</span>
                <span class="mgl10">{{ item.surgeon }}</span>
              </div>
              <div
                style="display: flex;
                overflow: hidden;
                flex-wrap: nowrap;"
              >
                <span class="blue mgl0">{{ item.deptName }}</span>
                <span class="blue">{{ item.wardName }}</span>
              </div>
            </div>
            <div class="boxFlex mgb15">
              <div>
                <span class="tltle-span">麻醉</span>
                <span class="mgl10">{{ item.anesDoc }}</span>
              </div>
            </div>
            <div class="boxFlex">
              <div>
                <span class="tltle-span">洗手</span>
                <span class="mgl10">{{ item.washNurseName1 }}</span>
              </div>
              <div>
                <span class="tltle-span">巡回</span>
                <span class="mgl10">{{ item.runNurseName1 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="noneDate"
    >
      暂无数据
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dbdialogVisible"
      top="30vh"
      width="520px"
      :before-close="handleCloseOperation"
    >
      <div class="dialog-body-span">
        <i class="el-icon-warning icon-gantanghao" />
        <span>是否发起派单？</span>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-div">
          <el-button
            :loading="btnLoad"
            size="mini"
            class="btn"
            @click="OrderMsgTipsTimeOut"
          >是(Y)</el-button>
          <el-button
            size="mini"
            class="btn mgl40"
            @click="dbdialogVisible = false"
          >否(N)</el-button>
        </div>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="exitdialogVisible"
      top="30vh"
      width="520px"
      :before-close="handleClose"
    >
      <div class="dialog-body-span">
        <i class="el-icon-warning icon-gantanghao" />
        <span>是否发起退单？</span>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-div">
          <el-button
            size="mini"
            class="btn"
            :loading="btnLoad"
            @click="clickExitOrderTimeOut"
          >是(Y)</el-button>
          <el-button
            size="mini"
            class="btn mgl40"
            @click="exitdialogVisible = false"
          >否(N)</el-button>
        </div>
      </span>
    </el-dialog>
    <el-dialog
      title="排班楼层房间修改"
      :visible.sync="selectDialogVisible"
      top="30vh"
      width="520px"
      :before-close="handleCloseRoomChange"
    >
      <div>
        <el-row class="row-width">
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              楼层
            </div>
            <div class="mgl20">
              {{ isSelectItem[0].floor }}
            </div>
          </el-col>
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              房间
            </div>
            <div class="mgl20">
              {{ isSelectItem[0].roomNo }}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-width mgt20">
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              病人姓名
            </div>
            <div class="mgl20">
              {{ isSelectItem[0].patientName }}
            </div>
          </el-col>
          <el-col
            :span="12"
            class="col-line"
          >
            <div
              class="col-left"
              style="width:85px"
            >
              手术名称
            </div>
            <div class="mgl20 tangchuChange">
              {{ isSelectItem[0].operationName }}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-width mgt20">
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              主刀
            </div>
            <div class="mgl20">
              {{ isSelectItem[0].surgeon }}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-width mgt20">
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              洗手
            </div>
            <div class="mgl20">
              <el-select
                size="mini"
                style="width:96px"
                v-model="washNurseCode"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in nurseList"
                  :key="item.nurseCode"
                  :label="item.nurseName"
                  :value="item.nurseCode"
                />
              </el-select>
            </div>
          </el-col>
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              巡回
            </div>
            <div class="mgl20">
              <el-select
                clearable
                size="mini"
                style="width:96px"
                v-model="runNurseCode"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in nurseList"
                  :key="item.nurseCode"
                  :label="item.nurseName"
                  :value="item.nurseCode"
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row class="row-width mgt20">
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              楼层
            </div>
            <div class="mgl20">
              <el-select
                size="mini"
                style="width:96px"
                v-model="selectFloor"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in floorList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.floorNo"
                />
              </el-select>
            </div>
          </el-col>
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              房间号
            </div>
            <div class="mgl20">
              <el-select
                size="mini"
                style="width:96px"
                v-model="selectRoom"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in roomList"
                  :key="item.roomCode"
                  :label="item.roomCode"
                  :value="item.roomCode"
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-div">
          <el-button
            :loading="btnLoad"
            size="mini"
            class="btn"
            @click="changeInfoTimeOut"
          >修 改</el-button>
          <el-button
            size="mini"
            class="btn mgl40"
            @click="quxiaoPaiban"
          >取 消</el-button>
        </div>
      </span>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'OperationContent',
  data () {
    return {
      btnLoad: false,
      cardList: [],
      isSend: '', // 判断哪个退单  0未  1已
      value: '',
      dbdialogVisible: false, // 派单
      exitdialogVisible: false, // 退单
      isSelectItem: [
        { floor: '', roomNo: '', runNurseCode: '', washNurseCode: '' }
      ],
      isSelectIndex: 0,
      selectDialogVisible: false, // 修改
      floorList: [], // 楼层列表
      selectFloor: '',
      roomList: [], // 房间列表
      selectRoom: '',
      nurseList: [], // 护士列表
      washNurseCode: '', // 巡回护士
      washNurseName: '', // 巡回护士
      runNurseCode: '', // 洗手护士
      runNurseName: '', // 洗手护士
      searchCardParams: {
        floorNo: '',
        date: ''
      }
    }
  },
  mounted () {
    this.initSearchCardParams()
    this.getCardList()
    // 监听查询按钮
    Bus.$on('operation-header-searchCard', res => {
      this.searchCardParams.date = res.date
      this.searchCardParams.isOrder = res.isOrder
      this.searchCardParams.condition = res.condition
      this.searchCardParams.floorNo = res.floorNo
      this.utilsDebounce(() => {
        this.getCardList()
      }, 1000)
    })
    // 监听同步按钮
    Bus.$on('operation-header-synchronous', res => {
      this.searchCardParams.date = res.date
      this.searchCardParams.isOrder = res.isOrder
      this.searchCardParams.condition = res.condition
      this.searchCardParams.floorNo = res.floorNo
      this.utilsDebounce(() => {
        this.getTongbuCardList()
      }, 1000)
    })
    // 获取护士列表
    this.getNurseList()
    // let card = this.$refs.operation
    // let num = parseInt(card.offsetWidth / 262)
    // let cardChildren = card.childNodes
    // let length = cardChildren.length
    // for(let i=0;i<length;i++) {
    //   if(i%num == 0) {
    //     console.log(i,num)
    //     cardChildren[i].style.marginLeft='0px'
    //   }
    // }
  },
  methods: {
    // 定时关闭btnLoad
    setTimeCloseBtnLoad () {
      setTimeout(() => {
        this.btnLoad = false
      }, 300)
    },
    // 初始化查询参数
    initSearchCardParams () {
      this.searchCardParams.date = this.utilsGetNewDate()
      this.searchCardParams.isOrder = '0'
      this.searchCardParams.condition = ''
      this.searchCardParams.floorNo = ''
    },
    // 获取内容列表
    getCardList () {
      this.$store
        .dispatch('ReqOperationOrders', this.searchCardParams)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length === 0) {
              this.openToast('warning', '暂无数据')
            }
            this.cardList = res.data.data
          } else {
            this.openToast('error', res.data.msg)
          }
        })
    },
    // 获取同步内容列表
    getTongbuCardList () {
      let endTime = this.utilsGetNewDate()
      let obj = {
        startTime: this.searchCardParams.date,
        endTime
      }
      this.$store.dispatch('ReqsyncOperScheduleInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', res.data.data)
          this.getCardList()
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 显示修改弹窗
    changeDialogShow () {
      this.floorList = this.$store.state['operationOrders'].floor
      // 获取房间列表
      this.getRoomList()
      // 获取护士列表
      this.selectDialogVisible = true
    },
    // 获取选中的房间列表
    getRoomList () {
      let room = {
        floorNo: this.selectFloor
      }
      this.$store.dispatch('ReqgetRoomByFloor', room).then(res => {
        if (res.data.code === 200) {
          this.roomList = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 获取护士列表
    getNurseList () {
      this.$store.dispatch('ReqgetNurseDict').then(res => {
        if (res.data.code === 200) {
          this.nurseList = res.data.data
          console.log(this.nurseList)
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 显示退单弹窗
    exitDialogShow (isSend) {
      this.isSend = isSend
      this.exitdialogVisible = true
    },
    clickExitOrderTimeOut () {
      this.btnLoad = true
      this.utilsDebounce(() => {
        this.exitOrder()
      }, 300)
    },
    // 退单
    exitOrder () {
      if (this.isSend === '1') {
        let obj = {
          operSchNo: this.isSelectItem[0].operSchNo,
          cureNo: this.isSelectItem[0].cureNo,
          hospitalNo: this.isSelectItem[0].hospitalNo
          // operSchNo: 'sdfjkadcnxjkzhuierhkjsdhcakhcisdh'
        }

        this.$store.dispatch('ReqapplicationForRefund', obj).then(res => {
          this.exitdialogVisible = false

          if (res.data.code === 200) {
            this.openToast('success', '退单成功')
            this.isSelectItem = [
              { floor: '', roomNo: '', runNurseName: '', washNurseCode: '' }
            ]
            this.isSelectIndex = 0
          } else {
            this.openToast('error', res.data.msg)
          }

          this.getCardList()
          this.setTimeCloseBtnLoad()
        })
      } else {
        let obj = {
          operSchNo: this.isSelectItem[0].operSchNo
          // operSchNo: 'sdfjkadcnxjkzhuierhkjsdhcakhcisdh'
        }

        this.$store.dispatch('ReqcancelOrderAction', obj).then(res => {
          this.exitdialogVisible = false

          if (res.data.code === 200) {
            this.openToast('success', '退单成功')
            this.isSelectItem = [
              { floor: '', roomNo: '', runNurseName: '', washNurseCode: '' }
            ]
            this.isSelectIndex = 0
          } else {
            this.openToast('error', res.data.msg)
          }

          this.getCardList()
          this.setTimeCloseBtnLoad()
        })
      }
    },
    handleClose (done) {
      this.exitdialogVisible = false
    },
    handleCloseOperation () {
      this.dbdialogVisible = false
    },
    // 显示派单弹窗
    operationCard (item) {
      this.btnLoad = false
      let isSend = this.searchCardParams.isOrder
      if (isSend === '0') {
        this.dbdialogVisible = true
      } else {
        return false
      }
    },
    // 派单
    sendOrder () {
      let obj = {
        operSchNo: this.isSelectItem[0].operSchNo
      }

      this.$store.dispatch('ReqsendOrderAction', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '派单成功')
          this.isSelectIndex = 0
          this.isSelectItem = [
            { floor: '', roomNo: '', runNurseName: '', washNurseCode: '' }
          ]
        } else {
          this.openToast('error', res.data.msg)
        }
        this.dbdialogVisible = false
        this.getCardList()
        this.setTimeCloseBtnLoad()
      })
    },
    OrderMsgTipsTimeOut () {
      this.btnLoad = true
      this.utilsDebounce(() => {
        this.searchrepeatOrderMsgTips()
      }, 300)
    },
    // 判断数据是否两条派单重复提交
    searchrepeatOrderMsgTips () {
      let obj = {
        cureNo: this.isSelectItem[0].cureNo,
        hospitalNo: this.isSelectItem[0].hospitalNo
      }
      this.$store.dispatch('ReqrepeatOrderMsgTips', obj).then(res => {
        if (res.data.data === 0) {
          this.sendOrder()
        } else {
          this.$confirm('该患者已派单,是否继续派单', '重复派单提醒', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            loading: this.btnLoad,
            callback: action => {
              if (action === 'confirm') {
                this.sendOrder()
              } else {
                this.dbdialogVisible = false
                this.getCardList()
                this.setTimeCloseBtnLoad()
              }
            }
          })
        }
      })
    },

    // 点击选中一条记录
    selectItem (item) {
      this.isSelectItem = []
      this.isSelectItem.push(item)
      console.log(this.isSelectItem)
      this.isSelectIndex = item.id
      this.washNurseCode = item.washNurseCode1
      this.washNurseName = item.washNurseName1
      this.runNurseCode = item.runNurseCode1
      this.runNurseName = item.runNurseName1
      this.selectFloor = item.floor
      this.selectRoom = item.roomNo
    },
    changeInfoTimeOut () {
      this.btnLoad = true
      this.utilsDebounce(() => {
        this.changeInfo()
      }, 300)
    },
    // 点击修改
    changeInfo () {
      if (this.IsEmpty(this.selectRoom)) {
        this.openToast('error', '请选择房间号')
        this.setTimeCloseBtnLoad()
        return false
      }
      this.nurseList.forEach(item => {
        if (item.nurseCode === this.washNurseCode) {
          this.washNurseName = item.nurseName
        }
        if (item.nurseCode === this.runNurseCode) {
          this.runNurseName = item.nurseName
        }
      })
      let params = {}
      params = {
        floor: this.selectFloor,
        roomNo: this.selectRoom,
        operSchNo: this.isSelectItem[0].operSchNo,
        runNurseCode1: this.runNurseCode,
        runNurseName1: this.runNurseName,
        washNurseCode1: this.washNurseCode,
        washNurseName1: this.washNurseName
      }
      console.log(
        this.selectRoom,
        this.selectFloor,
        this.isSelectItem[0].operSchNo,
        this.washNurseName,
        this.washNurseCode,
        this.runNurseCode,
        this.runNurseName
      )
      this.$store.dispatch('ReqchangeOperScheduleInfo', params).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '修改成功')
        } else {
          this.openToast('error', res.data.msg)
        }
        this.isSelectIndex = 0
        this.isSelectItem = [
          { floor: '', roomNo: '', runNurseName: '', washNurseCode: '' }
        ]
        this.selectDialogVisible = false
        this.getCardList()
        this.setTimeCloseBtnLoad()
      })
    },
    // 清空点击选中
    clearSelect (val) {
      console.log(val)
      this.isSelectItem = [
        { floor: '', roomNo: '', runNurseName: '', washNurseCode: '' }
      ]
      this.isSelectIndex = -1
      this.searchCardParams.isOrder = val
      this.getCardList()
      this.setTimeCloseBtnLoad()
    },
    // 排班修改取消
    quxiaoPaiban () {
      this.selectFloor = this.isSelectItem[0].floor
      this.selectRoom = this.isSelectItem[0].roomNo
      this.selectDialogVisible = false
      this.setTimeCloseBtnLoad()
    },
    handleCloseRoomChange () {
      this.selectFloor = this.isSelectItem[0].floor
      this.selectRoom = this.isSelectItem[0].roomNo
      this.selectDialogVisible = false
      this.setTimeCloseBtnLoad()
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
  computed: {
    ListentingFloor () {
      return this.selectFloor
    },
    ListentingRunNurseCode () {
      return this.runNurseCode
    },
    ListentingWashNurseCode () {
      return this.washNurseCode
    }
  },
  watch: {
    ListentingFloor: function (newd) {
      if (newd !== this.isSelectItem[0].floor) {
        this.selectRoom = ''
      }
      this.getRoomList()
    },
    ListentingRunNurseCode: function (newd) {
      if (newd === '' || newd === undefined || newd === null) {
        this.runNurseName = ''
      }
    },
    ListentingWashNurseCode: function (newd) {
      if (newd === '' || newd === undefined || newd === null) {
        this.washNurseName = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.btn {
  width: 90px;
  // height: 30px;
  color: #303133;
  background-color: #e9edf7;
}
.btn:hover {
  color: #fff;
  background-color: #3478ff;
}
.mgl5 {
  margin-left: 5px;
}
.mgl10 {
  margin-left: 10px;
}
.mgl15 {
  margin-left: 15px;
}
.mgl20 {
  margin-left: 20px;
}
.mgl40 {
  margin-left: 40px !important;
}
.mgt20 {
  margin-top: 20px;
}
.mgb15 {
  margin-bottom: 15px;
}
.operation-body-container {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
  // display: flex;
  // flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(auto-fill, 262px);
  // grid-template-rows: 250px;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  width: 100%;
  .card {
    cursor: pointer;
    background-color: #fff;
    border-radius: 5px;
    width: 262px;
    height: 250px;
    // margin-bottom: 20px;
    // margin-left: 20px;
    .header {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      height: 36px;
      position: relative;
      display: flex;
      align-items: center;
      background-color: #3770e2;
      padding: 10px;
      .header-img {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 8px;
        background-color: #55deff;
        border-top-left-radius: 5px;
      }
      .fontCss {
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .body {
      padding: 15px 18px;
      .boxFlex {
        align-items: center;
        margin-bottom: 8px;
        display: flex;
        div {
          flex: 1;
          span {
            font-size: 14px;
          }
          .tltle-span {
            color: #888888;
          }
          .blue {
            color: #3478ff;
          }
          .red {
            font-weight: bold;
            color: #ff3131;
          }
        }
      }
    }
  }
}
.dialog-footer-div {
  display: flex;
  justify-content: center;
}
.dialog-body-span {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-gantanghao {
    font-size: 26px;
    width: 40px;
    color: #3377ff;
  }
}
.vxe-input.is--suffix .vxe-input--inner {
  padding-right: 0.8em;
}
.row-width {
  width: 100%;
}
.col-line {
  display: flex;
}
.col-left {
  width: 60px;
  text-align: right;
}
.active {
  background-color: #e9eff9 !important;
}
/deep/ .el-scrollbar__view {
  height: 100%;
}
.noneDate {
  text-align: center;
  font-size: 14px;
  color: #606266;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // margin-top: 15%;
  // margin-bottom: 20px
}
.text-one-row {
  overflow: hidden;
  text-overflow: ellipsis;
}
.flexNoWarp {
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mgl0 {
  margin-left: 0;
}
.tangchuChange {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
/deep/.el-dialog__header {
  border-bottom: 1px solid #ebebeb;
  padding: 10px 20px 10px;
}
/deep/.el-dialog__title {
  font-size: 16px;
  font-weight: 600;
}
/deep/ .el-dialog__headerbtn {
  top: 15px;
}
</style>
