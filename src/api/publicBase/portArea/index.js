import fetch from '@/utils/fetch'
// 获取港口区域列表
export function getList2(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortArea/GetPortAreaList',
    method: 'get',
    params: obj
  })
}

// 根据ID获取港口区域
export function getOne2(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortArea/GetOnePortArea',
    method: 'get',
    params: obj
  })
}

// 新建或修改港口区域
export function createOrUpdateInfo2(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortArea/CreateOrUpdatePortArea',
    method: 'post',
    data: obj,
    msg: msg
  })
}

// 批量删除港口区域
export function batchDeleteInfo2(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortArea/BatchDeletePortArea',
    method: 'post',
    data: obj,
    msg: '删除港口区域'
  })
}

// 获取港口区域下拉
export function getPortAreaComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetPortAreaComboBoxForEdit',
    method: 'get',
    params: obj
  })
}

// 通过港口代码获取港口区域下拉
export function getPortAreaComboBoxByPortCode(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetPortAreaComboBoxFor',
    method: 'get',
    params: obj
  })
}

// 通过港口代码获取港口区域下拉
export function getPortAreaComboBoxByPortAreaID(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetPortAreaComboBoxValueForEdit',
    method: 'get',
    params: obj
  })
}
// 通过获取青岛港港口区域下拉
export function getPortAreaCNTAOComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetPortAreaCNTAOComboBoxFor',
    method: 'get',
    params: obj
  })
}
