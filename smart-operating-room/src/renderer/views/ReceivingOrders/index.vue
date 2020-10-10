<template>
  <div class="receiving-orders">
    <div class="order-option">
      <div class="option-left">
        接单中心
      </div>
      <div class="option-right">
        <el-button
          size="mini"
        >
          刷新<i class="el-icon-refresh-right" />
        </el-button>
        <span>数据更新时间: <span style="color:#388FF7;">下午3:29</span></span>
        <span>版本号:0.20.0.2015</span>
      </div>
    </div>
    <div class="order-list">
      <div class="list-option">
        <div class="lo-left">
          <span class="label">楼层</span>
          <el-radio-group
            v-model="floor"
            size="medium"
          >
            <el-radio-button label="6楼" />
            <el-radio-button label="7楼" />
            <el-radio-button label="8楼" />
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
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="lo-right">
          <span style="color:#FF8B45;">未接单 <strong>6</strong></span>
          <span style="color:#02CB4E;">进行中 <strong>19</strong></span>
          <span style="color:#3478FF;">已完成 <strong>15</strong></span>
        </div>
      </div>
      <div class="list-content">
        <div class="list-wait list-common">
          <h3
            class="title"
            style="color:#FF8B45;"
          >
            未接单<i />
            <div class="room-filter">
              <span>
                房间
              </span>
              <span>
                <em
                  class="el-icon-caret-top"
                  @click="handleSort(1)"
                />
                <em
                  class="el-icon-caret-bottom"
                  @click="handleSort(2)"
                />
              </span>
            </div>
          </h3>
          <ul>
            <li
              v-for="(item,index) in patientList"
              :key="index"
              @click="handleShowDetail(item)"
            >
              <patient-list
                v-if="item.state===1"
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
              v-for="(item,index) in processList"
              :key="index"
              @click="handleShowDetail(item)"
            >
              <patient-list
                v-if="item.state===1"
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
              v-for="(item,index) in finishList"
              :key="index "
            >
              <patient-list
                v-if="item.state===1"
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
    />
  </div>
</template>

<script>
import PatientList from './components/patient-list'
import PathologyList from './components/pathology-list'
import DetailDrawer from './components/detail-drawer'
import {receiveOrderList, floorList, roomList} from '@/api/receiving-orders'
import request from '@/utils/request'
export default {
  name: 'ReceivingOrders',
  data () {
    return {
      roomList: [],
      floorList: [],
      room: '',
      floor: '6楼',
      patientList: [
        {gender: '男', nurse: '张汉立', id: '911755436', room: '607', state: 1, name: '福田有', area: '3病区', dept: '泌尿科', opeDoc: '方祖军 郑洁', opeName: '右-输尿管镜下取石术-(软镜备球囊扩张)；输尿管镜下激；输尿管镜下激；输尿管镜下激'},
        {gender: '女', nurse: '李丽', id: '911755533', room: '606', state: 1, name: '王君如', area: '3病区', dept: '妇科', opeDoc: '张琪', opeName: '左子宫切除术'},
        {state: 2, name: '袁潇梅', gender: '女', bed: '12床', id: '91175539', room: '601', locate: '6号楼手术室607', opeDoc: '王能祥', time1: '2020-9-25 08:54', time2: '2020-9-25 09:00'}
      ],
      finishList: [
        {gender: '女', nurse: '王芳', id: '911755452', room: '602', state: 1, name: '刘晓茹', area: '2病区', dept: '泌尿科', opeDoc: '郑洁', opeName: '输尿管镜下激'},
        {state: 2, name: '曹芳', gender: '女', bed: '13床', id: '91175755', room: '601', locate: '6号楼手术室608', opeDoc: '郝军', time1: '2020-9-24 09:26', time2: '2020-9-25 10:00'}
      ],
      processList: [
        {gender: '男', nurse: '汪琴', id: '911755439', room: '608', state: 1, name: '章强', area: '3病区', dept: '泌尿科', opeDoc: '方祖军 郑洁', opeName: '软镜备球囊扩张'},
        {state: 2, name: '李平', gender: '女', bed: '13床', id: '91175539', room: '601', locate: '6号楼手术室607', opeDoc: '王能祥', time1: '2020-9-25 08:54', time2: '2020-9-25 09:00'}
      ],
      detailVisible: false,
      detailStatus: null
    }
  },
  components: {
    PatientList, PathologyList, DetailDrawer
  },
  methods: {
    getFloorList () {
      request({
        url: floorList,
        method: 'get'
      }).then(res => {
        this.floorList = res.data.data
      })
    },
    getRoomList () {
      request({
        url: roomList,
        method: 'get',
        params: {
          floorNo: this.floor
        }
      }).then(res => {
        this.roomList = res.data.data
      })
    },
    getReceiveOrders () {
      request({
        url: receiveOrderList,
        method: 'post',
        data: {
          floor: this.floor,
          roomNo: this.room
        }
      }).then(res => {

      })
    },
    handleSort (param) {
      console.log(param)
    },
    handleShowDetail (item) {
      this.detailVisible = true
      this.detailStatus = item.state
    },
    handleClose () {
      this.detailVisible = false
    }
  },
  mounted () {
    // this.getRoomList()
    this.getFloorList()
    // this.getReceiveOrders()
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
</style>>
