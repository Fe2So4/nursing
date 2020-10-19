<template>
  <div class="handover-record">
    <van-nav-bar
      title="转运交接单"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="运送"
    >
    </van-nav-bar>
    <div class="patient-card">
      <div class="content">
          <div class="left">
            <span>808</span>
          </div>
          <div class="right">
            <p>魏鑫 12床 91166492</p>
            <p>主刀 陈疾仵 麻醉 王海莲</p>
            <p>巡回 —— 洗手 余琼</p>
          </div>
      </div>
    </div>
    <div class="list">
      <van-cell-group>
        <van-cell v-show="transferType === 1" title="手术环节交接" :label="transferTitle" value="" title-class="first-cell" style="background:#e2e2e2;">
        </van-cell>
        <van-cell v-show="transferType === 0" title="病房交接" value="" title-class="first-cell" style="background:#e2e2e2;">
        </van-cell>
        <van-cell v-show="transferType === 0" title="转运起始时间：" :value="time" @click="timeVisible = true"></van-cell>
        <van-cell title="评估时间：" v-show="transferType === 1" :value="time" @click="timeVisible = true">
        </van-cell>
        <van-cell v-show="transferType === 0" title="住院/转院区：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="手术/监护室/透析室：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="意识：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="其它：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="疼痛：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="强度：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="部位：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="性质：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="体温：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell title="脉搏：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell title="呼吸：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell title="血压：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="氧饱和度：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell title="皮肤：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/>
          </template>
        </van-cell>
        <van-cell-group v-show="showFullSkin">
          <van-cell title="部位：" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="input" label="" placeholder="请输入部位：" label-align="right" input-align="right"/>
            </template>
          </van-cell>
          <van-cell title="程度：" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="input" label="" placeholder="请输入程度：" label-align="right" input-align="right"/>
            </template>
          </van-cell>
          <van-cell title="大小：" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="input" label="" placeholder="请输入大小：" label-align="right" input-align="right"/>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell v-show="transferType === 0" title="导管：" value="内容" @click="handleShowDialog">
          <template #right-icon>
            <van-icon name="play"/>
          </template>
        </van-cell>
        <van-cell v-show="transferType === 1" title="留置导管固定畅通：" value="内容" @click="handleShowDialog">
          <template #right-icon>
            <van-icon name="play"/>
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="物品：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
         <van-cell v-show="transferType === 0" title="备注：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="" />
          </template>
        </van-cell>
         <van-cell v-show="transferType === 0" title="建议：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top:15px;">
        <van-cell title="运送电子签名" title-class="sign-title" @click="handleShowSignature"></van-cell>
      </van-cell-group>
      <van-dialog width="80%" v-model="showDialog" title="术中冲洗" show-cancel-button>
        <van-checkbox-group v-model="result">
          <van-checkbox name="a" shape="square">复选框 a</van-checkbox>
          <van-checkbox name="b" shape="square">复选框 b</van-checkbox>
          <van-checkbox name="b" shape="square">复选框 b</van-checkbox>
          <van-checkbox name="b" shape="square">复选框 b</van-checkbox>
          <van-checkbox name="b" shape="square">复选框 b</van-checkbox>
        </van-checkbox-group>
      </van-dialog>
    </div>
    <van-action-sheet v-model="timeVisible">
      <!-- <div class="content">内容</div> -->
      <template slot="default">
        <van-datetime-picker
            v-if="timeVisible"
            v-model="currentDate"
            @cancel="handleCancel"
            @confirm="handleConfirm"
            @change="handleTimeChange"
            type="datetime"
            title="选择完整时间"
        />
      </template>
    </van-action-sheet>
    <transition name="van-slide-up">
      <signature :visible="visible" v-if="visible" @handleClose="handleCloseSignature"/>
    </transition>
  </div>
</template>

<script>
import Signature from '../Signature/index'
import moment from 'moment'
export default {
  data () {
    return {
      checked: true,
      visible: false,
      input: '',
      showFullSkin: false,
      currentDate: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      timeVisible: false,
      value1: '',
      transferType: 0,
      transferTitle: '',
      option: [
        { text: 'PACU', value: 0 },
        { text: '病房', value: 1 },
        { text: 'ICU病房', value: 2 },
        { text: '急诊', value: 3 },
        { text: '离院', value: 4 }
      ],
      showDialog: false,
      result: []
    }
  },
  components: {
    Signature
  },
  computed: {
    time () {
      return moment(this.currentDate).format('YYYY-MM-DD HH:mm')
    }
  },
  watch: {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {

    },
    handleCancel () {
      this.timeVisible = false
    },
    handleTimeChange (picker) {
      console.log(picker)
      // this.currentDate = moment(value).format('YYYY-MM-DD HH:mm')
    },
    handleConfirm (value) {
      console.log(value)
      this.currentDate = moment(value).format('YYYY-MM-DD HH:mm')
      this.timeVisible = false
    },
    // handleChange () {
    //   this.showFullSkin = !this.showFullSkin
    // },
    // handleChange (index) {
    //   this.active = index
    // },
    handleShowSignature () {
      this.visible = true
    },
    handleCloseSignature () {
      this.visible = false
    },
    handleChange () {
      this.showFullSkin = !this.showFullSkin
    },
    handleShowDialog () {
      this.showDialog = true
    }
  },
  created () {
    this.transferType = parseInt(this.$route.query.type)
    this.transferTitle = this.$route.query.title
  }
}
</script>

<style lang="scss" scoped>
  .handover-record{
    height: 100%;
    position: relative;
    .van-nav-bar{
      height: 100px;
      background: linear-gradient(90deg, #666666, #303030);
      /deep/ .van-nav-bar__title{
        color:#ffffff;
        font-size: 34px;
        line-height: 100px;
      }
      /deep/ .van-nav-bar__text{
        color: #ffffff;
        font-size: 30px;
      }
      /deep/ .van-icon-arrow-left{
        color: #ffffff;
        font-size: 36px;
      }
    }
    .patient-card{
      padding: 15px 20px;
      .content{
        background: #ffffff;
        display: flex;
        height: 194px;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        box-sizing: border-box;
        overflow: hidden;
        .left{
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            width: 140px;
            height: 80px;
            background: #3478FF;
            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
            border-radius: 0px 40px 40px 0px;
            line-height: 80px;
            text-align: center;
            font-size: 42px;
            font-weight: bold;
            color: #ffffff;
          }
        }
        .right{
          flex: 1;
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p{
            font-size: 26px;
            color: #7F7F7F;
            &:nth-child(1){
              font-size: 30px;
              color: #2E2E2E;
            }
            &:nth-child(2){
              margin:30px 0;
            }
          }
        }
      }
    }
    .list{
      height:calc(100% - 324px);
      overflow-y: auto;
    }
    .van-cell{
      line-height: 94px;
      color: #2E2E2E;
      font-size: 30px;
      &::after{
        border-color: #E2E2E2;
      }
      .first-cell{
        flex: unset;
      }
      .left-title{
        flex: unset;
      }
      .right-value{
        .van-field{
          padding-top: 0;
          padding-bottom: 0;
        }
      }
      .van-dropdown-menu{
        height: 100%;
        /deep/ .van-dropdown-menu__bar{
          height: 100%;
          box-shadow: unset;
        }
        /deep/ .van-dropdown-menu__item{
          justify-content: flex-end;
        }
        /deep/ .van-dropdown-menu__title{
          font-size: 30px;
          line-height: unset;
          padding-right: 30px;
          &::after{
            border-color: transparent transparent  #808080 #808080;
            border-width: 6px;
            // margin-top: -6px;
            right: 5px;
          }
        }
        /deep/ .van-dropdown-item__option{
          font-size: 30px;
          line-height: 60px;
        }
      }
      .van-cell__label{
        font-size: 26px;
        line-height: 30px;
      }
      /deep/ .van-icon-play{
        transform: rotate(90deg);
        font-size: 20px;
      }
    }
    .van-cell-group{
      // &:last-child{
        // margin-top: 15px;
        // margin-bottom: 15px;
        .van-cell{
          .van-cell__value{
            color: #7F7F7F;
          }
          .sign-title{
            color: #32db64;
          }
        }
      // }
    }
    .van-dialog{
      font-size: 30px;
      /deep/ .van-dialog__header{
        line-height: 80px;
        text-align: left;
        text-indent: 20px;
        border-bottom:1px solid #e2e2e2;
      }
      .van-checkbox{
        padding-left: 15px;
        /deep/ .van-checkbox__icon{
          line-height: 80px;
          // height: 60px;
          width: 30px;
          height: 30px;
          .van-icon{
            line-height: 30px;
            width: 30px;
            height: 30px;
          }
        }
        /deep/ .van-checkbox__label{
          line-height: 80px;
        }
      }
      /deep/ .van-dialog__footer{
        /deep/ .van-button{
          line-height: 80px;
          height: 80px;
          font-size: 26px;
        }
      }
    }
    /deep/ .van-picker__toolbar{
      height: 60px;
    }
    /deep/ .van-picker__cancel{
      font-size: 30px;
    }
    /deep/ .van-picker__confirm{
      font-size: 30px;
    }
    /deep/ .van-picker__title{
      font-size: 30px;
      line-height: 60px;
    }
    /deep/ .van-picker__columns{
      // height: 400px !important;
      .van-picker-column{
        font-size: 26px;
        line-height: 60px;
      }
    }
    /deep/ .van-overlay{
      background-color: rgba(0,0,0,0.5);
    }
  }
</style>
