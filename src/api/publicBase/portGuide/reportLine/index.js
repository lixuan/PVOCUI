import fetch from '@/utils/fetch'
// 获取报告线列表
export function getAllReportLineList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ReportLine/GetReportLineList',
    method: 'get',
    params: obj
  })
}
// 删除报告线
export function deleteBatchReportLine(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ReportLine/BatchDeleteReportLine',
    method: 'post',
    data: obj
  })
}

// 根据ID获取报告线
export function getReportLineById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ReportLine/GetOneReportLine',
    method: 'get',
    params: obj
  })
}

// 创建或修改报告线
export function createorUpdateReportLine(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ReportLine/CreateOrUpdateReportLine',
    method: 'post',
    data: obj
  })
}

