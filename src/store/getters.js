const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  cachedViews: state => state.app.cachedViews,
  token: state => state.user.token,
  tenantId: state => state.user.tenantId, // 租户
  permission: state => state.user.permission, // 权限码
  avatar: state => state.user.avatar,
  userId: state => state.user.id,
  name: state => state.user.name,
  deptName: state => state.user.deptName,
  deptId: state => state.user.deptId,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  // msgs: state => state.message.msgs,
  elements: state => state.user.elements,
  setting: state => state.user.setting,
  permission_routes: state => state.permission.routers,
  allRoutes: state => state.permission.allRoutes,
  addRouters: state => state.permission.addRouters,
  permissionMenus: state => state.user.permissionMenus,
  device: state => state.app.device
}
export default getters
