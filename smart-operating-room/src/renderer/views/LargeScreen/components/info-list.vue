<template>
  <div class="info-list">
    <div class="title">
      {{ title }}
      <i />
    </div>
    <div class="content">
      <template v-if="list.length>0">
        <ul v-if="itemStatus==='0'">
          <li
            class="clearfix"
            v-for="item in list"
            :key="item.value"
          >
            <medical-order :item="item" />
          </li>
        </ul>
        <el-collapse
          v-model="activeNames"
          @change="handleChange"
          v-if="itemStatus==='1'"
        >
          <el-collapse-item
            v-for="(item,index) in list"
            :key="'collapse'+index"
            :name="index"
            :title="item.label"
          >
            <template slot="title">
              <div>
                <span>{{ item.label }}</span>
                <span>{{ item.time }}</span>
              </div>
            </template>
            <template v-if="state==='test'">
              <test-report
                v-for="(_item,_index) in item.laboratoryReportDetails"
                :key="_item.reportNo + _index"
                :item="_item"
              />
            </template>
            <inspect-report
              v-else
              :item="item"
            />
          </el-collapse-item>
        </el-collapse>
      </template>
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
import MedicalOrder from './invalid-medical-order'
import TestReport from './test-report'
import InspectReport from './inspect-report'
export default {
  name: 'InfoList',
  data () {
    return {
      // itemStatus:1,
      activeNames: 1
    }
  },
  components: {
    MedicalOrder, TestReport, InspectReport
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    itemStatus: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  methods: {
    handleChange () {

    }
  }
}
</script>

<style scoped lang="scss">
  .info-list{
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 10px;
    // height: 400px;
    height: 100%;
    // width: 256px;
    flex: 1;
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
        // height: 55px;
        background: #F4F7FD;
        padding: 10px;
        border-radius: 5px;
        // line-height: 55px;
        font-size: 18px;
        margin-bottom:10px;
        .li-left{
          float: left;
          color: #919398;
        }
        .li-right{
          float: right;
          color: #444444;
          i{
            color:#388FF7;
          }
        }
        &:last-child{
          margin-bottom: unset;
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
