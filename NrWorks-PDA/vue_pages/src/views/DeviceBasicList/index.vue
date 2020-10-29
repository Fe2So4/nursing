<template>
  <div class="device-list">
    <van-nav-bar
      title="手术物品清点与核对"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="运送"
    >
    </van-nav-bar>
    <PatientCard></PatientCard>
    <div class="list">
      <div class="tree">
        <div class="tree-left">
          <ul>
            <li v-for="item in items" :key="item.active" :class="{'active':active===item.active}" @click="handleChange(item.active)">{{item.text}}</li>
          </ul>
        </div>
        <div class="tree-right">
          <div class="title">
            <div class="title-left">
              手术敷料、基本器械、物品清点
            </div>
            <div class="title-right">已清点</div>
          </div>
          <ul>
            <li v-for="item in packageList" :key="item.insIndex">
              <van-cell :title="item.insName" value="已清点" title-class="first-cell" border>
                <template #right-icon>
                  <van-stepper v-model="item.insCount" theme="round" />
                </template>
              </van-cell>
            </li>
            <li style="border:1px solid #e2e2e2;" @click="handleSign1">
              <span class="sign-class">洗手护士签名</span>
              <span class="sign-value">{{sign1}}</span>
            </li>
            <li>
              <span class="sign-class" @click="handleSign2">巡回护士签名</span>
              <span class="sign-value">{{sign2}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatientCard from '@/components/PatientCard'
import {getPackage, getPackageData, savePackageData} from '@/api/device-package'
import request from '@/utils/request'
import {mapState} from 'vuex'
export default {
  name: 'DeviceList',
  data () {
    return {
      checked: true,
      input: '',
      showFullSkin: false,
      sign1: '',
      sign2: '',
      value1: '',
      option: [
        { text: 'PACU', value: 0 },
        { text: '病房', value: 1 },
        { text: 'ICU病房', value: 2 },
        { text: '急诊', value: 3 },
        { text: '离院', value: 4 }
      ],
      active: 0,
      stepper: '',
      items: [{ text: '术前', active: 0 }, { text: '术中(一)', active: 1 },
        { text: '术中(二)', active: 2 }, { text: '术中(三)', active: 3 }, { text: '术中(四)', active: 4 },
        { text: '体腔关闭前', active: 5 }, { text: '体腔关闭后', active: 6 }, { text: '皮肤缝合后', active: 7 }],
      packageList: [],
      packageData: [],
      recordForm: {
        basicEquipment: {
          before: [], // 术前
          adding: [], // 术中一
          adding1: [], // 术中二
          adding2: [], // 术中三
          adding3: [], // 术中四
          before2: [], // 体腔关闭前
          after: [], // 体腔关闭后
          after2: [] // 缝合后
        },
        modifier: '',
        modifierCode: '',
        xhAllClossQm: '',
        xhClossQm: '',
        xhFhQm: '',
        xhFourQm: '',
        xhOneQm: '',
        xhSqQm: '',
        xhThreeQm: '',
        xhTwoQm: '',
        xsAllClossQm: '',
        xsClossQm: '',
        xsFhQm: '',
        xsFourQm: '',
        xsOneQm: '',
        xsSqQm: '',
        xsThreeQm: '',
        xsTwoQm: ''
      }
    }
  },
  components: {
    PatientCard
  },
  computed: {
    ...mapState('Patient', ['patientInfo', 'opePeopleInfo'])
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    handleSign1 () {
      this.$dialog.confirm({
        title: '签名',
        message: '确定要签名吗？'
      }).then(() => {
        let sign = ''
        switch (this.active) {
          case 0:
            sign = 'xsSqQm'
            break
          case 1:
            sign = 'xsOneQm'
            break
          case 2:
            sign = 'xsTwoQm'
            break
          case 3:
            sign = 'xsThreeQm'
            break
          case 4:
            sign = 'xsFourQm'
            break
          case 5:
            sign = 'xsClossQm'
            break
          case 6:
            sign = 'xsAllClossQm'
            break
          case 7:
            sign = 'xsFhQm'
            break
        }
        this.sign1 = this.opePeopleInfo.userName
        this.recordForm[sign] = this.sign1
      })
    },
    handleSign2 () {
      this.$dialog.confirm({
        title: '签名',
        message: '确定要签名吗？'
      }).then(() => {
        let sign = ''
        switch (this.active) {
          case 0:
            sign = 'xhSqQm'
            break
          case 1:
            sign = 'xhOneQm'
            break
          case 2:
            sign = 'xhTwoQm'
            break
          case 3:
            sign = 'xhThreeQm'
            break
          case 4:
            sign = 'xhFourQm'
            break
          case 5:
            sign = 'xhClossQm'
            break
          case 6:
            sign = 'xhAllClossQm'
            break
          case 7:
            sign = 'xhFhQm'
            break
        }
        this.sign2 = this.opePeopleInfo.userName
        this.recordForm[sign] = this.sign2
      })
    },
    getPackageList () {
      request({
        method: 'get',
        // url: getPackageData + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}`
        url: getPackageData + `/91160537/17655867`
      }).then(res => {
        this.recordForm = res.data.data
        // this.recordForm.basicEquipment = JSON.parse(this.recordForm.basicEquipment)
        switch (this.active) {
          case 0:
            this.packageList = this.recordForm.basicEquipment.before
            break
          case 1:
            this.packageList = this.recordForm.basicEquipment.adding
            break
          case 2:
            this.packageList = this.recordForm.basicEquipment.adding1
            break
          case 3:
            this.packageList = this.recordForm.basicEquipment.adding2
            break
          case 4:
            this.packageList = this.recordForm.basicEquipment.adding3
            break
          case 5:
            this.packageList = this.recordForm.basicEquipment.before2
            break
          case 6:
            this.packageList = this.recordForm.basicEquipment.after
            break
          case 7:
            this.packageList = this.recordForm.basicEquipment.after2
            break
        }
      })
    },
    getData () {
      let deviceId = '123456'
      request({
        method: 'get',
        url: getPackage + '/' + deviceId
      }).then(res => {
        console.log(res.data.data)
        this.packageList = res.data.data.packageDetail
        this.packageData = res.data.data.packageDetail
      })
    },
    onClickRight () {
      let obj = this.recordForm
      switch (this.active) {
        case 0:
          obj.basicEquipment.before = this.packageList
          break
        case 1:
          obj.basicEquipment.adding = this.packageList
          break
        case 2:
          obj.basicEquipment.adding1 = this.packageList
          break
        case 3:
          obj.basicEquipment.adding2 = this.packageList
          break
        case 4:
          obj.basicEquipment.adding3 = this.packageList
          break
        case 5:
          obj.basicEquipment.before2 = this.packageList
          break
        case 6:
          obj.basicEquipment.after = this.packageList
          break
        case 7:
          obj.basicEquipment.after2 = this.packageList
      }
      obj.basicEquipment = JSON.stringify(obj.basicEquipment)
      // obj.cureNo = this.patientInfo.cureNo
      // obj.hospitalNo = this.patientInfo.hospitalNo
      obj.cureNo = '17655867'
      obj.hospitalNo = '91160537'
      // obj.basicEquipment = JSON.stringify(obj.basicEquipment)
      request({
        url: savePackageData,
        method: 'post',
        data: obj
      })
    },
    handleChange (index) {
      this.active = index
      switch (this.active) {
        case 0:
          this.packageList = this.recordForm.basicEquipment.before
          break
        case 1:
          this.packageList = this.recordForm.basicEquipment.adding
          break
        case 2:
          this.packageList = this.recordForm.basicEquipment.adding1
          break
        case 3:
          this.packageList = this.recordForm.basicEquipment.adding2
          break
        case 4:
          this.packageList = this.recordForm.basicEquipment.adding3
          break
        case 5:
          this.packageList = this.recordForm.basicEquipment.before2
          break
        case 6:
          this.packageList = this.recordForm.basicEquipment.after
          break
        case 7:
          this.packageList = this.recordForm.basicEquipment.after2
          break
      }
    }
  },
  mounted () {
    this.getData()
    this.getPackageList()
  }
}
</script>

<style lang="scss" scoped>
  .device-list{
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
      .tree{
        display: flex;
        height: 100%;
        .tree-left{
          width: 200px;
          ul{
            display: flex;
            flex-direction: column;
            li{
              color: #2E2E2E;
              padding: 10px 0 10px 16px;
              font-size: 30px;
              border:1PX solid #E2E2E2;
              &.active{
                color: #FFFFFF;
                background: #3377FF;
              }
            }
          }
        }
        .tree-right{
          flex: 1;
          height: 100%;
          font-size: 30px;
          .title{
            display: flex;
            justify-content: space-between;
            line-height: 104px;
            font-size: 30px;
            padding: 10px 15px;
            .title-left{

            }
            .title-right{
              color: #10C15B;
            }
          }
          ul{
            height: calc(100% - 124px);
            overflow-y: auto;
            .sign-class{
              color: #10C15B;
              line-height: 90px;
              text-indent: 15px;
              margin-left: 15px;
            }
            .sign-value{
              line-height: 90px;
              color: #0000ff;
              margin-left: 30px;
            }
          }
        }
      }
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
      .value-cell{
        color: #10C15B;
      }
      .right-value{
        .van-field{
          padding-top: 0;
          padding-bottom: 0;
        }
      }
    }
    .van-cell-group{
      &:last-child{
        height: calc(100% - 114px);
        overflow-y: auto;
      }
    }
    .list-item{
      height: 100%;
      p{
        height: 100%;
      }
    }
    /deep/ .van-stepper{
      button{
        height: 50px;
        width: 50px;
      }
      input{
        width: 90px;
        height: 50px;
      }
      /deep/ .van-stepper__input{
        font-size: 30px;
      }
      /deep/ .van-stepper__minus{
        color: #3377FF;
        border-color: #3377FF;
        border: 2px solid #3377FF;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
        &::before{
          height: 3px;
        }
      }
      /deep/ .van-stepper__plus{
        background-color: #3377FF;
        &::before{
          height: 3px;
        }
        &::after{
          width: 3px;
        }
      }
    }
  }
</style>
