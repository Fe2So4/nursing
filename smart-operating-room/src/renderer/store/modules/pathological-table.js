import { reqUserInfo, reqBiaobenInfo, reqdeleteFastPathologic, reqsendPathologicOrder, reqprintBottleToStick, reqgetPrintState, reqgetPathologyByOperSchNo } from '@/api/client-api/pathological-application.js'

const state = {
  userInfo: {},
  selectTableData: [],
  selectPathologyId: '',
  historyDetails: '',
  pathologicalTable: []
}

const mutations = {
  SAVE_USERINFO (state, data) {
    state.userInfo = data || {}
  },
  SAVE_PATHOLOGICAL_TABLELIST (state, data) {
    state.pathologicalTable = data || []
  },
  SAVE_SELECTTABLEITEM (state, data) {
    state.selectTableData = data || []
    if (data.length > 0) {
      state.selectPathologyId = data[0].pathologyId
    }
  },
  SAVE_USERINFOHISTORYDETAILS (state, data) {
    state.historyDetails = data
  },
  CLEAR_SELECTTABLEITEM (state) {
    state.selectPathologyId = ''
  },
  CLEAR_USERINFO (state) {
    state.userInfo = {}
  },
  CLEAR_USERINFOHISTORYDETAILS (state) {
    state.historyDetails = ''
  }
}

const actions = {
  async ReqUserInfo ({ commit }, query) {
    let res = await reqUserInfo(query)
    // if (res.status === 200) {
    // commit('SAVE_USERINFO', res.data)
    // }
    return res
  },
  async ReqBiaobenInfo ({ commit }, query) {
    let res = await reqBiaobenInfo(query)
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
    // }
    return res
  },
  async ReqdeleteFastPathologic ({ commit }, query) {
    let res = await reqdeleteFastPathologic(query)
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
    // }
    return res
  },
  async ReqsendPathologicOrder ({ commit }, query) {
    let res = await reqsendPathologicOrder(query)
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
    // }
    return res
  },
  async ReqprintBottleToStick ({ commit }, query) {
    let res = await reqprintBottleToStick(query)
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
    // }
    return res
  },
  async ReqgetPrintState ({ commit }, query) {
    let res = await reqgetPrintState(query)

    return res
  },
  async ReqgetPathologyByOperSchNo ({ commit }, query) {
    let res = await reqgetPathologyByOperSchNo(query)

    return res
  }

}

export default {
  state,
  mutations,
  actions
}
