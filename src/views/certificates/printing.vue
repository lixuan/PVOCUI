<template>
  <div>
    <div class="dayin">
      <el-button type="primary" class="printingClick" @click="clickPrinting">
        打印
      </el-button>
    </div>
    <div class="main-article">
      <div class="article__heading">
        <div class="article__heading__title">
          <div class="fl">
            <img :src="sourceImgUrl" width="100px" height="100px">
          </div>
          <div class="fr">
            <p style="color: #32CD32">STANDARDS ORGANISATION OF NIGERIA</p>
            <p class="p1">...improving life throughstandards</p>
            <div style="text-align: center">
              <p class="p3">CONFORMITY ASSESSMENT PROGRAMME</p>
              <p class="p3">SONCAP CERTIFICATE</p>
            </div>
            <div style="text-align: right">
              <span>IAF Cod: {{ this.scno }}</span>
            </div>
          </div>
        </div>
      </div>
      <div ref="content" class="node-article-content">
        <div style="border: 1px solid #000;">
          <div class="fl" style="width: 50%;padding: 0 10px;">
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Exporter‘s Name:</div>
              <div class="fl" style="width: 60%">{{ this.customENFullName }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Address:</div>
              <div class="fl" style="width: 60%">{{ this.cusAddress }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Telephone:</div>
              <div class="fl" style="width: 60%">{{ this.cusTel }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Fax No.:</div>
              <div class="fl" style="width: 60%">{{ this.fax }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">E-mail:</div>
              <div class="fl" style="width: 60%">{{ this.email }}</div>
              <div class="clearfix" />
            </div>
          </div>
          <div class="fr" style="width: 50%;padding: 0 10px;border-left: 1px solid #000;">
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Importer's Name: </div>
              <div class="fl" style="width: 60%">{{ this.iCustomENFullName }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Address: </div>
              <div class="fl" style="width: 60%">{{ this.iCusAddress }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">duty paragraph: </div>
              <div class="fl" style="width: 60%">{{ this.dutY_NUMBER }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">TIN: </div>
              <div class="fl" style="width: 60%">{{ this.rcbnNo }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Telephone: </div>
              <div class="fl" style="width: 60%">{{ this.iCusTel }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Fax No.: </div>
              <div class="fl" style="width: 60%">{{ this.iFax }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">RC/BN No.: </div>
              <div class="fl" style="width: 60%">{{ this.rcbnNo }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">E-mail: </div>
              <div class="fl" style="width: 60%">{{ this.iEmail }}</div>
              <div class="clearfix" />
            </div>
          </div>
          <div class="clearfix" />
        </div>
        <div>
          <table class="customers">
            <tr>
              <td>
                <p style="font-size: 12px;color: #0055A1;">IAF No.:</p>
                <p style="font-size: 12px;">{{ this.iafno }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Date of RFC Receipt:</p>
                <p style="font-size: 12px;">{{ this.receiptTime }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">SC No.:</p>
                <p style="font-size: 12px;">{{ this.scno }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Date of Issuance:</p>
                <p style="font-size: 12px;">{{ this.issuance }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Country of Origin:</p>
                <p style="font-size: 12px;">{{ this.originCountry }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Inspection Date:</p>
                <p style="font-size: 12px;">{{ this.inspectionDate }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Destination Port:</p>
                <p style="font-size: 12px;">{{ this.destination }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Country of Supply:</p>
                <p style="font-size: 12px;">{{ this.exportCountry }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Testing Lab Ref:</p>
                <p style="font-size: 12px;">{{ this.testingLabRe }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Carrier/Shipper:</p>
                <p style="font-size: 12px;">{{ this.carrierCode }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Invoice No.:</p>
                <p style="font-size: 12px;">{{ this.finalInvoiceNO }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Invoice Date:</p>
                <p style="font-size: 12px;">{{ this.invoiceTime }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 12px;color: #0055A1;">FOB Value:</p>
                <p style="font-size: 12px;">{{ this.fobPrice }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">E Form M:</p>
                <p style="font-size: 12px;">{{ this.eFormMNO }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">Letter of Credit:</p>
                <p style="font-size: 12px;">{{ this.letterNO }}</p>
              </td>
              <td>
                <p style="font-size: 12px;color: #0055A1;">IAF Country Office:</p>
                <p style="font-size: 12px;">{{ this.iafCountryOffice }}</p>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <table class="customers2">
            <tr>
              <th>Item No.</th>
              <th>Declared H.S. Code</th>
              <th>Quantity& Package</th>
              <th>Brand Name</th>
              <th>Model No.</th>
              <th>Product Description</th>
              <th>Route Used</th>
              <th>Standard / Nominative Ref.</th>
              <th>Registration / License Ref.</th>
            </tr>
            <tr v-for="(item, index) in continueds" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ item.hsCode }}</td>
              <td>{{ item.count }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.brand }}</td>
              <td>{{ item.model }}</td>
              <td>{{ item.productContent }}</td>
              <td>{{ item.guideline }}</td>
              <td>{{ item.licenseNo }}</td>
            </tr>
          </table>
        </div>
        <div style="border-right: 1px solid #000;border-left: 1px solid #000;height: 110px;padding: 5px;">
          <p style="padding-bottom: 3px;"><span class="p2">Remarks: TESTING LAB REF: </span>{{ this.remarks }}</p>
          <p style="padding-bottom: 3px;"><span class="p2">Seal No(s): </span>{{ this.sealNO }}</p>
          <p style="padding-bottom: 3px;"><span class="p2">Container No(s): </span>{{ this.containerNO }}</p>
          <p style="padding-bottom: 3px;"><span class="p2">BL/AWB No: </span>{{ this.blawbno }}</p>
          <p style="padding-bottom: 3px;"><span class="p2">SC ISSUED UNDER SELECTIVITY; FORM M NO.: </span>{{ this.formMNO }}</p>
          <p style="padding-bottom: 3px;"><span class="p2">THIS SONCAP CERTIFICATE IS ISSUED BASE ON THE PRODUCT CERTIFICATE REFERENCE </span>{{ this.productNO }}</p>
        </div>
        <div style="border: 1px solid #000;;height: 225px;">
          <div class="fl" style="width: 70%;border-right: 1px solid #000;">
            <div style="font-size: 10px;border-bottom: 1px solid #000;padding: 5px 0 0 5px;">
              This Certificate is confirmation that the above products conform to the essential recommendations of
              SON approved standards. It does not verify the actual quantity shipped and any information presented with
              respect to quantity and description are drawn directly from the exporter's final invoice and/or packing list. It
              is the sole responsibility of the exporter to ensure that the products shipped are in accordance with their
              SON Product Certificate and contractual obligations to the buyer. The issuer's responsibility and liability are
              limited to the terms and conditions of its agreement with its client and it assumes no liability to any other
              party for losses, expenses and damages occasioned by the use of this certificate.
              <p style="padding-top: 5px">
                This Certificate is issued by the Standards Organization of Nigeria. It does not relieve the seller and buyer
                from their obligations to each other or from compliance to any regulations concerning the import of goods
                in Nigeria.
              </p>
            </div>
            <div style="padding: 5px 0 0 5px;">
              <p style="padding-bottom: 3px;"><span class="p2">Signed:</span></p>
              <p style="padding-bottom: 3px;"><span class="p2">Name: </span>Lin Zhuoqiang</p>
              <p style="padding-bottom: 3px;"><span class="p2">RFI Number: </span></p>
            </div>
          </div>
          <div class="fr" style="width: 30%;" />
          <div class="clearfix" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSCCertificate } from '@/api/business/index'
export default {
  data() {
    return {
      sourceImgUrl: require('../../../src/assets/login/logo.png'),
      busNO: '', // 业务单号
      scno: '', // 证书号
      iCustomENFullName: '', // 客户名称(英文全称)
      iCusAddress: '', // 公司注册地址
      dutY_NUMBER: '', // 税号
      iCusTel: '', // 公司电话
      iFax: '', // 公司传真
      rcbnNo: '', // 主表申请填写信息
      iEmail: '', // 公司邮箱
      customENFullName: '', // 客户名称(英文全称)
      cusAddress: '', // 公司注册地址
      cusTel: '', // 公司电话
      fax: '', // 公司传真
      email: '', // 公司邮箱
      iafno: '', // IAFNO
      receiptTime: '', // Date of RFC Receipt(暂定使用发票日期)
      issuance: '', // Date of Issuance
      originCountry: '', // 原产国
      inspectionDate: '', // 检验日期
      destination: '', // 卸货港口
      exportCountry: '', // 供应国
      testingLabRe: '', // 默认值：–/-
      carrierCode: '', // 承运人
      finalInvoiceNO: '', // 发票号
      invoiceTime: '', // 发票日期
      fobPrice: '', // FOB价格
      eFormMNO: '', // EFormM号
      letterNO: '', // 信用证号
      iafCountryOffice: '', // IAF国家办事处（默认为CSIC BEIJING）
      remarks: '', // 备注
      sealNO: '', // 印章编号（默认 --/-）
      containerNO: '', // ContainerNO（默认 --/-）
      blawbno: '', // 运单号
      formMNO: '', // FormM号
      productNO: '', // 产品证书编号
      continueds: [] // 续表
    }
  },
  mounted() {
    this.getSCCertificateUp()
  },
  methods: {
    // 获取证书信息
    getSCCertificateUp() {
      const data = {
        id: this.$route.params.id
      }
      getSCCertificate(data).then(res => {
        if (res.success) {
          console.log(res.result)
          this.busNO = res.result.busNO // 业务单号
          this.scno = res.result.scno// 证书号
          this.iCustomENFullName = res.result.iCustomENFullName // 客户名称(英文全称)
          this.iCusAddress = res.result.iCusAddress // 公司注册地址
          this.dutY_NUMBER = res.result.dutY_NUMBER // 税号
          this.iCusTel = res.result.iCusTel // 公司电话
          this.iFax = res.result.iFax // 公司传真
          this.rcbnNo = res.result.rcbnNo // 主表申请填写信息
          this.iEmail = res.result.iEmail // 公司邮箱
          this.customENFullName = res.result.customENFullName // 客户名称(英文全称)
          this.cusAddress = res.result.cusAddress // 公司注册地址
          this.cusTel = res.result.cusTel // 公司电话
          this.fax = res.result.fax // 公司传真
          this.email = res.result.email // 公司邮箱
          this.iafno = res.result.iafno // IAFNO
          this.receiptTime = res.result.receiptTime.slice(0, 10) // Date of RFC Receipt(暂定使用发票日期)
          this.issuance = res.result.issuance.slice(0, 10) // Date of Issuance
          this.originCountry = res.result.originCountry // 原产国
          this.inspectionDate = res.result.inspectionDate.slice(0, 10) // 检验日期
          this.destination = res.result.destination // 卸货港口
          this.exportCountry = res.result.exportCountry // 供应国
          this.testingLabRe = res.result.testingLabRe // 默认值：–/-
          this.carrierCode = res.result.carrierCode // 承运人
          this.finalInvoiceNO = res.result.finalInvoiceNO // 发票号
          this.invoiceTime = res.result.invoiceTime.slice(0, 10) // 发票日期
          this.fobPrice = res.result.fobPrice // FOB价格
          this.eFormMNO = res.result.eFormMNO // EFormM号
          this.letterNO = res.result.letterNO // 信用证号
          this.iafCountryOffice = res.result.iafCountryOffice // IAF国家办事处（默认为CSIC BEIJING）
          this.remarks = res.result.remarks // 备注
          this.sealNO = res.result.sealNO // 印章编号（默认 --/-）
          this.containerNO = res.result.containerNO // ContainerNO（默认 --/-）
          this.blawbno = res.result.blawbno // 运单号
          this.formMNO = res.result.formMNO // FormM号
          this.productNO = res.result.productNO // 产品证书编号
          this.continueds = res.result.continueds // 续表
        }
      })
    },
    //  点击打印按钮
    clickPrinting() {
      //  找到需要隐藏的DOM节点
      const head = document.getElementsByClassName('printingClick')[0]
      //  给对应DOM添加class
      head.classList.add('printHideCss')

      window.print() //  调用打印功能
      window.location.reload() //  点击取消打印后刷新页面，恢复点击打印按钮之前的原始数据
    }
  }
}
</script>

<style lang="scss">
  @mixin clearfix {
    &:before {
      display: table;
      content: '';
      clear: both;
    }

    &:after {
      display: table;
      content: '';
      clear: both;
    }
  }

  .main-article {
    padding: 20px;
    margin: 0 auto;
    display: block;
    width: 740px;
    background: #fff;
  }

  .article__heading {
    position: relative;
    overflow: hidden;
  }

  .article__heading__title {
    display: block;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: 14px;
    /*line-height: 48px;*/
    font-weight: 600;
    color: #333;
    overflow: hidden;
  }
  .p1{color: #9C4304;}
  .p2{color: #0055A1;}
  .p3{color: #0055A1;font-size: 24px!important;line-height: 0;}
  .p4{color: red;}
  .fl{float: left}
  .fr{float: right}

  .clearfix:after,.clearfix:before{
    content: "";
    display: table;
  }
  .clearfix:after{
    clear: both;
  }
  .clearfix{
    *zoom: 1;
  }

  .node-article-content {
    @include clearfix;
    font-size: 14px;
    color: #333;
    letter-spacing: 0.5px;
    /*line-height: 28px;*/
    margin-bottom: 30px;
    font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;

    &> :last-child {
      margin-bottom: 0;
    }
    b,
    strong {
      font-weight: inherit;
      font-weight: bolder;
    }

    img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }

    p {
      font-weight: 400;
      font-style: normal;
      font-size: 12px;
      letter-spacing: -.003em;
      margin: 0;padding: 0;
    }

    ul {
      margin-bottom: 30px;
    }

    li {
      --x-height-multiplier: 0.375;
      --baseline-multiplier: 0.17;

      letter-spacing: .01rem;
      font-weight: 400;
      font-style: normal;
      font-size: 21px;
      line-height: 1.58;
      letter-spacing: -.003em;
      margin-left: 30px;
      margin-bottom: 14px;
    }

    a {
      text-decoration: none;
      background-repeat: repeat-x;
      background-image: linear-gradient(to right, rgba(0, 0, 0, .84) 100%, rgba(0, 0, 0, 0) 0);
      background-size: 1px 1px;
      background-position: 0 calc(1em + 1px);
      padding: 0 6px;
    }

    code {
      background: rgba(0, 0, 0, .05);
      padding: 3px 4px;
      margin: 0 2px;
      font-size: 16px;
      display: inline-block;
    }

    img {
      border: 0;
    }

    /* 解决 IE6-7 图片缩放锯齿问题 */
    img {
      -ms-interpolation-mode: bicubic;
    }

    blockquote {
      --x-height-multiplier: 0.375;
      --baseline-multiplier: 0.17;
      font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
      letter-spacing: .01rem;
      font-weight: 400;
      font-style: italic;
      font-size: 21px;
      line-height: 1.58;
      letter-spacing: -.003em;
      border-left: 3px solid rgba(0, 0, 0, .84);
      padding-left: 20px;
      margin-left: -23px;
      padding-bottom: 2px;
    }

    a {
      text-decoration: none;
    }

    h2,
    h3,
    h4 {
      font-size: 34px;
      line-height: 1.15;
      letter-spacing: -.015em;
      margin: 53px 0 0;
    }

    h4 {
      font-size: 26px;
    }
    .customers
    {
      font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
      width:100%;
      border-collapse:collapse;
    }
    .customers tr td
    {
      color:#000000;
      text-align:center;
      font-size: 12px;
    }
    .customers td
    {
      border:1px solid #000;
      padding: 3px 0;
    }

    .customers2
    {
      font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
      width:100%;
      border-collapse:collapse;
    }

    .customers2 td, .customers2 th
    {
      font-size: 12px;
      border:1px solid #000;
      padding:3px 7px 2px 7px;
    }

    .customers2 th
    {
      font-size: 14px;
      text-align:center;
      color:#0055A1;
    }

    .customers2 tr td
    {
      color:#000000;
      text-align:center;
    }
  }
  .dayin{position: absolute;top: 5%;right: 15%;}
  .printHideCss{display: none}
</style>
