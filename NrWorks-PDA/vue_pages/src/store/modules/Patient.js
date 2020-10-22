const state = {
  patientInfo: {}
}
// const getters = {

// }
const mutations = {
  GET_PATIENT (state, info) {
    console.log(info)
    state.patientInfo = info
  }
}

const actions = {
  getPatient ({commit}, payload) {
    payload.runNurseName = payload.runNurseName1 + ',' + payload.runNurseName2
    payload.washNurseName = payload.washNurseName1 + ',' + payload.washNurseName2
    commit('GET_PATIENT', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
