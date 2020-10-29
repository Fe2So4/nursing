<template>
  <div class="home">
    <van-nav-bar
      title="手术室移动工作平台"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="wap-nav" slot="left" size="34" color="#ffffff"/>
      <van-icon name="exchange" slot="right" size="34" color="#ffffff"/>
    </van-nav-bar>
    <div class="list">
      <ul>
        <li @keyup.enter.native="handleJump">
          <div class="li-left">
            <van-image :src="avater" />
          </div>
          <div class="li-right">
            <p>{{opePeopleInfo.userName}}</p>
            <p>手术室-复旦大学附属华山医院</p>
          </div>
        </li>
      </ul>
    </div>
    <Loading v-show="showLoading"/>
  </div>
</template>

<script>
import request from '../../utils/request'
import {getPatientInfo, bindingPatPushScreen} from '@/api/patient-info'
import Loading from '@/components/Loading'
// import {getOpePeople} from '@/api/device-package'
import def from '@/assets/def.png'
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      cureNo: '1010',
      avater: def,
      showLoading: false
    }
  },
  computed: {
    ...mapState('Patient', ['opePeopleInfo'])
  },
  components: {
    Loading
  },
  methods: {
    ...mapActions('Patient', ['getPatient']),
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {

    },
    // 绑定患者
    bindingPatPushScreen () {
      request({
        url: bindingPatPushScreen,
        method: 'post',
        params: {
          cureNo: this.cureNo
        }
      }).then(res => {
        // if (res.data.code === 200) {
        //   // document.onkeydown = (e) => {
        //   //   if (e.key === 13) {
        //   //     this.$router.push('/patient-home')
        //   //   }
        //   // }
        //   this.getPatient(res.data.data)
        // }
      })
    },
    getPatientData () {
      request({
        url: getPatientInfo + '/' + this.cureNo,
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          this.getPatient(res.data.data)
        }
      })
    },
    handleJump () {
      if (this.cureNo) {
        this.$router.push('/patient-home')
        this.bindingPatPushScreen()
      }
    }
  },
  created () {
    document.onkeydown = (e) => {
      var key = window.event.keyCode
      if (key === 13) {
        // lett.enterSearchMember()
        this.showLoading = true
        setTimeout(() => {
          this.handleJump()
          this.showLoading = false
        }, 2000)
      }
    }
  },
  mounted () {
    this.getPatientData()
  }
}
</script>

<style lang="scss" scoped>
  .home{
    height: 100%;
    .van-nav-bar{
      height: 100px;
      background: linear-gradient(90deg, #666666, #303030);
      /deep/ .van-nav-bar__title{
        color:#ffffff;
        font-size: 34px;
        line-height: 100px;
      }
    }
    .list{
      height: calc(100% - 100px);
      overflow-y: auto;
      ul{
        padding:20px 15px 0;
        li{
          background: #FFFFFF;
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
                color:#2E2E2E;
                font-size: 30px;
              }
              &:last-child{
                color:#7F7F7F;
                margin-top: 20px;
                font-size: 26px;
              }
            }
          }
        }
      }
    }
  }
</style>
