<template>
  <div class="nursing-record">
    <div class="title">
      护理记录单二
      <i />
    </div>
    <div class="nav">
      <ul v-if="state==='2'">
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
          <div
            v-if="item.sort === '5'&&item.value==='不完整'"
            class="li-right"
          >
            <span>部位：</span><span>{{ item.skin.skinLocate === '' ? '暂无' : item.skin.skinLocate }}</span>
          </div>
          <div
            v-if="item.sort === '5'&&item.value==='不完整'"
            class="li-right"
          >
            <span>程度：</span><span>{{ item.skin.skinDegree === '' ? '暂无' : item.skin.skinDegree }}</span>
          </div>
          <div
            v-if="item.sort === '10'"
            class="li-right"
          >
            <span>型号：</span><span>{{ item.catheter.catheterNature === '' ? '暂无' : item.catheter.catheterNature }}</span>
          </div>
          <div
            v-if="item.sort === '10'"
            class="li-right"
          >
            <span>类型：</span><span>{{ item.catheter.catheterType === '' ? '暂无' : item.catheter.catheterType }}</span>
          </div>
          <div
            v-if="item.sort === '11'"
            class="li-right"
          >
            <span>电凝功率：</span><span>{{ item.electrotome.electrotomeDN === '' ? '暂无' : item.electrotome.electrotomeDN }}</span>
          </div>
          <div
            v-if="item.sort === '11'"
            class="li-right"
          >
            <span>电切功率：</span><span>{{ item.electrotome.electrotomeDQ=== '' ? '暂无' : item.electrotome.electrotomeDQ }}</span>
          </div>
          <div
            v-if="item.sort === '14'"
            class="li-right"
          >
            <span>特殊交班备注：</span><span>{{ item.handOver.handOverRemarks=== '' ? '暂无' : item.handOver.handOverRemarks }}</span>
          </div>
          <div
            v-if="item.sort === '16'"
            class="li-right"
          >
            <span>病理数量：</span><span>{{ item.pathology.pathologyCount === '' ? '暂无' : item.pathology.pathologyCount }}</span>
          </div>
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
      recordList: [
        {text: '手术科室', value: '', sort: '1'},
        {text: '手术方式', value: '', sort: '2'},
        {text: '手术类型', value: '', sort: '3'},
        {text: '术前意识评估', value: '', sort: '4'},
        {text: '术前皮肤评估', value: '', sort: '5', skin: {skinName: '', skinLocate: '', skinDegree: ''}},
        // {text: '部位', value: '', sort: '6'},
        // {text: '程度', value: '', sort: '7'},
        {text: '麻醉方式', value: '', sort: '6'},
        {text: '手术体位', value: '', sort: '7'},
        {text: '体位装置', value: '', sort: '8'},
        {text: '约束带', value: '', sort: '9'},
        {text: '导尿管', value: '', sort: '10', catheter: {}},
        // {text: '型号', value: '', sort: '11'},
        // {text: '尿液性质', value: '', sort: '12'},
        {text: '电刀', value: '', sort: '11'},
        {text: '电极板位置', value: '', sort: '12'},
        {text: '腰穿留置', value: '', sort: '13'},
        {text: '术中特殊交班', value: '', sort: '14'},
        {text: '术中冰冻', value: '', sort: '15'},
        {text: '病理', value: '', sort: '16'},
        {text: '植入物', value: '', sort: '17'}
      ],
      state: '0'
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
        let data = res.data.data
        this.state = data.recordTwoState
        if (data.recordTwoState !== '0') {
          this.recordList[0].value = data.deptName
          this.recordList[1].value = data.opsName
          this.recordList[2].value = data.opsType === '1' ? '择期' : data.opsType === '2' ? '非择期' : '急诊'
          this.recordList[3].value = data.consciousness === '1' ? '清醒' : data.consciousness === '2' ? '烦躁' : '昏迷'
          if (!this.IsEmpty(data.skin)) {
            this.recordList[4].value = data.skin.skinName === '1' ? '完整' : '不完整'
            this.recordList[4].skin = data.skin
          }
          this.recordList[5].value = data.anesthesiaMode
          this.recordList[6].position = data.position
          this.recordList[7].device = data.device
          this.recordList[8].constraints = data.constraints
          if (!this.IsEmpty(data.catheter)) {
            this.recordList[9].value = data.catheter.catheterName === '1' ? '无' : data.catheter.catheterName === '2' ? '病房带入' : '手术室插入'
            this.recordList[9].catheter = data.catheter
          }
          if (!this.IsEmpty(data.equipment)) {
            this.recordList[10].value = data.equipment.electrotome.electrotomeName === '1' ? '无' : '有'
            this.recordList[10].electrotome = data.equipment.electrotome
            this.recordList[11].value = data.equipment.electrotomeLocation
            this.recordList[12].value = data.equipment.bhMachine.bhMachineName === '1' ? '无' : '有'
          }
          if (!this.IsEmpty(data.handOver)) {
            this.recordList[13].value = data.handOver.handOverName === '1' ? '无' : '有'
            this.recordList[13].handOver = data.handOver
          }
          if (!this.IsEmpty(data.frozen)) {
            this.recordList[14].value = data.frozen.frozenName === '1' ? '无' : '有'
            this.recordList[15].value = data.pathology.pathologyName === '1' ? '无' : '有'
          }
          if (!this.IsEmpty(data.pathology)) {
            this.recordList[15].pathology = data.pathology
          }
          this.recordList[16].value = data.implants === '1' ? '无' : '有'
        }
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
