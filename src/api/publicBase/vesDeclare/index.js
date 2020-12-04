import fetch from 'utils/fetch'
// 获取单航次申报记录列表
export function getVoyDeclareList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyDeclare/GetVoyDeclareList',
    method: 'get',
    params: obj
  })
}
// 添加或修改单航次申报记录
export function voyDeclareAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyDeclare/VoyDeclareAddEdit',
    method: 'post',
    data: obj,
    msg: msg
  })
}
// 根据Id获取单航次申报记录详情
export function getVoyDeclareSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyDeclare/GetVoyDeclareSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除单航次申报记录
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/VoyDeclare/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除单航次申报记录'
  })
}

