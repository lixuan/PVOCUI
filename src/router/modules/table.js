/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/data',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'DataMaintenance',
  meta: {
    title: 'DataMaintenance',
    icon: 'table'
  },
  children: [
    // 用户
    {
      path: 'user-management',
      component: () => import('@/views/dataSettings/user/index'),
      name: 'UserManagement',
      meta: { title: 'UserManagement' }
    },
    // 角色
    {
      path: 'role-management',
      component: () => import('@/views/dataSettings/role/drag-table'),
      name: 'RoleManagement',
      meta: { title: 'RoleManagement' }
    },
    // 字典
    {
      path: 'dictionaries',
      component: () => import('@/views/dataSettings/dictionaryManage/inline-edit-table'),
      name: 'Dictionaries',
      meta: { title: 'Dictionaries' }
    },
    // 部门维护
    {
      path: 'department-safeguard',
      component: () => import('@/views/dataSettings/organization/department-safeguard'),
      name: 'DepartmentSafeguard',
      meta: { title: 'DepartmentSafeguard' }
    },
    // 国家维护
    {
      path: 'country-safeguard',
      component: () => import('@/views/dataSettings/countryInfo/country-safeguard'),
      name: 'CountrySafeguard',
      meta: { title: 'CountrySafeguard' }
    },
    // 港口维护
    {
      path: 'port-safeguard',
      component: () => import('@/views/dataSettings/portInfo/port-safeguard'),
      name: 'PortSafeguard',
      meta: { title: 'PortSafeguard' }
    },
    // 费目维护
    {
      path: 'cost-rate',
      component: () => import('@/views/dataSettings/complex-table'),
      name: 'CostRate',
      meta: { title: 'CostRate' }
    },
    // 币种费率
    {
      path: 'currency-rate',
      component: () => import('@/views/dataSettings/currency-rate'),
      name: 'CurrencyRate',
      meta: { title: 'CurrencyRate' }
    },
    // 客户信息
    {
      path: 'customer-info',
      component: () => import('@/views/dataSettings/customerInfo/to-review'),
      name: 'CustomerInfo',
      meta: { title: 'CustomerInfo' }
    }
  ]
}
export default tableRouter
