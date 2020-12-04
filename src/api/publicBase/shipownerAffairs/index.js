import fetch from 'utils/fetch'

// 获取船东事务列表
export function getList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipownerAffairs/GetShipownerAffairsList',
    method: 'get',
    params: obj
  })
}

// 根据id获取船东事务编辑
export function getSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipownerAffairs/GetOneShipownerAffairs',
    method: 'get',
    params: obj
  })
}

// 批量删除船东事务信息
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipownerAffairs/BatchDeleteShipownerAffairs',
    method: 'post',
    data: obj,
    msg: '删除船东事务'
  })
}

// 创建船东事务信息
export function addEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipownerAffairs/CreateOrUpdateShipownerAffairs',
    method: 'post',
    data: obj,
    msg: msg
  })
}
