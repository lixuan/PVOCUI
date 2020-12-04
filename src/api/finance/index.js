import fetch from '@/utils/fetch'
// 根据业务查询费用信息
export function getFeeDetailtList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeDetail/GetList',
    method: 'get',
    params: obj
  })
}

// 新增计费
export function getCreateOrUpdateFeeDetail(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeDetail/CreateOrUpdateFeeDetail',
    method: 'post',
    data: obj
  })
}
// 计费明细查询
export function getFeeDetailLists(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeDetail/GetFeeDetailList',
    method: 'get',
    params: obj
  })
}

// 删除费用
export function getDelFee(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeDetail/DelFee',
    method: 'post',
    data: obj
  })
}
// 获取费目下拉
export function getRateList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Rate/GetRateList',
    method: 'get',
    params: obj
  })
}
