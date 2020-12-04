import fetch from 'utils/fetch'
// 获取船舶列表
export function getAllShipBaseList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipBaseInfo/GetShipBaseInfoList',
    method: 'get',
    params: obj
  })
}
// 删除船舶
export function deleteBatchShipBase(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipBaseInfo/BatchDeleteShipBaseInfo',
    method: 'post',
    data: obj
  })
}

// 根据ID获取船舶
export function getShipBaseInfoById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipBaseInfo/GetOneShipBaseInfo',
    method: 'get',
    params: obj
  })
}

// 创建或修改船舶
export function createorUpdateShipBaseInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipBaseInfo/CreateOrUpdateShipBaseInfo',
    method: 'post',
    data: obj
  })
}

// 获取船舶类型
export function GetShipTypeCombox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/GetShipTypeCombox',
    method: 'get',
    params: obj
  })
}
// 获取代理级别变更列表
export function GetAgentLevelChangeList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipBaseInfo/GetAgentLevelChangeList',
    method: 'get',
    params: obj
  })
}
// 获取船公司变更列表
export function GetShipCompanyChangeList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipBaseInfo/GetShipCompanyChangeList',
    method: 'get',
    params: obj
  })
}
// 获取客户列表
export function GetCustomInfoList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/GetCustomInfoList',
    method: 'get',
    params: obj
  })
}
// 获取本公司银行信息
export function GetCompanyBankList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/GetCompanyBankList',
    method: 'get',
    params: obj
  })
}
// 获取船舶变更列表
export function GetShipInfoChangeList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipBaseInfo/GetShipInfoChangeList',
    method: 'get',
    params: obj
  })
}

// 获取中英文船名下拉
export function GetShipNameCombox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetshipBaseInfoComboBoxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取港口下拉框列表（用于下拉框）
export function getPortInfoList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/GetPortInfoComboBox',
    method: 'get',
    params: obj
  })
}

// 统计船员人数
export function ShipManCount(obj) {
  return fetch({
    url: '/cangdan/api/ImportMessage/ShipManCount',
    method: 'post',
    data: obj
  })
}

// 导出申请表
export function ExportShipDeclareTable(obj) {
  return fetch({
    url: '/BaseDataService/api/ShipDeclareTable/CreateShipDeclareTableWord',
    method: 'post',
    params: obj
  })
}

// 根据船公司获取船下拉
export function getShipComboBoxFor(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetShipComboBoxFor',
    method: 'get',
    params: obj
  })
}

// 通过航线获取挂靠船舶中英文船名下拉
export function getShipNameComboBoxForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetShipNameComboBoxForEdit',
    method: 'get',
    params: obj
  })
}
