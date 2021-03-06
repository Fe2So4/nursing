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
            <li v-for="item in items" :key="item.active" :class="{'active':active===item.active}"
                @click="handleChange(item.active)">{{ item.text }}
            </li>
          </ul>
        </div>
        <div class="tree-right">
          <div class="title">
            <div class="title-left">
              特殊手术器械清点
            </div>
            <div class="title-right">{{ state === 0 ? '未清点' : '已清点' }}</div>
          </div>
          <div class="packageContent">
            <div class="package" v-for="(item,index) in packageList" :key="item.pId + index + active">
              <div class="packageItem" @click="handleShowList($event)">
                <span class="packageName">{{ item.pName }}（{{ item.items.length }}）</span>
                <span>
                  <span class="ensure-option" v-show="!item.isEnsure" @click.stop="handleEnsure(item)">确认清点</span>
                  <span class="option" @click.stop="handleDelete(item._uuid)">删除</span>
                </span>
              </div>
              <div class="packageItemList" ref="packageDetailList">
                <van-cell :title="_item.insName" value="已清点"
                          :title-class="{'first-cell':true,'un-ensure':changeColor(_item)}" border
                          v-for="(_item,i) in item.items" :key="i">
                  <template #right-icon>
                    <span v-show="!item.isEnsure">确认数量</span>
                    <div class="stepper-content" style="display:flex;justify-content:flex-end;">
                      <!--                     <span class="all-number"
                                                  v-show="active === 5 || active === 6 || active === 7">{{ _item[_item.type] }}</span>-->
                      <van-stepper integer @change="changeItemNumber(item)" v-show="item.isEnsure" v-model="_item.number" theme="round" min="0"/>
                    </div>
                  </template>
                </van-cell>
              </div>
            </div>
            <div @click="handleSign1" class="sign">
              <span class="sign-class">洗手护士签名</span>
              <span class="sign-value">{{ sign1 }}</span>
            </div>
            <div @click="handleSign2" class="sign">
              <span class="sign-class">巡回护士签名</span>
              <span class="sign-value">{{ sign2 }}</span>
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
            <p class="packageName">包名：<span>{{ item.pName }}</span></p>
            <div class="clearItem">
              <p v-for="_item in item.list" :key="_item.name">
                <span style="flex:1;">器械：<span style="color:red;">{{ _item.name }}</span></span>
                <span style="margin:0 40px;">数量：<span style="color:#3377FF;">{{ _item.clear }}</span></span>
                <span>已清点：<span style="color:red;">{{ _item.number }}</span></span>
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
import {v4 as uuidv4} from 'uuid'

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
      addingFour: 0,
      addingOne: 0,
      addingThree: 0,
      addingTwo: 0,
      beforeStatus: 0,
      clossAfter: 0,
      clossBefore: 0,
      sutureAfter: 0,
      stepper: '',
      items: [{text: '术前', active: 0}, {text: '术中(一)', active: 1},
        {text: '术中(二)', active: 2}, {text: '术中(三)', active: 3}, {text: '术中(四)', active: 4},
        {text: '体腔关闭前', active: 5}, {text: '体腔关闭后', active: 6}, {text: '皮肤缝合后', active: 7}],
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
    changeItemNumber (item) {
      if (item.number) {
        item.number = Number(item.number)
      } else {
        item.number = 0
      }
    },
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
      this.handleSubmit().then(
        () => this.$router.go(-1),
        () => this.$router.go(-1)
      )
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
      const deletePackage = (id, list) => {
        list.forEach((item, index) => {
          if (item._uuid === id) {
            list.splice(index, 1)
          }
        })
      }
      [
        this.packageList,
        this.recordForm.specialEquipment.before,
        this.recordForm.specialEquipment.adding,
        this.recordForm.specialEquipment.adding1,
        this.recordForm.specialEquipment.adding2,
        this.recordForm.specialEquipment.adding3,
        this.recordForm.specialEquipment.before2,
        this.recordForm.specialEquipment.after,
        this.recordForm.specialEquipment.after2,
        this.recordForm.specialEquipment.allList
      ].forEach(list => {
        deletePackage(id, list)
      })
    },
    handleShowList (e) {
      // 根据当前点击的dom，获取需要展示隐藏的dom
      const listCardsBlock = e.currentTarget.nextElementSibling
      if (!listCardsBlock.style.display || listCardsBlock.style.display === 'block') {
        listCardsBlock.style.display = 'none'
      } else {
        listCardsBlock.style.display = 'block'
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
          data.tsXsClossQm = data.xsClossQm
          data.tsXhClossQm = data.xhClossQm
          data.tsXsAllClossQm = data.xsAllClossQm
          data.tsXhAllClossQm = data.xhAllClossQm
          data.tsXsFhQm = data.xsFhQm
          data.tsXhFhQm = data.xhFhQm
          switch (this.active) {
            case 0:
              this.packageList = JSON.parse(JSON.stringify(data.specialEquipment.before))
              this.state = data.beforeStatus
              this.beforeStatus = data.beforeStatus
              this.sign1 = data.xsSqQm
              this.sign2 = data.xhSqQm
              break
            case 1:
              this.packageList = JSON.parse(JSON.stringify(data.specialEquipment.adding))
              this.state = data.addingOne
              this.addingOne = data.addingOne
              this.sign1 = data.xsOneQm
              this.sign2 = data.xhOneQm
              break
            case 2:
              this.packageList = JSON.parse(JSON.stringify(data.specialEquipment.adding1))
              this.state = data.addingTwo
              this.addingTwo = data.addingTwo
              this.sign1 = data.xsTwoQm
              this.sign2 = data.xhTwoQm
              break
            case 3:
              this.packageList = JSON.parse(JSON.stringify(data.specialEquipment.adding2))
              this.state = data.addingThree
              this.addingThree = data.addingThree
              this.sign1 = data.xsThreeQm
              this.sign2 = data.xhThreeQm
              break
            case 4:
              this.packageList = JSON.parse(JSON.stringify(data.specialEquipment.adding3))
              this.state = data.addingFour
              this.addingFour = data.addingFour
              this.sign1 = data.xsFourQm
              this.sign2 = data.xhFourQm
              break
            case 5:
              let before2 = data.specialEquipment.before2
              // before2.forEach(item => {
              //   item.items.forEach(_item => {
              //     _item.number = _item.before2
              //   })
              // })
              this.packageList = before2
              this.state = data.clossBefore
              this.clossBefore = data.clossBefore
              this.sign1 = data.xsClossQm
              this.sign2 = data.xhClossQm
              break
            case 6:
              let after = data.specialEquipment.after
              // after.forEach(item => {
              //   item.items.forEach(_item => {
              //     _item.number = _item.after
              //   })
              // })
              this.packageList = after
              this.state = data.clossAfter
              this.clossAfter = data.clossAfter
              this.sign1 = data.xsAllClossQm
              this.sign2 = data.xhAllClossQm
              break
            case 7:
              let after2 = data.specialEquipment.after2
              // after2.forEach(item => {
              //   item.items.forEach(_item => {
              //     _item.number = _item.after2
              //   })
              // })
              this.packageList = after2
              this.state = data.sutureAfter
              this.sutureAfter = data.sutureAfter
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
      const hasPackage = (pId, list) => {
        return list.some(i => i.pId === pId)
      }
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
        obj.isEnsure = true
        obj.items = data.packageDetail
        const _uuid = uuidv4()

        const setDetail = (type) => {
          const types = [
            'before',
            'adding',
            'adding1',
            'adding2',
            'adding3',
            'before2',
            'after',
            'after2'
          ]
          data.packageDetail.forEach(item => {
            types.forEach(t => {
              if (t === type) {
                item[t] = +item.insCount
              } else {
                item[t] = 0
              }
            })
            item.type = type
          })
        }

        const addPackage = (type) => {
          setDetail(type)
          if (!hasPackage(data.id, this.recordForm.specialEquipment[type])) {
            const packageObj = {
              _uuid,
              pId: obj.pId,
              pName: obj.pName,
              code: data.code,
              submit: '0',
              isEnsure: obj.isEnsure,
              items: data.packageDetail
            }
            this.recordForm.specialEquipment[type].push(packageObj)
            this.packageList.push(packageObj)
          } else {
            this.$notify({type: 'primary', message: '当前阶段已存在此包'})
          }
        }

        switch (this.active) {
          case 0:
            addPackage('before')
            break
          case 1:
            addPackage('adding')
            break
          case 2:
            addPackage('adding1')
            break
          case 3:
            addPackage('adding2')
            break
          case 4:
            addPackage('adding3')
            break
        }
      })
    },
    handleConfirm () {
      this.confirmDialog = false
    },
    onClickRight () {
      if (this.active === 0 || this.active === 1 || this.active === 2 || this.active === 3 || this.active === 4) {
        if (this.packageList.some(item => !item.isEnsure)) {
          this.$dialog.alert({
            title: '提示',
            message: '请先完成数量确认'
          }).then(() => {
            // on close
          })
          return false
        }
        return this.handleSubmit()
      } else if (this.active === 5 || this.active === 6 || this.active === 7) {
        let arr = []
        let items = []
        this.packageList.forEach(item => {
          item.items.forEach(_item => {
            if (_item.number !== _item[_item.type]) {
              items.push({name: _item.insName, number: _item.number, clear: _item[_item.type]})
            }
          })
          if (items.length) {
            arr.push({pName: item.pName, list: items})
          }
        })
        if (arr.length > 0) {
          this.confirmDialog = true
          this.clearList = arr
        } else {
          return this.handleSubmit()
        }
      }
    },
    handleSubmit () {
      let obj = this.recordForm
      obj.tsAddingFour = this.addingFour
      obj.tsAddingOne = this.addingOne
      obj.tsAddingThree = this.addingThree
      obj.tsAddingTwo = this.addingTwo
      obj.tsBeforeStatus = this.beforeStatus
      obj.tsClossAfter = this.clossAfter
      obj.tsClossBefore = this.clossBefore
      obj.tsSutureAfter = this.sutureAfter
      switch (this.active) {
        case 0:
          obj.tsBeforeStatus = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          obj.specialEquipment.before = this.packageList
          obj.specialEquipment.before.forEach(item => {
            const {_uuid} = item
            item.items.forEach(_item => {
              _item.before = _item.number
            })
            if (item.submit === '0') {
              obj.specialEquipment.before2.push(item)
              obj.specialEquipment.after.push(item)
              obj.specialEquipment.after2.push(item)
              obj.specialEquipment.allList.push(item)
            } else {
              const arr = ['before2', 'after', 'after2', 'allList']
              arr.forEach(key => {
                let existIdx = -1
                for (let i = 0; i < obj.specialEquipment[key].length; i++) {
                  if (obj.specialEquipment[key][i]._uuid === _uuid) {
                    existIdx = i
                  }
                }
                if (existIdx !== -1) {
                  obj.specialEquipment[key].splice(existIdx, 1, item)
                }
              })
            }
          })
          break
        case 1:
          obj.tsAddingOne = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          obj.specialEquipment.adding = this.packageList
          obj.specialEquipment.adding.forEach(item => {
            const {_uuid} = item
            item.items.forEach(_item => {
              _item.adding = _item.number
            })
            if (item.submit === '0') {
              obj.specialEquipment.before2.push(item)
              obj.specialEquipment.after.push(item)
              obj.specialEquipment.after2.push(item)
              obj.specialEquipment.allList.push(item)
            } else {
              const arr = ['before2', 'after', 'after2', 'allList']
              arr.forEach(key => {
                let existIdx = -1
                for (let i = 0; i < obj.specialEquipment[key].length; i++) {
                  if (obj.specialEquipment[key][i]._uuid === _uuid) {
                    existIdx = i
                  }
                }
                if (existIdx !== -1) {
                  obj.specialEquipment[key].splice(existIdx, 1, item)
                }
              })
            }
          })
          break
        case 2:
          obj.tsAddingTwo = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          obj.specialEquipment.adding1 = this.packageList
          obj.specialEquipment.adding1.forEach(item => {
            const {_uuid} = item
            item.items.forEach(_item => {
              _item.adding1 = _item.number
            })
            if (item.submit === '0') {
              obj.specialEquipment.before2.push(item)
              obj.specialEquipment.after.push(item)
              obj.specialEquipment.after2.push(item)
              obj.specialEquipment.allList.push(item)
            } else {
              const arr = ['before2', 'after', 'after2', 'allList']
              arr.forEach(key => {
                let existIdx = -1
                for (let i = 0; i < obj.specialEquipment[key].length; i++) {
                  if (obj.specialEquipment[key][i]._uuid === _uuid) {
                    existIdx = i
                  }
                }
                if (existIdx !== -1) {
                  obj.specialEquipment[key].splice(existIdx, 1, item)
                }
              })
            }
          })
          break
        case 3:
          obj.tsAddingThree = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          obj.specialEquipment.adding2 = this.packageList
          obj.specialEquipment.adding2.forEach(item => {
            const {_uuid} = item
            item.items.forEach(_item => {
              _item.adding2 = _item.number
            })
            if (item.submit === '0') {
              obj.specialEquipment.before2.push(item)
              obj.specialEquipment.after.push(item)
              obj.specialEquipment.after2.push(item)
              obj.specialEquipment.allList.push(item)
            } else {
              const arr = ['before2', 'after', 'after2', 'allList']
              arr.forEach(key => {
                let existIdx = -1
                for (let i = 0; i < obj.specialEquipment[key].length; i++) {
                  if (obj.specialEquipment[key][i]._uuid === _uuid) {
                    existIdx = i
                  }
                }
                if (existIdx !== -1) {
                  obj.specialEquipment[key].splice(existIdx, 1, item)
                }
              })
            }
          })
          break
        case 4:
          obj.tsAddingFour = this.sign1 === '' || this.sign2 === '' ? '0' : '1'
          obj.specialEquipment.adding3 = this.packageList
          obj.specialEquipment.adding3.forEach(item => {
            const {_uuid} = item
            item.items.forEach(_item => {
              _item.adding3 = _item.number
            })
            if (item.submit === '0') {
              obj.specialEquipment.before2.push(item)
              obj.specialEquipment.after.push(item)
              obj.specialEquipment.after2.push(item)
              obj.specialEquipment.allList.push(item)
            } else {
              const arr = ['before2', 'after', 'after2', 'allList']
              arr.forEach(key => {
                let existIdx = -1
                for (let i = 0; i < obj.specialEquipment[key].length; i++) {
                  if (obj.specialEquipment[key][i]._uuid === _uuid) {
                    existIdx = i
                  }
                }
                if (existIdx !== -1) {
                  obj.specialEquipment[key].splice(existIdx, 1, item)
                }
              })
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
      return request({
        url: savePackageDataSpecial,
        method: 'post',
        data: obj
      }).then(res => {
        if (res.data.code === 200) {
          this.$notify({type: 'success', message: '保存成功'})
          this.getPackageList()
        }
      })
    },
    async handleChange (index) {
      this.active = index
      this.$forceUpdate()
      this.getPackageList()
    },
    handleDeviceCode (code) {
      // 测试数据
      // handleDeviceCode('P-2185410')
      if (this.active === 5 || this.active === 6 || this.active === 7) {
        return
      }
      // 器械包条码
      if (code.indexOf('P-') !== -1) {
        this.code = code.replace('P-', '')
        this.getData()
      }
    },
    onkeydownForTest (e) {
      console.log(e.keyCode)
      // 按键1
      if (e.keyCode === 49) {
        this.handleDeviceCode('P-2185412')
      }
    }
  },
  async mounted () {
    this.getPackageList()
    $bus.$on('handleDeviceCode', this.handleDeviceCode)
    if (process.env.NODE_ENV === 'development') {
      document.addEventListener('keydown', this.onkeydownForTest)
    }
  },
  beforeDestroy () {
    $bus.$off('handleDeviceCode')
    if (process.env.NODE_ENV === 'development') {
      document.removeEventListener('keydown', this.onkeydownForTest)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-stepper {
  white-space: nowrap;
}

.device-list {
  height: 100%;

  .van-nav-bar {
    height: 100px;
    background: linear-gradient(90deg, #666666, #303030);

    /deep/ .van-nav-bar__title {
      color: #ffffff;
      font-size: 34px;
      line-height: 100px;
    }

    /deep/ .van-nav-bar__text {
      color: #ffffff;
      font-size: 30px;
    }

    /deep/ .van-icon-arrow-left {
      color: #ffffff;
      font-size: 36px;
    }
  }

  .list {
    height: calc(100% - 324px);

    .tree {
      display: flex;
      height: 100%;

      .tree-left {
        width: 200px;

        ul {
          display: flex;
          flex-direction: column;
          max-height: 100%;
          overflow: auto;

          li {
            color: #2E2E2E;
            padding: 20px 0 20px 16px;
            font-size: 30px;
            border: 1PX solid #E2E2E2;

            &.active {
              color: #FFFFFF;
              background: #3377FF;
            }
          }
        }
      }

      .tree-right {
        flex: 1;
        height: 100%;
        font-size: 30px;
        width: calc(100% - 200px);

        .title {
          display: flex;
          justify-content: space-between;
          line-height: 104px;
          font-size: 30px;
          padding: 10px 15px;
          border-top: 1PX solid #e2e2e2;

          .title-left {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: auto 0 1;
          }

          .title-right {
            flex: auto 1 0;
            text-align: right;
            color: #10C15B;
          }
        }

        .packageContent {
          height: calc(100% - 125px);
          overflow-y: auto;

          .package {
            .packageItem {
              background: #ffffff;
              border-bottom: 1PX solid #e2e2e2;
              border-top: 1PX solid #e2e2e2;
              line-height: 90px;
              display: flex;
              justify-content: space-between;
              padding: 10px 15px 10px 15px;

              .packageName {
                color: #3377FF;
              }

              .ensure-option {
                color: #3377FF;
                margin-right: 20px;
              }

              .option {
                color: red;
              }

              &.package-item-between {
                justify-content: space-between;
              }
            }

            .packageItemList {
              display: block;
            }
          }

          .sign-class {
            color: #10ce5a;
            line-height: 90px;
            margin-left: 15px;
          }

          .sign-value {
            line-height: 90px;
            color: #0000ff;
            margin-left: 30px;
          }

          .sign {
            background: #FFFFFF;

            &:nth-last-child(1) {
              border-top: 1PX solid #e2e2e2;
            }
          }
        }

        ul {
          height: calc(100% - 124px);

          li {
            background: #ffffff;
            border-bottom: 1PX solid #e2e2e2;
            line-height: 90px;
            display: flex;
            padding: 0 15px 0 15px;

            &.package {
              justify-content: space-between;
            }
          }

          .sign-class {
            color: hsl(145, 85%, 41%);
            line-height: 90px;
            text-indent: 15px;
          }

          .sign-value {
            line-height: 90px;
            color: #0000ff;
            margin-left: 30px;
          }
        }
      }
    }
  }

  .van-cell {
    line-height: 94px;
    color: #2E2E2E;
    font-size: 30px;

    &::after {
      border-color: #E2E2E2;
    }

    .first-cell {
      flex: unset;
      max-width: 220px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.un-ensure {
        color: red;
      }
    }

    .all-number {
      color: #3377ff !important;
      margin-right: 60px;
    }

    .left-title {
      flex: unset;
    }

    .value-cell {
      color: #10C15B;
    }

    .right-value {
      .van-field {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }

  .van-cell-group {
    &:last-child {
      height: calc(100% - 114px);
      overflow-y: auto;
    }
  }

  .list-item {
    height: 100%;

    p {
      height: 100%;
    }
  }

  /deep/ .van-stepper {
    button {
      height: 50px;
      width: 50px;
    }

    input {
      width: 90px;
      height: 50px;
    }

    /deep/ .van-stepper__input {
      font-size: 30px;
    }

    /deep/ .van-stepper__minus {
      color: #3377FF;
      border-color: #3377FF;
      border: 2px solid #3377FF;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);

      &::before {
        height: 3px;
      }
    }

    /deep/ .van-stepper__plus {
      background-color: #3377FF;

      &::before {
        height: 3px;
      }

      &::after {
        width: 3px;
      }
    }
  }

  .clearBox {
    height: 400px;
    overflow-y: auto;

    ul {
      height: 100%;

      .packageName {
        padding: 0 40px;

        span {
          color: #3377FF;
        }
      }

      .clearItem {
        padding: 0 40px;

        p {
          display: flex;
          line-height: 60px;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
