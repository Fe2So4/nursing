const state = {
  patientInfo: {
    cureNo: null,
    hospitalNo: null
  },
  currentRoom: null,
  voiceSwitch: true
}

const mutations = {
  SET_PATIENT_INFO (state, payload) {
    state.patientInfo.cureNo = payload.cureNo
    state.patientInfo.hospitalNo = payload.hospitalNo
  },
  SET_CURRENT_ROOM (state, payload) {
    state.currentRoom = payload
  },
  SET_VOICE_SWITCH (state) {
    state.voiceSwitch = !state.voiceSwitch
  }
}

const getters = {
  voiceButton: state => {
    return state.voiceSwitch
  }
}

const actions = {
  setPatientInfo ({commit}, payload) {
    commit('SET_PATIENT_INFO', payload)
  },
  setCurrentRoom ({commit}, payload) {
    commit('SET_CURRENT_ROOM', payload)
  },
  setVoiceSwitch ({commit}) {
    commit('SET_VOICE_SWITCH')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
