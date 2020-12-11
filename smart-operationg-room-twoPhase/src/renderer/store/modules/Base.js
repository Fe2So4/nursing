const state = {
  base: 0,
  userName: '',
  userCode: '',
  currentPatient: {
    operationId: '1010'
  }
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.base--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.base++
  },
  SAVE_LOGIN_USERINFO (state, data) {
    state.userName = data.userName
    state.userCode = data.userCode
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    console.log('456')
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
