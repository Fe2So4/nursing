import {reqGetPersonnelScheduling, reqgetBaseDictDetailList, reqUpdatePersionSchedule, reqGetClassTimeInfo,
  reqDeleteClassTimeInfo, reqaddClassTimeInfo, reqUpdateClassTimeInfo, reqGetTransactionGroupShow, reqGetNurseDicttwo} from '@/api/personnel-management/personnel-management.js'

const state = {
  baseDictDetailLis: []
}

const mutations = {
  // SAVE_BaseDictDetailList (state, data) {
  //   state.baseDictDetailLis = data
  // }
}

const actions = {
  // 查询日常人员排班列表
  async ReqGetPersonnelScheduling ({ commit }, query) {
    let res = await reqGetPersonnelScheduling(query)
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
    // }
    return res
  },
  // 获取排班数据字典
  async ReqgetBaseDictDetailList ({ commit }, query) {
    let res = await reqgetBaseDictDetailList(query)
    // console.log(res, 'res')
    // if (res.data.code === 200) {
    //   commit('SAVE_BaseDictDetailList', res.data.data)
    // }
    return res
  },
  // 保存人员排班列表

  async ReqUpdatePersionSchedule ({ commit }, query) {
    let res = await reqUpdatePersionSchedule(query)
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
    // }
    return res
  },
  // 班次时段维护
  async ReqGetClassTimeInfo ({ commit }, query) {
    let res = await reqGetClassTimeInfo(query)
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
    // }
    return res
  },
  // 班次时段删除
  async ReqDeleteClassTimeInfo ({ commit }, query) {
    let res = await reqDeleteClassTimeInfo(query)
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
    // }
    return res
  },
  // 班次时段新增
  async ReqaddClassTimeInfo ({ commit }, query) {
    let res = await reqaddClassTimeInfo(query)
    return res
  },
  // 班次时段修改
  async ReqUpdateClassTimeInfo ({ commit }, query) {
    let res = await reqUpdateClassTimeInfo(query)
    return res
  },
  // 业务分组管理数据获取
  async ReqGetTransactionGroupShow ({ commit }) {
    let res = await reqGetTransactionGroupShow()
    return res
  },
  // 获取护士列表
  async ReqGetNurseDicttwo ({ commit }) {
    let res = await reqGetNurseDicttwo()
    return res
  }
}

export default {
  state,
  mutations,
  actions
}
