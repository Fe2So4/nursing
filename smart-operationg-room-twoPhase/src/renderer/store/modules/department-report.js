import {reqstatisOperChargeByDept, reqstatisOperCountByNurse, reqstatisOperCountByDept, reqstatisOperCountBySurgeon, reqgetDictByType, reqstatisNurseCharge,
  reqstatisNurseChargeDetail, reqstatisLeave} from '@/api/DepartmentManagement/DepartmentReport/department-report.js'

const state = {
  // baseDictDetailLis: []
}

const mutations = {
  // SAVE_BaseDictDetailList (state, data) {
  //   state.baseDictDetailLis = data
  // }
}

const actions = {

// 根据类型获取基础字典 DEPARTMENT:科室 ,CHARGCATEGORY:计费类别
  async ReqgetDictByType ({ commit }, query) {
    let res = await reqgetDictByType(query)
    return res
  },
  // 按科室统计手术收费
  async ReqstatisOperChargeByDept ({ commit }, query) {
    let res = await reqstatisOperChargeByDept(query)
    return res
  },
  // 按科室统计手术收费
  async ReqstatisOperCountByNurse ({ commit }, query) {
    let res = await reqstatisOperCountByNurse(query)
    return res
  },
  // 按科室统计手术数量
  async ReqstatisOperCountByDept ({ commit }, query) {
    let res = await reqstatisOperCountByDept(query)
    return res
  },
  // 按主刀医生统计手术数量
  async ReqstatisOperCountBySurgeon ({ commit }, query) {
    let res = await reqstatisOperCountBySurgeon(query)
    return res
  },
  // 护理人员计费统计
  async ReqstatisNurseCharge ({ commit }, query) {
    let res = await reqstatisNurseCharge(query)
    return res
  },
  // 护理人员计费统计详情
  async ReqstatisNurseChargeDetail ({ commit }, query) {
    let res = await reqstatisNurseChargeDetail(query)
    return res
  },
  // 科室人员休假统计
  async ReqstatisLeave ({ commit }, query) {
    let res = await reqstatisLeave(query)
    // let res = await reqstatisLeaveUrl(query)
    return res
  }
}

export default {
  state,
  mutations,
  actions
}
