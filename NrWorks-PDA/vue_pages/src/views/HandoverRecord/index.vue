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
        <van-cell v-show="transferType === 1 || transferType === 2" title="手术环节交接" :label="transferTitle" value="" title-class="first-cell" style="background:#e2e2e2;">
        </van-cell>
        <van-cell v-show="transferType === 0" title="病房交接" value="" title-class="first-cell" style="background:#e2e2e2;">
        </van-cell>
        <van-cell v-show="transferType === 0" title="转运起始时间：" :value="time" @click="hanldeShowTime('startTime')"></van-cell>
        <van-cell v-show="transferType === 2" title="术后到达病区(监护室)时间：" title-class="first-cell" :value="time" @click="hanldeShowTime('startTime')"></van-cell>
        <van-cell title="评估时间：" v-show="transferType === 1" :value="time" @click="hanldeShowTime('startTime')">
        </van-cell>
        <van-cell v-show="transferType === 0" title="住院/转院区：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.inpatientWard" :options="zyOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="手术/监护室/透析室：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.department" :options="bfOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="意识：" value="内容" v-show="transferType !== 2">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.consciousness" :options="ysOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="其它：" value="内容" title-class="left-title" value-class="right-value" v-show="transferType !== 2">
          <template #right-icon>
            <van-field v-model="recordForm.consciousnessOther" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="疼痛：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.ache" :options="ttOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="强度：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="recordForm.strength" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="部位：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="recordForm.achePart" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="性质：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.nature" :options="xzOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="体温：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="recordForm.temp" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell title="脉搏：" value="内容" title-class="left-title" value-class="right-value" v-show="transferType !== 2">
          <template #right-icon>
            <van-field v-model="recordForm.pulse" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell title="呼吸：" value="内容" title-class="left-title" value-class="right-value" v-show="transferType !== 2">
          <template #right-icon>
            <van-field v-model="recordForm.breathe" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell title="血压：" value="内容" title-class="left-title" value-class="right-value" v-show="transferType !== 2">
          <template #right-icon>
            <van-field v-model="recordForm.bp" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="氧饱和度：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="recordForm.o2" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell title="皮肤：" value="内容" v-show="transferType !== 2">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF" >
              <van-dropdown-item v-model="recordForm.skinName" :options="pfOptions" @change="handleDrowDownChange"/>
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell-group v-show="showFullSkin">
          <van-cell title="部位：" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.skinPart" label="" placeholder="请输入部位：" label-align="right" input-align="right"/>
            </template>
          </van-cell>
          <van-cell title="程度：" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.skinDegree" label="" placeholder="请输入程度：" label-align="right" input-align="right"/>
            </template>
          </van-cell>
          <van-cell title="大小：" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.skinSize" label="" placeholder="请输入大小：" label-align="right" input-align="right"/>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell v-show="transferType === 0" title="导管：" value="内容" @click="handleShowDialog({list:'dgOptions',model:'catheter',title:'导管'})">
          <template #right-icon>
            <van-icon name="play"/>
          </template>
        </van-cell>
        <van-cell v-show="transferType === 1" title="留置导管固定畅通：" value="内容" @click="handleShowDialog({list:'lzdgOptions',model:'conduit',title:'留置导管固定畅通'})">
          <template #right-icon>
            <van-icon name="play"/>
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="留置时间：" value="内容" @click="handleShowDialog({list:'lzdgOptions',model:'conduit',title:'留置导管固定畅通'})">
          <template #right-icon>
            <van-icon name="play" />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="物品：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.goodsJson" :options="wpOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
         <van-cell v-show="transferType === 0" title="备注：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="recordForm.number" label="" placeholder="" />
          </template>
        </van-cell>
         <van-cell v-show="transferType === 0" title="建议：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="recordForm.suggest" label="" placeholder="" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell v-show="transferType === 2" title="接收电子签名" title-class="sign-title" @click="handleShowSignature"></van-cell>
        <van-cell v-show="transferType === 0 || transferType === 1" title="运送电子签名" title-class="sign-title" @click="handleShowSignature"></van-cell>
        <div v-if="recordForm.signatureImage2!==''" style="text-align:center;">
          <img :src="recordForm.signatureImage2" alt="" class="signatureImage">
        </div>
      </van-cell-group>
      <van-dialog width="80%" v-model="showDialog"
      :title="dialogTitle" show-cancel-button :before-close="handleCloseDialog" @confirm="handleDialogConfirm">
        <div class="dialog-checkbox">
          <van-checkbox-group v-model="result">
            <van-checkbox v-for="item in checkBoxList" :key="item.value" :name="item.value" shape="square">{{item.text}}</van-checkbox>
          </van-checkbox-group>
        </div>
      </van-dialog>
    </div>
    <van-action-sheet v-model="timeVisible">
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
    <signature :visible="visible" v-if="visible" @handleClose="handleCloseSignature" @handleSubmit="handleSubmitImage"/>
    <!-- <transition name="van-slide-up">
    </transition> -->
  </div>
</template>

<script>
import Signature from '@/components/Signature'
import moment from 'moment'
import {submitRecord} from '@/api/handover-record'
import request from '@/utils/request'
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
      showDialog: false,
      result: [],
      checkBoxList: null,
      dialogTitle: '',
      recordForm: {
        startTime: '', // 转运起始时间
        suggest: '', // 建议
        department: '', // 手术/监护室/透析室
        inpatientWard: '', // 住院/转病区
        // 导管
        catheter: ['1', '2', '3'],
        conduitTime: '', // 留置时间
        // 物品
        goodsJson: '',
        number: '', // 备注数量
        time: '', // 出手术室时间，入手术室时间
        // 皮肤
        skinName: '', // 破损/完整
        skinPart: '', // 部位
        skinDegree: '', // 程度
        skinSize: '', // 大小
        pulse: '', // 脉搏
        breathe: '', // 呼吸
        temp: '',
        bp: '', // 血压
        o2: '', // 氧饱和度
        consciousness: '', // 意识
        consciousnessOther: '', // 意识其它
        ache: '', // 疼痛
        strength: '', // 强度
        achePart: '', // 疼痛部位
        Conduit: {

        },
        conduit: ['4', '5', '6', '8'], // 留置导管固定畅通
        nature: '', // 性质
        signatureImage2: '' // 签名
      },
      zyOptions: [{text: '住院', value: '1'}, {text: '转病区', value: '2'}], // 住院/转病区
      bfOptions: [{text: '手术', value: '1'}, {text: '监护室', value: '2'}, {text: '透析室', value: '3'}], // 手术室/监护室/透析室
      ysOptions: [{text: '清楚', value: '1'}, {text: '烦躁', value: '2'}, {text: '嗜睡', value: '3'}, {text: '昏迷', value: '4'}, {text: '其它', value: '5'}], // 意识
      ttOptions: [{text: 'NRS', value: '1'}, {text: 'FLACC', value: '2'}, {text: 'CCPOT', value: 'WONG-BAKER'}], // 疼痛
      xzOptions: [{text: '刀割样痛', value: '1'}, {text: '绞痛', value: '2'}, {text: '灼烧样痛', value: '3'}, {text: '刺痛', value: '4'},
        {text: '压痛', value: '5'}, {text: '胀痛', value: '6'}, {text: '钝痛', value: '7'}],
      pfOptions: [{text: '完整', value: '1'}, {text: '破损', value: '2'}],
      dgOptions: [{text: '氧气', value: '1'}, {text: '浅静脉留置', value: '2'},
        {text: '深静脉留置', value: '3'}, {text: 'PICC', value: '4'}, {text: '动脉留置', value: '5'},
        {text: '胃肠减压', value: '6'}, {text: '鼻饲', value: '7'}, {text: '留置导管', value: '8'}, {text: '气质导管', value: '9'},
        {text: '负压球', value: '10'}, {text: '胸腔引流', value: '11'}, {text: 'T管', value: '12'}, {text: '其他', value: '13'}, {text: '无', value: '14'}],
      lzdgOptions: [{text: '静脉', value: '1'},
        {text: '动脉', value: '2'},
        {text: '胃管', value: '3'},
        {text: '导尿', value: '4'},
        {text: '气管导管', value: '5'},
        {text: '负压球', value: '6'},
        {text: '胸腔引流', value: '7'},
        {text: 'PICC', value: '8'},
        {text: '其他', value: '13'},
        {text: '无', value: '14'}],
      wpOptions: [{text: '输液', value: '1'}, {text: 'X片', value: '2'}, {text: 'CT片', value: '3'}, {text: '磁共振片', value: '4'}, {text: '其它', value: '5'}]
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
    handleSubmitImage (image) {
      this.recordForm.signatureImage2 = image
    },
    handleDrowDownChange (value) {
      if (value === '2') {
        this.showFullSkin = true
      } else {
        this.showFullSkin = false
        this.recordForm.skinSize = ''
        this.recordForm.skinPart = ''
        this.recordForm.skinDegree = ''
      }
    },
    onClickRight () {
      console.log('运送')
      // this.$dialog.confirm({
      //   title: '提示',
      //   message: '弹窗内容'
      // })
      //   .then(() => {
      //   // on confirm
      //   })
      //   .catch(() => {
      //   // on cancel
      //   })
      this.handleSubmit()
    },
    handleCloseDialog (action, done) {
      console.log('关闭')
      done()
    },
    handleDialogConfirm () {
      switch (this.dialogTitle) {
        case '导管':
          this.recordForm.catheter = this.result
          break
        case '留置导管固定畅通':
          this.recordForm.conduit = this.result
          break
      }
    },
    hanldeShowTime (param) {
      this[param] = this.currentDate
    },
    handleSubmit () {
      let obj = {
        admitNo: '91147869',
        appraiseJson: JSON.stringify({consciousness: this.recordForm.consciousness,
          consciousnessOther: this.recordForm.consciousnessOther}), // 评估
        arrivalTime: null,
        // cardNo: '17150749',
        carrier: '卢敏慧111',
        catheterJson: JSON.stringify({
          conduitTime: this.recordForm.conduitTime,
          catheter: this.recordForm.catheter
        }), // 导管
        cureNo: '17150749',
        department: this.recordForm.department,
        goodsJson: this.recordForm.goodsJson,
        id: 0,
        inpatientWard: this.recordForm.inpatientWard,
        isDeleted: 0,
        isFile: 0,
        pointOutRoomTime: '2020-03-04 12:02:03', // 出手术间时间
        pointinRoomTime: '2020-03-04 08:49:38', // 进手术间时间
        recipient: null,
        recipientEnd: null,
        // sex: '',
        starTime: this.recordForm.starTime,
        suggest: this.recordForm.suggest
        // ward: ''
      }
      console.log(this.dialogTitle)
      switch (this.transferTitle) {
        // case '病房交接':
        //   break
        case '进手术室':
          obj.pointinRoom = JSON.stringify({pulse: this.recordForm.pulse,
            breathe: this.recordForm.breathe,
            bp: this.recordForm.bp,
            skinName: this.recordForm.skinName,
            skinPart: this.recordForm.skinPart,
            skinDegree: this.recordForm.skinDegree,
            skinSize: this.recordForm.skinSize,
            signatureImage2: this.recordForm.signatureImage2
          })
          obj.pointOutRoom = ''
          obj.pointPacu = ''
          obj.outPacu = ''
          break
        case '出手术室':
          obj.pointOutRoom = JSON.stringify({pulse: this.recordForm.pulse,
            breathe: this.recordForm.breathe,
            bp: this.recordForm.bp,
            skinName: this.recordForm.skinName,
            skinPart: this.recordForm.skinPart,
            skinDegree: this.recordForm.skinDegree,
            skinSize: this.recordForm.skinSize,
            signatureImage2: this.recordForm.signatureImage2
          })
          obj.pointinRoom = ''
          obj.pointPacu = ''
          obj.outPacu = ''
          break
        case '进PACU':
          obj.pointPacu = JSON.stringify({pulse: this.recordForm.pulse,
            breathe: this.recordForm.breathe,
            bp: this.recordForm.bp,
            skinName: this.recordForm.skinName,
            skinPart: this.recordForm.skinPart,
            skinDegree: this.recordForm.skinDegree,
            skinSize: this.recordForm.skinSize,
            signatureImage2: this.recordForm.signatureImage2
          })
          obj.pointinRoom = ''
          obj.pointOutRoom = ''
          obj.outPacu = ''
          break
        case '出PACU':
          obj.outPacu = JSON.stringify({pulse: this.recordForm.pulse,
            breathe: this.recordForm.breathe,
            bp: this.recordForm.bp,
            skinName: this.recordForm.skinName,
            skinPart: this.recordForm.skinPart,
            skinDegree: this.recordForm.skinDegree,
            skinSize: this.recordForm.skinSize,
            signatureImage2: this.recordForm.signatureImage2
          })
          obj.pointinRoom = ''
          obj.pointPacu = ''
          obj.pointOutRoom = ''
          break
        // case '病房收治':
      }
      console.log(obj)
      request({
        method: 'post',
        url: submitRecord,
        data: obj
      }).then(res => {

      })
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
    handleShowSignature () {
      this.visible = true
    },
    handleCloseSignature () {
      this.visible = false
    },
    handleChange () {
      this.showFullSkin = !this.showFullSkin
    },
    handleShowDialog (obj) {
      this.dialogTitle = obj.title
      this.result = this.recordForm[obj.model]
      this.checkBoxList = this[obj.list]
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
    .signatureImage{
      height: 300px;
      margin: 0 auto;
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
      &:last-child{
        margin-top: 15px;
      }
    }
    .van-dialog{
      font-size: 30px;
      top: 50%;
      .dialog-checkbox{
        overflow-y: auto;
        max-height: 60vh;
      }
      /deep/ .van-dialog__header{
        line-height: 80px;
        text-align: left;
        text-indent: 20px;
        border-bottom:1px solid #e2e2e2;
      }
      .van-checkbox{
        padding-left: 40px;
        border-bottom: 1PX solid #e2e2e2;
        box-sizing: border-box;
        /deep/ .van-checkbox__icon{
          line-height: 80px;
          // height: 60px;
          // width: 30px;
          height: 80px;
          vertical-align: middle;
          display: flex;
          align-items: center;
          .van-icon{
            line-height: 30px;
            width: 30px;
            height: 30px;
          }
        }
        /deep/ .van-checkbox__label{
          line-height: unset;
          margin-left: 20px;
          display: inline-block;
          height: 100%;
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
