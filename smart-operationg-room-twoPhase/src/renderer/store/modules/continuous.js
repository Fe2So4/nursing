import {reqcontinuousOperation} from '@/api/continuous/continuous.js'

const state = {

}

const mutations = {

}

const actions = {
  async ReqcontinuousOperation ({ commit }, query) {
    let res = await reqcontinuousOperation(query)
    return res
  }
}

export default {
  state,
  mutations,
  actions
}
