import {reqfloorList, reqGetRoomByFloor} from '@/api/large-screen.js'
const state = {
  patientInfo: {
    cureNo: null,
    hospitalNo: null,
    operSchNo: null
  },
  currentRoom: null,
  voiceSwitch: true
}

const mutations = {
  SET_PATIENT_INFO (state, payload) {
    state.patientInfo.cureNo = payload.cureNo
    state.patientInfo.hospitalNo = payload.hospitalNo
    state.patientInfo.operSchNo = payload.operSchNo
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
  },
  // 楼层数据
  async largefloorList ({ commit }) {
    let res = await reqfloorList()
    return res
  },
  // 房间数据
  async laretRoomByFloor ({ commit }, qeury) {
    let res = await reqGetRoomByFloor(qeury)
    return res
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
