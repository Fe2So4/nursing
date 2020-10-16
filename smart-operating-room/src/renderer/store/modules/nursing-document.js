import {reqNursingDocumentTable} from '@/api/nursingApi/nursing-document.js'
const state = {

}

const mutations = {

}

const actions = {
  async ReqNursingDocumentTable ({ commit }, query) {
    let res = reqNursingDocumentTable(query)
    return res
  }
}

export default {
  state,
  mutations,
  actions
}
