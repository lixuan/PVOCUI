import fetch from '@/utils/fetch'
// 获取客户列表
export function getAllCustomInfoList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomInfo/GetCustomInfoList',
    method: 'get',
    params: obj
  })
}
// 删除客户
export function deleteBatchCustomInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomInfo/BatchDeleteCustomInfo',
    method: 'post',
    data: obj
  })
}

// 根据ID获取客户
export function getCustomInfoById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomInfo/GetOneCustomInfo',
    method: 'get',
    params: obj
  })
}

// 创建或修改客户
export function createorUpdateCustomInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomInfo/CreateOrUpdateCustomInfo',
    method: 'post',
    data: obj
  })
}
// 同步客户
export function syncCutomerInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomInfo/syncCutomerOne',
    method: 'get',
    params: obj
  })
}
// 失信客户
export function UpdateDishonestyFlag(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomInfo/UpdateDishonestyFlag',
    method: 'post',
    data: obj,
    msg: '操作'
  })
}
// 根据ID获取客户
export function getExportCustomData(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomInfo/GetExportCustomData',
    method: 'get',
    params: obj
  })
}
