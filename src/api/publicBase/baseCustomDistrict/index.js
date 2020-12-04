import fetch from '@/utils/fetch'
// 获取关区代码列表
export function getBaseCustomDistricts(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomDistrictInfo/GetCustomDistrictList',
    method: 'get',
    params: obj
  })
}
// 添加或修改关区代码
export function createOrUpdateBaseCustomDistrict(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomDistrictInfo/CustomDistrictAddEdit',
    method: 'post',
    data: obj,
    msg: msg
  })
}
// 根据Id获取关区代码详情
export function getBaseCustomDistrictForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomDistrictInfo/GetCustomDistrictSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除关区代码
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CustomDistrictInfo/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除关区代码'
  })
}

// 获取关区代码下拉
export function getCustomDistrictComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetCustomDistrictComboBoxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取关区ID下拉
export function getCustomDistrictComboBoxList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetCustomDistrictComboBoxList',
    method: 'get',
    params: obj
  })
}

