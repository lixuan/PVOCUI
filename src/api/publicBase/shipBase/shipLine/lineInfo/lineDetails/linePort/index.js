import fetch from 'utils/fetch'
// 获取挂靠港口信息列表
export function getLinePortList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LinePort/GetLinePortList',
    method: 'get',
    params: obj
  })
}
// 添加或修改挂靠港口表信息
export function linePortAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/LinePort/LinePortAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取挂靠港口表信息编辑
export function getLinePortSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LinePort/GetLinePortSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除挂靠港口信息
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LinePort/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除挂靠港口'
  })
}
// 获取下一港距离
export function getNextPortDistanceAndTimeDiff(LineId, portId, sort, id) {
  return fetch({
    url: '/BaseDataService/api/services/app/LinePort/GetNextPortDistanceAndTimeDiff',
    method: 'get',
    params: {
      LineId,
      portId,
      sort,
      id
    }
  })
}
// 获取航线挂靠港口变更记录列表
export function getLinePortChangeList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LinePort/GetLinePortChangeList',
    method: 'get',
    params: obj
  })
}
// 获取青岛港挂靠码头变更列表
export function getTerminalCompanyChangeList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TerminalCompanyChange/GetTerminalCompanyChangeList',
    method: 'get',
    params: obj
  })
}
// 添加或修改青岛港挂靠码头变更表信息
export function terminalCompanyChangeAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/TerminalCompanyChange/TerminalCompanyChangeAddEdit',
    method: 'POST',
    data: obj,
    msg: msg
  })
}

// 获取青岛港挂靠码头变更信息编辑
export function getTerminalCompanyChangeSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TerminalCompanyChange/GetTerminalCompanyChangeSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除青岛港挂靠码头变更信息
export function TerminalbatchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TerminalCompanyChange/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除青岛港挂靠码头'
  })
}

// 根据航线获取挂靠港口
export function getLinePortComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetLinePortComboBoxForEdit',
    method: 'get',
    params: obj
  })
}

// 获取星期下拉
export function getWeekComboBoxForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetWeekComboBoxForEdit',
    method: 'get',
    params: obj
  })
}
// 根据港口id获取港口代码
export function getPortByPortIdCode(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/LinePort/GetPortByPortIdCode',
    method: 'get',
    params: obj
  })
}
// 获取顺延数据
export function getSortPostponedData(lineSortRuleId, sort, id) {
  return fetch({
    url: '/BaseDataService/api/services/app/LinePort/GetSortPostponedData',
    method: 'get',
    params: {
      lineSortRuleId,
      sort,
      id
    }
  })
}
