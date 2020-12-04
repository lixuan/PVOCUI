import fetch from '@/utils/fetch'
// 获取货物类型对照列表
export function getCargoTypeList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CargoType/GetCargoTypeList',
    method: 'get',
    params: obj
  })
}

// 添加货物类型对照
export function addEditCargoType(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/CargoType/CargoTypeAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取货物类型对照编辑
export function getCargoTypeSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CargoType/GetCargoTypeSingle',
    method: 'get',
    params: obj
  })
}

// 批量删除
export function deleteBatchCargoType(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CargoType/BatchDeleteCargoType',
    method: 'post',
    data: obj,
    msg: '删除货物类型对照'
  })
}

// 获取货物类型对照下拉
export function getCargoTypeComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetCargoTypeComboBoxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取货物类型对照下拉树
export function getCargoTypeTreeList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CargoType/GetCargoTypeTreeList',
    method: 'get',
    params: obj
  })
}
