import fetch from '@/utils/fetch'
// 获取业务基本信息列表
export function GetBusinessList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetList',
    method: 'get',
    params: obj
  })
}

// 业务录入新增或修改
export function getCreateOrUpdateBus(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/CreateOrUpdateBus',
    method: 'post',
    data: obj
  })
}

// 获取主业务编辑
export function GetBusInfoForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetBusInfoForEdit',
    method: 'get',
    params: obj
  })
}

// 删除业务主表
export function getDelBus(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/DelBus',
    method: 'post',
    data: obj
  })
}

// 修改流程
export function getUpdateCheck(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/CheckBus',
    method: 'post',
    data: obj
  })
}

// 任务分配
export function getAssignments(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/Assignments',
    method: 'post',
    data: obj
  })
}

// 任务下发
export function getTaskRelease(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/TaskRelease',
    method: 'post',
    data: obj
  })
}

// 查询检验项目和检验依据
export function getItemsCertificate(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetItemsCertificate',
    method: 'get',
    params: obj
  })
}

// 获取业务续表信息列表
export function GetContinuedList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetContinuedList',
    method: 'get',
    params: obj
  })
}

// 新增或修改续表
export function getCreateOrUpdateBusContinued(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/CreateOrUpdateBusContinued',
    method: 'post',
    data: obj
  })
}

// 删除续表
export function getDelBusContinued(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/DelBusContinued',
    method: 'post',
    data: obj
  })
}

// 续表编辑信息
export function GetBusContinuedInfoForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetBusContinuedInfoForEdit',
    method: 'get',
    params: obj
  })
}
// 获取港口信息
export function getPortInfoListList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PortInfo/GetPortInfoListList',
    method: 'get',
    params: obj
  })
}
// 生成申请单号和证书号
export function getBusNO(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetBusNO',
    method: 'get',
    params: obj
  })
}
// 获取港口下拉框，英文/中文
export function getPortInfoComboBox(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/GetPortInfoComboBox',
    method: 'get',
    params: obj
  })
}
// 获取币种/集装箱类型
export function getBaseKeyValue(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/BaseKey_Value/GetBaseKey_Value',
    method: 'get',
    params: obj
  })
}
// 新增或修改检验集装箱信息
export function getCreateOrUpdateContainer(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/CreateOrUpdateContainer',
    method: 'post',
    data: obj
  })
}
// 查询审核集装箱列表
export function getContainerList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetContainerList',
    method: 'get',
    params: obj
  })
}
// 新增快递信息
export function getCreateOrUpdatePort(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/CreateOrUpdatePort',
    method: 'post',
    data: obj
  })
}
// 获取快递编辑信息
export function getPostInfoForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetPostInfoForEdit',
    method: 'get',
    params: obj
  })
}
// 通过联系单号获取邮寄信息
export function getPostInfo(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetPostInfo',
    method: 'get',
    params: obj
  })
}
// 生成证书号并绑定
export function getZSNO(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetZSNO',
    method: 'get',
    params: obj
  })
}
// 根据业务Id获取证书信息 SC证书
export function getSCCertificate(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetSCCertificate',
    method: 'get',
    params: obj
  })
}
// 根据业务Id获取证书信息 PC证书
export function getPCCertificate(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetPCCertificate',
    method: 'get',
    params: obj
  })
}
// 附件上传
export function getCreateAnnex(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/CreateAnnex',
    method: 'post',
    data: obj
  })
}
// 删除附件
export function getDelAnnexs(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/DelAnnexs',
    method: 'post',
    data: obj
  })
}
// 附件查询
export function getAnnes(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/GetAnnes',
    method: 'get',
    params: obj
  })
}
export function getAnnexUpload(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Business/AnnexUpload',
    method: 'post',
    data: obj
  })
}
