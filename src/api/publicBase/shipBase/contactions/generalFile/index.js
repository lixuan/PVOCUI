import fetch from 'utils/fetch'
// 获取发给船方港口文件列表
export function getGeneralFileList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/GeneralFile/GetGeneralFileList',
    method: 'get',
    params: obj
  })
}
// 添加或修改发给船方港口文件
export function generalFileAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/GeneralFile/GeneralFileAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}
// 获取发给船方港口文件编辑（根据id）
export function getGeneralFileSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/GeneralFile/GetGeneralFileSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除发给船方港口文件
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/GeneralFile/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除发给船方港口文件'
  })
}
