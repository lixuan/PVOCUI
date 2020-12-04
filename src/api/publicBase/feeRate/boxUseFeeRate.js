import fetch from 'utils/fetch'
// 查询箱使费率列表
export function getCtnFeeRateList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CtnFeeRate/GetCtnFeeRateList',
    method: 'get',
    params: obj
  })
}

// 获取单个箱使费率
export function getSingleCtnFeeRate(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CtnFeeRate/GetOneCtnFeeRate',
    method: 'get',
    params: obj
  })
}

// 新增修改
export function createOrUpdateCtnFeeRate(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/CtnFeeRate/CreateOrUpdateCtnFeeRate',
    method: 'post',
    data: obj,
    msg
  })
}

// 删除
export function batchDeleteCtnFeeRateAsync(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CtnFeeRate/BatchDeleteCtnFeeRateAsync',
    method: 'post',
    data: obj,
    msg: '删除箱使费率'
  })
}

