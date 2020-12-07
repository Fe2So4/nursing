<template>
  <div class="family-call">
    <div class="option">
      <el-form
        size="mini"
        :inline="true"
      >
        <el-form-item label="日期：">
          <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
          />
          <!-- <el-date-picker></el-date-picker> -->
        </el-form-item>
        <el-form-item label="楼栋：">
          <el-select v-model="select">
            <el-option value="1">
              2
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="input" />
        </el-form-item>
        <el-form-item>
          <el-button>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="fc-content">
      <div class="fc-content-left">
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          height="100%"
          auto-resize
        >
          <vxe-table-column
            field="patientName"
            title="病人姓名"
          />
          <vxe-table-column
            field="hospitalNo"
            title="住院号"
          />
          <vxe-table-column
            field="bedNo"
            title="病床号"
          />
          <vxe-table-column
            field="operationName"
            title="手术名称"
          />
        </vxe-table>
      </div>
      <div class="fc-content-right">
        <div class="top">
          <div class="basic-info">
            <div class="title">
              基本信息
            </div>
            <el-form
              size="mini"
              label-width="90px"
            >
              <el-form-item label="病人姓名：">
                病人姓名
              </el-form-item>
              <el-form-item label="年龄：">
                病人姓名
              </el-form-item>
              <el-form-item label="住院号：">
                病人姓名
              </el-form-item>
              <el-form-item label="病床号：">
                病人姓名
              </el-form-item>
              <el-form-item label="手术名称：">
                病人姓名
              </el-form-item>
              <el-form-item label="术前诊断：">
                病人姓名
              </el-form-item>
              <el-form-item label="主刀医生：">
                病人姓名
              </el-form-item>
            </el-form>
          </div>
          <div class="notice-info">
            <div class="title">
              信息通知
            </div>
            <div class="text-area">
              <el-input
                type="textarea"
                size="mini"
                rows="5"
              />
            </div>
            <div class="select-info">
              <el-select
                v-model="select"
                size="mini"
                placeholder="请选择常用句式"
              >
                <el-option value="1">
                  1
                </el-option>
              </el-select>
            </div>
            <div class="notice-option">
              <span>
                <i class="el-icon-setting" />
              </span>
              <span style="margin-left:10px;">
                <span>重复：</span>
                <span>
                  <el-input-number
                    v-model="num"
                    :min="1"
                    :controls="false"
                    size="mini"
                  />
                </span>
                <span>
                  遍
                </span>
                <span style="margin-left:20px;">
                  <el-button
                    type="primary"
                    size="mini"
                  >提 交</el-button>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="title">
            今日消息记录
          </div>
          <ul>
            <li
              v-for="item in 20"
              :key="item"
            >
              精日撒大大大大艾德卡的啦啦啦啦啦啦杜拉拉
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
// import {getPatientList, getTodayCallList, getCallTemplate, saveRelationNotice} from '@/api/family-call'
import {getPatientList} from '@/api/family-call'
export default {
  name: 'FamilyCall',
  data () {
    return {
      select: '',
      time: '',
      input: '',
      tableData: [],
      num: 1
    }
  },
  created () {
    this.getPatientList()
  },
  methods: {
    cellClickEvent () {

    },
    getPatientList () {
      request({
        url: getPatientList,
        method: 'post',
        data: {
          bedNo: '',
          // cureNo: '',
          // diagnose: '',
          floor: '',
          hospitalNo: '',
          // operSchNo: '',
          operateDate: '2020-08-06',
          operationName: '',
          // patientAge: '',
          // patientGender: '',
          patientName: ''
          // roomNo: '',
          // surgeon: ''
        }
      }
      ).then(res => {
        this.tableData = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.family-call{
  height: 100%;
  .option{
    padding-top: 18px;
    padding-left: 20px;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    overflow: hidden;
  }
  .fc-content{
    margin-top: 10px;
    height: calc(100% - 75px);
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    display: flex;
    .fc-content-left{
      background: #FFFFFF;
      height: 100%;
      flex: 0.3;
      margin-right: 10px;
    }
    .fc-content-right{
      // background: #FFFFFF;
      overflow: hidden;
      height: 100%;
      flex: 1;
      .top{
        display: flex;
        .title{
          color: #409eff;
          border-bottom: 1px solid #e2e2e2;
          line-height: 30px;
        }
        .basic-info{
          width: 400px;
          margin-right: 10px;
          background: #FFFFFF;
          padding: 0 20px;
          .el-form{
            margin-top: 10px;
            .el-form-item{
              margin-bottom:10px;
            }
          }
        }
        .notice-info{
          background: #FFFFFF;
          flex: 1;
          padding: 0 20px;
          .title{
            margin-bottom:10px;
          }
          .text-area{

          }
          .select-info{
            margin:10px 0;
            .el-select{
              width: 100%;
            }
          }
        }
      }
      .bottom{
        background: #FFFFFF;
        margin-top: 10px;
        height: calc(100% - 317px);
        flex: 1;
        // padding:0 20px;
        .title{
          line-height: 30px;
          text-indent: 20px;
          background:#C5D3F1;
        }
        ul{
          padding:10px 20px;
          overflow-y: auto;
          height: calc(100% - 30px);
          li{

          }
        }
      }
    }
  }
}
</style>
