import router from './router'
import store from './store'
import { constantRouterMap } from './router'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { warnMsg } from '@/utils/messageBox'
import getPageTitle from '@/utils/get-page-title'
import { getCookie } from '@/utils/cookie'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect']
function whiteListDispose(arr) {
  constantRouterMap.forEach(item => {
    if (item.children && item.children.length > 0) {
      item.children.forEach(item1 => {
        whiteList.push(item.path + ((item1.path != '' && item1.path != '/') ? '/' : '') + item1.path)
      })
    } else {
      whiteList.push(item.path)
    }
  })
}
whiteListDispose(constantRouterMap)

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getCookie('Abp.AuthToken')
  if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next()
  } else if (hasToken) { // 判断是否有token
    if (to.path === '/login') {
      next()
    } else {
      if (store.getters.addRouters.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(info => { // 拉取user_info
          const roles = Object.values(info.result.grantedPermissionNames)
          if (!info.result.grantedPermissionNames || roles.length == 0) {
            warnMsg('当前用户没有权限')
            next({ path: '/login' })
            return
          }
          store.dispatch('GenerateRoutes', { roles }).then((routeParse) => { // 根据roles权限生成可访问的路由表
            router.addRoutes(routeParse) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((e) => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
