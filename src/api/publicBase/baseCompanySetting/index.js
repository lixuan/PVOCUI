import fetch from '@/utils/fetch'
// 获取公司基本信息列表
export function getCompanyList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CompanyInfo/GetList',
    method: 'get',
    params: obj
  })
}

// 添加公司基本信息
export function createOrUpdateCompanySetting(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CompanyInfo/AddEdit',
    method: 'POST',
    data: obj
  })
}

// 获取公司基本信息编辑
export function getBaseCompanySettingForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CompanyInfo/GetSingle',
    method: 'get',
    params: obj
  })
}

// 删除公司基本信息
// export function deleteCompanyById(obj) {
//   return fetch({
//     url: '/BaseDataService/api/services/app/CompanyInfo/DeleteBaseCompanySetting',
//     method: 'delete',
//     params:obj
//   });
// }

// 批量删除
export function deleteBatchCompany(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CompanyInfo/BatchDelete',
    method: 'post',
    data: obj
  })
}

// 获取公司基本信息编辑
export function getCompanyInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CompanyInfo/GetCompanyInfo',
    method: 'get',
    params: obj
  })
}
