<template>
  <div class="page-container">
    <div class="content">
      <el-form ref="businessForm" v-loading="loading" :rules="rules" :model="businessForm" class="clearfix">
        <el-row :gutter="8">
          <el-col :xs="24" :sm="24" :lg="10">
            <div class="basic-wrapper background-fff" style="padding-bottom: 20px">
              <div class="wrapper-title">基本信息</div>
              <div class="wrapper-form">
                <el-row :gutter="32">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="申请号:">
                      <el-input v-model="businessForm.busNO" :disabled="true" style="width: 220px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="申请日期:">
                      {{ this.systemDate }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="wrapper-title" style="padding-top: 5px">预约检验</div>
              <div class="wrapper-form">
                <el-row :gutter="2" style="padding-top: 5px">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="检验港口:" prop="portCode">
                      <el-select v-model="businessForm.portCode" :disabled="prohibit" filterable placeholder="请选择港口" style="width: 220px">
                        <el-option
                          v-for="item in portValueOptions"
                          :key="item.value"
                          :disabled="prohibit"
                          :label="item.displayText"
                          :value="item.code"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="预约检验:" prop="inspectTime">
                      <el-date-picker
                        v-model="businessForm.inspectTime"
                        :disabled="prohibit"
                        type="date"
                        placeholder="预约检验时间"
                        style="width: 220px"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="exit-wrapper background-fff" style="padding-bottom: 20px">
              <div class="">
                <div class="wrapper-title">出口商/制造商信息</div>
                <div class="wrapper-form">
                  <div>
                    <el-row :gutter="2">
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="exporterCusCode">
                          <el-input v-model="businessForm.exporterCusCode" placeholder="请输入名称" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="cusAddress">
                          <el-input v-model="businessForm.cusAddress" placeholder="请输入地址" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="customENFullName">
                          <el-input v-model="businessForm.customENFullName" placeholder="请输入联系人" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                  <div style="padding-top: 16px">
                    <el-row :gutter="2">
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="cusTel">
                          <el-input v-model="businessForm.cusTel" placeholder="请输入电话" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="fax">
                          <el-input v-model="businessForm.fax" placeholder="请输入传真" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="email">
                          <el-input v-model="businessForm.email" placeholder="请输入E-mail" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <!--进口商信息-->
                <div class="wrapper-title">进口商信息</div>
                <div class="wrapper-form">
                  <div>
                    <el-row :gutter="2">
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="importerCusCode">
                          <el-input v-model="businessForm.importerCusCode" placeholder="请输入名称" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="importerCusAddress">
                          <el-input v-model="businessForm.importerCusAddress" placeholder="请输入地址" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="importerCustomENFullName">
                          <el-input v-model="businessForm.importerCustomENFullName" placeholder="请输入联系人" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                  <div style="padding-top: 16px">
                    <el-row :gutter="2">
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="importerCusTel">
                          <el-input v-model="businessForm.importerCusTel" placeholder="请输入电话" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="importerFax">
                          <el-input v-model="businessForm.importerFax" placeholder="请输入传真" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="8">
                        <el-form-item prop="importerEmail">
                          <el-input v-model="businessForm.importerEmail" placeholder="请输入E-mail" :disabled="prohibit" class="filter-item" style="width: 200px" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div style="padding-top: 16px">
                <el-row :gutter="32">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <el-form-item label="出运方式:" prop="modeTransport">
                      <el-radio-group v-model="businessForm.modeTransport" :disabled="prohibit">
                        <el-radio label="Air" style="margin-bottom: 5px">Air</el-radio>
                        <el-radio label="Sea">Sea</el-radio>
                        <el-radio label="Rail">Rail</el-radio>
                        <el-radio label="Road">Road</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <!--货物提单信息-->
          <el-col :xs="24" :sm="24" :lg="14">
            <div class="goods-wrapper background-fff clearfix">
              <div class="wrapper-title">货物提单信息</div>
              <div class="wrapper-form">
                <el-row :gutter="32">
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="" prop="originCountry">
                      <el-select v-model="businessForm.originCountry" :disabled="prohibit" filterable placeholder="请选择原产国" style="width: 220px">
                        <el-option
                          v-for="item in countryValueOptions"
                          :key="item.value"
                          :label="item.displayText"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="" prop="packNO">
                      <el-input v-model="businessForm.packNO" :disabled="prohibit" class="filter-item" placeholder="包装及数量" style="width: 220px" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="" prop="exportCountry">
                      <el-select v-model="businessForm.exportCountry" :disabled="prohibit" filterable placeholder="出口国" style="width: 220px">
                        <el-option
                          v-for="item in countryValueOptions"
                          :key="item.value"
                          :label="item.displayText"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="" prop="startPort">
                      <el-select v-model="businessForm.startPort" :disabled="prohibit" filterable placeholder="请输入装船港口" style="width: 220px">
                        <el-option
                          v-for="item in portValueOptions"
                          :key="item.value"
                          :label="item.displayText"
                          :value="item.code"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div style="padding-top: 16px">
                  <el-row :gutter="32">
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="importCountry">
                        <el-select v-model="businessForm.importCountry" :disabled="prohibit" filterable placeholder="请输入进口国" style="width: 220px">
                          <el-option
                            v-for="item in countryValueOptions"
                            :key="item.value"
                            :label="item.displayText"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="destination">
                        <el-select v-model="businessForm.destination" :disabled="prohibit" filterable placeholder="请输入卸货港口" style="width: 220px">
                          <el-option
                            v-for="item in portValueOptions"
                            :key="item.value"
                            :label="item.displayText"
                            :value="item.code"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="expectedTime">
                        <el-date-picker
                          v-model="businessForm.expectedTime"
                          :disabled="prohibit"
                          type="date"
                          placeholder="预计出运时间"
                          style="width: 220px"
                          value-format="yyyy-MM-dd"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="letterNO">
                        <el-input v-model="businessForm.letterNO" placeholder="请输入信用证号" :disabled="prohibit" class="filter-item" style="width: 220px" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div style="padding-top: 16px">
                  <el-row :gutter="32">
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="carrierCode">
                        <el-select v-model="businessForm.carrierCode" :disabled="prohibit" filterable placeholder="承运人" style="width: 220px">
                          <el-option
                            v-for="item in carrierOptions"
                            :key="item.carrierValue"
                            :label="item.carrierLabel"
                            :value="item.carrierValue"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="blawbno">
                        <el-input v-model="businessForm.blawbno" :disabled="prohibit" placeholder="运单号" class="filter-item" style="width: 220px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="containerNO">
                        <el-input v-model="businessForm.containerNO" :disabled="prohibit" placeholder="集装箱箱号" class="filter-item" style="width: 220px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="sealNO">
                        <el-input v-model="businessForm.sealNO" :disabled="prohibit" placeholder="铅封号" class="filter-item" style="width: 220px" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div>
                  <el-row :gutter="32" style="padding-top: 16px">
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="finalInvoiceNO">
                        <el-input v-model="businessForm.finalInvoiceNO" placeholder="请输入发票号" :disabled="prohibit" class="filter-item" style="width: 220px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="invoiceTime">
                        <el-date-picker
                          v-model="businessForm.invoiceTime"
                          :disabled="prohibit"
                          type="date"
                          placeholder="请选择发票日期"
                          style="width: 220px"
                          value-format="yyyy-MM-dd"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="fobPrice">
                        <el-input v-model="businessForm.fobPrice" :disabled="prohibit" placeholder="请输入FOB价格" class="filter-item" style="width: 220px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="6">
                      <el-form-item label="" prop="fobCurrency">
                        <el-select v-model="businessForm.fobCurrency" :disabled="prohibit" filterable placeholder="请选择FOB币种" style="width: 220px">
                          <el-option
                            v-for="item in FOBcurrencyOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div style="padding-top: 16px">
                    <el-row :gutter="32">
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-form-item label="" prop="formMNO">
                          <el-input v-model="businessForm.formMNO" placeholder="请输入Form ‘M’号" :disabled="prohibit" class="filter-item" style="width: 220px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-form-item label="" prop="tinno">
                          <el-input v-model="businessForm.tinno" placeholder="请输入TIN NO." :disabled="prohibit" class="filter-item" style="width: 220px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-form-item label="" prop="bano">
                          <el-input v-model="businessForm.bano" placeholder="请输入BA NO." :disabled="prohibit" class="filter-item" style="width: 220px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-form-item label="" prop="pcRoute">
                          <el-select v-model="businessForm.pcRoute" :disabled="prohibit" filterable placeholder="请选择PC类型" style="width: 220px">
                            <el-option
                              v-for="item in routeOptions"
                              :key="item.routeValue"
                              :label="item.routeLabel"
                              :value="item.routeValue"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                  <div style="padding-top: 16px">
                    <el-row :gutter="32">
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-form-item label="" prop="rcbnNo">
                          <el-input v-model="businessForm.rcbnNo" placeholder="请输入RC/BN No" :disabled="prohibit" class="filter-item" style="width: 220px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-form-item label="" prop="cnasCode">
                          <el-input v-model="businessForm.cnasCode" placeholder="请输入CNAS机构代码" :disabled="prohibit" class="filter-item" style="width: 220px" />
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-form-item label="装箱方式:" prop="boxMode">
                          <el-radio-group v-model="businessForm.boxMode" :disabled="prohibit">
                            <el-radio label="FCL">FCL</el-radio>
                            <el-radio label="LCL">LCL</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>

                </div>
              </div>
              <div>
                <div class="wrapper-title" style="font-size: 14px;color: #606266;line-height: 36px;font-weight: 700;">附件(共5个文件，必填)：</div>
                <el-row :gutter="2">
                  <el-col :xs="24" :sm="24" :lg="5">
                    <el-upload
                      ref="upload"
                      class="upload-demo"
                      action="/BaseDataService/api/services/app/Business/AnnexUpload"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="handleSuccess"
                      :on-change="handleChange"
                      :http-request="httpRequest"
                      :file-list="fileList"
                      :show-file-list="true"
                      :limit="1"
                      :auto-upload="true"
                    >
                      <el-button slot="trigger" size="small" type="primary">上传 PC证书 文件</el-button>
                    </el-upload>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="5">
                    <el-upload
                      ref="upload"
                      class="upload-demo"
                      action="/BaseDataService/api/services/app/Business/AnnexUpload"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="handleSuccess"
                      :on-change="handleChange"
                      :http-request="httpRequest2"
                      :file-list="fileList2"
                      :show-file-list="true"
                      :limit="1"
                      :auto-upload="true"
                    >
                      <el-button slot="trigger" size="small" type="primary">上传 形式发票 文件</el-button>
                    </el-upload>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="5">
                    <el-upload
                      ref="upload"
                      class="upload-demo"
                      action="/BaseDataService/api/services/app/Business/AnnexUpload"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="handleSuccess"
                      :on-change="handleChange"
                      :http-request="httpRequest5"
                      :file-list="fileList5"
                      :show-file-list="true"
                      :limit="1"
                      :auto-upload="true"
                    >
                      <el-button slot="trigger" size="small" type="primary">上传 FM表格 文件</el-button>
                    </el-upload>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="5">
                    <el-upload
                      ref="upload"
                      class="upload-demo"
                      action="/BaseDataService/api/services/app/Business/AnnexUpload"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="handleSuccess"
                      :on-change="handleChange"
                      :http-request="httpRequest4"
                      :file-list="fileList4"
                      :show-file-list="true"
                      :limit="1"
                      :auto-upload="true"
                    >
                      <el-button slot="trigger" size="small" type="primary">上传 装箱单 文件</el-button>
                    </el-upload>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="4">
                    <el-upload
                      ref="upload"
                      class="upload-demo"
                      action="/BaseDataService/api/services/app/Business/AnnexUpload"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="handleSuccess"
                      :on-change="handleChange"
                      :http-request="httpRequest3"
                      :file-list="fileList3"
                      :show-file-list="true"
                      :limit="1"
                      :auto-upload="true"
                    >
                      <el-button slot="trigger" size="small" type="primary">上传 提单 文件</el-button>
                    </el-upload>
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 16px;padding-bottom: 34px;" class="clearfix">
                <el-form-item label="产品状况:" prop="productStatus">
                  <el-radio-group v-model="businessForm.productStatus" :disabled="prohibit">
                    <el-radio label="新产品" style="margin-bottom: 5px">新产品</el-radio>
                    <el-radio label="旧产品(二手)">旧产品(二手)</el-radio>
                    <el-radio label="库存货">库存货</el-radio>
                    <el-radio label="成品">成品</el-radio>
                    <el-radio label="全散件(CKD)">全散件(CKD)</el-radio>
                    <el-radio label="半散(SKD)">半散(SKD)</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <div class="goods-wrapper background-fff" style="padding-top: 36px">
          <div style="padding-bottom: 20px;" class="clearfix">
            <div class="wrapper-title" style="padding-top: 10px;float: left">申请续表</div>
            <div style="float: right">
              <el-button class="filter-item" :disabled="prohibitXb" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
                续表信息
              </el-button>
            </div>
          </div>
          <div class="clearfix" />
          <el-row>
            <el-table
              :key="tableKey"
              v-loading="table.loading"
              :data="continuedList"
              border
              fit
              highlight-current-row
              style="width: 100%;"
              @selection-change="onSelectChange"
              @sort-change="sortChange"
            >
              <el-table-column type="selection" align="center" />
              <el-table-column label="序号" type="index" align="center" :index="indexMethodXb" width="50px" />
              <el-table-column label="HS编码" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.hsCode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="数量" align="center">
                <template slot-scope="{row}">
                  <span class="">{{ row.count }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.unit }}</span>
                </template>
              </el-table-column>
              <el-table-column label="品牌" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.brand }}</span>
                </template>
              </el-table-column>
              <el-table-column label="型号" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.model }}</span>
                </template>
              </el-table-column>
              <el-table-column label="产品描述" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.productContent }}</span>
                </template>
              </el-table-column>
              <el-table-column label="参考标准" class-name="status-col" align="center">
                <template slot-scope="{row}">
                  {{ row.guideline }}
                </template>
              </el-table-column>
              <el-table-column label="注册/许可号" class-name="status-col" align="center">
                <template slot-scope="{row}">
                  {{ row.licenseNo }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                  <el-button type="primary" size="mini" @click="handleUpdate(row)">
                    编辑
                  </el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top:10px;"
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              :total="page.total"
              :page-sizes="page.pageSelectArr"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-row>
          <div style="padding-bottom: 20px;padding-top: 40px;padding-left: 1550px">
            <el-button type="success" :loading="loading" @click="onPreserve">提交</el-button>
          </div>
        </div>
      </el-row>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="ruless" :model="temp" label-position="right" label-width="130px" style="width: 500px; margin-left:50px;">
          <el-form-item label="HS编码" prop="hsCode" style="margin-bottom: 20px!important;">
            <el-input v-model="temp.hsCode" />
          </el-form-item>
          <el-form-item label="数量" prop="count" style="margin-bottom: 20px!important;">
            <el-input v-model="temp.count" />
          </el-form-item>
          <el-form-item label="单位" prop="unit" style="margin-bottom: 20px!important;">
            <el-input v-model="temp.unit" />
          </el-form-item>
          <el-form-item label="品牌" prop="brand" style="margin-bottom: 20px!important;">
            <el-input v-model="temp.brand" />
          </el-form-item>
          <el-form-item label="型号" prop="model" style="margin-bottom: 20px!important;">
            <el-input v-model="temp.model" />
          </el-form-item>
          <el-form-item label="产品描述" prop="productContent" style="margin-bottom: 20px!important;">
            <el-input v-model="temp.productContent" />
          </el-form-item>
          <el-form-item label="参考标准" prop="guideline" style="margin-bottom: 20px!important;">
            <el-input v-model="temp.guideline" />
          </el-form-item>
          <el-form-item label="注册/许可号" prop="licenseNo">
            <el-input v-model="temp.licenseNo" />
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
    </div>
  </div>
</template>

<script>
import { tableMixin } from '../../mixin/commTable'
import {
  getCreateOrUpdateBus,
  GetContinuedList,
  getPortInfoComboBox,
  getCreateOrUpdateBusContinued,
  getBusNO,
  getBaseKeyValue,
  getDelBusContinued,
  getCreateAnnex,
  getAnnexUpload
} from '@/api/business/index'
import { getCountryInfoListNew } from '@/api/publicBase/baseCountry/index'
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import { getRoleSelectList } from '@/api/user/roles'
import { batchDeleteInfo, getList } from '@/api/publicBase/portInfo'
import { getCookie, setCookie } from '@/utils/cookie'
import { warnMsg } from '@/utils/messageBox'
import axios from 'axios'

export default {
  name: 'PagePermission',
  components: {
    Pagination
  },
  directives: { waves },
  mixins: [tableMixin],
  data() {
    return {
      prohibitXb: false,
      prohibit: false,
      enclosureChecked: false, // 附件多选
      enclosureChecked2: false, // 附件多选
      enclosureChecked3: false, // 附件多选
      enclosureChecked4: false, // 附件多选
      enclosureChecked5: false, // 附件多选
      loading: false,
      systemDate: '', // 申请日期
      fileList: [], // 获取上传文件
      fileList2: [], // 获取上传文件
      fileList3: [], // 获取上传文件
      fileList4: [], // 获取上传文件
      fileList5: [], // 获取上传文件
      fileListData: [], // 上传文件
      businessForm: {
        busNO: '',
        businessCode: 'SC',
        portCode: '',
        Standard: '',
        inspectTime: '',
        exporterCusCode: '',
        cusAddress: '',
        customENFullName: '',
        cusTel: '',
        fax: '',
        email: '',
        importerCusCode: '',
        importerCusAddress: '',
        importerCustomENFullName: '',
        importerCusTel: '',
        importerFax: '',
        importerEmail: '',
        originCountry: '',
        packNO: '',
        exportCountry: '',
        startPort: '',
        importCountry: '',
        destination: '',
        expectedTime: '',
        modeTransport: '',
        carrierCode: '',
        blawbno: '',
        boxMode: '',
        containerNO: '',
        sealNO: '',
        productStatus: [],
        finalInvoiceNO: '',
        invoiceTime: '',
        fobPrice: '',
        fobCurrency: '',
        formMNO: '',
        tinno: '',
        bano: '',
        pcRoute: '',
        rcbnNo: '',
        cnasCode: '',
        letterNO: ''
      },
      continuedList: [{ id: undefined, busNO: '', hsCode: '', count: '', unit: '', brand: '', model: '', productContent: '', guideline: '', licenseNo: '' }],
      searchBarFixed: false,
      tableKey: 0,
      portValueOptions: [], // 港口下拉
      countryValueOptions: [], // 国家下拉
      carrierOptions: [{ // 承运人
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
      FOBcurrencyOptions: [], // 请选择FOB币种
      FOBcurrency: '',
      routeOptions: [{
        routeValue: 'PC1',
        routeLabel: 'PC1'
      }, {
        routeValue: 'PC2',
        routeLabel: 'PC2'
      }, {
        routeValue: 'PC3',
        routeLabel: 'PC3'
      }, {
        routeValue: 'SC',
        routeLabel: 'SC'
      }],
      temp: { busNO: '', hsCode: '', count: '', unit: '', brand: '', model: '', productContent: '', guideline: '', licenseNo: '' },
      dialogFormVisible: false,
      dialogPvVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      pvData: [],
      rules: {
        portCode: [
          { required: true, message: '请选择检验港口', trigger: 'change' }
        ],
        inspectTime: [
          { required: true, message: '请选择预约检验时间', trigger: 'change' }
        ],
        originCountry: [
          { required: true, message: '请输入原产国', trigger: 'change' }
        ],
        packNO: [
          { required: true, message: '请输入包装及数量', trigger: 'blur' }
        ],
        exportCountry: [
          { required: true, message: '请输入出口国', trigger: 'blur' }
        ],
        startPort: [
          { required: true, message: '请选择装船港口', trigger: 'change' }
        ],
        importCountry: [
          { required: true, message: '请输入进口国', trigger: 'blur' }
        ],
        destination: [
          { required: true, message: '请选择卸货港口', trigger: 'change' }
        ],
        expectedTime: [
          { required: true, message: '请选择预计出运时间', trigger: 'change' }
        ],
        modeTransport: [
          { required: true, message: '请选择出运方式', trigger: 'change' }
        ],
        carrierCode: [
          { required: true, message: '请选择承运人', trigger: 'change' }
        ],
        blawbno: [
          { required: true, message: '请输入运单号', trigger: 'blur' }
        ],
        boxMode: [
          { required: true, message: '请选择装箱方式', trigger: 'change' }
        ],
        containerNO: [
          { required: true, message: '请输入集装箱箱号', trigger: 'blur' }
        ],
        sealNO: [
          { required: true, message: '请输入铅封号', trigger: 'blur' }
        ],
        productStatus: [
          { required: true, message: '请选择产品状况', trigger: 'change' }
        ],
        importerCusCode: [
          { required: true, message: '请输入进口商名称', trigger: 'blur' }
        ],
        importerCustomENFullName: [
          { required: true, message: '请输入进口商联系人', trigger: 'blur' }
        ],
        importerCusAddress: [
          { required: true, message: '请输入进口商地址', trigger: 'blur' }
        ],
        importerCusTel: [
          { required: true, message: '请输入进口商电话', trigger: 'blur' }
        ],
        importerFax: [
          { required: true, message: '请输入进口商传真', trigger: 'blur' }
        ],
        importerEmail: [
          { required: true, message: '请输入进口商E-mail', trigger: 'blur' }
        ],
        exporterCusCode: [
          { required: true, message: '请输入出口商名称', trigger: 'blur' }
        ],
        customENFullName: [
          { required: true, message: '请输入出口商联系人', trigger: 'blur' }
        ],
        cusAddress: [
          { required: true, message: '请输入出口商地址', trigger: 'blur' }
        ],
        cusTel: [
          { required: true, message: '请输入出口商电话', trigger: 'blur' }
        ],
        fax: [
          { required: true, message: '请输入出口商传真', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入出口商E-mail', trigger: 'blur' }
        ],
        dutY_NUMBER: [
          { required: true, message: '请输入税号', trigger: 'blur' }
        ],
        finalInvoiceNO: [
          { required: true, message: '请输入发票号', trigger: 'blur' }
        ],
        invoiceTime: [
          { required: true, message: '请选择发票日期', trigger: 'change' }
        ],
        fobPrice: [
          { required: true, message: '请输入FOB价格', trigger: 'blur' }
        ],
        fobCurrency: [
          { required: true, message: '请输选择币别', trigger: 'change' }
        ],
        formMNO: [
          { required: true, message: '请输入FormM号', trigger: 'blur' }
        ],
        tinno: [
          { required: true, message: '请输入TIN NO.', trigger: 'blur' }
        ],
        bano: [
          { required: true, message: '请输入BA NO.', trigger: 'blur' }
        ],
        pcRoute: [
          { required: true, message: '请输入PC类型', trigger: 'blur' }
        ],
        rcbnNo: [
          { required: true, message: '请输入RC/BN No', trigger: 'blur' }
        ],
        cnasCode: [
          { required: true, message: '请输入CNAS机构代码', trigger: 'blur' }
        ],
        letterNO: [
          { required: true, message: '请输入信用证号', trigger: 'blur' }
        ]
      },
      ruless: {
        hsCode: [
          { required: true, message: '请输入HS编码', trigger: 'blur' }
        ],
        count: [
          { required: true, message: '请输入数量', trigger: 'change' }
        ],
        unit: [
          { required: true, message: '请输入单位', trigger: 'change' }
        ],
        brand: [
          { required: true, message: '请输入品牌', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '请输入型号', trigger: 'blur' }
        ],
        productContent: [
          { required: true, message: '请输入产品描述', trigger: 'blur' }
        ],
        guideline: [
          { required: true, message: '请输入参考标准', trigger: 'blur' }
        ],
        licenseNo: [
          { required: true, message: '请输入注册/许可号', trigger: 'blur' }
        ]
      },
      downloadLoading: false,
      multipleSelection: []
    }
  },
  created() {
    this.businessForm.busNO = this.$route.params.id
    this.addDate()
    this.getTableList()
    this.getPortInfoListList()
    this.getCountryInfoListNews()
    this.getBaseKeyValues()
  },
  mounted() {},
  methods: {
    // 获取当前日期
    addDate() {
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      this.systemDate = date.year + '-' + 0 + date.month + '-' + 0 + date.date
    },
    // 生成申请单号和证书号
    radioChange(val) {
      const data = {
        type: val
      }
      getBusNO(data).then(res => {
        if (res.success) {
          this.businessForm.busNO = res.result.busNO
          setCookie('busNO', this.businessForm.busNO, 360)
        }
      })
    },
    // 获取港口信息
    getPortInfoListList() {
      getPortInfoComboBox().then(res => {
        if (res.success) {
          this.portValueOptions = res.result
          this.portValueOptions.displayText = res.result.displayText
          this.portValueOptions.code = res.result.code
          this.portValueOptions.value = res.result.value
        }
      })
    },
    // 获取国家信息
    getCountryInfoListNews() {
      getCountryInfoListNew().then(res => {
        if (res.success) {
          this.countryValueOptions = res.result
          this.countryValueOptions.displayText = res.result.displayText
          this.countryValueOptions.value = res.result.value
        }
      })
    },

    // 获取币种
    getBaseKeyValues() {
      const data = {
        TypeCode: 'CURRENCY'
      }
      getBaseKeyValue(data).then(res => {
        if (res.success) {
          this.FOBcurrencyOptions = res.result.items
          this.FOBcurrencyOptions.id = res.result.items.id
          this.FOBcurrencyOptions.code = res.result.items.code
          this.FOBcurrencyOptions.code = res.result.items.code
        }
      })
    },
    // 监控上传文件列表
    handleChange(file, fileList) {
      // let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
      // if (existFile) {
      //   this.$message.error('当前文件已经存在!');
      //   fileList.pop();
      // }
      // this.fileList = fileList;
    },

    // 附件上传
    httpRequest(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('busno', this.$route.params.id)
      getAnnexUpload(formData).then(res => {
        if (res.success) {
          this.$message.success('文件上传成功!')
        }
      })
    },
    httpRequest2(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('busno', this.$route.params.id)
      getAnnexUpload(formData).then(res => {
        if (res.success) {
          this.$message.success('文件上传成功!')
        }
      })
    },
    httpRequest3(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('busno', this.$route.params.id)
      getAnnexUpload(formData).then(res => {
        if (res.success) {
          this.$message.success('文件上传成功!')
        }
      })
    },
    httpRequest4(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('busno', this.$route.params.id)
      getAnnexUpload(formData).then(res => {
        if (res.success) {
          this.$message.success('文件上传成功!')
        }
      })
    },
    httpRequest5(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('busno', this.$route.params.id)
      getAnnexUpload(formData).then(res => {
        if (res.success) {
          this.$message.success('文件上传成功!')
        }
      })
    },
    // 附件上传成功后
    handleSuccess(res, file, fileList) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('busno', this.$route.params.id)
      getAnnexUpload(formData).then(res => {
        if (res.success) {
          this.$message.success('文件上传成功!')
        }
      })
    },
    // 删除附件列表
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 点击文件列表中已上传的文
    handlePreview(file) {
      console.log(file)
    },
    // 获取业务续表
    getTableList() {
      this.table.loading = true
      if (this.$route.params.id === '' || this.$route.params.id === null) {
        console.log('当前没有单号')
      } else {
        const data = {
          BusNO: this.$route.params.id,
          maxResultCount: this.page.pageSize,
          skipCount: (this.page.currentPage - 1) * this.page.pageSize
        }
        GetContinuedList(data).then(res => {
          if (res.success) {
            this.table.loading = false
            this.continuedList = res.result.items
            this.page.total = res.result.totalCount
          }
        })
      }
    },
    resetTemp() {
      this.temp = {
        busNO: '', hsCode: '', count: '', unit: '', brand: '', model: '', productContent: '', guideline: '', licenseNo: ''
      }
    },
    // 打开业务续表添加
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 添加业务续表
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.busNO = this.$route.params.id
          getCreateOrUpdateBusContinued(this.temp).then(() => {
            this.dialogFormVisible = false
            this.getTableList()
            this.$message.success('添加成功')
          })
        }
      })
    },
    // 打开业务续表编辑
    handleUpdate(row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 编辑业务续表
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.busNO = this.$route.params.id
          const tempData = Object.assign({}, this.temp)
          getCreateOrUpdateBusContinued(tempData).then(() => {
            const index = this.continuedList.findIndex(v => v.id === this.temp.id)
            this.continuedList.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.getTableList()
            this.$message.success('编辑成功')
          })
        }
      })
    },
    // 删除业务续表
    handleDelete(row, index) {
      this.table.loading = true
      const data = {
        busNo: this.$route.params.id,
        ids: [row.id]
      }
      getDelBusContinued(data).then(res => {
        if (res.success) {
          this.table.loading = false
          this.$message.success('删除成功')
        }
        this.getTableList()
      })
      this.continuedList.splice(index, 1)
    },
    // 提交主业务表
    onPreserve() {
      this.$refs['businessForm'].validate((valid) => {
        if (valid) {
          const data = {
            busNO: this.businessForm.busNO,
            businessCode: this.businessForm.businessCode,
            portCode: this.businessForm.portCode,
            inspectTime: this.businessForm.inspectTime,
            exporterCusCode: this.businessForm.exporterCusCode,
            cusAddress: this.businessForm.cusAddress,
            customENFullName: this.businessForm.customENFullName,
            cusTel: this.businessForm.cusTel,
            fax: this.businessForm.fax,
            email: this.businessForm.email,
            importerCusCode: this.businessForm.importerCusCode,
            importerCusAddress: this.businessForm.importerCusAddress,
            importerCustomENFullName: this.businessForm.importerCustomENFullName,
            importerCusTel: this.businessForm.importerCusTel,
            importerFax: this.businessForm.importerFax,
            importerEmail: this.businessForm.importerEmail,
            originCountry: this.businessForm.originCountry,
            packNO: this.businessForm.packNO,
            exportCountry: this.businessForm.exportCountry,
            startPort: this.businessForm.startPort,
            importCountry: this.businessForm.importCountry,
            destination: this.businessForm.destination,
            expectedTime: this.businessForm.expectedTime,
            modeTransport: this.businessForm.modeTransport,
            carrierCode: this.businessForm.carrierCode,
            blawbno: this.businessForm.blawbno,
            boxMode: this.businessForm.boxMode,
            containerNO: this.businessForm.containerNO,
            sealNO: this.businessForm.sealNO,
            productStatus: this.businessForm.productStatus,
            finalInvoiceNO: this.businessForm.finalInvoiceNO,
            invoiceTime: this.businessForm.invoiceTime,
            fobPrice: this.businessForm.fobPrice,
            fobCurrency: this.businessForm.fobCurrency,
            formMNO: this.businessForm.formMNO,
            tinno: this.businessForm.tinno,
            bano: this.businessForm.bano,
            pcRoute: this.businessForm.pcRoute,
            rcbnNo: this.businessForm.rcbnNo,
            cnasCode: this.businessForm.cnasCode,
            letterNO: this.businessForm.letterNO
            // pvocno: this.businessForm.pvocno,
            // productCategory: this.businessForm.productCategory
          }
          getCreateOrUpdateBus(data).then(res => {
            if (res.success) {
              // this.loading = false;
              this.prohibit = false
              this.prohibitXb = false
              this.$message.success('主表已提交成功，请继续添加续表')
              // this.$router.go(-1);
            }
          })
        } else {
          return false
        }
      })
      // this.loading = true
    },
    indexMethodXb(index) {
      return index * 1 + 1
    }
  }
}
</script>
<style scoped>
  .page-container{background: rgb(240, 242, 245);}
  .content{padding: 20px;min-height: 100vh;}
  .background-fff{background: #fff;padding: 16px 16px 0;}
  .wrapper-title{color: #1890ff;}
  .wrapper-form{padding: 10px 0;color: #606266}
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }
  .searchBar{background: #fff;padding: 10px 20px;width: 100%;}
  .isFixed{padding: 10px 20px;
    background: #fff;
    width: 100%;
    position:fixed;
    top:0;
    z-index:999;
    box-shadow: 0px 0px 10px gray;
  }
  .el-form-item{margin-bottom: 1px!important;}
</style>
