<template>
  <div class="record-before">
    <PatientInfo />
    <div class="rb-content">
      <div class="rb-option">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="item in tabList"
            :key="item.component"
            :label="item.label"
            :name="item.component"
          >
            <components :is="item.component" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import LineInput from '@/components/LineInput/index'
import PatientInfo from '@/components/PatientInfoStep/patient-info-step'
import NursingInfo from './components/nursing-info'
import GoodsCheck from './components/goods-check'
import SendTestLabel from './components/send-test-label'
import RealNameCheck from './components/real-name-check'
import RealNurseCheck from './components/real-nursing-check'
import DeviceUse from './components/device-use'
import DrainageTube from './components/drainage-tube'
import Stapler from './components/stapler'
import InstrumentSetTraceability from './components/instrument-set-traceability'

export default {
  name: 'RecordBefore',
  data () {
    return {
      radio: '',
      input: '无',
      value: '',
      checkList: [],
      activeName: 'NursingInfo',
      tabList: [
        {
          label: '护理情况',
          component: 'NursingInfo'
        },
        {
          label: '送检标本',
          component: 'SendTestLabel'
        },
        {
          label: '物品清点',
          component: 'GoodsCheck'
        },
        {
          label: '实际名称核对',
          component: 'RealNameCheck'
        },
        {
          label: '实际医护核对',
          component: 'RealNurseCheck'
        },
        {
          label: '设备使用',
          component: 'DeviceUse'
        },
        {
          label: '引流管',
          component: 'DrainageTube'
        },
        {
          label: '吻合器',
          component: 'Stapler'
        },
        {
          label: '器械包追溯',
          component: 'InstrumentSetTraceability'
        }
      ]
    }
  },
  components: {
    PatientInfo, NursingInfo, GoodsCheck, SendTestLabel, RealNurseCheck, DeviceUse, RealNameCheck, DrainageTube, Stapler, InstrumentSetTraceability
    // LineInput
  },
  methods: {
    handleClick () {

    }
  }
}
</script>

<style lang="scss" scoped>
  .record-before{
    height: 100%;
    .rb-content{
      height: calc(100% - 250px);
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      padding:0 20px;
      border-radius: 5px;
      .rb-option{
        // text-align: right;
        // padding: 10px 0;
        height: 100%;
      }
    }
  }
</style>
