import {reqGetPersonnelScheduling, reqgetBaseDictDetailList, reqUpdatePersionSchedule} from '@/api/personnel-management/personnel-management.js'

const state = {
  // baseDictDetailLis
}

const mutations = {

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
    // if (res.status === 200) {
    //   commit('SAVE_USERINFO', res.data)
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
  }
}

export default {
  state,
  mutations,
  actions
}
