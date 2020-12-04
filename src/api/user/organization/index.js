import fetch from '@/utils/fetch'
// 获取组织机构树
export function getOrganizatonTree() {
  return fetch({
    url: '/api/services/app/OrganizationUnit/GetNewOrganizationUnits',
    method: 'get'
  })
}

// 获取组织机构树（不统计人数）
export function getOrganizatonTreeNoUsers() {
  return fetch({
    url: '/api/services/app/Common/GetNewOrganizationUnitNoUsers',
    method: 'get'
  })
}

// 根据部门ID获取部门详情
export function getOrgDetailById(obj) {
  return fetch({
    url: '/api/services/app/OrganizationUnit/GetOrganizationUnitForEdit',
    method: 'get',
    params: obj
  })
}

// 添加组织机构树
export function createOrganizaton(obj) {
  return fetch({
    url: '/api/services/app/OrganizationUnit/CreateOrganizationUnit',
    method: 'post',
    data: obj
  })
}

// 修改组织机构树
export function updateOrganizaton(obj) {
  return fetch({
    url: '/api/services/app/OrganizationUnit/UpdateOrganizationUnit',
    method: 'put',
    data: obj
  })
}

// 删除组织机构
export function deleteOrganizaton(obj) {
  return fetch({
    url: '/api/services/app/OrganizationUnit/DeleteOrganizationUnit',
    method: 'delete',
    params: obj
  })
}
