import fetch from '@/utils/fetch'
// 获取引水登轮点列表
export function getAllAttendBoardList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AttendBoard/GetAttendBoardList',
    method: 'get',
    params: obj
  })
}
// 删除引水登轮点
export function deleteBatchAttendBoard(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AttendBoard/BatchDeleteAttendBoard',
    method: 'post',
    data: obj
  })
}

// 根据ID获取引水登轮点
export function getAttendBoardById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AttendBoard/GetOneAttendBoard',
    method: 'get',
    params: obj
  })
}

// 创建或修改引水登轮点
export function createorUpdateAttendBoard(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/AttendBoard/CreateOrUpdateAttendBoard',
    method: 'post',
    data: obj
  })
}

