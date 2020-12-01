<template>
  <div class="history-record">
    <el-drawer
      :visible.sync="historyVisible"
      :direction="direction"
      :before-close="handleClose"
    >
      <div
        slot="title"
        class="drawer-title"
      >
        <i />
        <span>历史患者</span>
      </div>
      <div class="history-content">
        <ul>
          <li
            v-for="(item,index) in historyList"
            :key="index"
            @click="handleBindPatient(item)"
          >
            <p><span>{{ item.cureNo }}</span><span>{{ item.patientName }}</span><span>男</span></p>
            <p><span class="label">手术</span><span>{{ item.operationName }}</span></p>
            <p>
              <span>
                <span class="label">台次</span><span style="color:#FF2525;">6</span>
              </span>
              <span>
                <span class="label">床位</span><span>{{ item.bedNo }}</span>
              </span>
            </p>
            <p>
              <span>
                <span class="label">主刀</span><span>{{ item.surgeon }}</span>
              </span>
              <span class="span-last">
                <span style="color:#388FF7;">泌尿科</span><span style="color:#388FF7;">8病区</span>
              </span>
            </p>
          </li>
          <li style="width:1px;background:#fff;min-width:1px;max-width:0px;" />
        </ul>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {getPatientHistoryRecord} from '@/api/large-screen'
import request from '@/utils/request2'
import { mapState, mapActions } from 'vuex'
import $bus from '@/utils/busScreen'
export default {
  name: 'HistoryRecord',
  data () {
    return {
      direction: 'btt',
      historyList: []
      // drawer: true
    }
  },
  props: {
    historyVisible: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    ...mapState('LargeScreen', ['currentRoom', 'patientInfo'])
  },
  methods: {
    ...mapActions('LargeScreen', ['setPatientInfo', 'setCurrentRoom']),
    handleClose () {
      this.$emit('handleClose')
    },
    handleBindPatient (data) {
      this.setPatientInfo({cureNo: data.cureNo, hospitalNo: data.hospitalNo})
      $bus.$emit('getPatientInfo')
      $bus.$emit('getStepList')
      $bus.$emit('getRecord2')
      $bus.$emit('getOrdinaryData')
      $bus.$emit('getSpecialData')
      $bus.$emit('getSignInInfo')
      $bus.$emit('getTimeOutInfo')
      $bus.$emit('getSignOutInfo')
    },
    // handleShowHistory () {
    //   this.$emit('handleShowHistory')
    // },
    getHistoryRecord () {
      request({
        url: getPatientHistoryRecord + '/' + this.currentRoom,
        method: 'get'
      }).then(res => {
        this.historyList = res.data.data
      })
    }
  },
  created () {
    this.getHistoryRecord()
    $bus.$on('getHistoryRecord', this.getHistoryRecord)
  },
  beforeDestroy () {
    $bus.$off('getHistoryRecord')
  }
}
</script>

<style lang="scss" scoped>
  .history-record{
    // width: 100%;
    .drawer-title{
      i{
        width: 4px;
        height: 18px;
        display: inline-block;
        background: #3377FF;
        border-radius: 2px;
        vertical-align: middle;
      }
      span{
        vertical-align: middle;
      }
    }
    .history-content{
      // padding: 0 20px;
      // width: 100%;
      box-sizing: border-box;
    }
    ul{
      box-sizing: border-box;
      overflow-y: hidden;
      overflow-x: scroll;
      white-space:nowrap;
      &::-webkit-scrollbar{
        display: none;
      }
      padding:0 20px 40px 20px;
      box-sizing: border-box;
      display: flex;
      li{
        // float: left;
        // display: inline-block;
        background: #F4F7FD;
        min-width: 270px;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        margin-left: 20px;
        display: flex;
        font-size: 16px;
        flex-direction: column;
        &:first-child{
          margin-left: unset;
        }
        p{
          display: flex;
          padding: 0 20px;
          line-height: 36px;
          width: 100%;
          justify-content: space-between;
          color: #444444;
          &:nth-child(1){
            background: #3377FF;
            color: #FFFFFF;
            font-size: 18px;
          }
          &:nth-child(2){
            margin-top: 10px;
            span{
              &:last-child{
                flex: 1;
                width: calc(100% - 40px);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
          &:nth-child(3){
            span{
              flex: 1;
            }
          }
          &:nth-child(4){
            margin-bottom: 10px;
            span{
              flex: 1;
              &.span-last{
                display: flex;
                justify-content: space-between;
              }
            }
          }
          span{
            display: inline-block;
            vertical-align: middle;
          }
          span.label{
            color: #919398;
            width: 40px;
          }
        }
      }
    }
    /deep/ .el-drawer__header{
      margin-bottom:unset;
      color: #333;
      font-size: 20px;
      font-weight: bold;
      // padding:unset;
      padding-top: unset;
      line-height: 56px;
    }
    /deep/ .el-drawer__close-btn:focus {
      outline: unset;
    }
  }
</style>
<style>
  .v-modal{
    opacity: 0.2;
  }
</style>
