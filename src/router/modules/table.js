/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/data',
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
      path: 'audit-criteria',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: 'dynamicTable' }
    },
    // 进出口商信息
    {
      path: 'importer-exporter',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: 'dragTable' }
    },
    // 计费标准
    {
      path: 'freight-basis',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: 'inlineEditTable' }
    },
    // 汇率维护
    {
      path: 'exchange-rate',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'complexTable' }
    },
    // 复核详情
    {
      path: 'review-details',
      component: () => import('@/views/table/to-review'),
      name: 'toReview',
      meta: { title: 'toReview' }
    }
  ]
}
export default tableRouter
