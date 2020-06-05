/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/certificate',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Certificate',
    icon: 'table'
  },
  children: [
    // 证书生成
    {
      path: 'certificate-recheck',
      component: () => import('@/views/certificates/tinymce'),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' }
    },
    // 证书签发
    {
      path: 'certificate-issued',
      component: () => import('@/views/certificates/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'markdown' }
    },
    // 证书邮寄
    {
      path: 'certificate-mailing',
      component: () => import('@/views/certificates/json-editor'),
      name: 'JsonEditorDemo',
      meta: { title: 'jsonEditor' }
    }
    // // 签发详情
    // {
    //   path: 'issued-details',
    //   component: () => import('@/views/components-demo/issued'),
    //   name: 'DetailsIssued',
    //   meta: { title: 'DetailsIssued' }
    // },
    // // 证书详情
    // {
    //   path: 'certificate-details',
    //   component: () => import('@/views/components-demo/certificate-details'),
    //   name: 'CertificateDetails',
    //   meta: { title: 'CertificateDetails' }
    // }
  ]
}

export default componentsRouter
