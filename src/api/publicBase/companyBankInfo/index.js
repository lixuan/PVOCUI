import fetch from '@/utils/fetch'
// 获取银行列表
export function getCompanyBankList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CompanyBankInfo/GetCompanyBankInfoList',
    method: 'get',
    params: obj
  })
}

// 根据ID获取银行
export function getBaseCompanyBankForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CompanyBankInfo/GetOneCompanyBankInfo',
    method: 'get',
    params: obj
  })
}

// 新建或修改银行
export function createOrUpdateBaseCompanyBank(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/CompanyBankInfo/CreateOrUpdateCompanyBankInfo',
    method: 'post',
    data: obj,
    msg: msg
  })
}

// 批量删除银行
export function batchDeleteBaseCompanyBank(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CompanyBankInfo/BatchDeleteCompanyBankInfo',
    method: 'post',
    data: obj,
    msg: '删除公司银行信息'
  })
}
