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
    <PatientCard :radius="true"></PatientCard>
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
            <div class="package" v-for="(item,index) in packageList" :key="item.pId + index + active">
              <div class="packageItem" @click="handleShowList($event)">
                <span class="packageName">{{item.pName}}（{{item.items.length}}）</span>
                <span>
                  <span class="ensure-option" v-show="!item.isEnsure" @click.stop="handleEnsure(item)">确认清点</span>
                  <span class="option" @click.stop="handleDelete(item.pId)">删除</span>
                </span>
              </div>
              <div class="packageItemList" ref="packageDetailList">
                <van-cell :title="_item.insName" value="已清点" :title-class="{'first-cell':true,'un-ensure':changeColor(_item)}" border v-for="(_item,i) in item.items" :key="i">
                  <template #right-icon>
                    <span v-show="!item.isEnsure">确认数量</span>
                    <div class="stepper-content" style="display:flex;justify-content:flex-end;">
                      <span class="all-number" v-show="active === 5 || active === 6 || active === 7">{{ _item[_item.type] }}</span>
                      <van-stepper v-show="item.isEnsure" v-model="_item.number" theme="round" min="0"/>
                    </div>
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
    <van-dialog v-model="confirmDialog" title="提示" :show-cancel-button="false" @confirm="handleConfirm">
      <div class="clearBox">
        <ul>
          <li style="text-align:center;line-height:60px;">以下器械清点数量不匹配，请重新核对！</li>
          <li v-for="(item,index) in clearList" :key="index">
            <p class="packageName">包名：<span>{{item.pName}}</span></p>
            <div class="clearItem">
              <p v-for="_item in item.list" :key="_item.name">
                <span style="flex:1;">器械：<span style="color:red;">{{_item.name}}</span></span>
                <span style="margin:0 40px;">数量：<span style="color:#3377FF;">{{_item.clear}}</span></span>
                <span>已清点：<span style="color:red;">{{_item.number}}</span></span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </van-dialog>
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
      confirmDialog: false,
      clearList: [],
      state: 0, // 清点状态
      stepper: '',
      items: [{ text: '术前', active: 0 }, { text: '术中(一)', active: 1 },
        { text: '术中(二)', active: 2 }, { text: '术中(三)', active: 3 }, { text: '术中(四)', active: 4 },
        { text: '体腔关闭前', active: 5 }, { text: '体腔关闭后', active: 6 }, { text: '皮肤缝合后', active: 7 }],
      packageList: [],
      recordForm: {
        specialEquipment: {
          before: [],
          adding: [],
          adding1: [],
          adding2: [],
          adding3: [],
          before2: [],
          after: [],
          after2: [],
          allList: []
        },
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
    changeColor (item) {
      switch (this.active) {
        case 5:
          if (item.number === item[item.type]) {
            return false
          } else {
            return true
          }
        case 6:
          if (item.number === item[item.type]) {
            return false
          } else {
            return true
          }
        case 7:
          if (item.number === item[item.type]) {
            return false
          } else {
            return true
          }
      }
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    handleEnsure (item) {
      item.isEnsure = true
      // this.packageList.forEach(_item => {
      //   if (_item.pId === item.pId) {
      //     _item.isEnsure = true
      //   }
      // })
    },
    handleDelete (id) {
      this.packageList.forEach((item, index) => {
        if (item.pId === id) {
          this.packageList.splice(index, 1)
        }
      })
      this.recordForm.specialEquipment.before.forEach((item, index) => {
        if (item.pId === id) {
          this.recordForm.specialEquipment.before.splice(index, 1)
        }
      })
      this.recordForm.specialEquipment.adding.forEach((item, index) => {
        if (item.pId === id) {
          this.recordForm.specialEquipment.adding.splice(index, 1)
        }
      })
      this.recordForm.specialEquipment.adding1.forEach((item, index) => {
        if (item.pId === id) {
          this.recordForm.specialEquipment.adding1.splice(index, 1)
        }
      })
      this.recordForm.specialEquipment.adding2.forEach((item, index) => {
        if (item.pId === id) {
          this.recordForm.specialEquipment.adding2.splice(index, 1)
        }
      })
      this.recordForm.specialEquipment.adding3.forEach((item, index) => {
        if (item.pId === id) {
          this.recordForm.specialEquipment.adding3.splice(index, 1)
        }
      })
      this.recordForm.specialEquipment.before2.forEach((item, index) => {
        if (item.pId === id) {
          this.recordForm.specialEquipment.before2.splice(index, 1)
        }
      })
      this.recordForm.specialEquipment.after.forEach((item, index) => {
        if (item.pId === id) {
          this.recordForm.specialEquipment.after.splice(index, 1)
        }
      })
      this.recordForm.specialEquipment.after2.forEach((item, index) => {
        if (item.pId === id) {
          this.recordForm.specialEquipment.after2.splice(index, 1)
        }
      })
      this.recordForm.specialEquipment.allList.forEach((item, index) => {
        if (item.pId === id) {
          this.recordForm.specialEquipment.allList.splice(index, 1)
        }
      })
    },
    handleShowList (e) {
      // 根据当前点击的dom，获取需要展示隐藏的dom
      var listCardsBlock = e.currentTarget.nextElementSibling
      if (listCardsBlock.style.display === '' || listCardsBlock.style.display === 'none') {
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
        url: getPackageDataSpecial + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}/${this.patientInfo.operSchNo}`
      }).then(res => {
        if (!this.IsEmpty(JSON.parse(res.data.data.specialEquipmentStr))) {
          let data = res.data.data
          data.specialEquipment = JSON.parse(JSON.parse(JSON.stringify(data.specialEquipmentStr)))
          data.tsXsSqQm = data.xsSqQm
          data.tsXhSqQm = data.xhSqQm
          data.tsXsOneQm = data.xsOneQm
          data.tsXhOneQm = data.xhOneQm
          data.tsXsTwoQm = data.xsTwoQm
          data.tsXhTwoQm = data.xhTwoQm
          data.tsXsThreeQm = data.xsThreeQm
          data.tsXhThreeQm = data.xhThreeQm
          data.tsXsFourQm = data.xsFourQm
          data.tsXhFourQm = data.xhFourQm
          data.tsXsClossQm = data.xsCloseQm
          data.tsXhClossQm = data.xhCloseQm
          data.tsXsAllClossQm = data.xsAllClossQm
          data.tsXhAllClossQm = data.xhAllClossQm
          data.tsXsFhQm = data.xsFhQm
          data.tsXhFhQm = data.xhFhQm
          switch (this.active) {
            case 0:
              this.packageList = JSON.parse(JSON.stringify(data.specialEquipment.before))
              this.state = data.beforeStatus
              this.sign1 = data.xsSqQm
              this.sign2 = data.xhSqQm
              break
            case 1:
              this.packageList = JSON.parse(JSON.stringify(data.specialEquipment.adding))
              this.state = data.addingOne
              this.sign1 = data.xsOneQm
              this.sign2 = data.xhOneQm
              break
            case 2:
              this.packageList = JSON.parse(JSON.stringify(data.specialEquipment.adding1))
              this.state = data.addingTwo
              this.sign1 = data.xsTwoQm
              this.sign2 = data.xhTwoQm
              break
            case 3:
              this.packageList = JSON.parse(JSON.stringify(data.specialEquipment.adding2))
              this.state = data.addingThree
              this.sign1 = data.xsThreeQm
              this.sign2 = data.xhThreeQm
              break
            case 4:
              this.packageList = JSON.parse(JSON.stringify(data.specialEquipment.adding3))
              this.state = data.addingFour
              this.sign1 = data.xsFourQm
              this.sign2 = data.xhFourQm
              break
            case 5:
              let before2 = data.specialEquipment.before2
              before2.forEach(item => {
                item.items.forEach(_item => {
                  _item.number = _item.before2
                })
              })
              this.packageList = before2
              this.state = data.clossBefore
              this.sign1 = data.xsClossQm
              this.sign2 = data.xhClossQm
              break
            case 6:
              let after = data.specialEquipment.after
              after.forEach(item => {
                item.items.forEach(_item => {
                  _item.number = _item.after
                })
              })
              this.packageList = after
              this.state = data.clossAfter
              this.sign1 = data.xsAllClossQm
              this.sign2 = data.xhAllClossQm
              break
            case 7:
              let after2 = data.specialEquipment.after2
              after2.forEach(item => {
                item.items.forEach(_item => {
                  _item.number = _item.after2
                })
              })
              this.packageList = after2
              this.state = data.sutureAfter
              this.sign1 = data.xsFhQm
              this.sign2 = data.xhFhQm
              break
          }
          this.recordForm = data
          this.packageList.forEach(item => {
            item.submit = '1'
          })
        } else {
          this.packageList = []
        }
      }
      )
    },
    getData () {
      let deviceId = this.code
      request({
        method: 'get',
        url: getPackage + '/' + deviceId
      }).then(res => {
        let data = res.data.data
        data.packageDetail.forEach(item => {
          item.number = parseInt(item.insCount)
        })
        let obj = {}
        obj.pId = data.id
        obj.code = data.code
        obj.pName = data.name
        obj.isEnsure = false
        obj.items = data.packageDetail
        switch (this.active) {
          case 0:
            data.packageDetail.forEach(item => {
              item.before = parseInt(item.insCount)
              item.adding = 0
              item.adding1 = 0
              item.adding2 = 0
              item.adding3 = 0
              item.before2 = 0
              item.after = 0
              item.after2 = 0
              item.type = 'before'
            })
            this.recordForm.specialEquipment.before.push({pId: obj.pId,
              pName: obj.pName,
              code: data.code,
              isEnsure: obj.isEnsure,
              submit: '0',
              items: data.packageDetail
            })
            break
          case 1:
            data.packageDetail.forEach(item => {
              item.before = 0
              item.adding = item.insCount
              item.adding1 = 0
              item.adding2 = 0
              item.adding3 = 0
              item.before2 = 0
              item.after = 0
              item.after2 = 0
              item.type = 'adding'
            })
            this.recordForm.specialEquipment.adding.push({
              pId: obj.pId,
              pName: obj.pName,
              code: data.code,
              submit: '0',
              isEnsure: obj.isEnsure,
              items: data.packageDetail
            })
            break
          case 2:
            data.packageDetail.forEach(item => {
              item.before = 0
              item.adding = 0
              item.adding1 = item.insCount
              item.adding2 = 0
              item.adding3 = 0
              item.before2 = 0
              item.after = 0
              item.after2 = 0
              item.type = 'adding1'
            })
            this.recordForm.specialEquipment.adding1.push({
              pId: obj.pId,
              pName: obj.pName,
              code: data.code,
              submit: '0',
              isEnsure: obj.isEnsure,
              items: data.packageDetail
            })
            break
          case 3:
            data.packageDetail.forEach(item => {
              item.before = 0
              item.adding = 0
              item.adding1 = 0
              item.adding2 = item.insCount
              item.adding3 = 0
              item.before2 = 0
              item.after = 0
              item.after2 = 0
              item.type = 'adding2'
            })
            this.recordForm.specialEquipment.adding2.push({
              pId: obj.pId,
              pName: obj.pName,
              code: data.code,
              submit: '0',
              isEnsure: obj.isEnsure,
              items: data.packageDetail
            })
            break
          case 4:
            data.packageDetail.forEach(item => {
              item.before = 0
              item.adding = 0
              item.adding1 = 0
              item.adding2 = 0
              item.adding3 = item.insCount
              item.before2 = 0
              item.after = 0
              item.after2 = 0
              item.type = 'adding3'
            })
            this.recordForm.specialEquipment.adding3.push({
              pId: obj.pId,
              pName: obj.pName,
              code: data.code,
              submit: '0',
              isEnsure: obj.isEnsure,
              items: data.packageDetail
            })
            break
        }
        this.packageList.push({pId: obj.pId,
          pName: obj.pName,
          code: data.code,
          submit: '0',
          isEnsure: obj.isEnsure,
          items: data.packageDetail})
      })
    },
    handleConfirm () {
      this.confirmDialog = false
    },
    onClickRight () {
      if (this.active === 0 || this.active === 1 || this.active === 2 || this.active === 3 || this.active === 4) {
        this.packageList.forEach(item => {
          if (!item.isEnsure) {
            this.$dialog.alert({
              title: '提示',
              message: '请先完成数量确认'
            }).then(() => {
              // on close
            })
            return false
          }
        })
        this.handleSubmit()
      } else if (this.active === 5 || this.active === 6 || this.active === 7) {
        let arr = []
        let items = []
        this.packageList.forEach(item => {
          item.items.forEach(_item => {
            if (_item.number !== _item[_item.type]) {
              items.push({ name: _item.insName, number: _item.number, clear: _item[_item.type] })
            }
          })
          if (items.length) {
            arr.push({pName: item.pName, list: items})
          }
        }
        )
        if (arr.length > 0) {
          this.confirmDialog = true
          this.clearList = arr
        } else {
          this.handleSubmit()
        }
      }
    },
    handleSubmit () {
      let obj = this.recordForm
      switch (this.active) {
        case 0:
          obj.tsBeforeStatus = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          obj.specialEquipment.before = this.packageList
          obj.specialEquipment.before.forEach(item => {
            item.items.forEach(_item => {
              _item.before = _item.number
            })
            if (item.submit === '0') {
              obj.specialEquipment.before2.push(item)
              obj.specialEquipment.after.push(item)
              obj.specialEquipment.after2.push(item)
              obj.specialEquipment.allList.push(item)
            }
          })
          break
        case 1:
          obj.tsAddingOne = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          obj.specialEquipment.adding = this.packageList
          obj.specialEquipment.adding.forEach(item => {
            item.items.forEach(_item => {
              _item.adding = _item.number
            })
            if (item.submit === '0') {
              obj.specialEquipment.before2.push(item)
              obj.specialEquipment.after.push(item)
              obj.specialEquipment.after2.push(item)
              obj.specialEquipment.allList.push(item)
            }
          })
          break
        case 2:
          obj.tsAddingTwo = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          obj.specialEquipment.adding1 = this.packageList
          obj.specialEquipment.adding1.forEach(item => {
            item.items.forEach(_item => {
              _item.adding1 = _item.number
            })
            if (item.submit === '0') {
              obj.specialEquipment.before2.push(item)
              obj.specialEquipment.after.push(item)
              obj.specialEquipment.after2.push(item)
              obj.specialEquipment.allList.push(item)
            }
          })
          break
        case 3:
          obj.tsAddingThree = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          obj.specialEquipment.adding2 = this.packageList
          obj.specialEquipment.adding2.forEach(item => {
            item.items.forEach(_item => {
              _item.adding2 = _item.number
            })
            if (item.submit === '0') {
              obj.specialEquipment.before2.push(item)
              obj.specialEquipment.after.push(item)
              obj.specialEquipment.after2.push(item)
              obj.specialEquipment.allList.push(item)
            }
          })
          break
        case 4:
          obj.tsAddingFour = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          obj.specialEquipment.adding3 = this.packageList
          obj.specialEquipment.adding3.forEach(item => {
            item.items.forEach(_item => {
              _item.adding3 = _item.number
            })
            if (item.submit === '0') {
              obj.specialEquipment.before2.push(item)
              obj.specialEquipment.after.push(item)
              obj.specialEquipment.after2.push(item)
              obj.specialEquipment.allList.push(item)
            }
          })
          break
        case 5:
          obj.tsClossBefore = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          // obj.specialEquipment.before2 = this.packageList
          obj.specialEquipment.before2.forEach(item => {
            item.items.forEach(_item => {
              _item.before2 = _item.number
            })
            obj.specialEquipment.allList.forEach(allItem => {
              if (allItem.pId === item.pId) {
                allItem.items.forEach(_allItem => {
                  item.items.forEach(_item => {
                    if (_allItem.insName === _item.insName) {
                      _allItem.before2 = _item.number
                    }
                  })
                })
              }
            })
          })
          break
        case 6:
          obj.tsClossAfter = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          // obj.specialEquipment.after = this.packageList
          obj.specialEquipment.after.forEach(item => {
            item.items.forEach(_item => {
              _item.after = _item.number
            })
            obj.specialEquipment.allList.forEach(allItem => {
              if (allItem.pId === item.pId) {
                allItem.items.forEach(_allItem => {
                  item.items.forEach(_item => {
                    if (_allItem.insName === _item.insName) {
                      _allItem.after = _item.number
                    }
                  })
                })
              }
            })
          })
          break
        case 7:
          obj.tsSutureAfter = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          // obj.specialEquipment.after2 = this.packageList
          obj.specialEquipment.after2.forEach(item => {
            item.items.forEach(_item => {
              _item.after2 = _item.number
            })
            obj.specialEquipment.allList.forEach(allItem => {
              if (allItem.pId === item.pId) {
                allItem.items.forEach(_allItem => {
                  item.items.forEach(_item => {
                    if (_allItem.insName === _item.insName) {
                      _allItem.after2 = _item.number
                    }
                  })
                })
              }
            })
          })
      }
      obj.specialEquipment = JSON.stringify(obj.specialEquipment)
      obj.cureNo = this.patientInfo.cureNo
      obj.hospitalNo = this.patientInfo.hospitalNo
      obj.operSchNo = this.patientInfo.operSchNo
      obj.modifier = this.opePeopleInfo.userName
      obj.modifierCode = this.opePeopleInfo.userCode
      request({
        url: savePackageDataSpecial,
        method: 'post',
        data: obj
      }).then(res => {
        if (res.data.code === 200) {
          this.$notify({type: 'success', message: '保存成功'})
          this.getPackageList()
        }
      }
      )
    },
    async handleChange (index) {
      this.active = index
      // let Olist = this.$refs.packageDetailList
      // Olist.forEach(item => {
      //   item.style.display = 'none'
      // })
      this.$forceUpdate()
      this.getPackageList()
    },
    handleDeviceCode (code) {
      alert(code)
      if (this.active === 5 || this.active === 6 || this.active === 7) {
        // console.log('不允许扫码操作')
        return
      }
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
        if (this.active === 5 || this.active === 6 || this.active === 7) {
          return
        }
        setTimeout(() => {
          this.getData()
        }, 200)
      }
    }
  },
  async mounted () {
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
                .ensure-option{
                  color: #3377FF;
                  margin-right: 20px;
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
        &.un-ensure{
          color: red;
        }
      }
      .all-number{
        color: #3377ff !important;
        margin-right:60px;
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
    .clearBox{
      height: 400px;
      overflow-y: auto;
      ul{
        height: 100%;
        .packageName{
          padding:0 40px;
          span{
            color: #3377FF;
          }
        }
        .clearItem{
          padding:0 40px;
          p{
            display: flex;
            line-height: 60px;
            justify-content: space-between;
          }
        }
      }
    }
  }
</style>
