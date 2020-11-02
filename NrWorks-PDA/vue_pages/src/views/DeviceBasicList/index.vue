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
            <li v-for="item in packageList" :key="item.insIndex">
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
import {getPackage, getPackageData, savePackageData} from '@/api/device-package'
import request from '@/utils/request'
import {mapState} from 'vuex'
export default {
  name: 'DeviceList',
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
      packageList: [],
      packageData: [],
      recordForm: {
        basicEquipment: {
          items: {
            before: [], // 术前
            adding: [], // 术中一
            adding1: [], // 术中二
            adding2: [], // 术中三
            adding3: [], // 术中四
            before2: [], // 体腔关闭前
            after: [], // 体腔关闭后
            after2: [] // 缝合后
          }
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
      if (this.packageList.length > 0) {
        request({
          method: 'get',
          url: getPackageData + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}`
          // url: getPackageData + `/91160537/17655867`
        }).then(res => {
          this.recordForm = res.data.data
          // this.recordForm.basicEquipment = JSON.parse(this.recordForm.basicEquipment)
          switch (this.active) {
            case 0:
              this.packageList = this.recordForm.basicEquipment.items.before
              this.state = this.recordForm.beforeStatus
              break
            case 1:
              this.packageList = this.recordForm.basicEquipment.items.adding
              this.state = this.recordForm.addingOne
              break
            case 2:
              this.packageList = this.recordForm.basicEquipment.items.adding1
              this.state = this.recordForm.addingTwo
              break
            case 3:
              this.packageList = this.recordForm.basicEquipment.items.adding2
              this.state = this.recordForm.addingThree
              break
            case 4:
              this.packageList = this.recordForm.basicEquipment.items.adding3
              this.state = this.recordForm.addingFour
              break
            case 5:
              this.packageList = this.recordForm.basicEquipment.items.before2
              this.state = this.recordForm.clossBefore
              break
            case 6:
              this.packageList = this.recordForm.basicEquipment.items.after
              this.state = this.recordForm.clossAfter
              break
            case 7:
              this.packageList = this.recordForm.basicEquipment.items.after2
              this.state = this.recordForm.sutureAfter
              break
          }
        })
      }
    },
    getData () {
      let deviceId = '123456'
      request({
        method: 'get',
        url: getPackage + '/' + deviceId
      }).then(res => {
        let data = res.data.data.packageDetail
        data.forEach(item => {
          item.number = 0
        })
        this.packageList = JSON.parse(JSON.stringify(data))
        this.recordForm.basicEquipment.pName = res.data.data.name
        this.recordForm.basicEquipment.pId = res.data.data.id
        this.recordForm.basicEquipment.items.before = JSON.parse(JSON.stringify(data)) // 术前
        this.recordForm.basicEquipment.items.adding = JSON.parse(JSON.stringify(data)) // 术中一
        this.recordForm.basicEquipment.items.adding1 = JSON.parse(JSON.stringify(data)) // 术中二
        this.recordForm.basicEquipment.items.adding2 = JSON.parse(JSON.stringify(data)) // 术中三
        this.recordForm.basicEquipment.items.adding3 = JSON.parse(JSON.stringify(data)) // 术中四
        this.recordForm.basicEquipment.items.before2 = JSON.parse(JSON.stringify(data)) // 体腔关闭前
        this.recordForm.basicEquipment.items.after = JSON.parse(JSON.stringify(data)) // 体腔关闭后
        this.recordForm.basicEquipment.items.after2 = JSON.parse(JSON.stringify(data)) // 缝合后
      })
    },
    onClickRight () {
      let obj = this.recordForm
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
          obj.basicEquipment.items.before = this.packageList
          obj.beforeStatus = state
          break
        case 1:
          obj.basicEquipment.items.adding = this.packageList
          obj.addingOne = state
          break
        case 2:
          obj.basicEquipment.items.adding1 = this.packageList
          obj.addingTwo = state
          break
        case 3:
          obj.basicEquipment.items.adding2 = this.packageList
          obj.addingThree = state
          break
        case 4:
          obj.basicEquipment.items.adding3 = this.packageList
          obj.addingFour = state
          break
        case 5:
          obj.basicEquipment.items.before2 = this.packageList
          obj.clossBefore = state
          break
        case 6:
          obj.basicEquipment.items.after = this.packageList
          obj.clossAfter = state
          break
        case 7:
          obj.basicEquipment.after2 = this.packageList
          obj.sutureAfter = state
      }
      obj.basicEquipment = JSON.stringify(obj.basicEquipment)
      obj.hospitalNo = this.patientInfo.hospitalNo
      obj.modifier = this.opePeopleInfo.userName
      obj.modifierCode = this.opePeopleInfo.userCode
      obj.cureNo = this.patientInfo.cureNo
      // obj.cureNo = '17655867'
      // obj.hospitalNo = '91160537'
      request({
        url: savePackageData,
        method: 'post',
        data: obj
      }).then(res => {
        this.getPackageList()
      }
      )
    },
    async handleChange (index) {
      this.active = index
      this.getPackageList()
    }
  },
  async mounted () {
    // await this.getData()
    this.getPackageList()
  },
  created () {
    document.onkeydown = (e) => {
      var key = window.event.keyCode
      if (key === 13) {
        setTimeout(() => {
          this.getData()
        }, 2000)
      }
    }
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
