import fetch from '@/utils/fetch'
// 获取锚地列表
export function getAllAnchorageList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AnchorageGround/GetAnchorageGroundList',
    method: 'get',
    params: obj
  })
}
// 删除锚地
export function deleteBatchAnchorage(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AnchorageGround/BatchDeleteAnchorageGround',
    method: 'post',
    data: obj
  })
}

// 根据ID获取锚地
export function getAnchorageGroundById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AnchorageGround/GetOneAnchorageGround',
    method: 'get',
    params: obj
  })
}

// 创建或修改锚地
export function createorUpdateAnchorage(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AnchorageGround/CreateOrUpdateAnchorageGround',
    method: 'post',
    data: obj
  })
}

