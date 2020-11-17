import {reqGetUserBaseInfo, reqGetWorkerInfoList} from '@/api/personnel-management/personnel-info.js'

const state = {
  // baseDictDetailLis
}

const mutations = {

}

const actions = {
  // 用户基本信息查询
  async ReqGetUserBaseInfo ({ commit }, query) {
    let res = await reqGetUserBaseInfo(query)
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
    // }
    return res
  },
  // 公务员信息列表查询
  async ReqGetWorkerInfoList ({ commit }, query) {
    let res = await reqGetWorkerInfoList(query)
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
