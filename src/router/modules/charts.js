/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/finance',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Financial',
    icon: 'chart'
  },
  children: [
    // 检验计费
    {
      path: 'billing',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'keyboardChart', noCache: true }
    },
    // 费用结算
    {
      path: 'expense-settlement',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: 'lineChart', noCache: true }
    },
    // 计费详情
    {
      path: 'billing-details',
      component: () => import('@/views/charts/billing-details'),
      name: 'BillingDetails',
      meta: { title: 'BillingDetails', noCache: true }
    }
  ]
}

export default chartsRouter
