import fetch from 'utils/fetch'
// 查询列表
export function getShipSettings(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/XSFShipperSetting/GetShipSettings',
    method: 'get',
    params: obj
  })
}

// 获取单个
export function getSingleShipSet(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/XSFShipperSetting/GetShipSet',
    method: 'get',
    params: obj
  })
}

// 新增修改
export function createOrUpdateShipperSet(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/XSFShipperSetting/CreateOrUpdateShipperSet',
    method: 'post',
    data: obj,
    msg
  })
}

// 删除
export function batchDeleteShipperSetting(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/XSFShipperSetting/BatchDeleteShipperSetting',
    method: 'post',
    data: obj,
    msg: '删除箱使配置'
  })
}

