<template>
  <div class="detail-patient">
    <div class="dp-info-title">
      接送患者详情 沈云根 患者位置 普外科 17病区\26床\91008289
    </div>
    <div class="dp-info-basic">
      <el-row>
        <el-col :span="3">
          <span>患者：</span>
          <span class="dp-value">沈云根</span>
        </el-col>
        <el-col :span="3">
          <span>性别：</span>
          <span class="dp-value">女</span>
        </el-col>
        <el-col :span="3">
          <span>年龄：</span>
          <span class="dp-value">67岁</span>
        </el-col>
        <el-col :span="3">
          <span>病区：</span>
          <span class="dp-value">17病区</span>
        </el-col>
        <el-col :span="4">
          <span>住院号：</span>
          <span class="dp-value">91008283</span>
        </el-col>
        <el-col :span="3">
          <span>科室：</span>
          <span class="dp-value">普外科</span>
        </el-col>
        <el-col :span="3">
          <span>床位：</span>
          <span class="dp-value">26床</span>
        </el-col>
      </el-row>
      <p>
        扫描工勤人员二维码，进行接单...
      </p>
    </div>
    <div class="dp-info-notice">
      <div
        class="dp-title"
        @click="handleHidden"
      >
        <span>手术通知单</span>
        <span>房间号：707</span>
        <span>序号：1</span>
        <span>拟手术时间：2020/9/27 8:00:00</span>
      </div>
      <div
        class="dp-content clearfix"
        v-show="!hiddenVisible"
      >
        <div class="dp-content-left">
          <div
            class="qrcode"
            ref="qrCodeDiv"
          />
        </div>
        <div class="dp-content-right">
          <el-row>
            <el-col :span="24">
              <span>诊断：</span><span class="dp-value">肝恶性肿瘤</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>主刀医师：</span><span class="dp-value">钦伦秀</span>
            </el-col>
            <el-col :span="10">
              <span>手术名称：</span><span class="dp-value">右-肝特殊肝段切除术-</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>第一助手：</span><span class="dp-value">钦伦秀</span>
            </el-col>
            <el-col :span="6">
              <span>第二助手：</span><span class="dp-value">-</span>
            </el-col>
            <el-col :span="6">
              <span>第三助手：</span><span class="dp-value">-</span>
            </el-col>
            <el-col :span="6">
              <span>第四助手：</span><span class="dp-value">-</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>麻醉医师：</span><span class="dp-value">党丹丹</span>
            </el-col>
            <el-col :span="6">
              <span>麻醉方式：</span><span class="dp-value">全麻</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>备注：</span><span class="dp-value">-</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>化验异常：</span><span class="dp-value">-</span>
            </el-col>
          </el-row>
        </div>
        <p>
          <el-button class="el-icon-printer">
            打印
          </el-button>
        </p>
      </div>
    </div>
    <div class="dp-info-step">
      <el-steps
        direction="vertical"
        :space="100"
      >
        <!-- :active="1" -->
        <el-step
          title="手术排班"
        />
        <el-step title="工勤人员接单">
          <template slot="description">
            <div class="time">
              09-27 01:00
            </div>
            <div>
              <span class="name">李冠平</span>
              <span class="cancel">点"取消接单"按钮，再扫码即可取消接单</span>
            </div>
          </template>
        </el-step>
      </el-steps>
      <p>
        <el-button>
          取消接单
        </el-button>
      </p>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'DetailPatient',
  data () {
    return {
      hiddenVisible: false
    }
  },
  methods: {
    handleHidden () {
      this.hiddenVisible = !this.hiddenVisible
    },
    bindQRCode () {
      // eslint-disable-next-line no-new
      new QRCode(this.$refs.qrCodeDiv, {
        text: '李炎飞真鸡儿帅',
        width: 160,
        height: 160,
        colorDark: '#333333', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.bindQRCode()
    })
  }
}
</script>

<style scoped lang="scss">
   .detail-patient{
    font-size:18px;
    color:#92949A;
    height: 100%;
    padding: 0 20px;
    // overflow-y: auto;
    background: #F3F5FA;
    .dp-value{
      color:#444444;
    }
    .dp-info-title{
      position: relative;
      left: -20px;
      width: calc(100% + 40px);
      height: 60px;
      background: linear-gradient(90deg, #666666, #303030);
      line-height: 60px;
      color: #ffffff;
      margin-bottom:20px;
      font-size: 16px;
      text-indent: 20px;
    }
    .dp-info-basic{
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 26, 51, 0.05);
      border-radius: 5px;
      padding:20px 20px 13px;
      p{
        // text-align: center;
        text-indent: 10px;
        margin-top: 13px;
        height: 40px;
        background: #FFFFFF;
        font-size: 16px;
        line-height: 40px;
        border: 1px solid #E4E4E4;
        border-radius: 5px;
      }
    }
    .dp-info-notice{
      border: 1px solid #E0E0E0;
      border-radius: 5px;
      padding-bottom: 40px;
      margin:10px 0;
      background: #ffffff;
      .dp-title{
        cursor: pointer;
        padding-left: 10px;
        background: #E0E0E0;
        height: 40px;
        line-height: 40px;
        span{
          display: inline-block;
          color: #444444;
          margin-right: 14px;
          &:first-child{
            font-weight: bold;
          }
        }
      }
      .dp-content{
        padding-left: 20px;
        line-height: 36px;
        // padding-bottom: 40px;
        .dp-content-left{
          float: left;
          margin-right: 60px;
          .qrcode{
            margin-top:20px;
          }
        }
        .dp-content-right{
          float: left;
          width: calc(100% - 220px);
          span{
            display: inline-block;
            &:first-child{
              width: 90px;
              text-align: right;
            }
          }
        }
      }
      p{
        text-align: center;
        .el-button{
          width: 114px;
          font-size: 18px;
          background: #E5E5E5;
          border: 1px solid #E5E5E5;
          &:before{
            color:#AAB6CC;
          }
        }
      }
    }
    .dp-info-step{
      background: #ffffff;
      position: relative;
      // height: 200px;
      padding:20px;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      p{
        text-align: center;
        margin-top: 10px;
      }
      .time{
        color:#444444;
        font-size: 18px;
        margin:10px 0;
      }
      .name{
        font-size: 18px;
        color:#444444;
      }
      .cancel{
        font-size: 18px;
        color:#3377FF;
      }
      /deep/ .el-step__title{
        font-size: 18px;
        line-height: 28px;
        &.is-wait{
          color: unset;
        }
      }
      /deep/ .el-step__line{
        top: 25px;
        left: 4px;
        background: #3377FF;
      }
      /deep/ .el-step__icon{
        background: #3377FF;
        width:10px;
        height: 10px;
        border: unset;
        .el-step__icon-inner{
          display: none;
        }
      }
      /deep/ .el-step.is-vertical .el-step__head{
        width: 10px;
      }
      /deep/ .el-button{
        font-size: 18px;
        background: #E5E5E5;
        border: 1px solid #E5E5E5;
      }
    }
  }
</style>
