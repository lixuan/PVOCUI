import fetch from 'utils/fetch'
// 获取航线信息列表
export function getLineBaseList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineBase/GetLineBaseList',
    method: 'get',
    params: obj
  })
}
// 添加或修改航线信息
export function lineBaseAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineBase/LineBaseAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取航线信息编辑
export function getLineBaseSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineBase/GetLineBaseSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除航线信息
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineBase/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除航线信息'
  })
}

// 获取航线下拉框列表（用于下拉框）
export function getLineBaseComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetLineBaseComboBoxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取中英文船名下拉框列表（用于下拉框）
export function getshipBaseInfoComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetshipBaseInfoComboBoxForEdit',
    method: 'get',
    params: obj
  })
}
