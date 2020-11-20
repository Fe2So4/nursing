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
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in 14"
            :key="'tr'+index"
          >
            <td>
              307
            </td>
            <td
              v-for="(_item,i) in 13"
              :key="'td'+i"
              :class="i%2===0?'bg-sq':i%3===0?'bg-ssks':'bg-ssjs'"
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
                    <span>爱尔博(泌尿)</span>
                    <span />
                  </div>
                  <div class="content">
                    <ul>
                      <li>
                        <span>
                          <span class="detail-label">设备名称：</span>
                          <span class="detail-value">1</span>
                        </span>
                        <span>
                          <span class="detail-label">序列号：</span>
                          <span class="detail-value">2</span>
                        </span>
                      </li>
                      <li>
                        <span>
                          <span class="detail-label">设备位置：</span>
                          <span class="detail-value">2</span>
                        </span>
                        <span>
                          <span class="detail-label">设备状态：</span>
                          <span class="detail-value">2</span>
                        </span>
                      </li>
                      <li>
                        <span>
                          <span class="detail-label">设备编号：</span>
                          <span class="detail-value">2</span>
                        </span>
                        <span>
                          <span class="detail-label">设备状态：</span>
                          <span class="detail-value">3</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <span
                  slot="reference"
                  class="td-content"
                >
                  {{ '能来平台Triad'+i }}
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
      @handleClose="handleClose"
      :device-visible="deviceVisible"
    />
  </div>
</template>

<script>
import DevicePosition from './components/device-position'
import {getDeviceData} from '@/api/device'
import request from '@/utils/request'
export default {
  name: 'DeviceSelect',
  data () {
    return {
      deviceVisible: false,
      deviceList: []
      // visible: true
    }
  },
  components: {DevicePosition},
  methods: {
    handleClose () {
      this.deviceVisible = false
    },
    getDeviceData () {
      request({
        methods: 'get',
        url: getDeviceData
      }).then(res => {
        let data = res.data.data
        for (let i in data) {
          console.log(i, data[i])
        }
        this.deviceList = data
      })
    }
  },
  created () {
    this.getDeviceData()
  },
  mounted () {
    // this.getDeviceData()
  }
}
</script>

<style lang="scss" scoped>
.device-select{
  display: flex;
  height: 100%;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
  border-radius: 5px;
  flex-direction: column;
  .content{
    table{
      width: 100%;
      font-size: 14px;
      thead{
        width: 100%;
        tr{
          th{
            height: 30px;
            border-right: 1px solid #EBEBEB;
            background: #CFD6E4;
            width: 120px;
          }
        }
      }
      tbody{
        width: 100%;
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
    flex: 1;
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
