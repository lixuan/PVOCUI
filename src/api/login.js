import fetch from '@/utils/fetch'
import fetchNoJson from '@/utils/fetchNoJson'
export function loginByEmail(userinfo) {
  return fetch({
    url: '/api/TokenAuth/Authenticate',
    method: 'post',
    data: userinfo
  })
}

export function logout(token) {
  return fetch({
    url: '/api/auth/jwt/invalid',
    method: 'post',
    params: { token }
  })
}

export function getInfo(Id) {
  return fetch({
    url: '/api/services/app/Role/GetPermissionsbyRoleId',
    method: 'get',
    params: { Id }
  })
}

export function getMenus(token) {
  return fetch({
    url: '/api/admin/user/front/menus',
    method: 'get',
    params: { token }
  })
}

export function getAllMenus() {
  return fetch({
    url: '/api/admin/user/front/menu/all',
    method: 'get'
  })
}
