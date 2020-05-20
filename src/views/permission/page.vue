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
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="exit-wrapper background-fff">
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
                  <el-col :xs="24" :sm="24" :lg="12"><el-input :placeholder="$t('form.exporterFax')" class="filter-item" /></el-col>
                  <el-col :xs="24" :sm="24" :lg="12"><el-input :placeholder="$t('form.exporterEmail')" class="filter-item" /></el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
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
