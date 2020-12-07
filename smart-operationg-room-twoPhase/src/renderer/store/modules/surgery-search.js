import {reqgetTimesOperations, reqgetRoomState, reqgetEveryDayRoomEndTime, reqgetNursingRecordSheet, reqoperNameCountStatis, reqoperRoomUseStatis,
  reqoperChargeStatis} from '@/api/DepartmentManagement/SurgerySearch1/surgery-search.js'

const state = {
  // baseDictDetailLis: []
}

const mutations = {
  // SAVE_BaseDictDetailList (state, data) {
  //   state.baseDictDetailLis = data
  // }
}

const actions = {

// 多次手术查询
  async ReqgetTimesOperations ({ commit }, query) {
    let res = await reqgetTimesOperations(query)
    return res
  },
  // 房间状态查询
  async ReqgetRoomState ({ commit }, query) {
    let res = await reqgetRoomState(query)
    return res
  },
  // 每日房间结束时间查询
  async ReqgetEveryDayRoomEndTime ({ commit }, query) {
    let res = await reqgetEveryDayRoomEndTime(query)
    return res
  },
  // 护理记录单查询
  async ReqgetNursingRecordSheet ({ commit }, query) {
    let res = await reqgetNursingRecordSheet(query)
    return res
  },
  // 手术名称数量统计
  async ReqoperNameCountStatis ({ commit }, query) {
    let res = await reqoperNameCountStatis(query)
    return res
  },
  // 手术间利用率统计
  async ReqoperRoomUseStatis ({ commit }, query) {
    let res = await reqoperRoomUseStatis(query)
    return res
  },
  // 收费项目统计手术计费
  async ReqoperChargeStatis ({ commit }, query) {
    let res = await reqoperChargeStatis(query)
    return res
  }

}

export default {
  state,
  mutations,
  actions
}
