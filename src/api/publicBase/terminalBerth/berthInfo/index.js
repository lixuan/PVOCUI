import fetch from 'utils/fetch'

// 获取泊位列表
export function getBerthList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/BerthInfo/GetBerthList',
    method: 'get',
    params: obj
  })
}

// 添加泊位
export function addEditBerth(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/BerthInfo/BerthAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取泊位编辑
export function getBerthSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/BerthInfo/GetBerthSingle',
    method: 'get',
    params: obj
  })
}

// 批量删除
export function deleteBatchBerth(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/BerthInfo/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除泊位'
  })
}

// 获取泊位列表Combox
export function getBerthComboxList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetBerthComboxList',
    method: 'get',
    params: obj
  })
}
