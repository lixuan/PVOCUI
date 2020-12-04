import fetch from 'utils/fetch'
// 获取船公司对照表信息列表
export function getLineOperationCompanyList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineOperationCompany/GetLineOperationCompanyList',
    method: 'get',
    params: obj
  })
}
// 添加或修改船公司对照表信息
export function lineOperationCompanyAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineOperationCompany/LineOperationCompanyAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取船公司对照表信息编辑
export function getLineOperationCompanySingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineOperationCompany/GetLineOperationCompanySingle',
    method: 'get',
    params: obj
  })
}
// 批量删除船公司对照表信息
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineOperationCompany/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除船公司对照表'
  })
}

// 获取航线下的船公司
export function getShipCompanyComboBoxFor(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetShipCompanyComboBoxFor',
    method: 'get',
    params: obj
  })
}
