const state = {
  base: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.base--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.base++
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
