import fetch from '@/utils/fetch'
// 获取指运场站/卸装场站列表
export function getZYorXZSettingList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ZYorXZSettingInfo/GetZYorXZSettingList',
    method: 'get',
    params: obj
  })
}

// 添加指运场站/卸装场站
export function addEditZYorXZ(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/ZYorXZSettingInfo/BerthAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取指运场站/卸装场站编辑
export function getZYorXZSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ZYorXZSettingInfo/GetZYorXZSetting',
    method: 'get',
    params: obj
  })
}

// 批量删除
export function deleteBatchZYorXZ(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/ZYorXZSettingInfo/ZYorXZSettingDelete',
    method: 'post',
    data: obj,
    msg: msg
  })
}

// 获取指运场站/卸装场站列表（下拉）
export function GetZYXZCom(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/GetZYXZCom',
    method: 'get',
    params: obj
  })
}
