<template>
  <div class="intraoperative-pathology">
    <div class="title">
      术中病理
      <i />
    </div>
    <div class="nav">
      <ul v-if="list.length">
        <li
          @click="handleShowReport(item)"
          v-for="(item,index) in list"
          :key="index"
        >
          <p><span>{{ item.patName }}</span><span>{{ item.patSex }}</span></p>
          <p>{{ item.recAddress }}</p>
          <p>{{ item.createTime }}</p>
          <p>{{ item.nursingWorkName }}<span>{{ item.orderState==='0'?'未接单':item.orderState==='1'?'进行中':'已完成' }}</span></p>
        </li>
      </ul>
      <div
        v-else
        class="data-empty"
      >
        <div>
          <img
            src="@/assets/list-empty.png"
            alt=""
          >
          <p>暂无数据</p>
        </div>
      </div>
    </div>
    <PathologyReport
      :report-visible="reportVisible"
      v-if="reportVisible"
      :report-data="reportData"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import request from '@/utils/request2'
import PathologyReport from './pathology-report'
import {getPathology} from '@/api/large-screen'
import {mapState} from 'vuex'
import $bus from '@/utils/busScreen'
export default {
  name: 'IntraoperativePathology',
  data () {
    return {
      reportVisible: false,
      list: [],
      reportData: null
    }
  },
  components: {
    PathologyReport
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  methods: {
    getData () {
      request({
        url: getPathology + '/' + this.patientInfo.cureNo + '/' + this.patientInfo.operSchNo,
        method: 'get'
      }).then(res => {
        this.list = res.data.data
      })
    },
    handleShowReport (item) {
      this.reportData = item
      this.reportVisible = true
    },
    handleClose () {
      this.reportVisible = false
    }
  },
  mounted () {
    this.getData()
    $bus.$on('getPathology', this.getData)
  },
  beforeDestroy () {
    $bus.$off('getPathology')
  }
}
</script>

<style lang="scss" scoped>
  .intraoperative-pathology{
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 10px;
    height: 100%;
    flex: 0.25;
    padding: 0 10px;
    margin-right: 20px;
    &:last-child{
      margin-right: unset;
    }
    .title{
      position: relative;
      text-indent: 33px;
      line-height: 58px;
      border-bottom:1px solid #E9EBF4;
      color: #303133;
      font-size: 20px;
      i{
        position: absolute;
        width: 4px;
        left: 20px;
        top: 0;
        bottom: 0;
        margin:auto;
        height: 18px;
        background: #3377FF;
        border-radius: 2px;
      }
    }
    .nav{
      height: calc(100% - 58px);
      ul{
        overflow-y: auto;
        height: 100%;
        padding:10px 0;
        &::-webkit-scrollbar{
          display: none;
        }
        li{
          display: flex;
          cursor: pointer;
          flex-direction: column;
          justify-content: space-between;
          background: #F4F7FD;
          padding: 10px;
          border-radius: 5px;
          font-size: 18px;
          margin-bottom:10px;
          p{
            &:first-child{
              display: flex;
              justify-content: space-between;
              span{
                flex: 1;
                &:last-child{
                  text-align: right;
                  // padding-right: 20px;
                }
              }
            }
            &:nth-child(2){
              color: #3377ff;
            }
            &:nth-child(3){
              font-size: 16px;
            }
            &:last-child{
              span{
                color: #3377ff;
                margin-left: 10px;
              }
            }
          }
          &:last-child{
            margin-bottom: unset;
          }
        }
      }
    }
    .data-empty{
      text-align: center;
      height: calc(100% - 58px);
      color: #91949A;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        // margin-top: 100px;
        transform: translateX(10px);
      }
    }
  }
</style>
