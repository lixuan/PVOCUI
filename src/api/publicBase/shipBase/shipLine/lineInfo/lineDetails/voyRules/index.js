import fetch from 'utils/fetch'
// 获取进口航次号生成规则信息列表
export function getIMVoyRulesList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyRules/GetIMVoyRulesList',
    method: 'get',
    params: obj
  })
}
// 获取出口航次号生成规则信息列表
export function getEXVoyRulesList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyRules/GetEXVoyRulesList',
    method: 'get',
    params: obj
  })
}
// 添加或修改航次号生成规则信息
export function voyRulesAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyRules/VoyRulesAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取航次号生成规则信息编辑
export function getVoyRulesSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyRules/GetVoyRulesSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除航次号生成规则信息
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyRules/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除航次生成规则'
  })
}
// 获取港序规则挂靠船舶下拉
export function getLineShipListCombox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyRules/GetLineShipListCombox',
    method: 'get',
    params: obj
  })
}
// 批量设置
export function billBathEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyRules/BillBathEdit',
    method: 'post',
    data: obj,
    msg: '批量设置航次生成规则'
  })
}
