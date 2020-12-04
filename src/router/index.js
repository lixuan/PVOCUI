import Vue from 'vue'
import Router from 'vue-router'
import { portPage, orgPage, countryPage, businessPage, customPage, markdownPage, rolePage, userPage } from '@/utils/btnRole'
Vue.use(Router)

/* layout */
import Layout from '@/layout'

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index').then(m => m.default),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404').then(m => m.default),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401').then(m => m.default),
    hidden: true
  },
  {
    path: '/download/:id',
    component: () => import('@/views/certificates/download'),
    name: 'download',
    hidden: true
  },
  {
    path: '/printing/:id',
    component: () => import('@/views/certificates/printing'),
    name: 'printing',
    hidden: true
  },
  // {
  //   path: '/codeCallback',
  //   component: () => import('@/views/modules/ssoclient/codeCallback').then(m => m.default),
  //   hidden: true
  // },
  // {
  //   path: '/choosedTenement',
  //   component: () => import('@/views/permission/choosedTenement/choosedTenementIndex').then(m => m.default),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    name: 'Home',
    hidden: true,
    children: [{
      path: 'home',
      component: () => import('@/views/dashboard/index').then(m => m.default)
    }]
  }
]

export const asyncRouterMap = [

  // 业务
  {
    path: '/entrust',
    component: Layout,
    redirect: '/entrust/business-registration',
    name: 'Entrust',
    alwaysShow: true,
    meta: {
      title: '业务',
      icon: 'star'
    },
    children: [
      // 业务录入
      {
        path: 'business-registration',
        component: () => import('@/views/business/page').then(m => m.default),
        name: 'BusinessRegistration',
        keepAlive: true,
        meta: {
          title: '业务录入',
          roles: ['Customs.Business']
        },
        btn: businessPage
      }
      // 核验下发
      // {
      //   path: 'taskquery',
      //   component: () => import('@/views/business/role').then(m => m.default),
      //   name: 'TaskQuery',
      //   keepAlive: true,
      //   meta: {
      //     title: 'TaskQuery',
      //     roles: ['Customs.Dictionary']
      //   },
      // },
      // // 检验复核
      // {
      //   path: 'data-eview',
      //   component: () => import('@/views/business/data-eview').then(m => m.default),
      //   name: 'DataReview',
      //   keepAlive: true,
      //   meta: {
      //     title: 'DataReview',
      //     roles: ['Customs.Dictionary']
      //   },
      // },
      // // 检验查询
      // {
      //   path: 'inspection-query',
      //   component: () => import('@/views/business/directive').then(m => m.default),
      //   name: 'InspectionQuery',
      //   keepAlive: true,
      //   meta: {
      //     title: 'InspectionQuery',
      //     roles: ['Customs.Dictionary']
      //   },
      // },
      // pc业务主表编辑
      // {
      //   path: 'business-edit/:id/:no',
      //   component: () => import('@/views/business/page-bj').then(m => m.default),
      //   name: 'BusinessEdit',
      //   keepAlive: true,
      //   meta: {
      //     title: 'pc业务主表编辑'
      //   },
      //   hidden: true,
      //   roles: ['']
      // },
      // // sc业务主表编辑
      // {
      //   path: 'business-edit-sc/:id/:no',
      //   component: () => import('@/views/business/page-scbj').then(m => m.default),
      //   name: 'BusinessEditSC',
      //   keepAlive: true,
      //   meta: {
      //     title: 'sc业务主表编辑'
      //   },
      //   hidden: true
      // },
      // {
      //   path: 'business-pc1/:id',
      //   component: () => import('@/views/business/page-pc1').then(m => m.default),
      //   name: 'BusinessPC1',
      //   keepAlive: true,
      //   meta: {
      //     title: 'PC1录入'
      //   },
      //   hidden: true
      // },
      // {
      //   path: 'business-pc2/:id',
      //   component: () => import('@/views/business/page-pc2').then(m => m.default),
      //   name: 'BusinessPC2',
      //   keepAlive: true,
      //   meta: {
      //     title: 'PC2录入'
      //   },
      //   hidden: true
      // },
      // {
      //   path: 'business-pc3/:id',
      //   component: () => import('@/views/business/page-pc3').then(m => m.default),
      //   name: 'BusinessPC3',
      //   keepAlive: true,
      //   meta: {
      //     title: 'PC3录入'
      //   },
      //   hidden: true
      // },
      // {
      //   path: 'business-sc/:id',
      //   component: () => import('@/views/business/page-sc').then(m => m.default),
      //   name: 'BusinessSc',
      //   keepAlive: true,
      //   meta: {
      //     title: 'SC录入'
      //   },
      //   hidden: true
      // },
    ]
  },
  // 业务编辑
  {
    path: '/entrusts',
    component: Layout,
    redirect: '/entrust/business-registration',
    alwaysShow: true,
    meta: {
      title: '业务编辑',
      icon: 'star'
    },
    hidden: true,
    children: [
      // pc业务主表编辑
      {
        path: 'business-edit/:id/:no',
        component: () => import('@/views/business/page-bj').then(m => m.default),
        name: 'BusinessEdit',
        keepAlive: true,
        meta: {
          title: 'pc业务主表编辑'
        },
        hidden: true
      },
      // sc业务主表编辑
      {
        path: 'business-edit-sc/:id/:no',
        component: () => import('@/views/business/page-scbj').then(m => m.default),
        name: 'BusinessEditSC',
        keepAlive: true,
        meta: {
          title: 'sc业务主表编辑'
        },
        hidden: true
      },
      {
        path: 'business-pc1/:id',
        component: () => import('@/views/business/page-pc1').then(m => m.default),
        name: 'BusinessPC1',
        keepAlive: true,
        meta: {
          title: 'PC1录入'
        },
        hidden: true
      },
      {
        path: 'business-pc2/:id',
        component: () => import('@/views/business/page-pc2').then(m => m.default),
        name: 'BusinessPC2',
        keepAlive: true,
        meta: {
          title: 'PC2录入'
        },
        hidden: true
      },
      {
        path: 'business-pc3/:id',
        component: () => import('@/views/business/page-pc3').then(m => m.default),
        name: 'BusinessPC3',
        keepAlive: true,
        meta: {
          title: 'PC3录入'
        },
        hidden: true
      },
      {
        path: 'business-sc/:id',
        component: () => import('@/views/business/page-sc').then(m => m.default),
        name: 'BusinessSc',
        keepAlive: true,
        meta: {
          title: 'SC录入'
        },
        hidden: true
      }
    ]
  },
  // 质检
  // {
  //   path: '/quality-testing',
  //   component: Layout,
  //   redirect: '/quality-testing/task-allocation',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'qualityTesting',
  //     icon: 'example',
  //   },
  //   children: [
  //     // 检验计划
  //     {
  //       path: 'task-allocation',
  //       component: () => import('@/views/testing/task-allocation').then(m => m.default),
  //       name: 'TaskAllocation',
  //       meta: {
  //         title: 'TaskAllocation',
  //         keepAlive: true,
  //         roles: ['Customs.BaseCountry']
  //       },
  //     },
  //     // 检验鉴定
  //     {
  //       path: 'work-records',
  //       component: () => import('@/views/testing/work').then(m => m.default),
  //       name: 'WorkPermission',
  //       meta: {
  //         title: 'WorkPermission',
  //         keepAlive: true,
  //         roles: ['Customs.BaseCountry']
  //       }
  //     },
  //     // 鉴定历史
  //     {
  //       path: 'customer-query',
  //       component: () => import('@/views/testing/customer-query').then(m => m.default),
  //       name: 'customerQuery',
  //       meta: {
  //         title: 'customerQuery',
  //         keepAlive: true,
  //         roles: ['Customs.BaseCountry']
  //       }
  //     },
  //     // 检验报告
  //     {
  //       path: 'inspection-report/:id',
  //       component: () => import('@/views/testing/inspection-report').then(m => m.default),
  //       name: 'inspectionReport',
  //       meta: {title: 'inspectionReport'},
  //       hidden: true
  //     }
  //   ]
  // },
  // 证书管理
  {
    path: '/certificate',
    component: Layout,
    redirect: '/certificate/certificate-issued',
    alwaysShow: true,
    meta: {
      title: '证书管理',
      icon: 'table'
    },
    children: [
      // 证书生成
      // {
      //   path: 'certificate-recheck',
      //   component: () => import('@/views/certificates/tinymce').then(m => m.default),
      //   name: 'Tinymce',
      //   meta: {
      //     title: 'Tinymce',
      //     keepAlive: true,
      //     roles: ['admin']
      //   },
      // },
      // 证书打印
      {
        path: 'certificate-issued',
        component: () => import('@/views/certificates/markdown').then(m => m.default),
        name: 'Markdown',
        meta: {
          title: '证书打印',
          keepAlive: true,
          roles: ['Customs.Business.PCCertificate']
        },
        btn: markdownPage
      }
      // 证书邮寄
      // {
      //   path: 'certificate-mailing',
      //   component: () => import('@/views/certificates/json-editor').then(m => m.default),
      //   name: 'JsonEditor',
      //   meta: {
      //     title: 'JsonEditor',
      //     keepAlive: true,
      //     roles: ['admin']
      //   },
      // },
    ]
  },
  // 财务
  // {
  //   path: '/finance',
  //   component: Layout,
  //   redirect: '/finance/billing',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'Financial',
  //     icon: 'money',
  //   },
  //   children: [
  //     // 检验计费
  //     {
  //       path: 'billing',
  //       component: () => import('@/views/finance/keyboard').then(m => m.default),
  //       name: 'KeyboardChart',
  //       meta: {
  //         title: 'KeyboardChart',
  //         keepAlive: true,
  //         roles: ['Customs.BaseCountry']
  //       },
  //     },
  //     // 计费核算
  //     {
  //       path: 'billing-details',
  //       component: () => import('@/views/finance/billing-details').then(m => m.default),
  //       name: 'BillingDetails',
  //       meta: {
  //         title: 'BillingDetails',
  //         keepAlive: true,
  //         roles: ['Customs.BaseCountry']
  //       },
  //     },
  //   ],
  // },
  // 客户查询
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/customer-history',
    alwaysShow: true,
    meta: {
      title: '客户查询',
      icon: 'user'
    },
    children: [
      // 申请查询
      {
        path: 'customer-history',
        component: () => import('@/views/customer/index').then(m => m.default),
        name: '',
        meta: {
          title: '申请查询',
          keepAlive: true,
          roles: ['Client.Business']
        }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/user-management',
    alwaysShow: true,
    meta: {
      title: '基础数据',
      icon: 'table'
    },
    children: [
      // 用户
      {
        path: 'user-management',
        component: () => import('@/views/dataSettings/user/index').then(m => m.default),
        name: 'UserManagement',
        meta: {
          title: '用户',
          keepAlive: true,
          roles: ['Pages.Administration.Users']
        },
        btn: userPage
      },
      { // 角色
        path: 'role-management',
        component: () => import('@/views/dataSettings/role/drag-table').then(m => m.default),
        name: 'roleManageIndex',
        meta: {
          title: '角色',
          keepAlive: true,
          roles: ['Pages.Administration.Roles']
        },
        btn: rolePage
      },
      { // 字典管理
        path: 'dictionaryManage',
        component: () => import('@/views/dataSettings/dictionaryManage/inline-edit-table').then(m => m.default),
        name: 'Dictionaries',
        meta: {
          title: '字典管理',
          keepAlive: true,
          roles: ['Customs.Dictionary']
        }
      },
      { // 客户资料
        path: 'custom-info',
        component: () => import('@/views/dataSettings/customerInfo/to-review').then(m => m.default),
        name: 'customInfoIndex',
        keepAlive: true,
        meta: {
          title: '客户资料',
          roles: ['Customs.BaseCustomInfo']
        },
        btn: customPage
      },
      { // 组织机构
        path: 'department-safeguard',
        component: () => import('@/views/dataSettings/organization/department-safeguard').then(m => m.default),
        name: 'DepartmentSafeguard',
        meta: {
          title: '组织机构',
          keepAlive: true,
          roles: ['Pages.Administration.OrganizationUnits']
        },
        btn: orgPage
      },
      { // 港口信息
        path: 'port-safeguard',
        component: () => import('@/views/dataSettings/portInfo/port-safeguard').then(m => m.default),
        name: 'PortSafeguard',
        meta: {
          title: '港口信息',
          keepAlive: true,
          roles: ['Customs.BasePort']
        },
        btn: portPage
      },
      { // 国家资料
        path: 'country-safeguard',
        component: () => import('@/views/dataSettings/countryInfo/country-safeguard').then(m => m.default),
        name: 'countrySafeguard',
        keepAlive: true,
        meta: {
          title: '国家资料',
          roles: ['Customs.BaseCountry']
        },
        btn: countryPage
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop
  //     }
  //     return { x: 0, y: to.meta.savedPosition || 0 }
  //   }
  // },
  routes: constantRouterMap
})

