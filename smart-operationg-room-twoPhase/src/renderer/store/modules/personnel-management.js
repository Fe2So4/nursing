import {reqGetPersonnelScheduling} from '@/api/personnel-management/personnel-management.js'

const state = {

}

const mutations = {

}

const actions = {

  async ReqGetPersonnelScheduling ({ commit }, query) {
    let res = await reqGetPersonnelScheduling(query)
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
