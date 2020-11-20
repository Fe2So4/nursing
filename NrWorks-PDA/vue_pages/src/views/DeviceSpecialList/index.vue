<template>
  <div class="device-list">
    <van-nav-bar
      title="手术物品清点与核对"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="保存"
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
            <div class="package" v-for="item in packageList" :key="item.pId">
              <div class="packageItem" @click="handleShowList($event)">
                <span class="packageName">{{item.pName}}（{{item.itemsList.length}}）</span>
                <span class="option" @click.stop="handleDelete(item.pId)">删除</span>
              </div>
              <div class="packageItemList">
                <!-- :style="{'display': item.showList}" -->
                <van-cell :title="_item.insName" value="已清点" title-class="first-cell" border v-for="(_item,index) in item.itemsList" :key="index">
                  <template #right-icon>
                    <van-stepper v-model="_item.number" theme="round" min="0"/>
                  </template>
              </van-cell>
              </div>
            </div>
            <div @click="handleSign1" class="sign">
              <span class="sign-class">洗手护士签名</span>
              <span class="sign-value">{{sign1}}</span>
            </div>
            <div @click="handleSign2" class="sign">
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
import $bus from '@/utils/bus'
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
      code: null,
      active: 0,
      activeName: [],
      state: 0, // 清点状态
      stepper: '',
      items: [{ text: '术前', active: 0 }, { text: '术中(一)', active: 1 },
        { text: '术中(二)', active: 2 }, { text: '术中(三)', active: 3 }, { text: '术中(四)', active: 4 },
        { text: '体腔关闭前', active: 5 }, { text: '体腔关闭后', active: 6 }, { text: '皮肤缝合后', active: 7 }],
      packageList: [],
      recordForm: {
        specialEquipment: [],
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
    handleDelete (id) {
      this.packageList.forEach((item, index) => {
        if (item.pId === id) {
          this.packageList.splice(index, 1)
        }
      })
    },
    handleShowList (e) {
      // 根据当前点击的dom，获取需要展示隐藏的dom
      var listCardsBlock = e.currentTarget.nextElementSibling
      if (listCardsBlock.style.display === 'none') {
        listCardsBlock.style.display = 'block'
      } else {
        listCardsBlock.style.display = 'none'
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
      }).then(res => {
        if (!this.IsEmpty(JSON.parse(res.data.data.specialEquipmentStr))) {
          let data = res.data.data
          this.recordForm = data
          this.recordForm.specialEquipment = JSON.parse(JSON.parse(JSON.stringify(data.specialEquipmentStr)))
          let arr = JSON.parse(JSON.parse(JSON.stringify(data.specialEquipmentStr)))
          switch (this.active) {
            case 0:
              let before = []
              arr.forEach(item => {
                before.push({pId: item.pId, pName: item.pName, itemsList: item.items.before})
              })
              this.packageList = before
              this.state = this.recordForm.beforeStatus
              this.sign1 = this.recordForm.xsSqQm
              this.sign2 = this.recordForm.xhSqQm
              break
            case 1:
              let adding = []
              arr.forEach(item => {
                adding.push({pId: item.pId, pName: item.pName, itemsList: item.items.adding})
              })
              this.packageList = adding
              this.state = this.recordForm.addingOne
              this.sign1 = this.recordForm.xsTwoQm
              this.sign2 = this.recordForm.xhTwoQm
              break
            case 2:
              let adding1 = []
              arr.forEach(item => {
                adding1.push({pId: item.pId, pName: item.pName, itemsList: item.items.adding1})
              })
              this.packageList = adding1
              this.state = this.recordForm.addingTwo
              this.sign1 = this.recordForm.xsThreeQm
              this.sign2 = this.recordForm.xhThreeQm
              break
            case 3:
              let adding2 = []
              arr.forEach(item => {
                adding2.push({pId: item.pId, pName: item.pName, itemsList: item.items.adding2})
              })
              this.packageList = adding2
              this.state = this.recordForm.addingThree
              this.sign1 = this.recordForm.xsFourQm
              this.sign2 = this.recordForm.xhFourQm
              break
            case 4:
              let adding3 = []
              arr.forEach(item => {
                adding3.push({pId: item.pId, pName: item.pName, itemsList: item.items.adding3})
              })
              this.packageList = adding3
              this.state = this.recordForm.addingFour
              break
            case 5:
              let before2 = []
              arr.forEach(item => {
                before2.push({pId: item.pId, pName: item.pName, itemsList: item.items.before2})
              })
              this.packageList = before2
              this.state = this.recordForm.clossBefore
              this.sign1 = this.recordForm.xsClossQm
              this.sign2 = this.recordForm.xhClossQm
              break
            case 6:
            // this.packageList = this.recordForm.specialEquipment.items.after
              let after = []
              arr.forEach(item => {
                after.push({pId: item.pId, pName: item.pName, itemsList: item.items.after})
              })
              this.packageList = after
              this.state = this.recordForm.clossAfter
              this.sign1 = this.recordForm.xsAllClossQm
              this.sign2 = this.recordForm.xhAllClossQm
              break
            case 7:
              let after2 = []
              arr.forEach(item => {
                after2.push({pId: item.pId, pName: item.pName, itemsList: item.items.after2})
              })
              this.packageList = after2
              this.state = this.recordForm.sutureAfter
              this.sign1 = this.recordForm.xsFhQm
              this.sign2 = this.recordForm.xhFhQm
              break
          }
        }
      }
      )
    },
    getData () {
      let deviceId = this.code
      // let deviceId = 1
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
        obj.code = data.code
        obj.pName = data.name
        obj.itemsList = data.packageDetail
        // console.log(data)
        switch (this.active) {
          case 0:
            this.recordForm.specialEquipment.push({pId: obj.pId,
              pName: data.pName,
              code: data.code,
              items: {
                before: obj.itemsList,
                adding: JSON.parse(JSON.stringify(obj.itemsList)),
                adding1: JSON.parse(JSON.stringify(obj.itemsList)),
                adding2: JSON.parse(JSON.stringify(obj.itemsList)),
                adding3: JSON.parse(JSON.stringify(obj.itemsList)),
                before2: JSON.parse(JSON.stringify(obj.itemsList)),
                after: JSON.parse(JSON.stringify(obj.itemsList)),
                after2: JSON.parse(JSON.stringify(obj.itemsList))}})
            break
          case 1:
            this.recordForm.specialEquipment.push({pId: obj.pId,
              pName: data.pName,
              code: data.code,
              items: {
                before: JSON.parse(JSON.stringify(obj.itemsList)),
                adding: obj.itemsList,
                adding1: JSON.parse(JSON.stringify(obj.itemsList)),
                adding2: JSON.parse(JSON.stringify(obj.itemsList)),
                adding3: JSON.parse(JSON.stringify(obj.itemsList)),
                before2: JSON.parse(JSON.stringify(obj.itemsList)),
                after: JSON.parse(JSON.stringify(obj.itemsList)),
                after2: JSON.parse(JSON.stringify(obj.itemsList))}})
            break
          case 2:
            this.recordForm.specialEquipment.push({pId: obj.pId,
              pName: data.pName,
              code: data.code,
              items: {
                before: JSON.parse(JSON.stringify(obj.itemsList)),
                adding: JSON.parse(JSON.stringify(obj.itemsList)),
                adding1: obj.itemsList,
                adding2: JSON.parse(JSON.stringify(obj.itemsList)),
                adding3: JSON.parse(JSON.stringify(obj.itemsList)),
                before2: JSON.parse(JSON.stringify(obj.itemsList)),
                after: JSON.parse(JSON.stringify(obj.itemsList)),
                after2: JSON.parse(JSON.stringify(obj.itemsList))}})
            break
          case 3:
            this.recordForm.specialEquipment.push({pId: obj.pId,
              pName: data.pName,
              code: data.code,
              items: {
                before: JSON.parse(JSON.stringify(obj.itemsList)),
                adding: JSON.parse(JSON.stringify(obj.itemsList)),
                adding1: JSON.parse(JSON.stringify(obj.itemsList)),
                adding2: obj.itemsList,
                adding3: JSON.parse(JSON.stringify(obj.itemsList)),
                before2: JSON.parse(JSON.stringify(obj.itemsList)),
                after: JSON.parse(JSON.stringify(obj.itemsList)),
                after2: JSON.parse(JSON.stringify(obj.itemsList))}})
            break
          case 4:
            this.recordForm.specialEquipment.push({pId: obj.pId,
              pName: data.pName,
              code: data.code,
              items: {
                before: JSON.parse(JSON.stringify(obj.itemsList)),
                adding: JSON.parse(JSON.stringify(obj.itemsList)),
                adding1: JSON.parse(JSON.stringify(obj.itemsList)),
                adding2: JSON.parse(JSON.stringify(obj.itemsList)),
                adding3: obj.itemsList,
                before2: JSON.parse(JSON.stringify(obj.itemsList)),
                after: JSON.parse(JSON.stringify(obj.itemsList)),
                after2: JSON.parse(JSON.stringify(obj.itemsList))}})
            break
          case 5:
            this.recordForm.specialEquipment.push({pId: obj.pId,
              pName: data.pName,
              code: data.code,
              items: {
                before: JSON.parse(JSON.stringify(obj.itemsList)),
                adding: JSON.parse(JSON.stringify(obj.itemsList)),
                adding1: JSON.parse(JSON.stringify(obj.itemsList)),
                adding2: JSON.parse(JSON.stringify(obj.itemsList)),
                adding3: JSON.parse(JSON.stringify(obj.itemsList)),
                before2: obj.itemsList,
                after: JSON.parse(JSON.stringify(obj.itemsList)),
                after2: JSON.parse(JSON.stringify(obj.itemsList))}})
            break
          case 6:
            this.recordForm.specialEquipment.push({pId: obj.pId,
              pName: data.pName,
              code: data.code,
              items: {
                before: JSON.parse(JSON.stringify(obj.itemsList)),
                adding: JSON.parse(JSON.stringify(obj.itemsList)),
                adding1: JSON.parse(JSON.stringify(obj.itemsList)),
                adding2: JSON.parse(JSON.stringify(obj.itemsList)),
                adding3: JSON.parse(JSON.stringify(obj.itemsList)),
                before2: JSON.parse(JSON.stringify(obj.itemsList)),
                after: obj.itemsList,
                after2: JSON.parse(JSON.stringify(obj.itemsList))}})
            break
          case 7:
            this.recordForm.specialEquipment.push({pId: obj.pId,
              pName: data.pName,
              code: data.code,
              items: {
                before: JSON.parse(JSON.stringify(obj.itemsList)),
                adding: JSON.parse(JSON.stringify(obj.itemsList)),
                adding1: JSON.parse(JSON.stringify(obj.itemsList)),
                adding2: JSON.parse(JSON.stringify(obj.itemsList)),
                adding3: JSON.parse(JSON.stringify(obj.itemsList)),
                before2: JSON.parse(JSON.stringify(obj.itemsList)),
                after: JSON.parse(JSON.stringify(obj.itemsList)),
                after2: obj.itemsList
              }})
            break
        }
        this.packageList.push(obj)
      })
    },
    onClickRight () {
      let obj = this.recordForm
      // let arr = JSON.parse(JSON.stringify(this.packageList))
      // let arr1 = JSON.parse(JSON.stringify(this.packageList))
      switch (this.active) {
        case 0:
          obj.tsBeforeStatus = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          break
        case 1:
          obj.tsAddingOne = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          break
        case 2:
          obj.tsAddingTwo = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          break
        case 3:
          obj.tsAddingThree = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          break
        case 4:
          obj.tsAddingFour = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          break
        case 5:
          obj.tsClossBefore = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          break
        case 6:
          obj.tsClossAfter = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          break
        case 7:
          obj.tsSutureAfter = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
      }
      obj.specialEquipment = JSON.stringify(obj.specialEquipment)
      obj.cureNo = this.patientInfo.cureNo
      obj.hospitalNo = this.patientInfo.hospitalNo
      obj.modifier = this.opePeopleInfo.userName
      obj.modifierCode = this.opePeopleInfo.userCode
      console.log(obj)
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
    },
    handleDeviceCode (code) {
      // 器械包条码
      if (code.indexOf('P-') !== -1) {
        this.code = code.replace('P-', '')
        this.getData()
      }
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
    this.getPackageList()
    $bus.$on('handleDeviceCode', this.handleDeviceCode)
  },
  beforeDestroy () {
    $bus.$off('handleDeviceCode')
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
          .packageContent{
            height: calc(100% - 125px);
            overflow-y: auto;
            .package{
              .packageItem{
                background: #ffffff;
                border-bottom:1PX solid #e2e2e2;
                border-top:1PX solid #e2e2e2;
                line-height: 90px;
                display: flex;
                justify-content: space-between;
                padding: 10px 15px 10px 15px;
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
                display: none;
              }
            }
             .sign-class{
              color:#10ce5a;
              line-height: 90px;
              margin-left: 15px;
            }
            .sign-value{
              line-height: 90px;
              color: #0000ff;
              margin-left: 30px;
            }
            .sign{
              background: #FFFFFF;
              &:nth-last-child(1){
                border-top: 1PX solid #e2e2e2;
              }
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
              text-indent: 15px;
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
