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
        <div style="padding-bottom: 20px;" class="clearfix">
          <div class="wrapper-title" style="padding-top: 10px;float: left">申请续表</div>
          <div style="float: right">
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
              {{ $t('table.add') }}
            </el-button>
          </div>
        </div>
        <div class="clearfix" />
        <el-row>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @sort-change="sortChange"
          >
            <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
              <template slot-scope="{row}">
                <span>{{ row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="HS编码" align="center">
              <template slot-scope="{row}">
                <span>{{ row.pageviews }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
              <template slot-scope="{row}">
                <span class="link-type" @click="handleUpdate(row)">{{ row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column label="品牌" align="center">
              <template slot-scope="{row}">
                <span>{{ row.reviewer }}</span>
              </template>
            </el-table-column>
            <el-table-column label="型号" align="center">
              <template slot-scope="{row}">
                <span>{{ row.pageviews }}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品描述" align="center">
              <template slot-scope="{row}">
                <span>{{ row.pageviews }}</span>
              </template>
            </el-table-column>
            <el-table-column label="参考标准" class-name="status-col" align="center">
              <template slot-scope="{row}">
                {{ row.status }}
              </template>
            </el-table-column>
            <el-table-column label="注册/许可号" class-name="status-col" align="center">
              <template slot-scope="{row}">
                {{ row.status }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
              <template slot-scope="{row,$index}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">
                  {{ $t('table.edit') }}
                </el-button>
                <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                  {{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-row>
      </div>
    </el-row>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="130px" style="width: 500px; margin-left:50px;">
        <el-form-item label="HS编码" prop="type">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="数量" prop="timestamp">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="单位" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="品牌" prop="timestamp">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="产品描述" prop="timestamp">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="参考标准" prop="timestamp">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="注册/许可号" prop="timestamp">
          <el-input v-model="temp.title" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { createArticle, fetchList, updateArticle } from '@/api/article'
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'PagePermission',
  components: {
    Pagination
  },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
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
      method: '1',
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogPvVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: '新增'
      },
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style>
  .page-container{background: rgb(240, 242, 245);padding: 20px;min-height: 100vh;}
  .background-fff{background: #fff;padding: 16px 16px 0;margin-bottom: 20px;}
  .wrapper-title{color: #1890ff;}
  .wrapper-form{padding: 20px 0;color: #606266}
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";    /*不用有内容也可以*/
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }
</style>
