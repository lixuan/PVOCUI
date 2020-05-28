import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'

export const constantRoutes = [
  // 重定向
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 登陆
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 重定向验证
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  // 401
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Home', icon: 'dashboard', affix: true }
      }
    ]
  },
  // 个人中心
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * 异步路由
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // 委托管理
  {
    path: '/entrust',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // 始终显示根菜单
    name: 'Permission',
    meta: {
      title: 'Entrust',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      // 任务查询
      {
        path: 'taskquery',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'TaskQuery',
          roles: ['admin']
        }
      },
      // 业务登记
      {
        path: 'business-registration',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'BusinessRegistration',
          roles: ['admin']
        }
      },
      // 未通过申请
      {
        path: 'fail',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Fail'
        }
      },
      // 工作记录
      {
        path: 'work-records',
        component: () => import('@/views/permission/work'),
        name: 'WorkPermission',
        meta: {
          title: 'WorkRecords'
        }
      },
      // 委托详情
      {
        path: 'entrus-tment',
        component: () => import('@/views/permission/entrustment'),
        name: 'DetailsEntrustment',
        meta: {
          title: 'Entrustment'
        }
      },
      // 数据复核
      {
        path: 'data-eview',
        component: () => import('@/views/permission/data-eview'),
        name: 'DataReview',
        meta: {
          title: 'DataReview'
        }
      },
      // 核验下发详情
      {
        path: 'check-details',
        component: () => import('@/views/permission/check-details'),
        name: 'CheckDetails',
        meta: {
          title: 'CheckDetails'
        }
      },
      // 任务接收
      {
        path: 'task-acceptance',
        component: () => import('@/views/permission/task-acceptance'),
        name: 'TaskAcceptance',
        meta: {
          title: 'TaskAcceptance'
        }
      },
      // 客户查询
      {
        path: 'customer-query',
        component: () => import('@/views/permission/customer-query'),
        name: 'customerQuery',
        meta: { title: 'customerQuery' }
      }
    ]
  },

  /** 切分路由模块 **/
  // 证书管理
  componentsRouter,
  // 财务计费
  chartsRouter,
  // 数据维护
  tableRouter,

  // 系统设置
  {
    path: '/settings',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Settings', icon: 'tab' }
      }
    ]
  },

  // 404页必须放在页尾
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
