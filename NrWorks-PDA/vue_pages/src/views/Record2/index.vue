<template>
  <div class="record2">
    <van-nav-bar
      title="护理记录单(二)"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="保存"
    >
    </van-nav-bar>
    <PatientCard></PatientCard>
    <div class="list">
      <van-cell-group>
        <van-cell title="手术科室：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="recordForm.department"/>
          </template>
        </van-cell>
        <van-cell title="手术方式：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="recordForm.opsName"/>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top:15px;">
        <van-cell title="手术类型：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.opsType" :options="typeOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="术前意识评估：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.consciousness" :options="consciousnessOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="术前皮肤评估：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.skin" :options="skinOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell-group v-show="recordForm.skin === '2'">
          <van-cell title="部位：" value="内容" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.locate"/>
            </template>
          </van-cell>
          <van-cell title="程度：" value="内容" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.degree"/>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell title="麻醉方式：" value="内容" @click="handleShowDialog({list:'anesMethodOptions',model:'anesthesiaMode',title:'麻醉方式'})">
          <template #right-icon>
            <van-icon name="play"/>
          </template>
        </van-cell>
        <van-cell title="手术体位：" value="内容" @click="handleShowDialog({list:'bodyOptions',model:'position',title:'手术体位'})">
          <template #right-icon>
            <van-icon name="play"/>
          </template>
        </van-cell>
        <van-cell title="体位装置：" value="内容" @click="handleShowDialog({list:'deviceOptions',model:'device',title:'体位装置'})">
          <template #right-icon>
            <van-icon name="play"/>
          </template>
        </van-cell>
        <van-cell title="约束带：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.constraint" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="导尿管：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.catheterName" :options="catheterOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell v-show="recordForm.catheterName==='1' || recordForm.catheterName==='2'" title="插入者" title-class="sign-title" @click="handleShowSignature('catheterSign')"></van-cell>
        <div style="padding:0 16px;">
          <div class="signatureImage-content" v-if="recordForm.catheterSign!==''">
            <img :src="recordForm.catheterSign" alt="" class="signatureImage">
          </div>
        </div>
        <van-cell title="电刀：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.electrotome" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="电切功率：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.electrotomeDQ" :options="wOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="电凝功率：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.electrotomeDN" :options="wOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="电极板位置：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="气囊止血机：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="术中冲洗：" value="内容" @click="handleShowDialog">
          <template #right-icon>
            <van-icon name="play"/>
          </template>
        </van-cell>
        <van-cell title="腰穿留置：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="术中特殊交班：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="术中冰冻：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="病理：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="植入物：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="术中可观察的受压部位皮肤：" style="background:#E8E8E8;">
        </van-cell>
        <van-cell title="2小时" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="皮损情况">
        </van-cell>
        <van-cell title="4小时" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="6小时" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="8小时" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="10小时" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="12小时" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="14小时" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="16小时" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="sign-area">
        <van-cell title="巡回护士签名" title-class="sign-title"></van-cell>
        <div v-if="recordForm.runNurse!==''" style="text-align:center;">
          <img :src="recordForm.runNurse" alt="" class="signatureImage">
        </div>
        <van-cell title="术中交接班">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF" direction="up">
              <van-dropdown-item v-model="value1" :options="option" />
            </van-dropdown-menu>
          </template>
        </van-cell>
      </van-cell-group>
      <van-dialog width="80%" v-model="showDialog" show-cancel-button
      :title="dialogTitle" :before-close="handleCloseDialog" @confirm="handleDialogConfirm">
        <div class="dialog-checkbox">
          <van-checkbox-group v-model="result">
            <van-checkbox v-for="item in checkBoxList" :key="item.value" :name="item.value" shape="square">{{item.text}}</van-checkbox>
          </van-checkbox-group>
        </div>
      </van-dialog>
    </div>
    <signature :visible="visible" v-if="visible" @handleClose="handleCloseSignature" @handleSubmit="handleSubmitImage"/>
  </div>
</template>

<script>
import Signature from '@/components/Signature'
import PatientCard from '@/components/PatientCard'
import request from '@/utils/request'
import {mapState} from 'vuex'
export default {
  name: 'Record2',
  data () {
    return {
      checked: true,
      visible: false,
      input: '',
      checkBoxList: [],
      dialogTitle: '',
      showDialog: false,
      showFullSkin: false,
      currenSign: '',
      value1: '',
      option: [
        { text: 'PACU', value: '1' },
        { text: '病房', value: '2' },
        { text: 'ICU病房', value: '3' },
        { text: '急诊', value: '4' },
        { text: '离院', value: '5' }
      ],
      result: [],
      wOptions: [20, 21, 22, 23, 24],
      catheterOptions: [{text: '无', value: '1'}, {text: '病房带入', value: '2'}, {text: '手术室插入', value: '3'}],
      constraintOptions: [{value: '1', text: '无'}, {value: '2', text: '有'}], // 约束带
      bodyOptions: [{text: '仰卧位', value: '1'},
        {text: '俯卧位', value: '2'},
        {text: '左侧卧位', value: '3'},
        {text: '右侧卧位', value: '4'},
        {text: '左侧俯卧位', value: '5'},
        {text: '右侧俯卧位', value: '6'},
        {text: '坐位', value: '7'},
        {text: '俯卧位', value: '8'}
      ],
      deviceOptions: [
        {text: '肩垫', value: '1'},
        {text: '腋垫', value: '2'},
        {text: '胸垫', value: '3'},
        {text: '背垫', value: '4'},
        {text: '腰垫', value: '5'},
        {text: '肘垫', value: '6'},
        {text: '两脚间垫', value: '7'},
        {text: '膝垫', value: '8'},
        {text: '后跟垫', value: '9'},
        {text: '其他', value: '10'},
        {text: '无', value: '11'}
      ],
      anesMethodOptions: [{text: '全麻', value: '1'}, {text: '臂丛麻醉', value: '2'}, {text: '硬膜外麻醉', value: '3'},
        {text: '丛麻醉', value: '4'}, {text: '跟阻麻醉', value: '5'}, {text: '静脉麻醉', value: '6'}, {text: '腰麻', value: '7'},
        {text: '颈从麻醉', value: '8'}, {text: '局麻监护', value: '9'}, {text: '局麻', value: '10'}, {text: '唤醒麻醉', value: '11'}],
      typeOptions: [
        {
          text: '择期',
          value: '1'
        },
        {
          text: '非择期',
          value: '2'
        },
        {
          text: '急诊',
          value: '3'
        }
      ],
      skinOptions: [{text: '完整', value: '1'}, {text: '不完整', value: '2'}],
      consciousnessOptions: [{text: '清醒', value: '1'}, {text: '烦躁', value: '2'}, {text: '昏迷', value: '3'}],
      recordForm: {
        admitNo: '',
        runNurse: '',
        anesthesiaMode: [],
        catheter: {},
        // 导管
        catheterName: '', // 插管类型
        catheterSign: '', // 插管人姓名
        // 电刀
        electrotome: '', // 电刀名称
        electrotomeDQ: '', // 电切功率
        electrotomeDN: '', // 电凝功率
        compressedSkin: {},
        consciousness: '',
        constraint: '',
        cureNo: '',
        department: '',
        device: [],
        diagnosis: '',
        equipment: {},
        fileCode: '',
        fileName: '',
        fileTime: '',
        frozen: {},
        handOver: {},
        id: 0,
        implants: '',
        isDeleted: 0,
        isFile: 0,
        nursesSignature: {},
        opsChange: {},
        opsDate: '',
        opsMode: '',
        opsName: '',
        opsRoom: '',
        opsType: '',
        pathology: {},
        patientInfo: '',
        patientName: '',
        position: [],
        rinse: {},
        skin: '',
        waistPuncture: {},
        locate: '',
        degree: ''
      }
    }
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  components: {
    Signature, PatientCard
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    handleShowSignature (param) {
      this.currenSign = param
      this.visible = true
    },
    handleCloseSignature () {
      this.visible = false
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
    handleSubmitImage (image) {
      this.recordForm[this.currenSign] = image
    },
    onClickRight () {
      request()
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
  }
}
</script>

<style lang="scss" scoped>
  .record2{
    height: 100%;
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
      /deep/ .van-icon-play{
        transform: rotate(90deg);
        font-size: 20px;
      }
    }
    .van-cell{
      .van-cell__value{
        color: #7F7F7F;
      }
      .sign-title{
        color: #32db64;
      }
    }
    .van-cell-group{
      &.sign-area{
        margin-top: 15px;
        margin-bottom: 15px;
        .van-cell{
          .van-cell__value{
            color: #7F7F7F;
          }
          .sign-title{
            color: #32db64;
          }
        }
      }
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
    .van-overlay{
      background-color: rgba(0,0,0,0.5);
    }
  }
</style>
