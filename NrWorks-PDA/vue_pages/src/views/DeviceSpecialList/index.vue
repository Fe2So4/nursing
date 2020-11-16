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
              特殊手术器械清点
            </div>
            <div class="title-right">{{state === 0 ? '未清点' : '已清点'}}</div>
          </div>
          <div class="packageContent">
            <!-- <li v-for="item in packageList" :key="item.insIndex">
              <van-cell :title="item.insName" value="已清点" title-class="first-cell" border>
                <template #right-icon>
                  <van-stepper v-model="item.number" theme="round" min="0"/>
                </template>
              </van-cell>
            </li> -->
            <div class="package" v-for="item in packageList" :key="item.pId">
              <div class="packageItem" @click="handleShowList">
                <span class="packageName">{{item.pName}}</span>
                <span class="option">删除</span>
              </div>
              <div class="packageItemList">
                <!-- :style="{'display': item.showList}" -->
                <van-cell :title="_item.insName" value="已清点" title-class="first-cell" border v-for="(_item,index) in item.items" :key="index">
                  <template #right-icon>
                    <van-stepper v-model="_item.number" theme="round" min="0"/>
                  </template>
              </van-cell>
              </div>
            </div>
            <div @click="handleSign1">
              <span class="sign-class">洗手护士签名</span>
              <span class="sign-value">{{sign1}}</span>
            </div>
            <div @click="handleSign2">
              <span class="sign-class">巡回护士签名</span>
              <span class="sign-value">{{sign2}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatientCard from '@/components/PatientCard'
import {getPackage, getPackageDataSpecial, savePackageDataSpecial} from '@/api/device-package'
import request from '@/utils/request'
import {mapState} from 'vuex'
export default {
  name: 'DeviceList',
  data () {
    return {
      checked: true,
      input: '',
      showList: 'none',
      sign1: '',
      sign2: '',
      value1: '',
      active: 0,
      activeName: [],
      state: 0, // 清点状态
      stepper: '',
      items: [{ text: '术前', active: 0 }, { text: '术中(一)', active: 1 },
        { text: '术中(二)', active: 2 }, { text: '术中(三)', active: 3 }, { text: '术中(四)', active: 4 },
        { text: '体腔关闭前', active: 5 }, { text: '体腔关闭后', active: 6 }, { text: '皮肤缝合后', active: 7 }],
      packageList: [],
      recordForm: {
        specialEquipment: [{
          items: {
            before: [], // 术前
            adding: [], // 术中一
            adding1: [], // 术中二
            adding2: [], // 术中三
            adding3: [], // 术中四
            before2: [], // 体腔关闭前
            after: [], // 体腔关闭后
            after2: [] // 缝合后
          },
          pId: '',
          pName: ''
        }],
        modifier: '',
        modifierCode: '',
        tsXhAllClossQm: '',
        tsXhClossQm: '',
        tsXhFhQm: '',
        tsXhFourQm: '',
        tsXhOneQm: '',
        tsXhSqQm: '',
        tsXhThreeQm: '',
        tsXhTwoQm: '',
        tsXsAllClossQm: '',
        tsXsClossQm: '',
        tsXsFhQm: '',
        tsXsFourQm: '',
        tsXsOneQm: '',
        tsXsSqQm: '',
        tsXsThreeQm: '',
        tsXsTwoQm: ''
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
    handleShowList () {
      if (this.showList === 'none') {
        this.showList = 'block'
      } else {
        this.showList = 'none'
      }
    },
    handleSign1 () {
      this.$dialog.confirm({
        title: '签名',
        message: '确定要签名吗？'
      }).then(() => {
        let sign = ''
        switch (this.active) {
          case 0:
            sign = 'tsXsSqQm'
            break
          case 1:
            sign = 'tsXsOneQm'
            break
          case 2:
            sign = 'tsXsTwoQm'
            break
          case 3:
            sign = 'tsXsThreeQm'
            break
          case 4:
            sign = 'tsXsFourQm'
            break
          case 5:
            sign = 'tsXsClossQm'
            break
          case 6:
            sign = 'tsXsAllClossQm'
            break
          case 7:
            sign = 'tsXsFhQm'
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
            sign = 'tsXhSqQm'
            break
          case 1:
            sign = 'tsXhOneQm'
            break
          case 2:
            sign = 'tsXhTwoQm'
            break
          case 3:
            sign = 'tsXhThreeQm'
            break
          case 4:
            sign = 'tsXhFourQm'
            break
          case 5:
            sign = 'tsXhClossQm'
            break
          case 6:
            sign = 'tsXhAllClossQm'
            break
          case 7:
            sign = 'tsXhFhQm'
            break
        }
        this.sign2 = this.opePeopleInfo.userName
        this.recordForm[sign] = this.sign2
      })
    },
    getPackageList () {
      request({
        method: 'get',
        url: getPackageDataSpecial + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}`
        // url: getPackageDataSpecial + `/91160537/17655867`
      }).then(res => {
        if (res.data.data.specialEquipment) {
          this.recordForm = res.data.data
          // this.recordForm.specialEquipment = JSON.parse(this.recordForm.specialEquipment)
          switch (this.active) {
            case 0:
              this.packageList = this.recordForm.specialEquipment.items.before
              this.state = this.recordForm.beforeStatus
              this.sign1 = this.recordForm.xsSqQm
              this.sign2 = this.recordForm.xhSqQm
              break
            case 1:
              this.packageList = this.recordForm.specialEquipment.items.adding
              this.state = this.recordForm.addingOne
              this.sign1 = this.recordForm.xsTwoQm
              this.sign2 = this.recordForm.xhTwoQm
              break
            case 2:
              this.packageList = this.recordForm.specialEquipment.items.adding1
              this.state = this.recordForm.addingTwo
              this.sign1 = this.recordForm.xsThreeQm
              this.sign2 = this.recordForm.xhThreeQm
              break
            case 3:
              this.packageList = this.recordForm.specialEquipment.items.adding2
              this.state = this.recordForm.addingThree
              this.sign1 = this.recordForm.xsFourQm
              this.sign2 = this.recordForm.xhFourQm
              break
            case 4:
              this.packageList = this.recordForm.specialEquipment.items.adding3
              this.state = this.recordForm.addingFour
              break
            case 5:
              this.packageList = this.recordForm.specialEquipment.items.before2
              this.state = this.recordForm.clossBefore
              this.sign1 = this.recordForm.xsClossQm
              this.sign2 = this.recordForm.xhClossQm
              break
            case 6:
              this.packageList = this.recordForm.specialEquipment.items.after
              this.state = this.recordForm.clossAfter
              this.sign1 = this.recordForm.xsAllClossQm
              this.sign2 = this.recordForm.xhAllClossQm
              break
            case 7:
              this.packageList = this.recordForm.specialEquipment.items.after2
              this.state = this.recordForm.sutureAfter
              this.sign1 = this.recordForm.xsFhQm
              this.sign2 = this.recordForm.xhFhQm
              break
          }
        }
      })
    },
    getData () {
      let deviceId = '123456'
      request({
        method: 'get',
        url: getPackage + '/' + deviceId
      }).then(res => {
        let data = res.data.data
        data.packageDetail.forEach(item => {
          item.number = 0
        })
        let obj = {}
        obj.pId = data.id
        obj.pName = data.name
        obj.items = data.packageDetail
        this.packageList.push(obj)
        // this.recordForm.push()
        // this.packageList = JSON.parse(JSON.stringify(data))
        // this.recordForm.specialEquipment.pName = res.data.name
        // this.recordForm.specialEquipment.pId = res.data.id
        // this.recordForm.specialEquipment.items.before = JSON.parse(JSON.stringify(data)) // 术前
        // this.recordForm.specialEquipment.items.adding = JSON.parse(JSON.stringify(data)) // 术中一
        // this.recordForm.specialEquipment.items.adding1 = JSON.parse(JSON.stringify(data)) // 术中二
        // this.recordForm.specialEquipment.items.adding2 = JSON.parse(JSON.stringify(data)) // 术中三
        // this.recordForm.specialEquipment.items.adding3 = JSON.parse(JSON.stringify(data)) // 术中四
        // this.recordForm.specialEquipment.items.before2 = JSON.parse(JSON.stringify(data)) // 体腔关闭前
        // this.recordForm.specialEquipment.items.after = JSON.parse(JSON.stringify(data)) // 体腔关闭后
        // this.recordForm.specialEquipment.items.after2 = JSON.parse(JSON.stringify(data)) // 缝合后
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
          obj.specialEquipment[0].items.before = this.packageList
          obj.tsBeforeStatus = state
          break
        case 1:
          obj.specialEquipment[0].items.adding = this.packageList
          obj.tsAddingOne = state
          break
        case 2:
          obj.specialEquipment[0].items.adding1 = this.packageList
          obj.tsAddingTwo = state
          break
        case 3:
          obj.specialEquipment[0].items.adding2 = this.packageList
          obj.tsAddingThree = state
          break
        case 4:
          obj.specialEquipment[0].items.adding3 = this.packageList
          obj.tsAddingFour = state
          break
        case 5:
          obj.specialEquipment[0].items.before2 = this.packageList
          obj.tsClossBefore = state
          break
        case 6:
          obj.specialEquipment[0].items.after = this.packageList
          obj.tsClossAfter = state
          break
        case 7:
          obj.specialEquipment[0].items.after2 = this.packageList
          obj.tsSutureAfter = state
      }
      obj.specialEquipment = JSON.stringify(obj.specialEquipment)
      obj.cureNo = this.patientInfo.cureNo
      obj.hospitalNo = this.patientInfo.hospitalNo
      // obj.cureNo = '17655867'
      obj.modifier = this.opePeopleInfo.userName
      obj.modifierCode = this.opePeopleInfo.userCode
      // obj.hospitalNo = '91160537'
      request({
        url: savePackageDataSpecial,
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
  created () {
    document.onkeydown = (e) => {
      var key = window.event.keyCode
      if (key === 13) {
        setTimeout(() => {
          this.getData()
        }, 2000)
      }
    }
  },
  async mounted () {
    // await this.getData()
    // this.getPackageList()
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
          .packageContent{
            height: calc(100% - 124px);
            overflow-y: auto;
            .package{
              .packageItem{
                background: #ffffff;
                border-bottom:1PX solid #e2e2e2;
                border-top:1PX solid #e2e2e2;
                line-height: 90px;
                display: flex;
                justify-content: space-between;
                padding: 0 15px 0 15px;
                .packageName{
                  color: #3377FF;
                }
                .option{
                  color: red;
                }
                &.package-item-between{
                  justify-content: space-between;
                }
              }
              .packageItemList{

              }
            }
             .sign-class{
              color: hsl(145, 85%, 41%);
              line-height: 90px;
              // text-indent: 15px;
            }
            .sign-value{
              line-height: 90px;
              color: #0000ff;
              margin-left: 30px;
            }
          }
          ul{
            height: calc(100% - 124px);
            li{
              background: #ffffff;
              border-bottom:1PX solid #e2e2e2;
              line-height: 90px;
              display: flex;
              padding: 0 15px 0 15px;
              &.package{
                justify-content: space-between;
              }
            }
            .sign-class{
              color: hsl(145, 85%, 41%);
              line-height: 90px;
              // text-indent: 15px;
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
