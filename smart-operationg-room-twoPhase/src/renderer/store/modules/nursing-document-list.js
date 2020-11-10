import {reqSecurityCheck} from '@/api/NursingDocumentApi/security-check.js'
import {reqTransitTransfer} from '@/api/NursingDocumentApi/transit-transfer.js'
import {reqNursingDocumentTwo} from '@/api/NursingDocumentApi/nursing-document-two.js'
import {reqNursingDocumentJiChu} from '@/api/NursingDocumentApi/nursing-document-jichu.js'
import {reqNursingDocumentTeShu} from '@/api/NursingDocumentApi/nursing-document-teshu.js'
const state = {
  hospitalNo: '',
  patientName: '',
  cureNo: ''
}

const mutations = {
  SAVE_HOSNO (state, data) {
    state.hospitalNo = data
  },
  SAVE_PATLENTNAME (state, data) {
    state.patientName = data
  },
  SAVE_CURENO (state, data) {
    state.cureNo = data
  }
}

const actions = {
  // 获取安全护理单数据
  async reqSecurityCheckTable ({ commit }, query) {
    let res = reqSecurityCheck(query)
    return res
  },

  // 获取护理记录单(二)数据
  async ReqNursingDocumentTwo ({ commit }, query) {
    let res = reqNursingDocumentTwo(query)
    return res
  },

  // 获取护理记录单(三)基础数据
  async ReqNursingDocumentJiChu ({ commit }, query) {
    let res = reqNursingDocumentJiChu(query)
    return res
  },
  // 获取护理记录单(三)特殊数据
  async ReqNursingDocumentTeShu ({ commit }, query) {
    let res = reqNursingDocumentTeShu(query)
    return res
  },
  // 获取转运交接单数据
  async ReqTransitTransfer ({ commit }, query) {
    let res = reqTransitTransfer(query)
    return res
  }
}

export default {
  state,
  mutations,
  actions
}
