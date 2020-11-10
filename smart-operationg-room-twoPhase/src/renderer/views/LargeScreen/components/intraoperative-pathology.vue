<template>
  <div class="intraoperative-pathology">
    <div class="title">
      术中病理
      <i />
    </div>
    <div class="nav">
      <ul>
        <li>
          <div class="li-left">
            手术方式
          </div>
          <div class="li-right">
            1
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import {getPathology} from '@/api/large-screen'
import {mapState} from 'vuex'
import $bus from '@/utils/busScreen'
export default {
  name: 'IntraoperativePathology',
  data () {
    return {

    }
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  methods: {
    getData () {
      request({
        url: getPathology + '/' + this.patientInfo.cureNo,
        method: 'get'
      }).then(res => {
        this.list = res.data.data
      })
    }
  },
  mounted () {
    this.getData()
    $bus.$on('getPathology', this.getPathology)
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
          justify-content: space-between;
          background: #F4F7FD;
          padding: 10px;
          border-radius: 5px;
          font-size: 18px;
          margin-bottom:10px;
          .li-left{
            color: #919398;
          }
          .li-right{
            color: #444444;
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
