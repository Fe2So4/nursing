import {reqGetUserBaseInfo, reqGetWorkerInfoList, reqAddWorkerInfot, reqDeleteWorkerInfo, reqUpdateWorkerInfo,
  reqGetNurList, reqAddTransactionGroup, reqDeleteTransactionGroup, reqUpdateTransactionGroup, reqDeleteTransactionGroupDetails,
  reqUpdateTransactionGroupDetails, reqGetUserEducationInfo, reqGetUserAppointInfo, reqGetUserDeptTurnInfo, reqGetUserOperDeptTurnInfo,
  reqgetUserTrainInfo, requpdateUserBaseInfo, reqaddUserEducationInfo, reqdeleteUserEducationInfo, requpdateUserEducationInfo, reqaddUserAppointInfo,
  reqdeleteUserAppointInfo, requpdateUserAppointInfo, reqaddUserDeptTurnInfo, reqdeleteUserDeptTurnInfo, reqaddUserOperDeptTurnInfo, reqdeleteUserOperDeptTurnInfo,
  requpdateUserDeptTurnInfo, requpdateUserOperDeptTurnInfo, requpdateUserTrainInfo, reqaddUserTrainInfo, reqdeleteUserTrainInfo} from '@/api/personnel-management/personnel-info.js'

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
  },
  // 添加业务分组信息
  async ReqAddTransactionGroup ({ commit }, query) {
    let res = await reqAddTransactionGroup(query)
    return res
  },
  // 删除业务分组信息
  async ReqDeleteTransactionGroup ({ commit }, query) {
    let res = await reqDeleteTransactionGroup(query)
    return res
  },
  // 修改业务分组信息
  async ReqUpdateTransactionGroup ({ commit }, query) {
    let res = await reqUpdateTransactionGroup(query)
    return res
  },
  // 修改业务分组护士信息
  async ReqDeleteTransactionGroupDetails ({ commit }, query) {
    let res = await reqDeleteTransactionGroupDetails(query)
    return res
  },
  // 修改业务分组详情信息
  async ReqUpdateTransactionGroupDetails ({ commit }, query) {
    let res = await reqUpdateTransactionGroupDetails(query)
    return res
  },
  // 用户信息教育经历查询
  async ReqGetUserEducationInfo ({ commit }, query) {
    let res = await reqGetUserEducationInfo(query)
    return res
  },
  // 职称任聘经历查询
  async ReqGetUserAppointInfo ({ commit }, query) {
    let res = await reqGetUserAppointInfo(query)
    return res
  },
  // 科室轮转经历查询
  async ReqGetUserDeptTurnInfo ({ commit }, query) {
    let res = await reqGetUserDeptTurnInfo(query)
    return res
  },
  //  手术科室轮转经历查询
  async ReqGetUserOperDeptTurnInfo ({ commit }, query) {
    let res = await reqGetUserOperDeptTurnInfo(query)
    return res
  },
  //  培训经历查询
  async ReqgetUserTrainInfo ({ commit }, query) {
    let res = await reqgetUserTrainInfo(query)
    return res
  },
  //  用户基本信息更新
  async RequpdateUserBaseInfo ({ commit }, query) {
    let res = await requpdateUserBaseInfo(query)
    return res
  },
  //  用户教育经历新增
  async ReqaddUserEducationInfo ({ commit }, query) {
    let res = await reqaddUserEducationInfo(query)
    return res
  },
  //  用户教育经历删除
  async ReqdeleteUserEducationInfo ({ commit }, query) {
    let res = await reqdeleteUserEducationInfo(query)
    return res
  },
  //  用户教育经历更新
  async RequpdateUserEducationInfo ({ commit }, query) {
    let res = await requpdateUserEducationInfo(query)
    return res
  },
  //  职称任聘经历添加
  async ReqaddUserAppointInfo ({ commit }, query) {
    let res = await reqaddUserAppointInfo(query)
    return res
  },
  // 职称任聘经历删除
  async ReqdeleteUserAppointInfo ({ commit }, query) {
    let res = await reqdeleteUserAppointInfo(query)
    return res
  },
  // 职称任聘经历更新
  async RequpdateUserAppointInfo ({ commit }, query) {
    let res = await requpdateUserAppointInfo(query)
    return res
  },
  // 轮转科室新增
  async ReqaddUserDeptTurnInfo ({ commit }, query) {
    let res = await reqaddUserDeptTurnInfo(query)
    return res
  },
  // 轮转科室删除
  async ReqdeleteUserDeptTurnInfo ({ commit }, query) {
    let res = await reqdeleteUserDeptTurnInfo(query)
    return res
  },
  // 手术科室轮转经历添加
  async ReqaddUserOperDeptTurnInfo ({ commit }, query) {
    let res = await reqaddUserOperDeptTurnInfo(query)
    return res
  },
  // 手术科室轮转经历删除
  async ReqdeleteUserOperDeptTurnInfo ({ commit }, query) {
    let res = await reqdeleteUserOperDeptTurnInfo(query)
    return res
  },
  // 科室轮转经历更新
  async RequpdateUserDeptTurnInfo ({ commit }, query) {
    let res = await requpdateUserDeptTurnInfo(query)
    return res
  },
  // 手术科室轮转经历更新
  async RequpdateUserOperDeptTurnInfo ({ commit }, query) {
    let res = await requpdateUserOperDeptTurnInfo(query)
    return res
  },
  // 培训经历更新
  async RequpdateUserTrainInfo ({ commit }, query) {
    let res = await requpdateUserTrainInfo(query)
    return res
  },
  // 培训经历添加
  async ReqaddUserTrainInfo ({ commit }, query) {
    let res = await reqaddUserTrainInfo(query)
    return res
  },
  // 培训经历删除
  async ReqdeleteUserTrainInfo ({ commit }, query) {
    let res = await reqdeleteUserTrainInfo(query)
    return res
  }

}

export default {
  state,
  mutations,
  actions
}
