<template>
  <div class="device-select">
    <div class="content">
      <table cellspacing="0">
        <thead>
          <tr>
            <th
              v-for="(item,index) in 14"
              :key="'item'+index"
            />
            <div style="width:17px;height:100%;" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in deviceList"
            :key="'tr'+index"
          >
            <td>
              {{ item.position }}
            </td>
            <td
              v-for="(_item,i) in item.list"
              :key="'td'+i"
              @dblclick="handleChangePosition(_item)"
              :class="_item.status==='1'?'bg-sq':_item.status==='2'?'bg-rssj':_item.status==='3'?'bg-ssks':_item.status==='4'?'ssjs': _item.status==='5'?'ssjs':'cssj'"
            >
              <el-popover
                placement="top-start"
                width="370"
                :open-delay="2000"
                trigger="hover"
              >
                <!-- trigger="hover" -->
                <div class="popover-detail">
                  <div class="title">
                    <span>{{ _item.name }}</span>
                    <span />
                  </div>
                  <div class="content">
                    <ul>
                      <li>
                        <span>
                          <span class="detail-label">设备名称：</span>
                          <span class="detail-value">{{ _item.name }}</span>
                        </span>
                        <span>
                          <span class="detail-label">序列号：</span>
                          <span class="detail-value">{{ _item.serialNo }}</span>
                        </span>
                      </li>
                      <li>
                        <span>
                          <span class="detail-label">设备位置：</span>
                          <span class="detail-value">{{ _item.position }}</span>
                        </span>
                        <span>
                          <span class="detail-label">设备状态：</span>
                          <span class="detail-value">{{ _item.status }}</span>
                        </span>
                      </li>
                      <li>
                        <span>
                          <span class="detail-label">设备编号：</span>
                          <span class="detail-value">{{ item.deviceNo }}</span>
                        </span>
                        <span>
                          <span class="detail-label">设备状态：</span>
                          <span class="detail-value">{{ item.status }}</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <span
                  slot="reference"
                  class="td-content"
                >
                  <b>
                    {{ _item.name }}
                  </b>
                  <b>
                    {{ _item.model }}
                  </b>
                </span>
              </el-popover>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bottom">
      <span>说明：</span>
      <span>
        <span
          class="step-description"
          style="background: #96D6FA;"
        />
        <span>术前</span>
      </span>
      <span>
        <span
          class="step-description"
          style="background: #FFE066;"
        />
        <span>入手术间</span>
      </span>
      <span>
        <span
          class="step-description"
          style="background: #7BE6B7;"
        />
        <span>手术开始</span>
      </span>
      <span>
        <span
          class="step-description"
          style="background: #FF9F9F;"
        />
        <span>手术结束</span>
      </span>
      <span>
        <span
          class="step-description"
          style="background: #83C0FF;"
        />
        <span>出手术间</span>
      </span>
    </div>
    <DevicePosition
      v-if="deviceVisible"
      @handleClose="handleClose"
      :device-visible="deviceVisible"
      :device-position="devicePosition"
    />
  </div>
</template>

<script>
import DevicePosition from './components/device-position'
import {getDeviceData, getDict} from '@/api/device'
import request from '@/utils/request'
export default {
  name: 'DeviceSelect',
  data () {
    return {
      deviceVisible: false,
      deviceList: [],
      positionList: [],
      devicePosition: null
      // visible: true
    }
  },
  components: {DevicePosition},
  methods: {
    handleClose () {
      this.deviceVisible = false
    },
    handleChangePosition (_item) {
      this.deviceVisible = true
      this.devicePosition = _item
    },
    initData () {
      for (let i = 0; i < 14; i++) {
        let arr = []
        for (let j = 0; j < 13; j++) {
          arr.push({deviceNo: '', id: '', model: '', name: '', position: '', serialNo: '', status: ''})
        }
        this.deviceList.push({position: '', list: arr})
      }
    },
    getDevicePosition () {
      request(
        {
          method: 'get',
          url: getDict + '/' + 'POSITION'
        }).then(res => {
        this.positionList = res.data.data
      })
    },
    getDeviceData () {
      request({
        method: 'get',
        url: getDeviceData
      }).then(res => {
        let data = res.data.data
        let arr = []
        for (let i in data) {
          arr.push({position: i, list: data[i]})
        }
        for (var i = 0; i < arr.length; i++) {
          this.deviceList[i].position = arr[i].position
          for (var j = 0; j < arr[i].list.length; j++) {
            this.deviceList[i].list[j].deviceNo = arr[i].list[j].deviceNo
            this.deviceList[i].list[j].id = arr[i].list[j].id
            this.deviceList[i].list[j].model = arr[i].list[j].model
            this.deviceList[i].list[j].name = arr[i].list[j].name
            this.deviceList[i].list[j].position = arr[i].list[j].position
            this.deviceList[i].list[j].serialNo = arr[i].list[j].serialNo
            this.deviceList[i].list[j].status = arr[i].list[j].status
          }
        }
        // this.deviceList = arr
      })
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.getDevicePosition()
    this.getDeviceData()
    // this.getDeviceData()
  }
}
</script>

<style lang="scss" scoped>
.device-select{
  // display: flex;
  height: 100%;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
  border-radius: 5px;
  // flex-direction: column;
  .content{
    flex: 1;
    height: calc(100% - 40px);
    table{
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      font-size: 14px;
      thead{
        width: 100%;
        tr{
          th{
            height: 30px;
            border-right: 1px solid #EBEBEB;
            background: #CFD6E4;
            width: 120px;
            &:last-child{
              border-right: unset;
            }
          }
        }
      }
      tbody{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        tr{
          td{
            height: 55px;
            width: 120px;
            border-right: 1px solid #EBEBEB;
            border-bottom: 1px solid #EBEBEB;
            color: #444444;
            padding-left: 10px;
            span{
              display: inline-block;
              max-width: 80px;
            }
            .td-content{
              cursor: pointer;
            }
            &:first-child{
              background: #9CAFD4;
              text-align: center;
              color: #FFFFFF;
              padding-left: unset;
            }
            &.bg-sq{
              background: #96D6FA;
            }
            &.bg-rssj{
              background: #FFE066;
            }
            &.bg-ssks{
              background: #7BE6B7;
            }
            &.bg-ssjs{
              background: #FF9F9F;
            }
            &.bg-cssj{
              background: #83C0FF;
            }
          }
        }
      }
    }
  }
  .bottom{
    // flex: 1;
    height: 40px;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    span>span{
      vertical-align: middle;
      margin-right: unset;
    }
    span{
      margin-right: 20px;
    }
    .step-description{
      width: 36px;
      height: 20px;
      display: inline-block;
    }
  }
}
</style>
<style lang="scss">
  .popover-detail{
      .title{
        display: flex;
        background: #3377FF;
        border-radius: 20px 0px 0px 0px;
        span{
          line-height: 30px;
          &:first-child{
            flex: 0.4;
            background: #3377FF;
            border-radius: 20px 0px 0px 0px;
            color: #ffffff;
            padding-left: 20px;
          }
          &:last-child{
            flex: 0.6;
            background: #EAF0FA;
            border-radius: 25px 0px 0px 0px;
          }
        }
      }
      .content{
        ul{
          li{
            display: flex;
            span{
              flex: 1;
              display: inline-block;
            }
            .detail-label{
              color: #3377FF;
              line-height: 24px;
            }
            .detail-value{
              line-height: 24px;
              color: #444444;
            }
          }
        }
      }
    }
</style>
