import fetch from '@/utils/fetch'
// 获取费率列表
export function getAllFeeRateList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/FeeRateByAccount/GetFeeRateList',
    method: 'get',
    params: obj
  })
}
