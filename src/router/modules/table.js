/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/data-maintenance',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'DataMaintenance',
    icon: 'table'
  },
  children: [
    // 审核标准
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: 'dynamicTable' }
    },
    // 进出口商信息
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: 'dragTable' }
    },
    // 计费标准
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: 'inlineEditTable' }
    },
    // 汇率维护
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'complexTable' }
    },
    // 复核详情
    {
      path: 'to-review',
      component: () => import('@/views/table/to-review'),
      name: 'toReview',
      meta: { title: 'toReview' }
    }
  ]
}
export default tableRouter
