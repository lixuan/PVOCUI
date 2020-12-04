import fetch from 'utils/fetch'
// 添加或修改港序规则
export function lineSortRuleAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineSortRule/LineSortRuleAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取港序规则编辑
export function getLineSortRuleSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineSortRule/GetLineSortRuleSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除港序规则
export function LineSortRuleDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineSortRule/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除港序规则'
  })
}
// 获取港序规则下拉
export function getLineSortRuleComboForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetLineSortRuleComboForEdit',
    method: 'get',
    params: obj
  })
}
// 复制港序规则
export function CopylineSortRule(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineSortRule/GetCopy',
    method: 'get',
    params: obj
  })
}

// 复制港序规则
export function copyLineSortRuleNew(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineSortRule/CopyLineSortRule',
    method: 'get',
    params: obj
  })
}

// 通过航线Id获取港序规则下拉
export function getLineSortRuleByLineId(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetLineSortRuleByLineId',
    method: 'get',
    params: obj
  })
}
