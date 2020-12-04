import fetch from 'utils/fetch'
// 获取费率列表
export function getAllFeeRateList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeRate/GetFeeRateList',
    method: 'get',
    params: obj
  })
}
// 删除费率
export function deleteBatchFeeRate(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeRate/BatchDeleteFeeRateAsync',
    method: 'post',
    data: obj
  })
}

// 根据ID获取费率
export function getFeeRateById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeRate/GetOneFeeRate',
    method: 'get',
    params: obj
  })
}

// 创建或修改费率
export function createorUpdateFeeRate(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeRate/CreateOrUpdateFeeRate',
    method: 'post',
    data: obj
  })
}

// 获取费目下拉
export function getFeeItemList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/GetFeeItemList',
    method: 'get',
    params: obj
  })
}

// 获取费目下拉(参数是数组)
export function getFeeItemListByManyCode(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/FeeItemListByManyCode',
    method: 'post',
    data: obj
  })
}

// 获取航线列表
export function GetCustomInfoList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeRate/GetCustomInfoList',
    method: 'get',
    params: obj
  })
}

// 创建或修改费率明细
export function createOrUpdateFeeRateBody(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeRate/CreateOrUpdateFeeRateBody',
    method: 'post',
    data: obj
  })
}

// 获取费率明细列表
export function getFeeRateBodyList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeRate/GetFeeRateBodyList',
    method: 'get',
    params: obj
  })
}

// 提交费率
export function submitFeeRate(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeRate/SubmitFeeRate',
    method: 'post',
    data: obj
  })
}

// 导出费率明细列表
export function GetExportFeeRatetoFile(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeRate/GetExportFeeRatetoFile',
    method: 'get',
    params: obj
  })
}

// 根据船公司、业务类型取费目列表（散货用）
export function GetBulkShipFeeItemListByCompanyId(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/GetBulkShipFeeItemListByCompanyId',
    method: 'get',
    params: obj
  })
}
