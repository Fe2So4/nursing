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
    // var str="a,b,c,d,"
    var reg = /,$/gi
    // str=str.replace(reg,"");
    payload.runNurseName = (payload.runNurseName1 + ',' + payload.runNurseName2).replace(reg, '')
    payload.washNurseName = (payload.washNurseName1 + ',' + payload.washNurseName2).replace(reg, '')
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
