import fetch from 'utils/fetch'
// 获取船舶基础资料信息列表
export function getList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipStatusInfo/GetBaseShipStatus',
    method: 'get',
    params: obj
  })
}

// 根据ID获取船舶基础资料
export function getOne(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipStatusInfo/GetBaseShipStatusEdit',
    method: 'get',
    params: obj
  })
}

// 新建或修改船舶基础资料
export function createOrUpdateInfo(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipStatusInfo/AddEditBaseShipStatus',
    method: 'post',
    data: obj,
    msg: msg
  })
}

// 批量删除船舶基础资料
export function batchDeleteInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipStatusInfo/BathDeleteBaseShipStatus',
    method: 'post',
    data: obj,
    msg: '删除船舶作业状态'
  })
}
