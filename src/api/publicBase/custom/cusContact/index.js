import fetch from '@/utils/fetch'
// 获取联系人列表
export function getAllCusContactList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CusContact/GetCusContactList',
    method: 'get',
    params: obj
  })
}
// 删除联系人
export function deleteBatchCusContact(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CusContact/BatchDeleteCusContact',
    method: 'post',
    data: obj
  })
}

// 根据ID获取联系人
export function getCusContactById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CusContact/GetOneCusContact',
    method: 'get',
    params: obj
  })
}

// 创建或修改联系人
export function createorUpdateCusContact(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/CusContact/CreateOrUpdateCusContact',
    method: 'post',
    data: obj
  })
}
