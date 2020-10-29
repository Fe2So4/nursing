const state = {
  patientInfo: {},
  opePeopleInfo: {}
}
// const getters = {

// }
const mutations = {
  GET_PATIENT (state, info) {
    state.patientInfo = info
  },
  SET_OPE_PEOPLE_INFO (state, info) {
    state.opePeopleInfo = info
  }
}

const actions = {
  getPatient ({commit}, payload) {
    payload.runNurseName = payload.runNurseName1 + ',' + payload.runNurseName2
    payload.washNurseName = payload.washNurseName1 + ',' + payload.washNurseName2
    commit('GET_PATIENT', payload)
  },
  setOpePeopleInfo ({commit}, payload) {
    commit('SET_OPE_PEOPLE_INFO', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
