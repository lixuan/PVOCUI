import fetch from '@/utils/fetch'
// 获取船公司费目对照表列表
export function getFeeItemContrastList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeItemContrast/GetFeeItemContrastList',
    method: 'get',
    params: obj
  })
}
// 添加或修改船公司费目对照表
export function feeItemContrastAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeItemContrast/FeeItemContrastAddEdit',
    method: 'post',
    data: obj,
    msg: msg
  })
}
// 根据Id获取船公司费目对照表详情
export function getFeeItemContrastSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeItemContrast/GetFeeItemContrastSingle',
    method: 'get',
    params: obj
  })
}
// 批量删除船公司费目对照表
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeItemContrast/BatchDelete',
    method: 'post',
    data: obj,
    msg: '删除船公司费目对照表'
  })
}

// 获取费目下拉
export function getFeeItemList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetFeeItemList',
    method: 'get',
    params: obj
  })
}

// 获取费目下拉
export function getFeeItemListJKHD(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetFeeItemListJKHD',
    method: 'get',
    params: obj
  })
}

// 获取费目下拉(业务类型级联形式)
export function getBusinessTypeAndFeeItem(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetBusinessTypeAndFeeItem',
    method: 'get',
    params: obj
  })
}

