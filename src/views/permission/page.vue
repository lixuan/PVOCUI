<template>
  <div class="page-container">
    <el-row :gutter="8">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="basic-wrapper background-fff">
          <div class="wrapper-title">基本信息</div>
          <div class="wrapper-form">
            <el-row :gutter="32">
              <el-col :xs="24" :sm="24" :lg="8">
                <div class="">
                  国家办公室：CSIC Beijing
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8">
                <div class="">
                  申请号：
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8">
                <div class="">
                  申请日期：2020-04-01
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="2" style="padding-top: 16px">
              <el-col :xs="24" :sm="24" :lg="4">
                <div class="grid-content bg-purple">所申请证书类型：</div>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="20">
                <div class="grid-content bg-purple">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="PC1 (未注册状态产品证书)" style="margin-bottom: 5px" />
                    <el-checkbox label="PC2 (注册状态产品证书)" />
                    <el-checkbox label="PC3 (许可状态产品证书)" />
                    <el-checkbox label="SC (SONCAP证书)" />
                  </el-checkbox-group>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="wrapper-title">预约检验</div>
          <div class="wrapper-form">
            <div>
              检验地点：
            </div>
            <div style="padding-top: 16px">
              <el-row :gutter="32">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-date-picker
                    v-model="selectDate"
                    type="date"
                    :placeholder="$t('form.selectDate')"
                  />
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-input v-model="contactsInput" :placeholder="$t('form.contacts')" class="filter-item" />
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-input v-model="contactNumberInput" :placeholder="$t('form.contactNumber')" class="filter-item" />
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
      <!--货物提单信息-->
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="goods-wrapper background-fff">
          <div class="wrapper-title">货物提单信息</div>
          <div class="wrapper-form">
            <el-row :gutter="32">
              <el-col :xs="24" :sm="24" :lg="8">
                <el-select v-model="country" :placeholder="$t('form.CountryOfOrigin')">
                  <el-option
                    v-for="item in countryValueOptions"
                    :key="item.countryValue"
                    :label="item.countryLabel"
                    :value="item.countryValue"
                  />
                </el-select>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8">
                <el-input :placeholder="$t('form.packagingAndQuantity')" class="filter-item" />
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8">
                <el-select v-model="exportingCountry" :placeholder="$t('form.exportingCountry')">
                  <el-option
                    v-for="item in exportingCountryValueOptions"
                    :key="item.exportingCountryValue"
                    :label="item.exportingCountryLabel"
                    :value="item.exportingCountryValue"
                  />
                </el-select>
              </el-col>
            </el-row>
            <div style="padding-top: 16px">
              <el-row :gutter="32">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-input :placeholder="$t('form.loadingPort')" class="filter-item" />
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-select v-model="importingCountry" :placeholder="$t('form.importingCountry')">
                    <el-option
                      v-for="item in importingCountryValueOptions"
                      :key="item.importingCountryValue"
                      :label="item.importingCountryLabel"
                      :value="item.importingCountryValue"
                    />
                  </el-select>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-input :placeholder="$t('form.portOfDischarge')" class="filter-item" />
                </el-col>
              </el-row>
            </div>
            <div style="padding-top: 16px">
              <el-row :gutter="32">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-date-picker
                    v-model="expectedShipmentDate"
                    type="date"
                    :placeholder="$t('form.expectedShipmentDate')"
                  />
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-select v-model="carrier" :placeholder="$t('form.carrier')">
                    <el-option
                      v-for="item in carrierOptions"
                      :key="item.carrierValue"
                      :label="item.carrierLabel"
                      :value="item.carrierValue"
                    />
                  </el-select>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-input :placeholder="$t('form.blAwb')" class="filter-item" />
                </el-col>
              </el-row>
            </div>
            <div style="padding-top: 16px">
              <el-row :gutter="32">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-input :placeholder="$t('form.containerNumber')" class="filter-item" />
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-input :placeholder="$t('form.leadSeal')" class="filter-item" />
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8" />
              </el-row>
            </div>
            <div style="padding-top: 16px">
              <el-row>
                <el-col :xs="24" :sm="24" :lg="3">
                  出运方式：
                </el-col>
                <el-col :xs="24" :sm="24" :lg="21">
                  <el-checkbox-group v-model="checkExpectedList">
                    <el-checkbox label="Air" />
                    <el-checkbox label="Sea" />
                    <el-checkbox label="Rail" />
                    <el-checkbox label="Road" />
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </div>
            <div style="padding-top: 16px">
              <el-row>
                <el-col :xs="24" :sm="24" :lg="3">
                  装箱方式：
                </el-col>
                <el-col :xs="24" :sm="24" :lg="21">
                  <el-radio v-model="method" label="1">FCL</el-radio><el-radio v-model="method" label="2">LCL</el-radio>
                </el-col>
              </el-row>
            </div>
            <div style="padding-top: 16px">
              <el-row>
                <el-col :xs="24" :sm="24" :lg="3">
                  产品状况：
                </el-col>
                <el-col :xs="24" :sm="24" :lg="21">
                  <el-checkbox-group v-model="productStatusList">
                    <el-checkbox label="新产品" />
                    <el-checkbox label="旧产品(二手)" />
                    <el-checkbox label="库存货" />
                    <el-checkbox label="成品" />
                    <el-checkbox label="全散件(CKD)" />
                    <el-checkbox label="半散(SKD)" />
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--出口商/制造商信息-->
    <el-row>
      <el-row :gutter="8">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="exit-wrapper background-fff">
            <div class="wrapper-title">出口商/制造商信息</div>
            <div class="wrapper-form">
              <div>
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterName')" class="filter-item" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterAddress')" class="filter-item" />
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterLink')" class="filter-item" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterLinkNumber')" class="filter-item" />
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterFax')" class="filter-item" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterEmail')" class="filter-item" />
                  </el-col>
                </el-row>
              </div>
            </div>
            <!--进口商信息-->
            <div class="wrapper-title">进口商信息</div>
            <div class="wrapper-form">
              <div>
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterName')" class="filter-item" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterAddress')" class="filter-item" />
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterLink')" class="filter-item" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterLinkNumber')" class="filter-item" />
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterFax')" class="filter-item" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input :placeholder="$t('form.exporterEmail')" class="filter-item" />
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
        <!--右侧-->
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="exit-wrapper background-fff">
            <div class="wrapper-form">
              <div>
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input placeholder="请输入Final Invoice No" class="filter-item" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-date-picker
                      v-model="selectDate"
                      type="date"
                      placeholder="请选择发票日期"
                    />
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12"><el-input placeholder="请输入FOB价格" class="filter-item" /></el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-select v-model="FOBcurrency" placeholder="请选择FOB币种">
                      <el-option
                        v-for="item in FOBcurrencyOptions"
                        :key="item.FOBcurrencyValue"
                        :label="item.FOBcurrencyLabel"
                        :value="item.FOBcurrencyValue"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input placeholder="请输入Form ‘M’号" class="filter-item" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input placeholder="请输入TIN NO." class="filter-item" />
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12"><el-input placeholder="请输入BA NO." class="filter-item" /></el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-select v-model="routeList" placeholder="请选择PC ROUTE">
                      <el-option
                        v-for="item in routeOptions"
                        :key="item.routeValue"
                        :label="item.routeLabel"
                        :value="item.routeValue"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input placeholder="请输入RC/BN No" class="filter-item" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input placeholder="请输入CNAS机构代码" class="filter-item" />
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-input placeholder="请输入信用证号" class="filter-item" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <div style="padding-top: 10px">
                      附件：<span style="color: #1890ff">上传申请单附件</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="2">
                  <el-col :xs="24" :sm="24" :lg="4">
                    <div class="grid-content bg-purple">所附文件：</div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="20">
                    <div class="grid-content bg-purple">
                      <el-checkbox-group v-model="fileList">
                        <el-checkbox label="有效测试报告/证书" style="margin-bottom: 5px" />
                        <el-checkbox label="ISO质量认证等体系复印件" style="margin-bottom: 5px" />
                        <el-checkbox label="产品规格表，材质安全数据表" style="margin-bottom: 5px" />
                        <el-checkbox label="ISO17025认证复印件" style="margin-bottom: 5px" />
                        <el-checkbox label="供应商声明" style="margin-bottom: 5px" />
                        <el-checkbox label="厂检/测试报告" style="margin-bottom: 5px" />
                        <el-checkbox label="发票" style="margin-bottom: 5px" />
                        <el-checkbox label="提单" style="margin-bottom: 5px" />
                        <el-checkbox label="装箱单" style="margin-bottom: 5px" />
                        <el-checkbox label="产品图片" style="margin-bottom: 5px" />
                        <el-checkbox label="L/C" style="margin-bottom: 5px" />
                        <el-checkbox label="PC" style="margin-bottom: 5px" />
                        <el-checkbox label="其他" style="margin-bottom: 5px" />
                      </el-checkbox-group>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <div class="goods-wrapper background-fff">
        <div class="wrapper-title">申请续表</div>
      </div>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'PagePermission',
  components: {},
  data() {
    return {
      contactsInput: '',
      contactNumberInput: '',
      checkList: [],
      fileList: [],
      checkExpectedList: [],
      productStatusList: [],
      selectDate: '',
      expectedShipmentDate: '',
      countryValueOptions: [{
        countryValue: '选项1',
        countryLabel: '中国'
      }, {
        countryValue: '选项2',
        countryLabel: '美国'
      }, {
        countryValue: '选项3',
        countryLabel: '韩国'
      }, {
        countryValue: '选项4',
        countryLabel: '加拿大'
      }, {
        countryValue: '选项5',
        countryLabel: '俄罗斯'
      }],
      country: '',
      exportingCountryValueOptions: [{
        exportingCountryValue: '选项1',
        exportingCountryLabel: '中国'
      }, {
        exportingCountryValue: '选项2',
        exportingCountryLabel: '美国'
      }, {
        exportingCountryValue: '选项3',
        exportingCountryLabel: '韩国'
      }, {
        exportingCountryValue: '选项4',
        exportingCountryLabel: '加拿大'
      }, {
        exportingCountryValue: '选项5',
        exportingCountryLabel: '俄罗斯'
      }],
      exportingCountry: '',
      importingCountryValueOptions: [{
        importingCountryValue: '选项1',
        importingCountryLabel: '中国'
      }, {
        importingCountryValue: '选项2',
        importingCountryLabel: '美国'
      }, {
        importingCountryValue: '选项3',
        importingCountryLabel: '韩国'
      }, {
        importingCountryValue: '选项4',
        importingCountryLabel: '加拿大'
      }, {
        importingCountryValue: '选项5',
        importingCountryLabel: '俄罗斯'
      }],
      importingCountry: '',
      carrierOptions: [{
        carrierValue: '选项1',
        carrierLabel: 'A'
      }, {
        carrierValue: '选项2',
        carrierLabel: 'B'
      }, {
        carrierValue: '选项3',
        carrierLabel: 'C'
      }, {
        carrierValue: '选项4',
        carrierLabel: 'D'
      }, {
        carrierValue: '选项5',
        carrierLabel: 'E'
      }],
      carrier: '',
      FOBcurrencyOptions: [{
        FOBcurrencyValue: '选项1',
        FOBcurrencyLabel: 'REM'
      }, {
        FOBcurrencyValue: '选项2',
        FOBcurrencyLabel: 'USB'
      }, {
        FOBcurrencyValue: '选项3',
        FOBcurrencyLabel: 'USB'
      }, {
        FOBcurrencyValue: '选项4',
        FOBcurrencyLabel: 'REM'
      }, {
        FOBcurrencyValue: '选项5',
        FOBcurrencyLabel: 'USB'
      }],
      FOBcurrency: '',
      routeOptions: [{
        routeValue: '选项1',
        routeLabel: 'REM'
      }, {
        routeValue: '选项2',
        routeLabel: 'USB'
      }, {
        routeValue: '选项3',
        routeLabel: 'USB'
      }, {
        routeValue: '选项4',
        routeLabel: 'REM'
      }, {
        routeValue: '选项5',
        routeLabel: 'USB'
      }],
      routeList: '',
      method: '1'
    }
  },
  methods: {}
}
</script>
<style>
  .page-container{background: rgb(240, 242, 245);padding: 20px;min-height: 100vh;}
  .background-fff{background: #fff;padding: 16px 16px 0;margin-bottom: 20px;}
  .wrapper-title{color: #1890ff;}
  .wrapper-form{padding: 20px 0;color: #606266}
</style>
