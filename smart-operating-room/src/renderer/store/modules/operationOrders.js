import { reqOperationOrders, reqgetFloor, reqgetRoomByFloor, reqgetNurseDict, reqchangeOperScheduleInfo, reqcancelOrderAction, reqsendOrderAction, reqrepeatOrderMsgTips, reqsyncOperScheduleInfo, reqapplicationForRefund } from '@/api/operation-orders/operation-orders.js'

const state = {
  floor: [],
  isSend: '0'
}

const mutations = {
  // SAVE_USERINFO (state, data) {
  //   state.userInfo = data.data || {}
  // }
  SAVE_FLOOR(state, data) {
    state.floor = data
  },
  CHANGE_ISSHEND(state, data) {
    state.isSend = data
  }
}

const actions = {
  // 获取楼层列表
  async ReqgetFloor({ commit }) {
    let res = await reqgetFloor()
    return res
  },
  // 获取楼层对应的房间列表
  async ReqgetRoomByFloor({ commit }, query) {
    let res = await reqgetRoomByFloor(query)
    return res
  },
  // 获取内容列表
  async ReqOperationOrders({ commit }, query) {
    let res = await reqOperationOrders(query)
    return res
  },
  // 获取护士列表
  async ReqgetNurseDict({ commit }) {
    let res = await reqgetNurseDict()
    return res
  },
  // 修改派单信息内容
  async ReqchangeOperScheduleInfo({ commit }, query) {
    let res = await reqchangeOperScheduleInfo(query)
    return res
  },
  // 退单操作
  async ReqcancelOrderAction({ commit }, query) {
    let res = await reqcancelOrderAction(query)
    return res
  },

  // 已派单退单操作
  async ReqapplicationForRefund({ commit }, query) {
    let res = await reqapplicationForRefund(query)
    return res
  },
  // 派单操作
  async ReqsendOrderAction({ commit }, query) {
    let res = await reqsendOrderAction(query)
    return res
  },
  async ReqrepeatOrderMsgTips({ commit }, query) {
    let res = await reqrepeatOrderMsgTips(query)
    return res
  },
  // 同步操作
  async ReqsyncOperScheduleInfo({ commit }, query) {
    let res = await reqsyncOperScheduleInfo(query)
    return res
  }

}

export default {
  state,
  mutations,
  actions
}
