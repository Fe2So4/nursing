import {reqUserInfo, reqBiaobenInfo} from '@/api/client-api/pathological-application.js'

const state = {
  userInfo: {},
  selectTableData: [],
  selectPathologyId: ''
}

const mutations = {
  SAVE_USERINFO (state, data) {
    state.userInfo = data.data || {}
  },
  SAVE_SELECTTABLEITEM (state, data) {
    state.selectTableData = data || []
    if (data.length > 0) {
      state.selectPathologyId = data[0].pathologyId
    }
  },
  CLEAR_SELECTTABLEITEM (state) {
    state.selectPathologyId = ''
  }
}

const actions = {
  async ReqUserInfo ({ commit }, query) {
    let res = await reqUserInfo(query)
    if (res.status === 200) {
      commit('SAVE_USERINFO', res.data)
    }
    return res
  },
  async ReqBiaobenInfo ({ commit }, query) {
    let res = await reqBiaobenInfo(query)
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
    // }
    return res
  }
}

export default {
  state,
  mutations,
  actions
}
