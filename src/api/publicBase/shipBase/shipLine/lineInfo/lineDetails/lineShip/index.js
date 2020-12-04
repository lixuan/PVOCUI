import fetch from 'utils/fetch'
// 获取航线挂靠船舶信息列表
export function getLineShipList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineShip/GetLineShipList',
    method: 'get',
    params: obj
  })
}

// 获取航线挂靠船舶历史变更信息列表
export function getDeleteLineShipList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineShip/GetDeleteLineShipList',
    method: 'get',
    params: obj
  })
}
// 添加或修改航线挂靠船舶信息
export function lineShipAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineShip/LineShipAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取航线挂靠船舶信息编辑
export function getLineShipSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineShip/GetLineShipSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除航线挂靠船舶信息
export function batchDeleteLineShip(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineShip/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除航线运营船舶'
  })
}
// 获取艘次号
export function getVesNo(lineId, positionNo) {
  return fetch({
    url: '/BaseDataService/api/services/app/LineShip/GetVesNo',
    method: 'get',
    params: {
      lineId,
      positionNo
    }
  })
}

// 根据航线获取挂靠船舶
export function getLineShipByLineId(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetLineShipByLineIdComboBoxForEdit',
    method: 'get',
    params: obj
  })
}
// 根据航线，船公司获取船舶
export function getShipComboBoxForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetShipComboBoxForEdit',
    method: 'get',
    params: obj
  })
}
// 获取船公司代理级别列表
export function getShipCompanyChangeList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipCompanyChange/GetShipCompanyChangeList',
    method: 'get',
    params: obj
  })
}
// 创建或修改船公司变更记录
export function shipCompanyChangeAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipCompanyChange/ShipCompanyChangeAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取船公司变更记录编辑（根据id）
export function getShipCompanyChangeSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipCompanyChange/GetShipCompanyChangeSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除船公司变更记录
export function batchDeleteShipCompany(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipCompanyChange/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除船公司代理级别'
  })
}
// 创建或修改代理级别变更记录
export function agentLevelChangeAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentLevelChange/AgentLevelChangeAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取代理级别变更记录编辑（根据id）
export function getAgentLevelChangeSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentLevelChange/GetAgentLevelChangeSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除代理级别变更记录
export function batchDeleteAgent(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AgentLevelChange/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除代理级别'
  })
}

