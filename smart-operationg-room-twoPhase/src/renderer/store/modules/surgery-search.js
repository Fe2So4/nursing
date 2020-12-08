import {reqgetTimesOperations, reqgetRoomState, reqgetEveryDayRoomEndTime, reqgetNursingRecordSheet, reqoperNameCountStatis, reqoperRoomUseStatis,
  reqoperChargeStatis, reqgetOperationIntervalTime, reqgetoperationInfoState, reqgetoperationInfoDetal, reqoperationGetPatTimel, reqoperLevelStatis, reqdutyStatistics,
  reqgetAfteroperationInfo, reqdownloadOperationInfoDetal
} from '@/api/DepartmentManagement/SurgerySearch1/surgery-search.js'

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
  // 手术间利用率统计
  async ReqoperLevelStatis ({ commit }, query) {
    let res = await reqoperLevelStatis(query)
    return res
  },

  // 收费项目统计手术计费
  async ReqoperChargeStatis ({ commit }, query) {
    let res = await reqoperChargeStatis(query)
    return res
  },
  // 手术接台间隔时间查询
  async ReqgetOperationIntervalTime ({ commit }, query) {
    let res = await reqgetOperationIntervalTime(query)
    return res
  },
  // 手术状态查询
  async ReqgetoperationInfoState ({ commit }, query) {
    let res = await reqgetoperationInfoState(query)
    return res
  },
  // 手术明细查询
  async ReqgetoperationInfoDetal ({ commit }, query) {
    let res = await reqgetoperationInfoDetal(query)
    return res
  },
  // 手术明细查询导出
  async ReqdownloadOperationInfoDetal ({ commit }, query) {
    let res = await reqdownloadOperationInfoDetal(query)
    return res
  },
  // 手术接病人时间查询
  async ReqoperationGetPatTimel ({ commit }, query) {
    let res = await reqoperationGetPatTimel(query)
    return res
  },
  // 一值班二值班
  async ReqdutyStatistics ({ commit }, query) {
    let res = await reqdutyStatistics(query)
    return res
  },
  // 手术术后信息查询
  async ReqgetAfteroperationInfo ({ commit }, query) {
    let res = await reqgetAfteroperationInfo(query)
    return res
  }

}

export default {
  state,
  mutations,
  actions
}
