import {reqOperationOrders, reqgetFloor, reqgetRoomByFloor} from '@/api/operation-orders/operation-orders.js'

const state = {

}

const mutations = {
  // SAVE_USERINFO (state, data) {
  //   state.userInfo = data.data || {}
  // }

}

const actions = {
  // 获取楼层列表
  async ReqgetFloor ({ commit }) {
    let res = await reqgetFloor()
    return res
  },
  // 获取楼层对应的房间列表
  async ReqgetRoomByFloor ({ commit }, query) {
    let res = await reqgetRoomByFloor(query)
    return res
  },
  // 获取内容列表
  async ReqOperationOrders ({ commit }, query) {
    let res = await reqOperationOrders(query)
    return res
  }
}

export default {
  state,
  mutations,
  actions
}
