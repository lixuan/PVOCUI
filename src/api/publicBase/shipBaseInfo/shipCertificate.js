import fetch from 'utils/fetch'
// 获取船舶证书列表
export function getShipCertificateList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipCretificate/GetShipCretificateList',
    method: 'get',
    params: obj
  })
}
// 根据id获取数据
export function getShipCertificateById(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipCretificate/GetOneShipCretificate',
    method: 'get',
    params: obj
  })
}
// 创建或修改
export function createorUpdateShipCertificate(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipCretificate/CreateOrUpdateShipCretificate',
    method: 'post',
    data: obj
  })
}

// 删除
export function deleteShipCertificate(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/ShipCretificate/BatchDeleteShipCretificate',
    method: 'post',
    data: obj
  })
}
