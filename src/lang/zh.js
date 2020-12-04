export default {
  route: {
    Home: '系统主页',
    Entrust: '业务',
    BusinessRegistration: '业务录入',
    TaskQuery: '核验下发',
    DataReview: '检验复核',
    BusinessEdit: '编辑',
    BusinessEditSC: '编辑',
    BusinessPC1: 'PC1填写',
    BusinessPC2: 'PC2填写',
    BusinessPC3: 'PC3填写',
    BusinessSc: 'SC填写',

    qualityTesting: '质检',
    TaskAllocation: '检验计划',
    WorkPermission: '检验鉴定',
    customerQuery: '鉴定历史',
    inspectionReport: '检验报告',

    ComponentDemo: '证书管理',
    Tinymce: '证书生成',
    Markdown: '证书打印',
    JsonEditor: '证书邮寄',

    Financial: '财务',
    KeyboardChart: '检验计费',
    BillingDetails: '计费核算',

    customerTesting: '客户查询',
    customerHistory: '申请查询',

    DataMaintenance: '基础数据',
    UserManagement: '用户',
    roleManageIndex: '角色',
    Dictionaries: '字典管理',
    DepartmentSafeguard: '组织机构',
    CountrySafeguard: '国家信息',
    PortSafeguard: '港口信息',
    CostRate: '费目维护',
    CurrencyRate: '币种费率',
    customInfoIndex: '客户资料'
  },
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '修改密码',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: '中地汉盛检验认证系统',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    // 新添加
    commissionNo: '委托号',
    state: '当前状态',
    customerName: '客户名称',
    IDFnumber: 'IDF编号',
    contacts: '联系人',
    contactNumber: '联系电话',
    fax: '传真',
    remarks: '备注',
    checkAndIssue: '查看详情',
    certificate: '证书号',
    drafter: '拟稿人',
    draftTime: '拟稿时间',
    reinspector: '复检人',
    reinspectorTime: '复检时间',
    witnessSystem: '制证人',
    witnessSystemTime: '制证时间',
    Issuer: '签发人',
    IssuerTime: '签发时间'
  },
  example: {
    warning: '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  form: {
    selectDate: '请选择要求检验日期',
    contacts: '请输入联系人',
    contactNumber: '请输入联系电话',
    CountryOfOrigin: '请选择原产国',
    packagingAndQuantity: '请输入包装及数量',
    exportingCountry: '请选择出口国',
    loadingPort: '请输入装船港口',
    importingCountry: '前选择进口国',
    portOfDischarge: '请输入卸货港口',
    expectedShipmentDate: '预计出运日期',
    blAwb: '请输入BL/AWB No.',
    carrier: '承运人',
    containerNumber: '集装箱箱号',
    leadSeal: '铅封号',
    exporterName: '请输入名称',
    exporterAddress: '请输入地址',
    exporterLink: '请输入联系人',
    exporterLinkNumber: '请输入电话',
    exporterFax: '请输入传真',
    exporterEmail: '请输入E-mail'
  }
}
