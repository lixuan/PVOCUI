import fetch from '@/utils/fetch'
// 获取港口间距离列表
export function getPortDistanceList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortDistance/GetPortDistanceList',
    method: 'get',
    params: obj
  })
}

// 添加港口间距离
export function addEditPortDistance(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortDistance/PortDistanceAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取港口间距离编辑
export function getPortDistanceSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortDistance/GetPortDistanceSingle',
    method: 'get',
    params: obj
  })
}

// 批量删除
export function deleteBatchPortDistance(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortDistance/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除港口间距离'
  })
}

// 返回港口是否已存在
export function getPortIsExist(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortDistance/GetPortisExist',
    method: 'get',
    params: obj
  })
}
