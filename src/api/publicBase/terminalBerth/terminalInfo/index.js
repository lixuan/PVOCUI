import fetch from '@/utils/fetch'
// 获取码头列表
export function getTerminalList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TerminalInfo/GetTerminalList',
    method: 'get',
    params: obj
  })
}

// 添加码头
export function addEditTerminal(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/TerminalInfo/TerminalAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取码头编辑
export function getTerminalSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TerminalInfo/GetTerminalSingle',
    method: 'get',
    params: obj
  })
}

// 批量删除
export function deleteBatchTerminal(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TerminalInfo/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除码头'
  })
}

// 获取码头代码下拉
export function getTerminalComboxBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetTerminalComboxForEdit',
    method: 'get',
    params: obj
  })
}
// 根据港口区域获取码头下拉
export function getTerminalByAreaCodeCombox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetTerminalByAreaCodeComboxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取码头代码下拉
export function getTerminalIDComboxBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetTerminalIdComboxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取码头代码下拉
export function getBerthComboxBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetBerthComboxForEdit',
    method: 'get',
    params: obj
  })
}
// 获取青岛港下的码头
export function getTerminalByPortCode(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetTerminalByPortCodeComboxForEdit',
    method: 'get',
    params: obj
  })
}

// 根据码头代码获取关区列表
export function GetCustomDistrictByTerminalCode(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/GetCustomDistrictByTerminalCode',
    method: 'get',
    params: obj
  })
}
