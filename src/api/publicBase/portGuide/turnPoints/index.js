import fetch from '@/utils/fetch'
// 获取转向点列表
export function getAllTurnPointsList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TurnPoints/GetTurnPointsList',
    method: 'get',
    params: obj
  })
}
// 删除转向点
export function deleteBatchTurnPoints(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TurnPoints/BatchDeleteTurnPoints',
    method: 'post',
    data: obj
  })
}

// 根据ID获取转向点
export function getTurnPointsById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TurnPoints/GetOneTurnPoints',
    method: 'get',
    params: obj
  })
}

// 创建或修改转向点
export function createorUpdateTurnPoints(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TurnPoints/CreateOrUpdateTurnPoints',
    method: 'post',
    data: obj
  })
}

