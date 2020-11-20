import {reqGetPersonnelScheduling, reqgetBaseDictDetailList, reqUpdatePersionSchedule, reqGetClassTimeInfo,
  reqDeleteClassTimeInfo, reqaddClassTimeInfo, reqUpdateClassTimeInfo, reqGetTransactionGroupShow, reqGetNurseDicttwo,
  reqGetTransactionGroupTeachResult, reqgetTransactionGroup, reqGetTransactionGroupTeach, reqAddTransactionGroupTeach,
  reqDeleteTransactionGroupTeach, reqUpdateTransactionGroupTeach, reqGetBaseDictCategoryList, reqAddBaseDictDetailList,
  reqUpdateBaseDictDetailList, reqDeleteBaseDictDetail} from '@/api/personnel-management/personnel-management.js'

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
  },
  // 获取业务分组带教班次信息对照列表
  async ReqGetTransactionGroupTeachResult ({ commit }) {
    let res = await reqGetTransactionGroupTeachResult()
    return res
  },
  // 业务分组带教信息查询
  async ReqgetTransactionGroup ({ commit }) {
    let res = await reqgetTransactionGroup()
    return res
  },
  // 根据id获取业务分组带教班次信息
  async ReqGetTransactionGroupTeach ({ commit }, query) {
    let res = await reqGetTransactionGroupTeach(query)
    return res
  },
  // 添加业务分组带教班次信息
  async ReqAddTransactionGroupTeach ({ commit }, query) {
    let res = await reqAddTransactionGroupTeach(query)
    return res
  },
  // 删除业务分组带教班次信息
  async ReqDeleteTransactionGroupTeach ({ commit }, query) {
    let res = await reqDeleteTransactionGroupTeach(query)
    return res
  },
  // 修改业务分组带教班次信息
  async ReqUpdateTransactionGroupTeach ({ commit }, query) {
    let res = await reqUpdateTransactionGroupTeach(query)
    return res
  },
  // 查询基础字典分类信息列表
  async ReqGetBaseDictCategoryList ({ commit }) {
    let res = await reqGetBaseDictCategoryList()
    return res
  },
  // 新增基础字典分类信息列表
  async ReqAddBaseDictDetailList ({ commit }, query) {
    let res = await reqAddBaseDictDetailList(query)
    return res
  },
  // 修改基础字典分类信息列表
  async ReqUpdateBaseDictDetailList ({ commit }, query) {
    let res = await reqUpdateBaseDictDetailList(query)
    return res
  },
  // 删除基础字典分类信息列表
  async ReqDeleteBaseDictDetail ({ commit }, query) {
    let res = await reqDeleteBaseDictDetail(query)
    return res
  }

}

export default {
  state,
  mutations,
  actions
}
