import fetch from '@/utils/fetch'
// 获取默认费目列表
export function getAllFeeItemDefaultList(obj) {
  return fetch({
    url: '/shipfee/api/services/app/FeeItemDefault/GetFeeItemDefaultList',
    method: 'get',
    params: obj
  })
}
// 删除默认费目
export function deleteBatchFeeItemDefault(obj) {
  return fetch({
    url: '/shipfee/api/services/app/FeeItemDefault/FeeItemDefaultDel',
    method: 'post',
    data: obj
  })
}

// 根据ID获取默认费目
export function getFeeItemDefaultById(obj) {
  return fetch({
    url: '/shipfee/api/services/app/FeeItemDefault/GetOneFeeItemDefault',
    method: 'get',
    params: obj
  })
}

// 创建或修改默认费目
export function createorUpdateFeeItemDefault(obj) {
  return fetch({
    url: '/shipfee/api/services/app/FeeItemDefault/FeeItemDefaultCreatorUpdate',
    method: 'post',
    data: obj,
    msg: '默认生成费目'
  })
}
