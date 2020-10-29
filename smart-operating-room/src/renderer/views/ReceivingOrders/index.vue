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
        <span>数据更新时间: <span style="color:#388FF7;">{{ time }}</span></span>
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
          >手术间</span>
          <el-select
            v-model="room"
            placeholder="请选择"
            size="medium"
          >
            <el-option
              v-for="item in roomList"
              :key="item.roomCode"
              :label="item.label"
              :value="item.roomCode"
            />
          </el-select>
        </div>
        <div class="lo-right">
          <span style="color:#FF8B45;">未接单 <strong>{{ receivedOrderCount || 0 }}</strong></span>
          <span style="color:#02CB4E;">进行中 <strong>{{ haveInHandOrderCount || 0 }}</strong></span>
          <span style="color:#3478FF;">已完成 <strong>{{ completeOrderCount || 0 }}</strong></span>
        </div>
      </div>
      <div class="list-content">
        <div class="list-wait list-common">
          <h3
            class="title"
            style="color:#FF8B45;"
          >
            未接单<i />
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
                  :class="{'blue': selectOrder === '1' ? true : false}"
                />
                <em
                  class="el-icon-caret-bottom"
                  :class="{'blue': selectOrder === '2' ? true : false}"
                />
              </span>
            </div>
          </h3>
          <ul>
            <li
              v-for="(item,index) in receivedOrder"
              :key="index"
              @click="handleShowDetail(item)"
            >
              <patient-list
                v-if="item.orderType===0"
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
            进行中<i />
          </h3>
          <ul>
            <li
              v-for="(item,index) in haveInHandOrder"
              :key="index"
              @click="handleShowDetail(item)"
            >
              <patient-list
                v-if="item.orderType===0"
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
            已完成<i />
          </h3>
          <ul>
            <li
              v-for="(item,index) in completeOrder"
              :key="index "
            >
              <patient-list
                v-if="item.orderType===0"
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
import PatientList from './components/patient-list'
import Bus from '@/utils/bus.js'
import PathologyList from './components/pathology-list'
import DetailDrawer from './components/detail-drawer'
import {receiveOrderList, floorList, roomList} from '@/api/receiving-orders'
import request from '@/utils/request'
export default {
  name: 'ReceivingOrders',
  data () {
    return {
      time: '',
      selectOrder: '1',
      roomList: [],
      floorList: [],
      room: '',
      floor: '',
      receivedOrder: [

      ],
      receivedOrderCount: 0,

      haveInHandOrder: [

      ],
      haveInHandOrderCount: 0,
      completeOrder: [

      ],
      completeOrderCount: 0,
      detailVisible: false,
      detailStatus: null,
      selectRow: {}
    }
  },
  components: {
    PatientList, PathologyList, DetailDrawer
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

    // 点击切换楼层列表
    changeFloor () {
      this.getRoomList()
    },
    // 获取房间列表
    getRoomList () {
      this.room = ''
      let text = this.floor.replace(/楼/ig, '')
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

        this.roomList.unshift({roomCode: '', label: '全部'})
        if (this.roomList.length > 0) {
          this.room = this.roomList[0].roomCode
          this.getReceiveOrders()
        } else {
          this.openToast('warning', '暂无房间信息')
        }
      })
    },

    // 获取表单
    getReceiveOrders () {
      let text = this.floor.replace(/楼/ig, '')

      request({
        url: receiveOrderList,
        method: 'post',
        data: {
          floor: text,
          roomNo: this.room,
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
        this.time = this.time.replace(/am/ig, '上午')
      }
      if (this.time.includes('pm')) {
        this.time = this.time.replace(/pm/ig, '下午')
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
    }
  },
  mounted () {
    this.getNewTime()
    this.getFloorList()
    Bus.$on('shuaxinPatient', res => {
      this.detailVisible = false
      this.utilsDebounce(() => { this.getReceiveOrders() }, 1000)
    })
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
  }
}
</script>

<style lang="scss" scoped>
  .receiving-orders{
    height: 100%;
    .order-option{
      display: flex;
      justify-content: space-between;
      height: 56px;
      line-height: 56px;
      background: #ffffff;
      padding: 0 20px;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      .option-left{
        color:#444444;
      }
    }
    .order-list{
      margin-top: 20px;
      padding: 20px;
      height: calc(100% - 76px);
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 26, 51, 0.05);
      border-radius: 5px;
      .list-option{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .lo-left{
          font-size: 18px;
          .label{
            color: #929498;
            margin-right: 14px;
          }
        }
        .lo-right{
          font-size: 20px;
          line-height: 36px;
          span{
            &:first-child,&:nth-child(2){
              margin-right: 14px;
            }
          }
          strong{
            color: #444444;
          }
        }
      }
      .list-content{
        margin-top: 20px;
        height: calc(100% - 76px);
        display: flex;
        // display: grid;
        // grid-template-columns: 1fr 1fr 1fr;
        .list-wait{
          flex: 1;
          .room-filter{
            position:absolute;
            text-indent: 9px;
            color: #444444;
            right: 20px;
            top:0;
            bottom:0;
            margin:auto;
            width: 70px;
            height: 32px;
            line-height: 32px;
            font-size: 18px;
            background: #F4F7FD;
            border: 1px solid #E5E5E5;
            border-radius: 3px;
            display: flex;
            span{
              &:last-child{
                margin-left: 4px;
                display: flex;
                text-indent:0;
                flex-direction: column;
                justify-content: center;
                em{
                  font-size: 16px;
                  color: #D3D8E1;
                  cursor: pointer;
                  width: 15px;
                  height: 15px;
                  &:last-child{
                    margin-top:-5px;
                  }
                }
              }
            }
          }
        }
        .list-process{
          flex: 1;
          margin:0 20px;
        }
        .list-finish{
          flex: 1;
        }
        .list-common{
          background: #FFFFFF;
          box-shadow: 0px 0px 5px 0px rgba(5, 26, 51, 0.15);
          border-radius: 10px;
          // width: 100%;
          height: 100%;
          .title{
            line-height: 58px;
            text-indent: 34px;
            position: relative;
            font-size: 20px;
            border-bottom: 1px solid #E9ECF4;
            font-weight: unset;
            i{
              position: absolute;
              width: 4px;
              height: 18px;
              background: #3478FF;
              border-radius: 2px;
              left:20px;
              top:0;
              bottom:0;
              margin:auto;
            }
          }
          ul{
            overflow-y: auto;
            padding: 0 20px;
            padding-bottom: 10px;
            height: calc(100% - 58px);
            &::-webkit-scrollbar{
              display: none;
            }
            li{
              // width: 512px;
              margin:0 auto;
              height: 110px;
              background: #F4F7FD;
              border-radius: 5px;
              margin-top: 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
.blue{
  color: #3478FF !important;
}
</style>>
