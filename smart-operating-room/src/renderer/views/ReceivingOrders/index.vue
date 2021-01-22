<template>
  <div class="receiving-orders">
    <div class="order-option">
      <div class="option-left">
        接单中心
      </div>
      <div class="option-right">
        <el-button
          @click="shuaxin"
          size="mini"
        >
          刷新<i class="el-icon-refresh-right" />
        </el-button>
        <span
          style="vertical-align:middle;margin-left:18px;"
        >数据更新时间:
          <span style="color:#388FF7;font-weight:600;">{{ time }}</span></span>
      </div>
    </div>
    <div class="order-list">
      <div class="list-option">
        <div class="lo-left">
          <span class="label">楼层</span>
          <el-radio-group
            @change="changeFloor"
            v-model="floor"
            size="medium"
          >
            <el-radio-button
              :label="item.floorName"
              v-for="item in floorList"
              :key="item.id"
            />
          </el-radio-group>
          <span
            class="label"
            style="margin-left:34px;"
          >手术房间</span>
          <el-radio-group
            v-model="room"
            size="medium"
          >
            <el-radio-button
              :label="item.label"
              v-for="item in roomList"
              :key="item.roomCode"
            />
          </el-radio-group>
        </div>
        <div class="lo-right">
          <span
            style="color:#FF8B45;"
          >未接单 <strong>{{ receivedOrderCount || 0 }}</strong></span>
          <span
            style="color:#02CB4E;"
          >进行中 <strong>{{ haveInHandOrderCount || 0 }}</strong></span>
          <span
            style="color:#3478FF;"
          >已完成 <strong>{{ completeOrderCount || 0 }}</strong></span>
        </div>
      </div>
      <div class="list-content">
        <div class="list-wait list-common">
          <h3
            class="title"
            style="color:#FF8B45;"
          >
            <span>未接单</span><i />
            <div
              class="room-filter"
              @click="handleSort"
            >
              <span style="cursor: pointer;">
                房间
              </span>
              <span>
                <em
                  class="el-icon-caret-top"
                  :class="{ blue: selectOrder === '1' ? true : false }"
                />
                <em
                  class="el-icon-caret-bottom"
                  :class="{ blue: selectOrder === '2' ? true : false }"
                />
              </span>
            </div>
          </h3>
          <ul>
            <li
              v-for="(item, index) in receivedOrder"
              :key="index"
              @click="handleShowDetail(item)"
            >
              <patient-list
                v-if="item.orderType === 0"
                :pt-data="item"
              />
              <pathology-list
                v-else
                :pt-data="item"
              />
            </li>
          </ul>
        </div>
        <div class="list-process list-common">
          <h3
            class="title"
            style="color:#01CB4D;"
          >
            <span>进行中</span><i />
          </h3>
          <ul>
            <li
              v-for="(item, index) in haveInHandOrder"
              :key="index"
              @click="handleShowDetail(item)"
            >
              <patient-list
                v-if="item.orderType === 0"
                :pt-data="item"
              />
              <pathology-list
                v-else
                :pt-data="item"
              />
            </li>
          </ul>
        </div>
        <div class="list-finish list-common">
          <h3
            class="title"
            style="color:#3478FF;"
          >
            <span>已完成</span><i />
          </h3>
          <ul>
            <li
              v-for="(item, index) in completeOrder"
              :key="index"
            >
              <patient-list
                v-if="item.orderType === 0"
                :pt-data="item"
              />
              <pathology-list
                v-else
                :pt-data="item"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <detail-drawer
      v-if="detailVisible"
      :detail-visible="detailVisible"
      @handleClose="handleClose"
      :detail-status="detailStatus"
      :select-row="selectRow"
    />
  </div>
</template>

<script>
import io from 'socket.io-client'
import PatientList from './components/patient-list'
import Bus from '@/utils/bus.js'
import PathologyList from './components/pathology-list'
import DetailDrawer from './components/detail-drawer'
import {getLargeScreenTheme, setLargeScreenTheme} from '@/utils/storage'
import { receiveOrderList, floorList, roomList } from '@/api/receiving-orders'
import request from '@/utils/request2'
const config = require('@/config/url.js')
const { BrowserWindow } = require('electron').remote
export default {
  name: 'ReceivingOrders',
  data () {
    return {
      socket: '',
      time: '',
      selectOrder: '1',
      roomList: [],
      floorList: [],
      room: '',
      floor: '',
      receivedOrder: [],
      receivedOrderCount: 0,
      haveInHandOrder: [],
      haveInHandOrderCount: 0,
      completeOrder: [],
      completeOrderCount: 0,
      detailVisible: false,
      detailStatus: null,
      selectRow: {}
    }
  },
  components: {
    PatientList,
    PathologyList,
    DetailDrawer
  },
  created () {
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      win.maximize()
    }
    this.setTheme()
  },
  methods: {
    // 获取楼层列表
    getFloorList () {
      this.floor = ''
      request({
        url: floorList,
        method: 'get'
      }).then(res => {
        this.floorList = res.data.data
        if (this.floorList.length > 0) {
          this.floor = this.floorList[0].floorName
          this.getRoomList()
        } else {
          this.openToast('warning', '暂无楼层信息')
        }
      })
    },
    initSocket () {
      if (this.socket) {
        this.socket = null
      }

      this.socket = io(config.default.api.socketURL, {
        query: 'sendName=' + 'ReceivingOrders'
      })
      this.socket.on('connect', () => {
        console.log('socket.io connected')
        this.connect = true
      })
      this.socket.on('reconnect_error', e => {
        console.error(e)
      })
      this.socket.on('disconnect', () => {
        console.log('socket.io disconnect')
        this.connect = false
      })
      this.socket.on('push_event_all', data => {
        if (data) {
          console.log(data)
          if (
            this.detailVisible === true &&
            this.selectRow.hospitalNo === data.object.hospitalNo
          ) {
            if (data.object.state === 1) {
              this.selectRow.orderState = 1
              this.openToast(
                'success',
                '订单已接单，可进行打印手术通知单或瓶贴'
              )
            } else {
              this.detailVisible = false
              this.openToast('warning', '该订单状态已改变，请重新选择')
            }
          }
          this.shuaxin()
          // let arr = []
          // this.socket.emit('text', arr)
        }
      })
      this.socket.on('push_event_screen', data => {})
    },
    // 点击切换楼层列表
    changeFloor () {
      this.getRoomList()
    },
    // 获取房间列表
    getRoomList () {
      this.room = ''
      let text = this.floor.replace(/楼/gi, '')
      request({
        url: roomList,
        method: 'get',
        params: {
          floorNo: text
        }
      }).then(res => {
        this.roomList = res.data.data
        this.roomList.forEach(item => {
          item.label = item.roomCode
        })
        this.roomList.unshift({ roomCode: '', label: '全部' })
        if (this.roomList.length > 0) {
          this.room = this.roomList[0].label
          this.getReceiveOrders()
        } else {
          this.openToast('warning', '暂无房间信息')
        }
      })
    },

    // 获取表单
    getReceiveOrders () {
      let text = this.floor.replace(/楼/gi, '')
      let room = ''
      if (this.room === '全部') {
        room = ''
      } else {
        room = this.room
      }
      request({
        url: receiveOrderList,
        method: 'post',
        data: {
          floor: text,
          roomNo: room,
          sort: this.selectOrder
        }
      }).then(res => {
        if (res.data.code === 200) {
          let arrList = res.data.data
          this.receivedOrderCount = arrList.receivedOrderCount
          this.haveInHandOrderCount = arrList.haveInHandOrderCount
          this.completeOrderCount = arrList.completeOrderCount
          this.receivedOrder = arrList.receivedOrder
          this.haveInHandOrder = arrList.haveInHandOrder
          this.completeOrder = arrList.completeOrder
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    handleSort () {
      if (this.selectOrder === '1') {
        this.selectOrder = '2'
      } else {
        this.selectOrder = '1'
      }
      this.getReceiveOrders()
    },
    handleShowDetail (item) {
      this.detailVisible = true
      this.detailStatus = item.orderType
      this.selectRow = item
    },
    handleClose () {
      this.detailVisible = false
    },
    // 点击刷新
    shuaxin () {
      this.getReceiveOrders()
      this.getNewTime()
    },
    // 获取当前时间
    getNewTime () {
      this.time = this.Moment().format('a h:mm:ss')
      console.log(this.time)
      if (this.time.includes('am')) {
        this.time = this.time.replace(/am/gi, '上午')
      }
      if (this.time.includes('pm')) {
        this.time = this.time.replace(/pm/gi, '下午')
      }
    },
    // 提示方法
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: 3000
      })
    },
    setTheme () {
      let theme = getLargeScreenTheme()
      let type = 'dark'
      if (theme) {
        type = theme
      }
      window.document.documentElement.setAttribute('theme', type)
    },
    changeTheme () {
      let theme = getLargeScreenTheme()
      let type = 'light'
      if (theme) {
        if (theme === 'dark') {
          type = 'light'
        } else {
          type = 'dark'
        }
      } else {
        type = 'dark'
      }
      setLargeScreenTheme(type)
      window.document.documentElement.setAttribute('theme', type)
    }
  },
  mounted () {
    this.getNewTime()
    this.getFloorList()
    Bus.$on('shuaxinPatient', res => {
      this.detailVisible = false
      this.utilsDebounce(() => {
        this.getReceiveOrders()
      }, 1000)
    })
    this.initSocket()
  },
  computed: {
    // 监听房间切换
    ListeningRoom () {
      return this.room
    }
  },
  watch: {
    ListeningRoom: function (newd, oldV) {
      if (!this.IsEmpty(newd)) {
        this.getReceiveOrders()
      }
    }
  },
  beforeDestroy () {
    this.socket = null
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/themes';
.receiving-orders {
  height: 100%;
  .order-option {
    display: flex;
    justify-content: space-between;
    height: 56px;
    line-height: 56px;
    @include theme-property('background-color',background_color_primary);
    padding: 0 20px;
    @include theme-property('box-shadow',box_color_shadow);
    border-radius: 5px;
    .option-left {
      @include theme-property('color',font_color_title);
      font-weight: 600;
    }
  }
  .order-list {
    margin-top: 20px;
    padding: 20px;
    height: calc(100% - 76px);
    @include theme-property('background-color',background_color_primary);
    @include theme-property('box-shadow',box_color_shadow);
    border-radius: 5px;
    .list-option {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        @include theme-property('background-color',font_color_primary);
        @include theme-property('border-color',font_color_primary);
      }
      .lo-left {
        font-size: 18px;
        line-height: 36px;
        .label {
          color: #929498;
          margin-right: 14px;
        }
      }
      .lo-right {
        font-size: 20px;
        line-height: 36px;
        span {
          &:first-child,
          &:nth-child(2) {
            margin-right: 14px;
          }
        }
        strong {
          color: #444444;
        }
      }
    }
    .list-content {
      margin-top: 20px;
      height: calc(100% - 76px);
      display: flex;
      // display: grid;
      // grid-template-columns: 1fr 1fr 1fr;
      .list-wait {
        flex: 1;
        .room-filter {
          position: absolute;
          font-weight: lighter;
          text-indent: 9px;
          color: #444444;
          right: 20px;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 70px;
          height: 32px;
          line-height: 32px;
          font-size: 18px;
          background: #f4f7fd;
          border: 1px solid #e5e5e5;
          border-radius: 3px;
          display: flex;
          span {
            &:last-child {
              margin-left: 4px;
              display: flex;
              text-indent: 0;
              flex-direction: column;
              justify-content: center;
              em {
                font-size: 16px;
                color: #d3d8e1;
                cursor: pointer;
                width: 15px;
                height: 15px;
                &:last-child {
                  margin-top: -5px;
                }
              }
            }
          }
        }
      }
      .list-process {
        flex: 1;
        margin: 0 20px;
      }
      .list-finish {
        flex: 1;
      }
      .list-common {
        @include theme-property('background-color',background_color_secondary);
        @include theme-property('box-shadow',box_color_shadow);
        border-radius: 10px;
        // width: 100%;
        height: 100%;
        .title {
          line-height: 58px;
          text-indent: 34px;
          position: relative;
          font-size: 20px;
          border-bottom: 1px solid #e9ecf4;
          @include theme-property('border-bottom-color',border_color_info);
          vertical-align: middle;
          span {
            vertical-align: center;
          }
          i {
            position: absolute;
            vertical-align: middle;
            width: 4px;
            height: 18px;
            background: #3478ff;
            border-radius: 2px;
            left: 20px;
            top: 0;
            bottom: 0;
            margin: auto;
          }
        }
        ul {
          overflow-y: auto;
          padding: 0 20px;
          padding-bottom: 10px;
          height: calc(100% - 58px);
          &::-webkit-scrollbar {
            display: none;
          }
          li {
            margin: 0 auto;
            height: 110px;
            @include theme-property('background-color',background_color_info_item);
            border-radius: 5px;
            margin-top: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.blue {
  color: #3478ff !important;
}
/deep/ .vxe-button--content,
.vxe-button--icon,
.vxe-button--loading-icon {
  vertical-align: unset;
}</style
>>
