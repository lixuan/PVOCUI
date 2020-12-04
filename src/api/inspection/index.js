import fetch from '@/utils/fetch'

// 新增或修改检验报告主表
export function getBusinessList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/CreateOrUpdateInspection',
    method: 'post',
    data: obj
  })
}

// 查询检验报告主表
export function getInspectionReportForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/GetInspectionReportForEdit',
    method: 'get',
    params: obj
  })
}
// 新增或修改检验报告附加表和差异报告
export function getCreateOrUpdateInspectionAdditional(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/CreateOrUpdateInspectionAdditional',
    method: 'post',
    data: obj
  })
}

// 查询检验报告附加表和差异报告
export function getInspectionAdditionalForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/GetInspectionAdditionalForEdit',
    method: 'get',
    params: obj
  })
}
// 批量新增或修改检验报告续表
export function getCreateOrUpdateSavingReportList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/CreateOrUpdateSavingReportList',
    method: 'post',
    data: obj
  })
}
// 新增或修改检验报告续表
export function getCreateOrUpdateSavingReport(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/CreateOrUpdateSavingReport',
    method: 'post',
    data: obj
  })
}

// 查询检验报告续表
export function getSavingReportForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/GetSavingReportForEdit',
    method: 'get',
    params: obj
  })
}
// 新增或修改集装箱检测
export function getCreateOrUpdateContainersReport(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/CreateOrUpdateContainersReport',
    method: 'post',
    data: obj
  })
}

// 查询检集装箱检测
export function getContainersReportForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/GetContainersReportForEdit',
    method: 'get',
    params: obj
  })
}

// 批量新增或修改集装箱检测明细表
export function getCreateOrUpdateContainersReportDetailList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/CreateOrUpdateContainersReportDetailList',
    method: 'post',
    data: obj
  })
}
// 新增或修改集装箱检测明细表
export function getCreateOrUpdateContainersReportDetail(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/CreateOrUpdateContainersReportDetail',
    method: 'post',
    data: obj
  })
}

// 查询检集装箱检测明细表
export function getContainersReportDetailForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/InspectionReport/GetContainersReportDetailForEdit',
    method: 'get',
    params: obj
  })
}
