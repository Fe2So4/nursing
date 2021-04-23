<template>
  <div class="transfer">
    <van-nav-bar
      :title="$route.query.title"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
    >
    </van-nav-bar>
    <span class="shouyeBtn" @click="gotoShouye">返回首页</span>
    <div class="step">
      <div class="step-content">
        <div>
          <div class="title">患者身份核查</div>
          <van-steps
            v-if="stepList.length > 0"
            direction="vertical"
            :active="active"
            active-color="2E2E2E"
          >
            <van-step v-for="(item, index) in stepList" :key="index">
              <h3>请扫描[{{ item.label }}]</h3>
              <h3></h3>
              <p>{{ item.time }}</p>
            </van-step>
          </van-steps>
        </div>
        <div
          v-if="
            $route.query.title === '进手术室'
          "
        >
          <div class="title">手术间房间核查</div>
          <van-steps
            direction="vertical"
            :active="roomScanList[0].value === true ? 0 : -1"
            active-color="2E2E2E"
          >
            <van-step v-for="item in roomScanList" :key="item.active">
              <h3>请扫描[手术房间]</h3>
              <h3>{{ item.room }}</h3>
              <p>{{ item.time }}</p>
            </van-step>
          </van-steps>
        </div>
        <div
          class="options"
          v-if="
            $route.query.title === '进手术室'
              ? roomScanList[roomScanList.length - 1].value
              : stepList[stepList.length - 1].value
          "
        >
          <div v-if="$route.query.title !== '进缓冲区'">
            <p class="option">扫完码之后请点击转运交接单按钮</p>
            <p class="option">
              <van-button round @click="jumpTransferRecord"
                >转运交接单</van-button
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { bindingPatPushScreen, execOperation, getRoomNo, updateRoomNo } from '@/api/patient-info'
import {
  getHandoverCodeStatus,
  saveHandoverCodeStatus,
  changeApplyStatus,
  storagePointBuffer
} from '@/api/handover-record'
import { mapState, mapActions } from 'vuex'
import $bus from '@/utils/bus'
import moment from 'moment'
export default {
  name: 'Transfer',
  data () {
    return {
      saveRoomCode: '',
      goOnFlag: 1,
      operRoomNum: '',
      active: -1,
      code: '',
      stepList: [],
      roomScanList: [
        { label: '手术房间', value: false, active: 2, room: '', time: '' }
      ],
      inCache: [
        { label: '患者腕带', value: false, active: 0, time: '' },
        { label: '工勤人员二维码', value: false, active: 1, time: '' },
        { label: '缓冲区楼层号', value: false, active: 2, time: '' }
      ],
      outWardScan: [{ label: '患者腕带', value: false, active: 0, time: '' }], // 病房交接
      pointInRoomScan: [
        { label: '手术通知单或患者腕带', value: false, active: 0, time: '' }
        // { label: '手术通知单', value: false, active: 1, time: '' }
      ], // 进手术室
      pointOutRoomScan: [
        // { label: '手术通知单或患者腕带', value: false, active: 0, time: '' }
        { label: '工勤人员二维码', value: false, active: 0, time: '' }
      ], // 出手术室
      pointPacuScan: [{ label: '手术通知单或患者腕带', value: false, active: 0, time: '' }], // 进pacu
      outPacuScan: [{ label: '手术通知单或患者腕带', value: false, active: 0, time: '' }], // 出pacu
      pointWardScan: [
        { label: '患者腕带', value: false, active: 0, time: '' },
        { label: '工勤人员二维码', value: false, active: 1, time: '' }
      ] // 回病房---病房收治
    }
  },
  watch: {
    stepList: {
      handler (newVal, old) {
        let active = -1
        this.stepList.forEach((item) => {
          if (item.value) {
            active = item.active
          }
        })
        this.active = active
      },
      imediate: true,
      deep: true
    }
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  methods: {
    ...mapActions('Patient', ['getPatient', 'upRoomNo']),
    gotoShouye () {
      this.$router.push('/patient-home')
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {},
    handleExecute () {
      request({
        method: 'get',
        url: execOperation + '/' + this.patientInfo.operSchNo
      }).then((res) => {})
    },
    changeApplyStatus () {
      request({
        url: changeApplyStatus,
        method: 'post',
        data: {
          orderId: this.patientInfo.operSchNo,
          status: 2
        }
      })
    },
    // 绑定患者
    bindingPatPushScreen () {
      if (this.patientInfo.state === '1' || this.patientInfo.state === '2') {
        request({
          url: bindingPatPushScreen,
          method: 'post',
          params: {
            cureNo: this.patientInfo.cureNo,
            operSchNo: this.patientInfo.operSchNo,
            roomNo: this.saveRoomCode
          }
        }).then((res) => {
          if (res.data.code === 200) {
            // this.handleJump();
          }
        })
      }
    },
    async saveCodeStatus () {
      let mark = null
      let arr = []
      let time = moment(new Date()).format('YYYY-MM-DD HH:mm')
      if (this.$route.query.title === '病房交接') {
        if (!this.IsEmpty(this.code)) {
          if (this.patientInfo.cureNo === this.code) {
            if (this.stepList[0].value) {
              this.$notify({
                message: '当前患者已扫码,请勿重复扫码',
                type: 'warning'
              })
              return
            } else {
              mark = 1
              this.stepList[0].value = true
              this.stepList[0].time = time
              arr = JSON.parse(JSON.stringify(this.stepList))
            }
          } else {
            this.$notify({ message: '匹配失败', type: 'warning' })
            return
          }
        } else {
          this.$notify({ message: '请扫描患者腕带', type: 'warning' })
          return
        }
      } else if (this.$route.query.title === '进缓冲区') {
        console.log(this.stepList)
        if (this.stepList[0].value) {
          if (!this.stepList[1].value) {
            if (this.code.indexOf('Worker') !== -1) {
              this.code = this.code.replace('Worker=', '')
              mark = 7
              this.stepList[1].value = true
              this.stepList[1].time = time
              this.stepList[1].workerCode = this.code
              arr = [
                { stepList: this.stepList }
              ]
            } else {
              this.$notify({
                message: '请扫描工勤人员二维码',
                type: 'warning'
              })
              return
            }
          } else {
            if (!this.stepList[2].value) {
              if (this.code.indexOf('floorNum') !== -1) {
                let floorNum = this.code.replace('floorNum=', '')
                mark = 7
                this.stepList[2].value = true
                this.stepList[2].floorNum = floorNum
                this.stepList[2].time = time
                arr = [
                  { stepList: this.stepList }
                ]
              } else {
                this.$notify({ message: '请扫描缓冲区楼层号', type: 'warning' })
                return
              }
            } else {
              this.getStoragePointBuffer()
              this.$notify({ message: '请勿重复扫码', type: 'warning' })
              return
            }
          }
        } else {
          if (!this.IsEmpty(this.code)) {
            if (this.patientInfo.cureNo === this.code) {
              if (this.stepList[0].value) {
                this.$notify({
                  message: '当前患者已扫码,请勿重复扫码',
                  type: 'warning'
                })
                return
              } else {
                mark = 7
                this.stepList[0].value = true
                this.stepList[0].time = time
                arr = [
                  { stepList: this.stepList }
                ]
              }
            } else {
              this.$notify({ message: '患者匹配失败', type: 'warning' })
              return
            }
          } else {
            this.$notify({ message: '请扫描患者腕带', type: 'warning' })
            return
          }
        }
      } else if (this.$route.query.title === '进手术室') {
        this.goOnFlag = 1
        if (this.stepList[0].value) {
          if (!this.roomScanList[0].value) {
            if (this.code.indexOf('RoomNum') !== -1) {
              this.saveRoomCode = this.code.replace('RoomNum=', '')
              let roomCode = this.code.replace('RoomNum=', '')
              if (roomCode !== this.operRoomNum) {
                await this.$dialog.confirm({
                  title: '提示',
                  message: `当前手术间为${roomCode},患者原手术间为${this.operRoomNum},确定更换房间吗`
                })
                  .then(() => {
                    this.updateRoomNo()
                    mark = 2
                    this.roomScanList[0].value = true
                    this.roomScanList[0].room = roomCode
                    this.roomScanList[0].time = time
                    arr = [
                      { stepList: this.stepList, roomScanList: this.roomScanList }
                    ]
                  })
                  .catch(() => {
                    this.goOnFlag = 2
                    return false
                  })
              } else {
                mark = 2
                this.roomScanList[0].value = true
                this.roomScanList[0].room = roomCode
                this.roomScanList[0].time = time
                arr = [
                  { stepList: this.stepList, roomScanList: this.roomScanList }
                ]
              }
            } else {
              this.$notify({ message: '请扫描手术房间', type: 'warning' })
              return
            }
          } else {
            this.$notify({ message: '请勿重复扫码', type: 'warning' })
            return
          }
        } else {
          if (!this.IsEmpty(this.code)) {
            if (this.patientInfo.cureNo === this.code) {
              if (this.stepList[0].value) {
                this.$notify({
                  message: '当前患者已扫码,请勿重复扫码',
                  type: 'warning'
                })
                return
              } else {
                mark = 2
                this.stepList[0].value = true
                this.stepList[0].time = time
                arr = [
                  { stepList: this.stepList, roomScanList: this.roomScanList }
                ]
              }
            } else {
              this.$notify({ message: '患者匹配失败', type: 'warning' })
              return
            }
          } else {
            if (this.code.indexOf('OpsQRCode') !== -1) {
              var OpsRQCode = this.code.replace('OpsQRCode=', '')
              if (this.patientInfo.cureNo !== OpsRQCode) {
                this.$notify({
                  message: '该手术通知单与当前患者不匹配',
                  type: 'warning'
                })
                return
              } else {
                mark = 2
                this.stepList[0].value = true
                this.stepList[0].time = time
                arr = [
                  { stepList: this.stepList, roomScanList: this.roomScanList }
                ]
              }
            } else {
              this.$notify({
                message: '请扫描正确的患者腕带或手术通知单',
                type: 'warning'
              })
              return
            }
          }
        }
        // }
        // if (!this.stepList[1].value) {
        //   if (this.code.indexOf('OpsQRCode') !== -1) {
        //     var OpsRQCode = this.code.replace('OpsQRCode=', '')
        //     if (this.patientInfo.cureNo !== OpsRQCode) {
        //       this.$notify({
        //         message: '该手术通知单与当前患者不匹配',
        //         type: 'warning'
        //       })
        //       return
        //     } else {
        //       mark = 2
        //       this.stepList[1].value = true
        //       this.stepList[1].time = time
        //       arr = [
        //         { stepList: this.stepList, roomScanList: this.roomScanList }
        //       ]
        //     }
        //   } else {
        //     this.$notify({
        //       message: '请扫描患者手术通知单',
        //       type: 'warning'
        //     })
        //     return
        //   }
        // } else
        //  {

        // }
      } else if (this.$route.query.title === '出手术室') {
        if (this.code.indexOf('Worker') !== -1) {
          mark = 3
          this.stepList[0].value = true
          this.stepList[0].time = time
          arr = [
            { stepList: this.stepList }
          ]
        } else {
          this.$notify({
            message: '请扫描工勤人员二维码',
            type: 'warning'
          })
          return
        }
        // if (this.stepList[0].value) {
        //   if (!this.stepList[1].value) {
        //       if (this.code.indexOf('Worker') !== -1) {
        //   mark = 3
        //   this.stepList[1].value = true
        //   this.stepList[1].time = time
        //   arr = [
        //     { stepList: this.stepList, roomScanList: this.roomScanList }
        //   ]
        // } else {
        //   this.$notify({
        //     message: '请扫描工勤人员二维码',
        //     type: 'warning'
        //   })
        //   return
        // }
        //   } else {
        //     if (!this.roomScanList[0].value) {
        //       if (this.code.indexOf('RoomNum') !== -1) {
        //         let roomCode = this.code.replace('RoomNum=', '')
        //         mark = 3
        //         this.roomScanList[0].value = true
        //         this.roomScanList[0].room = roomCode
        //         this.roomScanList[0].time = time
        //         arr = [
        //           { stepList: this.stepList, roomScanList: this.roomScanList }
        //         ]
        //       } else {
        //         this.$notify({ message: '请扫描手术房间', type: 'warning' })
        //         return
        //       }
        //     } else {
        //       this.$notify({ message: '请勿重复扫码', type: 'warning' })
        //       return
        //     }
        //   }
        // } else {
        //   if (parseInt(this.code)) {
        //     if (this.patientInfo.cureNo === this.code) {
        //       if (this.stepList[0].value) {
        //         this.$notify({
        //           message: '当前患者已扫码,请勿重复扫码',
        //           type: 'warning'
        //         })
        //         return
        //       } else {
        //         mark = 3
        //         this.stepList[0].value = true
        //         this.stepList[0].time = time
        //         arr = [
        //           { stepList: this.stepList, roomScanList: this.roomScanList }
        //         ]
        //       }
        //     } else {
        //       this.$notify({ message: '患者匹配失败', type: 'warning' })
        //       return
        //     }
        //   } else {
        //     this.$notify({ message: '请扫描患者腕带', type: 'warning' })
        //     return
        //   }
        // }
      } else if (this.$route.query.title === '进PACU') {
        if (!this.IsEmpty(this.code)) {
          if (this.patientInfo.cureNo === this.code) {
            if (this.stepList[0].value) {
              this.$notify({
                message: '当前患者已扫码,请勿重复扫码',
                type: 'warning'
              })
              return
            } else {
              mark = 4
              this.stepList[0].value = true
              this.stepList[0].time = time
              arr = JSON.parse(JSON.stringify(this.stepList))
            }
          } else {
            this.$notify({ message: '患者匹配失败', type: 'warning' })
            return
          }
        } else {
          if (this.code.indexOf('OpsQRCode') !== -1) {
            // eslint-disable-next-line no-redeclare
            var OpsRQCode = this.code.replace('OpsQRCode=', '')
            if (this.patientInfo.cureNo !== OpsRQCode) {
              this.$notify({
                message: '该手术通知单与当前患者不匹配',
                type: 'warning'
              })
              return
            } else {
              mark = 4
              this.stepList[0].value = true
              this.stepList[0].time = time
              arr = JSON.parse(JSON.stringify(this.stepList))
            }
          } else {
            this.$notify({ message: '请扫描患者腕带或手术通知单', type: 'warning' })
            return
          }
        }
        // if (parseInt(this.code)) {
        //   if (this.patientInfo.cureNo === this.code) {
        //     if (this.stepList[0].value) {
        //       this.$notify({
        //         message: '当前患者已扫码,请勿重复扫码',
        //         type: 'warning'
        //       })
        //       return
        //     } else {
        //       mark = 4
        //       this.stepList[0].value = true
        //       this.stepList[0].time = time
        //       arr = JSON.parse(JSON.stringify(this.stepList))
        //     }
        //   } else {
        //     this.$notify({ message: '匹配失败', type: 'warning' })
        //     return
        //   }
        // } else {
        //   this.$notify({ message: '请扫描患者腕带', type: 'warning' })
        //   return
        // }
      } else if (this.$route.query.title === '出PACU') {
        if (!this.IsEmpty(this.code)) {
          if (this.patientInfo.cureNo === this.code) {
            if (this.stepList[0].value) {
              this.$notify({
                message: '当前患者已扫码,请勿重复扫码',
                type: 'warning'
              })
              return
            } else {
              mark = 5
              this.stepList[0].value = true
              this.stepList[0].time = time
              arr = JSON.parse(JSON.stringify(this.stepList))
            }
          } else {
            this.$notify({ message: '患者匹配失败', type: 'warning' })
            return
          }
        } else {
          if (this.code.indexOf('OpsQRCode') !== -1) {
            // eslint-disable-next-line no-redeclare
            var OpsRQCode = this.code.replace('OpsQRCode=', '')
            if (this.patientInfo.cureNo !== OpsRQCode) {
              this.$notify({
                message: '该手术通知单与当前患者不匹配',
                type: 'warning'
              })
              return
            } else {
              mark = 5
              this.stepList[0].value = true
              this.stepList[0].time = time
              arr = JSON.parse(JSON.stringify(this.stepList))
            }
          } else {
            this.$notify({ message: '请扫描患者腕带或手术通知单', type: 'warning' })
            return
          }
        }
        // if (parseInt(this.code)) {
        //   if (this.patientInfo.cureNo === this.code) {
        //     if (this.stepList[0].value) {
        //       this.$notify({
        //         message: '当前患者已扫码,请勿重复扫码',
        //         type: 'warning'
        //       })
        //       return
        //     } else {
        //       mark = 5
        //       this.stepList[0].value = true
        //       this.stepList[0].time = time
        //       arr = JSON.parse(JSON.stringify(this.stepList))
        //     }
        //   } else {
        //     this.$notify({ message: '患者匹配失败', type: 'warning' })
        //     return
        //   }
        // } else {
        //   this.$notify({ message: '请扫描患者腕带', type: 'warning' })
        //   return
        // }
      } else if (this.$route.query.title === '病房收治') {
        if (this.stepList[0].value) {
          if (!this.stepList[1].value) {
            if (this.code.indexOf('Worker') !== -1) {
              mark = 6
              this.stepList[1].value = true
              this.stepList[1].time = time
              arr = JSON.parse(JSON.stringify(this.stepList))
            } else {
              this.$notify({
                message: '请扫描工勤人员二维码',
                type: 'warning'
              })
              return
            }
          } else {
            this.$notify({
              message: '当前患者已扫码,请勿重复扫码',
              type: 'warning'
            })
            return
          }
        } else {
          if (!this.IsEmpty(this.code)) {
            if (this.patientInfo.cureNo === this.code) {
              if (this.stepList[0].value) {
                this.$notify({
                  message: '当前患者已扫码,请勿重复扫码',
                  type: 'warning'
                })
                return
              } else {
                mark = 6
                this.stepList[0].value = true
                this.stepList[0].time = time
                arr = JSON.parse(JSON.stringify(this.stepList))
              }
            } else {
              this.$notify({ message: '患者匹配失败', type: 'warning' })
              return
            }
          } else {
            this.$notify({ message: '请扫描患者腕带', type: 'warning' })
            return
          }
        }
      }
      if (this.goOnFlag === 2) {
        return false
      }
      await request({
        url: saveHandoverCodeStatus,
        method: 'post',
        data: {
          cureNo: this.patientInfo.cureNo,
          hospitalNo: this.patientInfo.hospitalNo,
          operSchNo: this.patientInfo.operSchNo,
          mark: mark,
          status: this.code,
          statusList: arr
        }
      }).then((res) => {
        if (res.data.code === 200) {
          if (mark === 2) {
            // this.bindingPatPushScreen()
            this.handleExecute()
            this.changeApplyStatus()
          }
          // if (mark === 7) {
          //   if (this.stepList[this.stepList.length - 1].value) {
          //     this.getStoragePointBuffer()
          //   }
          // }
          this.$notify({ message: '扫码成功', type: 'success' })
          // this.getCodeStatus();
        }
      })
    },
    // 获取患者房间号
    getUserRoomNum () {
      request({
        url: `${getRoomNo}/${this.patientInfo.operSchNo}`,
        method: 'get'
      }).then((res) => {
        this.operRoomNum = res.data.data
      })
    },
    // 更新房间号
    updateRoomNo () {
      request({
        url: `${updateRoomNo}/${this.patientInfo.operSchNo}/${this.saveRoomCode}`,
        method: 'get'
      }).then((res) => {
        this.getPatientInfo()
        // this.operRoomNum = res.data.data
      })
    },
    // 更新患者数据
    getPatientInfo () {
      this.upRoomNo(this.saveRoomCode)
    },
    // 缓冲区修改上一页列表状态
    getStoragePointBuffer () {
      let arr = [
        { stepList: this.stepList }
      ]
      let obj = {
        cureNo: this.patientInfo.cureNo,
        hospitalNo: this.patientInfo.hospitalNo,
        operSchNo: this.patientInfo.operSchNo,
        pointBufferState: '2',
        pointBufferCode: this.stepList[1].workerCode,
        pointBuffer: arr,
        pointBufferTime: ''
      }
      request({
        url: storagePointBuffer,
        method: 'POST',
        data: obj
      }).then((res) => {

      })
    },
    getCodeStatus () {
      request({
        url:
          getHandoverCodeStatus +
          '/' +
          this.patientInfo.hospitalNo +
          '/' +
          this.patientInfo.cureNo +
          '/' +
          this.patientInfo.operSchNo,
        method: 'get'
      }).then((res) => {
        switch (this.$route.query.title) {
          case '病房交接':
            if (res.data.data.outWardScan.length > 0) {
              this.stepList = res.data.data.outWardScan
            }
            break
          case '进缓冲区':
            if (res.data.data.pointBufferScan.length > 0) {
              this.stepList = res.data.data.pointBufferScan[0].stepList
            }

            break
          case '进手术室':
            // 需要操作
            if (res.data.data.pointInRoomScan.length > 0) {
              this.stepList = res.data.data.pointInRoomScan[0].stepList
              this.roomScanList = res.data.data.pointInRoomScan[0].roomScanList
            }
            break
          case '出手术室':
            // 需要操作
            if (res.data.data.pointOutRoomScan.length > 0) {
              this.stepList = res.data.data.pointOutRoomScan[0].stepList
              // this.roomScanList =
              //   res.data.data.pointOutRoomScan[0].roomScanList
            }
            break
          case '进PACU':
            if (res.data.data.pointPacuScan.length > 0) {
              this.stepList = res.data.data.pointPacuScan
              console.log(this.stepList)
            }
            break
          case '出PACU':
            if (res.data.data.outPacuScan.length > 0) {
              this.stepList = res.data.data.outPacuScan
            }
            break
          case '病房收治':
            if (res.data.data.pointWardScan.length > 0) {
              this.stepList = res.data.data.pointWardScan
            }
        }
      })
    },
    handleCode (code) {
      // 患者腕带条码
      if (!this.IsEmpty(code)) {
        this.code = code
        this.saveCodeStatus()
        // this.subjectOfPatientWristband.next(code)
      }
      // 房间二维码
      if (code.indexOf('RoomNum') !== -1) {
        // this.code = code.replace('RoomNum=', '')
        this.code = code
        this.saveCodeStatus()
      }
      // 手术通知单二维码
      if (code.indexOf('OpsQRCode') !== -1) {
        // var jsonStr
        if (code.indexOf('OpsSchNo') !== -1) {
          var codelist = code.split(',')
          // var OpsRQCode = codelist[0].replace('OpsQRCode=', '')
          var OpsRQCode = codelist[0]
          this.code = OpsRQCode
        } else {
          // this.code = code.replace('OpsQRCode=', '')
          this.code = code
        }
        this.saveCodeStatus()
      }
      // 工勤的二维码
      if (code.indexOf('Worker') !== -1) {
        // this.code = code.replace('Worker=', '')
        this.code = code
        this.saveCodeStatus()
      }
      // 楼层的二维码
      if (code.indexOf('floor') !== -1) {
        // this.code = code.replace('Worker=', '')
        this.code = code
        this.saveCodeStatus()
      }
      // 器械包条码
      if (code.indexOf('P-') !== -1) {
        // this.subjectOfQiXiePackage.next(code.replace('P-', ''))
      }
    },
    currentStep () {
      switch (this.$route.query.title) {
        case '病房交接':
          this.stepList = this.outWardScan
          break
        case '进缓冲区':
          this.stepList = this.inCache
          break
        case '进手术室':
          this.stepList = this.pointInRoomScan
          break
        case '出手术室':
          this.stepList = this.pointOutRoomScan
          break
        case '进PACU':
          this.stepList = this.pointPacuScan
          break
        case '出PACU':
          this.stepList = this.outPacuScan
          break
        case '病房收治':
          this.stepList = this.pointWardScan
          break
      }
    },
    jumpTransferRecord () {
      this.$router.push({
        path: '/handover-record',
        query: { type: this.$route.query.type, title: this.$route.query.title }
      })
      if (this.$route.query.title === '进手术室') {
        this.bindingPatPushScreen()
      }
    }
  },
  created () {
    document.onkeydown = (e) => {
      var key = window.event.keyCode
      if (key === 13) {
        setTimeout(() => {
          // this.handleCode('RoomNum=606')
          this.handleCode('19468254')
          // this.handleCode('Worker=22350195')

          // this.handleCode('floorNum=6')
          // this.handleCode('OpsQRCode=19377699,OpsSchNo=426786')
        }, 1000)
      }
    }
    this.currentStep()
  },
  mounted () {
    if (this.$route.query.title === '进手术室') {
      this.getUserRoomNum()
    }
    this.saveRoomCode = this.patientInfo.roomNo
    $bus.$on('handleCode', this.handleCode)
    this.getCodeStatus()
  },
  beforeDestroy () {
    $bus.$off('handleCode')
    // this.active = -1
    // this.stepList = []
    // 移除 <div> 事件句柄
    // document.removeEventListener('deviceready', this.onDeviceReady)
  }
}
</script>

<style lang="scss" scoped>
@import "@/themes/_handle.scss";
.transfer {
  height: 100%;
  .van-nav-bar {
    height: 100px;
    /deep/ .van-nav-bar__title {
      font-size: 34px;
      line-height: 100px;
    }
    /deep/ .van-nav-bar__text {
      font-size: 30px;
    }
    /deep/ .van-icon-arrow-left {
      font-size: 36px;
    }
  }
  .step {
    padding: 20px 15px;
    box-sizing: border-box;
    height: calc(100% - 100px);
    .step-content {
      height: 100%;
      @include background_color("bg_cell");
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      padding: 0 30px;
      .van-button {
        line-height: 60px;
        height: 60px;
        background: #3377ff;
        width: 480px;
        font-size: 30px;
        color: #ffffff;
      }
      .options {
        position: absolute;
        bottom: 60px;
        left: 0;
        right: 0;
      }
      p {
        .van-button {
          line-height: 80px;
          height: 80px;
          background: #3377ff;
          width: 480px;
          font-size: 30px;
          color: #ffffff;
        }
        &.option {
          text-align: center;
          color: #7f7f7f;
          font-size: 30px;
          &:last-child {
            margin-top: 20px;
          }
        }
      }
      .title {
        @include font_color("bg_popup_option");
        font-size: 26px;
        text-indent: 5px;
        line-height: 2em;
        padding-top: 20px;
      }
      .van-steps {
        @include background_color("bg_cell");
        .van-steps__items {
          .van-step {
            line-height: 40px;
            height: 150px;
            position: relative;
            /deep/ .van-step__title {
              text-indent: 10px;
              h3 {
                font-size: 30px;
              }
              p {
                font-size: 26px;
              }
            }
          }
        }
        /deep/ .van-step__circle-container {
          width: 20px;
          top: 30px;
          // height: 20px;
          i {
            height: 20px;
            width: 20px;
            &::before {
              width: 100%;
              height: 100%;
            }
            &.van-icon {
              font-size: 20px;
            }
          }
        }
        /deep/ .van-step__line {
          top: 45px;
          height: 83%;
          background-color: #c9c9c9;
          // background-color: green;
          // @include background_color('');
        }
        /deep/ .van-step__circle {
          // background: #3377ff;
          @include background_color("bg_circle");
        }
        /deep/ .van-step__title--active {
          // color: #2e2e2e;
          @include font_color("bg_popup_title");
        }
        /deep/ .van-step--finish .van-step__line {
          // background-color: #3377ff;
          @include background_color("bg_switch_active");
          width: 1px;
        }
        /deep/ .van-step__icon--active,
        .van-step__title--active {
          // color: #3377ff;
          @include font_color("bg_switch_active");
        }
      }
    }
  }
}
</style>
