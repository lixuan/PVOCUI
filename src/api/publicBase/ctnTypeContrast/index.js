import fetch from '@/utils/fetch'
// 获取船公司箱型对照表列表
export function getCtnTypeContrastList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CtnTypeContrast/GetCtnTypeContrastList',
    method: 'get',
    params: obj
  })
}
// 添加或修改船公司箱型对照表
export function ctnTypeContrastAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/CtnTypeContrast/CtnTypeContrastAddEdit',
    method: 'post',
    data: obj,
    msg: msg
  })
}
// 根据Id获取船公司箱型对照表详情
export function getCtnTypeContrastSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CtnTypeContrast/GetCtnTypeContrastSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除船公司箱型对照表
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CtnTypeContrast/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除船公司箱型对照表'
  })
}

