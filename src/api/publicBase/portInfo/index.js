import fetch from '@/utils/fetch'
// 获取港口信息列表
export function getList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortInfo/GetPortInfoListList',
    method: 'get',
    params: obj
  })
}

// 根据ID获取港口信息
export function getOne(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortInfo/GetOnePortInfo',
    method: 'get',
    params: obj
  })
}

// 新建或修改港口信息
export function createOrUpdateInfo(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortInfo/CreateOrUpdatePortInfo',
    method: 'post',
    data: obj,
    msg: msg
  })
}

// 批量删除港口信息
export function batchDeleteInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortInfo/BatchDeletePortInfo',
    method: 'post',
    data: obj,
    msg: '删除港口信息'
  })
}

// 获取港口下拉存Code显示Name
export function getPortComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetPortComboBoxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取港口代码下拉存Id显示Name
export function getPortIdComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetPortIdComboBoxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取中国港口代码下拉存Id显示Name
export function getPortIdComboBoxCN(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetPortIdComboBoxCNForEdit',
    method: 'get',
    params: obj
  })
}

// 获取港口代码下拉存Id显示Name+Code
export function GetPortNameCode(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetPortNameCodeComboBoxForEdit',
    method: 'get',
    params: obj
  })
}
// 获取港口区域，码头级联
export function getChildrenPortArea(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetChildrenPortArea',
    method: 'get',
    params: obj
  })
}
// 获取港口代码/港口中文名称/港口英文名称下拉
export function getPortComboBoxFor(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetPortComboBoxFor',
    method: 'get',
    params: obj
  })
}
