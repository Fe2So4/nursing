import {reqGetUserBaseInfo, reqGetWorkerInfoList, reqAddWorkerInfot, reqDeleteWorkerInfo, reqUpdateWorkerInfo, reqGetNurList} from '@/api/personnel-management/personnel-info.js'

const state = {
  // baseDictDetailLis
}

const mutations = {

}

const actions = {
  // 用户基本信息查询
  async ReqGetUserBaseInfo ({ commit }, query) {
    let res = await reqGetUserBaseInfo(query)
    return res
  },
  // 获取护士列表
  async ReqGetNurList ({ commit }) {
    let res = await reqGetNurList()
    return res
  },

  // 公务员信息列表查询
  async ReqGetWorkerInfoList ({ commit }, query) {
    let res = await reqGetWorkerInfoList(query)

    return res
  },
  // 公务员信息添加
  async ReqAddWorkerInfot ({ commit }, query) {
    let res = await reqAddWorkerInfot(query)
    return res
  },

  // 公务员信息修改
  async ReqUpdateWorkerInfo ({ commit }, query) {
    let res = await reqUpdateWorkerInfo(query)
    return res
  },

  // 公务员信息删除
  async ReqDeleteWorkerInfo ({ commit }, query) {
    let res = await reqDeleteWorkerInfo(query)
    return res
  }

}

export default {
  state,
  mutations,
  actions
}
