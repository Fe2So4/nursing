import {reqstatisticalQueryr} from '@/api/statistical/statistical.js'

const state = {

}

const mutations = {

}

const actions = {
  async ReqstatisticalQueryr ({ commit }, query) {
    let res = await reqstatisticalQueryr(query)
    return res
  }
}

export default {
  state,
  mutations,
  actions
}
