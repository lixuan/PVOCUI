import fetch from '@/utils/fetch'

// 查询列表
export function getList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TaxClassification/GetTaxClassificationList',
    method: 'get',
    params: obj
  })
}

// 获取单个编辑
export function getEditById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TaxClassification/GetTaxClassificationSingle',
    method: 'get',
    params: obj
  })
}

// 创建或修改
export function createorUpdateCode(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/TaxClassification/TaxClassificationAddEdit',
    method: 'post',
    data: obj,
    msg: msg
  })
}

// 删除
export function deleteBatchCode(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TaxClassification/BatchDelete',
    method: 'post',
    data: obj
  })
}

