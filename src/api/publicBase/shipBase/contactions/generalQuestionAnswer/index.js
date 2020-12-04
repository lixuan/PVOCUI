import fetch from 'utils/fetch'
// 获取常见问题及解答信息列表
export function getQuestionAnswerList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/GeneralQuestionAnswerInfo/GetBaseGeneralQuestionAnswer',
    method: 'get',
    params: obj
  })
}
// 添加或修改常见问题及解答
export function QuestionAnswerAddEdit(obj, msg) {
  return fetch({
    url: '/BaseDataService/api/services/app/GeneralQuestionAnswerInfo/AddEditBaseGeneralQuestionAnswer',
    method: 'POST',
    data: obj,
    msg: msg
  })
}
// 获取常见问题及解答编辑
export function getQuestionAnswerSingle(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/GeneralQuestionAnswerInfo/GetBaseGeneralQuestionAnswerEdit',
    method: 'get',
    params: obj
  })
}
// 批量删除常见问题及解答
export function batchDelete(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/GeneralQuestionAnswerInfo/BathDeleteBaseGeneralQuestionAnswer',
    method: 'post',
    data: obj,
    msg: '删除常见问题及解答'
  })
}
