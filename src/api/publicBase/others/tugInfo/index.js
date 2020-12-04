import fetch from '@/utils/fetch'
// 获取拖轮信息列表
export function getList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TugInfo/GetTugInfoList',
    method: 'get',
    params: obj
  })
}

// 根据ID获取拖轮信息
export function getOne(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TugInfo/GetTugInfoSingle',
    method: 'get',
    params: obj
  })
}

// 新建或修改拖轮信息
export function createOrUpdateInfo(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/TugInfo/TugInfoAddEdit',
    method: 'post',
    data: obj,
    msg: msg
  })
}

// 批量删除拖轮信息
export function batchDeleteInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TugInfo/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除拖轮信息'
  })
}
