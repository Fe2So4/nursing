<template>
  <div class="nursing-record">
    <div class="title">
      护理记录单二
      <i />
    </div>
    <div class="nav">
      <ul>
        <li
          v-for="item in recordList"
          :key="item.sort"
        >
          <div class="li-left">
            {{ item.text }}
          </div>
          <div class="li-right">
            {{ item.value === '' ? '暂无' : item.value }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {getRecord2Data} from '@/api/large-screen'
import request from '@/utils/request'
import {mapState} from 'vuex'
import $bus from '@/utils/busScreen'
export default {
  name: 'NursingRecord',
  data () {
    return {
      recordList: [{text: '手术科室', value: '', sort: '1'},
        {text: '手术方式', value: '', sort: '2'},
        {text: '手术类型', value: '', sort: '3'},
        {text: '术前意识评估', value: '', sort: '4'},
        {text: '术前皮肤评估', value: '', sort: '5'},
        {text: '部位', value: '', sort: '6'},
        {text: '程度', value: '', sort: '7'},
        {text: '麻醉方式', value: '', sort: '8'},
        {text: '手术体位', value: '', sort: '9'},
        {text: '体位装置', value: '', sort: '10'},
        {text: '约束带', value: '', sort: '11'},
        {text: '导尿管', value: '', sort: '12'},
        {text: '型号', value: '', sort: '13'},
        {text: '尿液性质', value: '', sort: '14'},
        {text: '电刀', value: '', sort: '15'},
        {text: '电极板位置', value: '', sort: '16'},
        {text: '腰穿留置', value: '', sort: '17'},
        {text: '术中特殊交班', value: '', sort: '18'},
        {text: '术中冰冻', value: '', sort: '19'},
        {text: '病理', value: '', sort: '20'},
        {text: '植入物', value: '', sort: '21'}
      ]
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
    getData () {
      request({
        url: getRecord2Data + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}`,
        method: 'get'
      }).then(res => {
        console.log(res.data.data)
      })
    }
  },
  mounted () {
    $bus.$on('getRecord2', this.getData)
    this.getData()
  }
}
</script>

<style scoped lang="scss">
  .nursing-record{
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
          flex-direction: column;
          background: #F4F7FD;
          padding: 10px;
          border-radius: 5px;
          font-size: 18px;
          margin-bottom:10px;
          .li-left{
            color: #919398;
          }
          .li-right{
            color: #3377ff;
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
