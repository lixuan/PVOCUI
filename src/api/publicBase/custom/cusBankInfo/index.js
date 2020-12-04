import fetch from '@/utils/fetch'
// 获取开票信息列表
export function getAllCusBankInfoList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CusBankInfo/GetCusBankInfoList',
    method: 'get',
    params: obj
  })
}
// 删除开票信息
export function deleteBatchCusBankInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CusBankInfo/BatchDeleteCusBankInfo',
    method: 'post',
    data: obj
  })
}

// 根据ID获取开票信息
export function getCusBankInfoById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CusBankInfo/GetOneCusBankInfo',
    method: 'get',
    params: obj
  })
}

// 创建或修改开票信息
export function createorUpdateCusBankInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CusBankInfo/CreateOrUpdateCusBankInfo',
    method: 'post',
    data: obj
  })
}
