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
              <!-- <p style="line-height:30px;">请扫描器械包</p> -->
            </div>
            <div class="title-right">{{state === 0 ? '未清点' : '已清点'}}</div>
          </div>
          <ul v-if="packageList.length>0">
            <li v-for="item in packageList" :key="item.insName">
              <van-cell :title="item.insName" value="已清点" title-class="first-cell" border>
                <template #right-icon>
                  <van-stepper v-model="item.number" theme="round" min='0'/>
                </template>
              </van-cell>
            </li>
            <li @click="handleSign1">
              <span class="sign-class">洗手护士签名</span>
              <span class="sign-value">{{sign1}}</span>
            </li>
            <li>
              <span class="sign-class" @click="handleSign2">巡回护士签名</span>
              <span class="sign-value">{{sign2}}</span>
            </li>
          </ul>
          <div v-else style="text-indent:15px;">
            请扫描器械包
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatientCard from '@/components/PatientCard'
import {getPackageData, savePackageData} from '@/api/device-package'
import request from '@/utils/request'
import {mapState} from 'vuex'
export default {
  insName: 'DeviceList',
  data () {
    return {
      checked: true,
      input: '',
      state: 0, // 清点状态
      showFullSkin: false,
      sign1: '',
      sign2: '',
      value1: '',
      active: 0,
      stepper: '',
      items: [{ text: '术前', active: 0 }, { text: '术中(一)', active: 1 },
        { text: '术中(二)', active: 2 }, { text: '术中(三)', active: 3 }, { text: '术中(四)', active: 4 },
        { text: '体腔关闭前', active: 5 }, { text: '体腔关闭后', active: 6 }, { text: '皮肤缝合后', active: 7 }],
      packageList: [
        { insName: '腔脑室外引流管', number: 0 },
        { insName: '小纱布', number: 0 },
        { insName: '腔镜纱布', number: 0 },
        { insName: '纱布', number: 0 },
        { insName: '纱布垫', number: 0 },
        { insName: '脑棉', number: 0 },
        { insName: '纱条', number: 0 },
        { insName: '缝针', number: 0 },
        { insName: '刀片', number: 0 },
        { insName: '切口保护器', number: 0 },
        { insName: '长电刀头', number: 0 },
        { insName: '红色尿管', number: 0 },
        { insName: '皮片', number: 0 },
        { insName: '彩带', number: 0 },
        { insName: '临时阻断夹', number: 0 },
        { insName: '花生米', number: 0 },
        { insName: '穿刺针', number: 0 },
        { insName: '纱带', number: 0 },
        { insName: '线团', number: 0 },
        { insName: '血管夹', number: 0 },
        { insName: '长针头', number: 0 },
        { insName: '清洁片', number: 0 },
        { insName: '电刀头', number: 0 }
      ],
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
      // if (this.packageList.length > 0) {
      request({
        method: 'get',
        url: getPackageData + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}`
      }).then(res => {
        let data = res.data.data
        // data.basicEquipment = JSON.parse(JSON.stringify(data.basicEquipment))
        if (!this.IsEmpty(data.basicEquipment)) {
          this.recordForm.basicEquipment = data.basicEquipment
          this.recordForm.xhAllClossQm = data.xhAllClossQm
          this.recordForm.xhClossQm = data.xhClossQm
          this.recordForm.xhFhQm = data.xhFhQm
          this.recordForm.xhFourQm = data.xhFourQm
          this.recordForm.xhOneQm = data.xhOneQm
          this.recordForm.xhSqQm = data.xhSqQm
          this.recordForm.xhThreeQm = data.xhThreeQm
          this.recordForm.xhTwoQm = data.xhTwoQm
          this.recordForm.xsAllClossQm = data.xsAllClossQm
          this.recordForm.xsClossQm = data.xsClossQm
          this.recordForm.xsFhQm = data.xsFhQm
          this.recordForm.xsFourQm = data.xsFourQm
          this.recordForm.xsOneQm = data.xsOneQm
          this.recordForm.xsSqQm = data.xsSqQm
          this.recordForm.xsThreeQm = data.xsThreeQm
          this.recordForm.xsTwoQm = data.xsTwoQm
          switch (this.active) {
            case 0:
              if (data.basicEquipment.before && data.basicEquipment.before.length > 0) {
                this.packageList = data.basicEquipment.before
              }
              this.state = data.beforeStatus
              this.sign1 = data.xsSqQm
              this.sign2 = data.xhSqQm
              break
            case 1:
              if (data.basicEquipment.adding && data.basicEquipment.adding.length > 0) {
                this.packageList = data.basicEquipment.adding
              }
              this.state = data.addingOne
              this.sign1 = data.xsOneQm
              this.sign2 = data.xhOneQm
              break
            case 2:
              if (data.basicEquipment.adding1 && data.basicEquipment.adding1.length > 0) {
                this.packageList = data.basicEquipment.adding1
              }
              this.state = data.addingTwo
              this.sign1 = data.xsTwoQm
              this.sign2 = data.xhTwoQm
              break
            case 3:
              if (data.basicEquipment.adding2 && data.basicEquipment.adding2.length > 0) {
                this.packageList = data.basicEquipment.adding2
              }
              this.state = data.addingThree
              this.sign1 = data.xsThreeQm
              this.sign2 = data.xhThreeQm
              break
            case 4:
              if (data.basicEquipment.adding3 && data.basicEquipment.adding3.length > 0) {
                this.packageList = data.basicEquipment.adding3
              }
              this.state = data.addingFour
              this.sign1 = data.xsFourQm
              this.sign2 = data.xhFourQm
              break
            case 5:
              if (data.basicEquipment.before2 && data.basicEquipment.before2.length) {
                this.packageList = data.basicEquipment.before2
              }
              this.state = data.clossBefore
              this.sign1 = data.xsClossQm
              this.sign2 = data.xhClossQm
              break
            case 6:
              if (data.basicEquipment.after && data.basicEquipment.after.length > 0) {
                this.packageList = data.basicEquipment.after
              }
              this.state = data.clossAfter
              this.sign1 = data.xsAllClossQm
              this.sign2 = data.xhAllClossQm
              break
            case 7:
              if (data.basicEquipment.after2.length > 0) {
                this.packageList = data.basicEquipment.after2
              }
              this.state = data.sutureAfter
              this.sign1 = data.xsFhQm
              this.sign2 = data.xhFhQm
              break
          }
        }
      })
      // }
    },
    onClickRight () {
      let obj = JSON.parse(JSON.stringify(this.recordForm))
      let state = 0
      for (let i = 0; i < this.packageList.length; i++) {
        if (this.packageList[i].number === 0) {
          state = 0
          break
        } else {
          state = 1
        }
      }
      switch (this.active) {
        case 0:
          obj.basicEquipment.before = this.packageList
          obj.beforeStatus = state
          break
        case 1:
          obj.basicEquipment.adding = this.packageList
          obj.addingOne = state
          break
        case 2:
          obj.basicEquipment.adding1 = this.packageList
          obj.addingTwo = state
          break
        case 3:
          obj.basicEquipment.adding2 = this.packageList
          obj.addingThree = state
          break
        case 4:
          obj.basicEquipment.adding3 = this.packageList
          obj.addingFour = state
          break
        case 5:
          obj.basicEquipment.before2 = this.packageList
          obj.clossBefore = state
          break
        case 6:
          obj.basicEquipment.after = this.packageList
          obj.clossAfter = state
          break
        case 7:
          obj.basicEquipment.after2 = this.packageList
          obj.sutureAfter = state
      }
      obj.basicEquipment = JSON.stringify(obj.basicEquipment)
      obj.hospitalNo = this.patientInfo.hospitalNo
      obj.modifier = this.opePeopleInfo.userinsName
      obj.modifierCode = this.opePeopleInfo.userCode
      obj.cureNo = this.patientInfo.cureNo
      request({
        url: savePackageData,
        method: 'post',
        data: obj
      }).then(res => {
        if (res.data.code === 200) {
          this.getPackageList()
          this.$notify({type: 'success', message: '保存成功'})
        }
      })
    },
    handleChange (index) {
      this.active = index
      this.getPackageList()
    },
    initData () {
      this.recordForm.basicEquipment.before = JSON.parse(JSON.stringify(this.packageList))
      this.recordForm.basicEquipment.adding = JSON.parse(JSON.stringify(this.packageList))
      this.recordForm.basicEquipment.adding1 = JSON.parse(JSON.stringify(this.packageList))
      this.recordForm.basicEquipment.adding2 = JSON.parse(JSON.stringify(this.packageList))
      this.recordForm.basicEquipment.adding3 = JSON.parse(JSON.stringify(this.packageList))
      this.recordForm.basicEquipment.before2 = JSON.parse(JSON.stringify(this.packageList))
      this.recordForm.basicEquipment.after = JSON.parse(JSON.stringify(this.packageList))
      this.recordForm.basicEquipment.after2 = JSON.parse(JSON.stringify(this.packageList))
    }
  },
  created () {
    this.initData()
  },
  mounted () {
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
              padding: 20px 0 20px 16px;
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
            border-top: 1PX solid #e2e2e2;
            .title-left{

            }
            .title-right{
              color: #10C15B;
            }
          }
          ul{
            height: calc(100% - 125px);
            overflow-y: auto;
            li{
              background: #ffffff;
              border-bottom:1PX solid #e2e2e2;
            }
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
