import fetch from '@/utils/fetch'
// 获取包装类型对照表列表
export function getPackageTypeContrastList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PackageTypeContrast/GetPackageTypeContrastList',
    method: 'get',
    params: obj
  })
}
// 添加或修改包装类型对照表
export function packageTypeContrastAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/PackageTypeContrast/PackageTypeContrastAddEdit',
    method: 'post',
    data: obj,
    msg: msg
  })
}
// 根据Id获取包装类型对照表详情
export function getPackageTypeContrastSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PackageTypeContrast/GetPackageTypeContrastSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除包装类型对照表
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PackageTypeContrast/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除包装类型对照表'
  })
}

