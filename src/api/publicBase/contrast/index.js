import fetch from '@/utils/fetch'
// 获取港口名称对照列表
export function getContrastList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomPortInfo/GetBaseCustomPorts',
    method: 'get',
    params: obj
  })
}
// 删除港口名称对照
export function deleteBatchContrast(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomPortInfo/DeleteCustomPorts',
    method: 'delete',
    params: obj,
    msg: '删除港口名称对照表'
  })
}
// 批量删除港口对照信息
export function BatchDeleteContrastinfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomPortInfo/BathDeleteBaseCustomPorts',
    method: 'post',
    data: obj,
    msg: '删除港口名称对照表'
  })
}
// 创建或编辑
export function AddEditBaseCustomPorts(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomPortInfo/AddEditBaseCustomPorts',
    method: 'post',
    data: obj,
    msg: msg
  })
}
// 获取编辑
export function GetBaseCustomPortsEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomPortInfo/GetBaseCustomPortsEdit',
    method: 'get',
    params: obj
  })
}
// 获取客户信息下拉
export function GetCustomComboBoxForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetCustomComboBoxFor',
    method: 'get',
    params: obj
  })
}
