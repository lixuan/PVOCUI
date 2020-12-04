import fetch from 'utils/fetch'

// 获取封航/停工列表
export function getList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/StopWorkRecordsInfo/GetStopWorkRecordsList',
    method: 'get',
    params: obj
  })
}

// 根据id获取封航停工编辑
export function getSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/StopWorkRecordsInfo/GetStopWorkRecordsSingle',
    method: 'get',
    params: obj
  })
}

// 批量删除封航停工信息
export function batchDelete(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/StopWorkRecordsInfo/BatchDelete',
    method: 'post',
    data: obj,
    msg: msg
  })
}

// 创建封航停工信息
export function addEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/StopWorkRecordsInfo/StopWorkRecordsAddEdit',
    method: 'post',
    data: obj,
    msg: msg
  })
}
