import fetch from '@/utils/fetch'
// 获取港口名称对照列表
export function GetFlowNo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ContactList/GetFlowNo',
    method: 'get',
    params: obj
  })
}
