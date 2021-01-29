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
          v-else-if="itemStatus==='1'"
        >
          <el-collapse-item
            v-for="(item,index) in list"
            :key="'collapse'+index"
            :name="index"
            :title="item.label"
          >
            <template slot="title">
              <div class="collapse-header">
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
        <div
          v-else-if="itemStatus==='2'"
          class="summary"
        >
          <h3>主 诉</h3>
          <p>{{ list[0].chiefComplaint }}</p>
          <p>{{ list[0].sectionName }}</p>
          <h3>病情摘要</h3>
          <h3>现病史</h3>
          <p>
            {{ list[0].presentHistory }}
          </p>
        </div>
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
  @import '@/styles/themes';
  .info-list{
    @include theme-property('background-color',background_color_secondary);
    @include theme-property('box-shadow',box_color_shadow_info);
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
    .summary{
      h3{
        font-size: 18px;
        font-weight: 400;
        margin-top: 28px;
        &:first-child{
          margin-top: 0;
        }
      }
      p{
        color: #3890f7;
        font-size: 16px;
        line-height: 32px;
      }
    }
    .data-empty{
      text-align: center;
      height: calc(100% - 58px);
      @include theme-property('color',font_color_secondary);
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
      // height: 55px;
      height: unset;
      line-height: 20px;
      border-radius: 5px;
      font-size: 18px;
      // text-indent: 10px;
      padding-left: 10px;
      padding-top: 15px;
      padding-bottom: 15px;
      color: #919398;
      display: flex;
      justify-content: space-between;
      .collapse-header{
        display: flex;
        justify-content: space-between;
        flex: 1;
        font-size: 16px;
        span{
          &:first-child{
            max-width:260px;
            word-wrap: break-word;
            // word-break: break-all;
          }
          &:last-child{
            width: 100px;
          }
        }
      }
      i{
        color: #388FF7;
      }
    }
    /deep/ .el-collapse-item__wrap{
      border-bottom:unset;
    }
  }
</style>
