<template>
  <div class="record2">
    <van-nav-bar
      title="手术物品清点与核对"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
    >
    </van-nav-bar>
    <PatientCard :radius="true"></PatientCard>
    <div class="list">
      <h3>手术病人护理记录单(三)</h3>
      <ul>
        <li @click="handleJump('basic')">
          <div class="li-left">
            <van-icon name="todo-list-o"/>
          </div>
          <div class="li-right">
            <p>手术敷料、基本器械、物品清点</p>
            <p>{{stepList.ordinaryProgres}}</p>
          </div>
        </li>
        <li @click="handleJump('special')">
          <div class="li-left">
            <van-icon name="edit"/>
          </div>
          <div class="li-right">
            <p>器械包清点</p>
            <p>{{stepList.specialProgres}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PatientCard from '@/components/PatientCard'
// savePackageData
import {getPackage, getPackageData, getDeviceStep} from '@/api/device-package'
import request from '@/utils/request'
import {mapState} from 'vuex'
export default {
  name: 'Record3',
  data () {
    return {
      checked: true,
      input: '',
      showDialog: false,
      showFullSkin: false,
      value1: '',
      option: [
        { text: 'PACU', value: 0 },
        { text: '病房', value: 1 },
        { text: 'ICU病房', value: 2 },
        { text: '急诊', value: 3 },
        { text: '离院', value: 4 }
      ],
      result: [],
      stepList: {
        ordinaryProgres: '未清点',
        specialProgres: '未清点'
      }
    }
  },
  components: {
    PatientCard
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getStep () {
      request({
        method: 'get',
        url: getDeviceStep + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}/${this.patientInfo.operSchNo}`
      }).then(res => {
        this.stepList = res.data.data
      })
    },
    // 弃用
    getData () {
      let deviceId = '123456'
      request({
        method: 'get',
        url: getPackage + '/' + deviceId
      }).then(res => {
        console.log(res.data.data)
      })
    },
    getPackageList () {
      request({
        method: 'get',
        url: getPackageData + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}/${this.patientInfo.operSchNo}`
      }).then(res => {
        console.log(res.data.data)
      })
    },
    onClickRight () {

    },
    handleJump (param) {
      if (param === 'basic') {
        this.$router.push({path: '/device-basic'})
      } else {
        this.$router.push({path: '/device-special'})
      }
    },
    handleChange () {
      this.showFullSkin = !this.showFullSkin
    },
    handleShowDialog () {
      this.showDialog = true
    }
  },
  mounted () {
    // this.getData()
    this.getStep()
  }
}
</script>

<style lang="scss" scoped>
  @import "@/themes/_handle.scss";
  .record2{
    height: 100%;
    .van-nav-bar{
      height: 100px;
      background: linear-gradient(90deg, #666666, #303030);
      /deep/ .van-nav-bar__title{
        font-size: 34px;
        line-height: 100px;
      }
      /deep/ .van-nav-bar__text{
        font-size: 30px;
      }
      /deep/ .van-icon-arrow-left{
        font-size: 36px;
      }
    }
    .patient-card{
      padding: 15px 20px;
      .content{
        display: flex;
        height: 194px;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        box-sizing: border-box;
        overflow: hidden;
        .left{
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            width: 140px;
            height: 80px;
            background: #3478FF;
            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
            border-radius: 0px 40px 40px 0px;
            line-height: 80px;
            text-align: center;
            font-size: 42px;
            font-weight: bold;
            color: #ffffff;
          }
        }
        .right{
          flex: 1;
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p{
            font-size: 26px;
            color: #7F7F7F;
            &:nth-child(1){
              font-size: 30px;
              color: #2E2E2E;
            }
            &:nth-child(2){
              margin:30px 0;
            }
          }
        }
      }
    }
    .list{
      height:calc(100% - 324px);
      overflow-y: auto;
      h3{
        text-align: center;
        @include font_color('font_color_third');
        font-size: 30px;
        padding: 15px 0 10px;
      }
      ul{
        padding:20px 15px 0;
        li{
          // background: #FFFFFF;
          @include background_color('bg_home');
          box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.15);
          border-radius: 10px;
          height: 120px;
          margin-bottom:20px;
          display: flex;
          .li-left{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            .van-icon{
              font-size: 60px;
              @include font_color('font_color_primary');
            }
            .van-image{
              width: 80px;
              height: 80px;
              border-radius: 50%;
              overflow: hidden;
              img{
                border-radius: 50%;
                // width: 100%;
                // height: 100%;
              }
            }
          }
          .li-right{
            display: flex;
            flex-direction: column;
            justify-content: center;
            p{
              &:first-child{
                @include font_color('bg_popup_title');
                font-size: 30px;
              }
              &:last-child{
                @include font_color('font_color_secound');
                margin-top: 20px;
                font-size: 26px;
              }
            }
          }
        }
      }
    }
    .van-overlay{
      background-color: rgba(0,0,0,0.5);
    }
  }
</style>
