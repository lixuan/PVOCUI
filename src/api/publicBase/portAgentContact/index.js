import fetch from '@/utils/fetch'
// 获取港口代理列表
export function getPortAgentContactList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentAndShipCompanyContact/GetAgentAndShipCompanyContactList',
    method: 'get',
    params: obj
  })
}

// 添加港口代理
export function addEditPortAgentContact(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentAndShipCompanyContact/AgentAndShipCompanyContactAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取港口代理编辑
export function getPortAgentContactSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentAndShipCompanyContact/GetAgentAndShipCompanyContactSingle',
    method: 'get',
    params: obj
  })
}

// 批量删除
export function deleteBatchPortAgentContact(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentAndShipCompanyContact/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除港口代理联系表'
  })
}

// 获取港口代理联系下拉
export function getPortAgentContactName(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetAgentAndShipCompanyContactNameComboBoxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取港口代理联系下拉
export function getPortAgentComboBoxForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetPortAgentComboBoxForEdit',
    method: 'get',
    params: obj
  })
}
