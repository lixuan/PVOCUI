import store from '@/store/index'

// 按钮验证
export function checkBtnPeimission(peimission) {
  return store.getters.permission.some(item => item === peimission)
}

export class Permission {
    // 组织机构页面
    static orgPage = {
      addOrg: { name: '新增部门', permission: 'Pages.Administration.OrganizationUnits.Create' },
      updateOrg: { name: '编辑部门', permission: 'Pages.Administration.OrganizationUnits.Create' },
      deleteOrg: { name: '删除部门', permission: 'Pages.Administration.OrganizationUnits.Delete' },
      addUser: { name: '新增用户', permission: 'Pages.Administration.OrganizationUnits.AddUsers' }
    }
    // 关区页面
    static DistrictPage = {
      addDistrict: { name: '添加', permission: 'Pages.Administration.BaseCustomDistrict.Create' },
      deleteDistrict: { name: '删除', permission: 'Pages.Administration.BaseCustomDistrict.Delete' },
      batchDeleteDistrict: { name: '批量删除', permission: 'Pages.Administration.BaseCustomDistrict.BatchDelete' },
      updateDistrict: { name: '修改', permission: 'Pages.Administration.BaseCustomDistrict.Update' }
    }
}

// 组织机构页面
export const orgPage = {
  addOrg: { name: '新增部门', permission: 'Pages.Administration.OrganizationUnits.Create' },
  updateOrg: { name: '编辑部门', permission: 'Pages.Administration.OrganizationUnits.Create' },
  deleteOrg: { name: '删除部门', permission: 'Pages.Administration.OrganizationUnits.Delete' },
  addUser: { name: '新增用户', permission: 'Pages.Administration.OrganizationUnits.AddUsers' }
}
// 角色
export const rolePage = {
  addRole: { name: '新增', permission: 'Pages.Administration.Roles.Create' },
  updateRole: { name: '编辑', permission: 'Pages.Administration.Roles.Edit' },
  deleteRole: { name: '删除', permission: 'Pages.Administration.Roles.Delete' }
}
// 用户
export const userPage = {
  addUser: { name: '新增', permission: 'Pages.Administration.Users.Create' },
  updateUser: { name: '编辑', permission: 'Pages.Administration.Users.Edit' },
  deleteUser: { name: '删除', permission: 'Pages.Administration.Users.Delete' }
}
// 港口
export const portPage = {
  addPortPage: { name: '新增', permission: 'Customs.BasePort.Create' },
  updatePortPage: { name: '编辑', permission: 'Customs.BasePort.Edit' },
  deletePortPage: { name: '单条删除', permission: 'Customs.BasePort.Delete' },
  deletesPortPage: { name: '批量删除', permission: 'Customs.BasePort.BatchDelete' }
}
// 国家
export const countryPage = {
  addCountry: { name: '新增', permission: 'Customs.BaseCountry.Create' },
  updateCountry: { name: '编辑', permission: 'Customs.BaseCountry.Edit' },
  deleteCountry: { name: '单条删除', permission: 'Customs.BaseCountry.Delete' },
  deletesCountry: { name: '批量删除', permission: 'Customs.BaseCountry.BatchDelete' }
}
// 业务
export const businessPage = {
  addBusinessPage: { name: '新增', permission: 'Customs.Business.Create' }
}
// 客户资料
export const customPage = {
  addCustomInfo: { name: '新增', permission: 'Customs.BaseCustomInfo.Create' },
  updateCustomInfo: { name: '编辑', permission: 'Customs.BaseCustomInfo.Edit' },
  deleteCustomInfo: { name: '删除', permission: 'Customs.BaseCustomInfo.Delete' }
}
// 证书打印
export const markdownPage = {
  markdownPc: { name: 'PC证书打印', permission: 'Customs.Business.PCCertificate' },
  markdownSc: { name: 'SC证书打印', permission: 'Customs.Business.SCCertificate' }
}
