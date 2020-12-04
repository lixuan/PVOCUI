import fetch from 'utils/fetch'
// 获取船公司联系方式列表
export function getShipCompanyContactList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentAndShipCompanyContact/GetAgentAndShipCompanyContactList',
    method: 'get',
    params: obj
  })
}
// 添加或修改船公司联系方式
export function shipCompanyContactAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentAndShipCompanyContact/AgentAndShipCompanyContactAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}
// 获取船公司联系方式编辑
export function getShipCompanyContactSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentAndShipCompanyContact/GetAgentAndShipCompanyContactSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除船公司联系方式
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentAndShipCompanyContact/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除船公司通讯录'
  })
}
// 获取船公司下拉
export function getCustomComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetCustomComboBoxForEdit',
    method: 'get',
    params: obj
  })
}
// 获取船公司(英文+中文)下拉
export function getCustomComboBoxEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetCustomComboBoxEdit',
    method: 'get',
    params: obj
  })
}

// 获取客户下拉存id显示code+中英文
export function getCustomComboBoxCCE(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetCustomComboBoxCCE',
    method: 'get',
    params: obj
  })
}

// 获取船公司获取联系人下拉
export function getContactNameComboBoxForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetContactNameComboBoxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取船公司名称下拉（箱主，承运人，箱经营人，箱属使用）
export function getShipCompanyForCarrier(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetShipCompanyNameComboBoxFor',
    method: 'get',
    params: obj
  })
}
