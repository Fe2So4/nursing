<template>
  <div class="security-check">
    <div class="title">
      手术器械清点
      <i />
    </div>
    <div class="nav">
      <el-tabs
        v-model="activeName"
      >
        <el-tab-pane
          v-for="item in navList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <component :is="item.component" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import CheckDetail from './check-detail'
import CheckOverview from './check-overview'
import InventoryBasic from './inventory-basic'
import InventorySpecial from './inventory-special'
import request from '@/utils/request2'
import {mapState} from 'vuex'
import {getOrdinaryData, getSpecialData} from '@/api/large-screen'
export default {
  name: 'SecurityCheck',
  data () {
    return {
      // itemStatus:1,
      activeName: 'first',
      navList: [
        {label: '手术敷料、基本器械、物品', name: 'first', component: 'InventoryBasic'},
        {label: '楼层特殊手术器械清点', name: 'second', component: 'InventorySpecial'}
      ],
      list: []
    }
  },
  components: {
    CheckDetail,
    CheckOverview,
    InventoryBasic,
    InventorySpecial
  },
  props: {

  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  methods: {
    handleChange () {

    },
    getOrdinaryData () {
      request({
        url: getOrdinaryData + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}/${this.patientInfo.operSchNo}`,
        method: 'get'
      }).then(res => {
        this.list = res.data.data
      })
    },
    getSpecialData () {
      request({
        url: getSpecialData + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}/${this.patientInfo.operSchNo}`,
        method: 'get'
      }).then(res => {

      })
    }
  },
  mounted () {
    // this.getOrdinaryData()
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/themes';
  .security-check{
    @include theme-property('background-color',background_color_secondary);
    @include theme-property('box-shadow',box_color_shadow_info);
    // box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 10px;
    height: 100%;
    flex: 0.35;
    padding: 0 10px;
    margin-right: 20px;
    &:last-child{
      margin-right: unset;
    }
    .title{
      position: relative;
      text-indent: 33px;
      line-height: 58px;
      border-bottom:1px solid;
      @include theme-property('border-bottom-color',border_color_info);
      @include theme-property('color',font_color_title);
      font-size: 20px;
      i{
        position: absolute;
        width: 4px;
        left: 20px;
        top: 0;
        bottom: 0;
        margin:auto;
        height: 18px;
        @include theme-property('background-color',font_color_primary);
        border-radius: 2px;
      }
    }
    .nav{
      height: calc(100% - 58px);
      .el-tabs{
        height: 100%;
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
    /deep/ .el-tabs__active-bar{
      left:16px;
      background-color: #3377FF;
    }
    /deep/ .el-tabs__nav{
      text-indent: 12px;
    }
    /deep/ .el-tabs__header{
      margin-bottom: 5px;
    }
    /deep/ .el-tabs__item.is-active{
      color: #3377FF;
    }
    /deep/ .el-tabs__content{
      height: calc(100% - 45px);
      .el-tab-pane{
        height: 100%;
      }
      overflow: hidden;
      overflow-y: auto;
      &::-webkit-scrollbar{
        display: none;
      }
    }
    /deep/ .el-tabs__item{
      padding:0 10px;
    }
  }
</style>
