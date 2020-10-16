import {reqSecurityCheck} from '@/api/NursingDocumentApi/security-check.js'
const state = {
  hospitalNo: '',
  patientName: ''
}

const mutations = {
  SAVE_HOSNO (state, data) {
    state.hospitalNo = data
  },
  SAVE_PATLENTNAME (state, data) {
    state.patientName = data
  }
}

const actions = {
  async reqSecurityCheckTable ({ commit }, query) {
    let res = reqSecurityCheck(query)
    return res
  }
}

export default {
  state,
  mutations,
  actions
}
