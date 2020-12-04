import fetch from '@/utils/fetch'
// 获取潮汐航道列表
export function getAllTideAndCourseList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TideAndCourse/GetTideAndCourseList',
    method: 'get',
    params: obj
  })
}
// 删除潮汐航道
export function deleteBatchTideAndCourse(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TideAndCourse/BatchDeleteTideAndCourse',
    method: 'post',
    data: obj
  })
}

// 根据ID获取潮汐航道
export function getTideAndCourseById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TideAndCourse/GetOneTideAndCourse',
    method: 'get',
    params: obj
  })
}

// 创建或修改潮汐航道
export function createorUpdateTideAndCourse(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/TideAndCourse/CreateOrUpdateTideAndCourse',
    method: 'post',
    data: obj
  })
}

