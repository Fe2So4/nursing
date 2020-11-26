<template>
  <div class="postoperative-list">
    <div class="title">
      生命体征
      <i />
    </div>
    <div class="content">
      <template>
        <ul v-if="list.length>0">
          <li
            v-for="(item,index) in list"
            :key="index"
          >
            <span>{{ item.itemName }}</span>
            <span>{{ item.itemValue }}</span>
            <span>{{ item.itemUnit }}</span>
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
      </template>
    </div>
  </div>
</template>

<script>
import {getSign} from '@/api/large-screen'
import request from '@/utils/request2'
import { mapState } from 'vuex'
import $bus from '@/utils/busScreen'
export default {
  name: 'PostoperativeList',
  data () {
    return {
      // itemStatus:1,
      activeNames: 1,
      list: []
    }
  },
  components: {

  },
  props: {

  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  methods: {
    handleChange () {

    },
    getSignData () {
      let obj = {cureNo: this.patientInfo.cureNo, hospitalNo: this.patientInfo.hospitalNo}
      request({
        url: getSign,
        method: 'post',
        params: obj
      }).then(res => {
        this.list = res.data.data
      })
    }
  },
  mounted () {
    this.getSignData()
    $bus.$on('getSignData', this.getSignData)
  },
  beforeDestroy () {
    $bus.$off('getSignData')
  }
}
</script>

<style scoped lang="scss">
  .postoperative-list{
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 10px;
    height: 100%;
    flex: 0.35;
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
    .content{
      padding: 10px;
      overflow-y: auto;
      height: calc(100% - 58px);
      &::-webkit-scrollbar{
        display: none;
      }
      .el-collapse{
        height: 100%;
        .el-collapse-item{
          margin-bottom: 10px;
        }
      }
    }
    ul{
      li{
        background: #F4F7FD;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-radius: 5px;
        font-size: 18px;
        margin-bottom:10px;
        span{
          color:#3377ff;
          text-align: center;
          flex: 1;
          &:nth-child(2){
            color: #08b147;
          }
          &:last-child{
            color:#ff8845;
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
    /deep/ .el-collapse-item__header{
      background: unset;
      background: #F5F8FD;
      height: 55px;
      line-height: 55px;
      border-radius: 5px;
      font-size: 18px;
      text-indent: 10px;
      color: #919398;
      i{
        color: #388FF7;
      }
    }
    /deep/ .el-collapse-item__wrap{
      border-bottom:unset;
    }
  }
</style>
