<template>
  <!--  <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="Efforts to generate PDF">-->
  <!--    <div class="article__heading">-->
  <!--      <div class="article__heading__title">-->
  <!--        {{ article.title }}-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div ref="content" class="node-article-content" v-html="article.content" />-->
  <!--  </div>-->
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
            <p class="p1">improving life through standards</p>
            <div style="text-align: center">
              <p class="p2">Standards Organization of Nigeria Conformity Assessment Programme</p>
              <p class="p3">Product Certificate (Registered)</p>
            </div>
            <div style="text-align: right">
              <span>IAF Code: {{ this.pcno }}</span>
            </div>
          </div>
        </div>
      </div>
      <div ref="content" class="node-article-content">
        <div style="border: 1px solid #000;">
          <div class="fl" style="padding: 30px 20px;width: 50%">
            <p class="p4">This document is not and does not substitute in any respect the SONCAP Certificate required for Customs Clearance</p>
          </div>
          <div class="fl" style="border-left: 1px solid #000;width: 50%">
            <div style="padding: 0 20px;">
              <div class="fl" style="width: 60%">
                <p class="p2">PC(R) No.: </p>
                <p class="p2">Issuance Date: </p>
                <p class="p2">Expiry Date of Certificate: </p>
                <!--                <p class="p2">Page: {{ this.pcno }}</p>-->
                <!--                <p class="p2">Version: {{ this.pcno }}</p>-->
              </div>
              <div class="fl" style="width: 40%">
                <p>{{ this.pcno }}</p>
                <p>{{ this.issuance }}</p>
                <p>{{ this.expiryDate }}</p>
                <!--                <p>1/1</p>-->
                <!--                <p>1</p>-->
              </div>
              <div class="clearfix" />
            </div>
          </div>
          <div class="clearfix" />
        </div>
        <div style="border-left: 1px solid #000;border-right: 1px solid #000;">
          <div class="fl" style="width: 50%;padding: 0 20px;">
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Exporter Name:</div>
              <div class="fl" style="width: 60%">{{ this.customENFullName }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Address:</div>
              <div class="fl" style="width: 60%">{{ this.cusAddress }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Phone No.:</div>
              <div class="fl" style="width: 60%">{{ this.cusTel }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">E-mail:</div>
              <div class="fl" style="width: 60%">{{ this.email }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Fax No.:</div>
              <div class="fl" style="width: 60%">{{ this.fax }}</div>
              <div class="clearfix" />
            </div>
            <!--            <div style="padding-top: 10px;">-->
            <!--              <div class="fl p2" style="width: 40%">TIN No.:</div>-->
            <!--              <div class="fl" style="width: 60%">{{ this.cusAddress }}</div>-->
            <!--              <div class="clearfix"></div>-->
            <!--            </div>-->
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">RC/BN No.:</div>
              <div class="fl" style="width: 60%">{{ this.rcbnNo }}</div>
              <div class="clearfix" />
            </div>
          </div>
          <div class="fr" style="width: 50%;padding: 0 20px;border-left: 1px solid #000;height: 262px">
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Manufacturer's Name: </div>
              <div class="fl" style="width: 60%">{{ this.iCustomENFullName }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Address: </div>
              <div class="fl" style="width: 60%">{{ this.iCusAddress }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Phone No.:</div>
              <div class="fl" style="width: 60%">{{ this.iCusTel }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">E-mail:</div>
              <div class="fl" style="width: 60%">{{ this.iEmail }}</div>
              <div class="clearfix" />
            </div>
            <div style="padding-top: 10px;">
              <div class="fl p2" style="width: 40%">Fax No.:</div>
              <div class="fl" style="width: 60%">{{ this.iFax }}</div>
              <div class="clearfix" />
            </div>
          </div>
          <div class="clearfix" />
        </div>
        <div>
          <table id="customers">
            <tr>
              <th>ITEM NO.</th>
              <th>HS CODE</th>
              <th>PRODUCT DESCRIPITION(Description,Brand,Model No.)</th>
              <th>COUNTRY OF ORIGIN</th>
              <th>STANDARD REFERENCE</th>
            </tr>
            <tr v-for="(item, index) in continueds" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ item.hsCode }}</td>
              <td>{{ item.productContent }}</td>
              <td>{{ item.exportCountry }}</td>
              <td>{{ item.guideline }}</td>
            </tr>
          </table>
        </div>
        <div style="border-right: 1px solid #000;border-left: 1px solid #000;height: 100px;padding: 10px;">
          <span class="p2">Remarks: </span>{{ this.cnsno }}
        </div>
        <div style="border: 1px solid #000;;height: 160px;padding: 10px;">
          <p style="text-align: right"><span class="p2">IAF Country Office:</span> {{ this.iafCountryOffice }}</p>
          <p><span class="p2">Signed:</span> {{ this.name }}</p>
          <p><span class="p2">Name: </span>{{ this.name }}</p>
          <p><span class="p2">RFI Number: </span>{{ this.rfiNumbe }}</p>
        </div>`
      </div>
    </div>
  </div>
</template>

<script>

import { getPCCertificate } from '@/api/business'

export default {
  name: 'Download',
  data() {
    return {
      sourceImgUrl: require('../../../src/assets/login/logo.png'),
      busNO: '', // 业务单号
      pcno: '', // 证书号
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
      cnsno: '', // TESTING LAB REF
      country: '', // 供应国
      issuance: '', // Date of Issuance
      expiryDate: '', // 证书到期日
      name: '', // 签发人
      iafCountryOffice: '', // 证书签发办公室
      rfiNumbe: '', // RFI Numbe
      continueds: [] // 续表
    }
  },
  mounted() {
    this.getPCCertificateUp()
  },
  methods: {
    // 获取证书信息
    getPCCertificateUp() {
      const data = {
        id: this.$route.params.id
      }
      getPCCertificate(data).then(res => {
        if (res.success) {
          console.log(res.result)
          this.busNO = res.result.busNO // 业务单号
          this.pcno = res.result.pcno// 证书号
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
          this.cnsno = res.result.cnsno // TESTING LAB REF
          this.country = res.result.country // 供应国
          this.issuance = res.result.issuance.slice(0, 10) // Date of Issuance
          this.expiryDate = res.result.expiryDate.slice(0, 10) // 证书到期日
          this.name = res.result.name // 签发人
          this.iafCountryOffice = res.result.iafCountryOffice // 证书签发办公室
          this.rfiNumbe = res.result.rfiNumbe // RFI Numbe
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
    font-size: 14px;
    letter-spacing: -.003em;
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
  #customers
  {
    font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
    width:100%;
    border-collapse:collapse;
  }

  #customers td, #customers th
  {
    font-size:1em;
    border:1px solid #000;
    padding:3px 7px 2px 7px;
  }

  #customers th
  {
    font-size: 14px;
    text-align:center;
    color:#0055A1;
  }

  #customers tr td
  {
    color:#000000;
    text-align:center;
  }
}
  .dayin{position: absolute;top: 5%;right: 15%;}
  .printHideCss{display: none}
</style>
