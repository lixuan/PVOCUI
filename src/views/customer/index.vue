<template>
  <div class="content">
    <div>
      <div class="filter-container">
        <el-input v-model="listQuery.busNO" placeholder="申请号" style="width: 150px;" class="filter-item" clearable @keyup.enter.native="getTableList()" />
        <el-select v-model="listQuery.businessCode" placeholder="证书类型" clearable style="width: 150px" class="filter-item" filterable @change="getTableList()">
          <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="listQuery.portCode" placeholder="检验地点" clearable style="width: 150px" class="filter-item" filterable @change="getTableList()">
          <el-option v-for="item in portValueOptions" :key="item.value" :label="item.displayText" :value="item.code" />
        </el-select>
        <!--      <el-select v-model="listQuery.checkCode" placeholder="申请状态" clearable style="width: 130px" class="filter-item" @change="getTableList()">-->
        <!--        <el-option v-for="item in stateOptions" :key="item" :label="item" :value="item" />-->
        <!--      </el-select>-->
        <el-date-picker
          v-model="listQuery.jyTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="检验日期开始"
          end-placeholder="检验日期结束"
          @change="jyTime"
        />
        <el-date-picker
          v-model="listQuery.cyTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="出运日期开始"
          end-placeholder="出运日期结束"
          @change="cyTime"
        />
        <el-date-picker
          v-model="listQuery.sqTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="申请日期开始"
          end-placeholder="申请日期结束"
          @change="sqTime"
        />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getTableList()">
          搜索
        </el-button>
      </div>

      <el-table
        :key="tableKey"
        :data="list"
        border
        highlight-current-row
        style="width: 100%;height: 660px;overflow-y: auto;"
        stripe
        @selection-change="onSelectChange"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column label="序号" type="index" align="center" :index="indexMethod" width="50px" />
        <el-table-column label="申请号" align="center" class="link-type" width="150px">
          <template slot-scope="{row}">
            <span>{{ row.busNO }}</span>
          </template>
        </el-table-column>
        <el-table-column label="证书类型" align="center" width="200px">
          <template slot-scope="{row}">
            <span>{{ row.businessCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验地点" align="center" width="110px">
          <template slot-scope="{row}">
            <el-tooltip :content="row.portName" placement="top">
              <span>{{ row.portName | ellipsis }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="检验日期" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.inspectTime | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请状态" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.checkName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出运日期" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.expectedTime | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出运方式" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.modeTransport }}</span>
          </template>
        </el-table-column>
        <el-table-column label="承运人" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.carrierCodeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请人" align="center" width="100px">
          <template slot-scope="{row}">
            <span>{{ row.creatorUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请日期" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.creationTime | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.cusName|| '客户1' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" align="center" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.cusTel || '暂无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.remarks || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="160">
          <template slot-scope="{row,$index}">
            <el-tooltip content="详情" placement="top">
              <el-button circle type="success" icon="el-icon-info" @click="confirmClick(row)" />
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <el-button circle type="primary" icon="el-icon-edit" @click="handleUpdate(row)" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button circle type="danger" icon="el-icon-error" @click="handleDelete(row,$index)" />
            </el-tooltip>
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

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogPublishVisible">
        <el-dialog
          width="40%"
          title="添加续表"
          :visible.sync="xbVisible"
          append-to-body
        >
          <el-form ref="dataForms" :rules="rules" :model="tempXb" label-position="right" label-width="130px" style="width: 500px; margin-left:50px;">
            <el-form-item label="HS编码" prop="hsCode" style="margin-bottom: 20px!important;">
              <el-input v-model="tempXb.hsCode" />
            </el-form-item>
            <el-form-item label="数量" prop="count" style="margin-bottom: 20px!important;">
              <el-input v-model="tempXb.count" />
            </el-form-item>
            <el-form-item label="单位" prop="unit" style="margin-bottom: 20px!important;">
              <el-input v-model="tempXb.unit" />
            </el-form-item>
            <el-form-item label="品牌" prop="brand" style="margin-bottom: 20px!important;">
              <el-input v-model="tempXb.brand" />
            </el-form-item>
            <el-form-item label="型号" prop="model" style="margin-bottom: 20px!important;">
              <el-input v-model="tempXb.model" />
            </el-form-item>
            <el-form-item label="产品描述" prop="productContent" style="margin-bottom: 20px!important;">
              <el-input v-model="tempXb.productContent" />
            </el-form-item>
            <el-form-item label="参考标准" prop="guideline" style="margin-bottom: 20px!important;">
              <el-input v-model="tempXb.guideline" />
            </el-form-item>
            <el-form-item label="注册/许可号" prop="licenseNo">
              <el-input v-model="tempXb.licenseNo" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="xbVisible = false">
              {{ $t('table.cancel') }}
            </el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
              {{ $t('table.confirm') }}
            </el-button>
          </div>
        </el-dialog>
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="first">
            <div class="jbxx">
              <el-row>
                <el-col :xs="24" :sm="24" :lg="8">
                  <p><span>申请号:</span> {{ this.busNO }}</p>
                  <p><span>申请日期:</span> {{ this.creationTime }}</p>
                  <p><span>所申请证书类型:</span> {{ this.businessCode }}</p>
                  <p><span>检验港口:</span> {{ this.portCode }}</p>
                  <p><span>预约检验时间:</span> {{ this.inspectTime }}</p>
                  <p><span>出口商/制造商名称:</span> {{ this.exporterCusCode }}</p>
                  <p><span>出口商/制造商地址:</span> {{ this.cusAddress }}</p>
                  <p><span>出口商/制造商联系人:</span> {{ this.customENFullName }}</p>
                  <p><span>出口商/制造商电话:</span> {{ this.cusTel }}</p>
                  <p><span>出口商/制造商传真:</span> {{ this.fax }}</p>
                  <p><span>出口商/制造商E-mail:</span> {{ this.email }}</p>
                  <p><span>进口商信息名称:</span> {{ this.importerCusCode }}</p>
                  <p><span>进口商信息地址:</span> {{ this.importerCustomENFullName }}</p>
                  <p><span>进口商信息联系人:</span> {{ this.importCountry }}</p>
                  <p><span>进口商信息电话:</span> {{ this.importerCusTel }}</p>
                  <p><span>进口商信息传真:</span> {{ this.importerFax }}</p>
                  <p><span>进口商信息E-mail:</span> {{ this.importerEmail }}</p>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <p><span>发票号:</span> {{ this.finalInvoiceNO }}</p>
                  <p><span>发票日期:</span> {{ this.invoiceTime }}</p>
                  <p><span>FOB价格:</span> {{ this.fobPrice }}</p>
                  <p><span>FOB币种:</span> {{ this.fobCurrency }}</p>
                  <p><span>Form ‘M’号:</span> {{ this.formMNO }}</p>
                  <p><span>TIN NO.:</span> {{ this.tinno }}</p>
                  <p><span>BA NO.:</span> {{ this.bano }}</p>
                  <p><span>PC类型:</span> {{ this.pcRoute }}</p>
                  <p><span>RC/BN No:</span> {{ this.rcbnNo }}</p>
                  <p><span>CNAS机构代码:</span> {{ this.cnasCode }}</p>
                  <p><span>原产国:</span> {{ this.originCountry }}</p>
                  <p><span>包装及数量:</span> {{ this.packNO }}</p>
                  <p><span>出口国:</span> {{ this.exportCountry }}</p>
                  <p><span>装船港口:</span> {{ this.startPort }}</p>
                  <p><span>进口国:</span> {{ this.importCountry }}</p>
                  <p><span>卸货港口:</span> {{ this.destination }}</p>
                  <p><span>预计出运时间:</span> {{ this.expectedTime }}</p>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <p><span>出运方式:</span> {{ this.modeTransport }}</p>
                  <p><span>承运人:</span> {{ this.carrierCode }}</p>
                  <p><span>运单号:</span> {{ this.blawbno }}</p>
                  <p><span>装箱方式:</span> {{ this.boxMode }}</p>
                  <p><span>集装箱箱号:</span> {{ this.containerNO }}</p>
                  <p><span>铅封号:</span> {{ this.sealNO }}</p>
                  <p><span>产品状况:</span> {{ this.productStatus }}</p>
                  <p><span>信用证号:</span> {{ this.letterNO }}</p>
                  <p><span>证书号:</span> {{ this.pvocno }}</p>
                  <p><span>商品类别:</span> {{ this.productCategory }}</p>
                  <p><span>参考标准:</span> {{ this.cnasNo }}</p>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="申请续表" name="second">
            <div class="clearfix">
              <div style="float: right;padding-bottom: 10px">
                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addXb">
                  {{ $t('table.add') }}
                </el-button>
              </div>
              <el-table
                :key="tableKey"
                :data="continuedList"
                border
                fit
                highlight-current-row
                height="300"
                style="width: 100%;"
              >
                <el-table-column label="序号" type="index" align="center" :index="indexMethodXb" width="50px" />
                <el-table-column label="HS编码" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.hsCode }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="数量" align="center">
                  <template slot-scope="{row}">
                    <span class="link-type">{{ row.count }}</span>
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
                <el-table-column label="许可号" class-name="status-col" align="center">
                  <template slot-scope="{row}">
                    {{ row.licenseNo }}
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="160">
                  <template slot-scope="{row,$index}">
                    <el-button size="mini" type="primary" @click="handleXbUpdate(row)">
                      编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleXbDelete(row,$index)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附件列表" name="three">
            <el-table
              :key="tableKey"
              :data="uploadList"
              border
              fit
              highlight-current-row
              height="300"
              style="width: 100%;"
              @selection-change="handleSelectionChange"
            >
              <!--              <el-table-column type="selection" align="center" />-->
              <el-table-column label="序号" type="index" align="center" :index="indexMethodFj" width="50px" />
              <el-table-column label="附件名称" align="center" class="link-type">
                <template slot-scope="{row}">
                  <span>{{ row.businessName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="类型" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.businessType }}</span>
                </template>
              </el-table-column>
              <el-table-column label="上传人" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.uploader }}</span>
                </template>
              </el-table-column>
              <el-table-column label="上传时间" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.uploadDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{row,$index}">
                  <el-tooltip content="下载" placement="top">
                    <el-link :href="row.downloadLink">
                      <el-button circle type="primary" icon="el-icon-download" />
                    </el-link>
                  </el-tooltip>
                  <el-tooltip content="删除" placement="top">
                    <el-button circle type="danger" icon="el-icon-error" @click="uploadDelete(row,$index)" />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPublishVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogPublishVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { tableMixin } from '../../mixin/commTable'
import tree from '../../components/tree/tree'
import waves from '@/directive/waves'
import {
  GetBusinessList,
  GetContinuedList,
  GetBusInfoForEdit,
  getDelBus, getBusNO, getAnnes, getDelAnnexs, getPortInfoComboBox, getCreateOrUpdateBusContinued, getDelBusContinued
} from '@/api/business'
import Pagination from '@/components/Pagination'
import { getOrganizatonTreeNoUsers } from '@/api/user/organization'

export default {
  name: 'CustomerHistory',
  components: { Pagination, tree },
  directives: { waves },
  filters: {
    ellipsis(value) {
      if (!value) {
        return ''
      }
      if (value.length > 4) {
        return value.slice(0, 4) + '...'
      } else {
        return value
      }
    }
  },
  mixins: [tableMixin],
  data() {
    return {
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      tempXb: { busNO: '', hsCode: '', count: '', unit: '', brand: '', model: '', productContent: '', guideline: '', licenseNo: '' },
      xbVisible: false,
      portValueOptions: [], // 港口下拉
      uploadList: [],
      form: { radioChoice: '' },
      tempNo: '',
      busNO: '',
      businessCode: '', // 所申请证书类型
      portCode: '',
      inspectTime: '',
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
      productStatus: '',
      exporterCusCode: '',
      customENFullName: '',
      cusAddress: '',
      cusTel: '',
      fax: '',
      email: '',
      importerCusCode: '',
      importerCustomENFullName: '',
      importerCusAddress: '',
      importerCusTel: '',
      importerFax: '',
      importerEmail: '',
      dutY_NUMBER: '',
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
      letterNO: '',
      pvocno: '',
      productCategory: '',
      cnasNo: '',
      creationTime: '',
      tabelChecked: [],
      ids: [],
      total: 0,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableKey: '0',
      // listLoading: true,  // 加载中
      list: [], // 表格
      continuedList: [{ id: undefined, busNO: '', hsCode: '', count: '', unit: '', brand: '', model: '', productContent: '', guideline: '', licenseNo: '' }], // 申请续表表格
      enclosureList: [], // 附件列表
      typeOptions: ['PC1', 'PC2', 'PC3', 'SC'], // 证书类型select
      stateOptions: ['登记完成', '检验下发'], // 当前状态select
      listQuery: { // 搜索条件
        busNO: '',
        businessCode: '',
        portCode: '',
        checkCode: '',
        jyTime: '',
        cyTime: '',
        sqTime: ''
      },
      dialogPublishVisible: false, // 隐藏详情
      dialogDetailsVisible: false, // 隐藏下发
      temp: {},
      ruleForm: {},
      activeName: 'first',
      beginInspectTime: '',
      endInspectTime: '',
      beginExpectedTime: '',
      endExpectedTime: '',
      beginCreationTime: '',
      endCreationTime: '',
      treeComp: {
        data: [],
        currNodeID: ''
      },
      visualquality: false, // 检验项目
      quantitweight: false,
      takephoto: false,
      fumigation: false,
      shippingmark: false,
      electricrating: false,
      countryoforigin: false,
      model: false,
      speccificationdimension: false,
      samplingandsealing: false,
      supervisecontainerloadingandsealing: false,
      witnesstesting: false,
      factoryinspection: false,
      serialno: false,
      manufacturerandorbrand: false,
      packing: false,
      labelingandmarking: false,
      mfgdateexpdateexpdate: false,
      testing: false,
      license: false, // 检验依据
      proformaInvoice: false,
      psop: false,
      packingList: false,
      idfformm: false,
      testingReport: false,
      contract: false,
      lc: false,
      standard: false,
      registered: false,
      treeClick: '',
      assingId: [],
      rules: {
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
      }
    }
  },
  created() {
    this.getTableList()
    this.getOrganizatonTreeNoUsers()
    this.getPortInfoListList()
  },
  mounted() {},
  methods: {
    // 检验日期
    jyTime() {
      for (let i = 0; i < this.listQuery.jyTime.length; i++) {
        this.beginInspectTime = this.listQuery.jyTime[0]
        this.endInspectTime = this.listQuery.jyTime[1]
      }
    },
    // 出运日期
    cyTime() {
      for (let i = 0; i < this.listQuery.jyTime.length; i++) {
        this.beginExpectedTime = this.listQuery.cyTime[0]
        this.endExpectedTime = this.listQuery.cyTime[1]
      }
    },
    // 申请日期
    sqTime() {
      for (let i = 0; i < this.listQuery.jyTime.length; i++) {
        this.beginCreationTime = this.listQuery.sqTime[0]
        this.endCreationTime = this.listQuery.sqTime[1]
      }
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
    // 获取业务主表
    getTableList() {
      this.table.loading = true
      const data = {
        busNO: this.listQuery.busNO,
        businessCode: this.listQuery.businessCode,
        portCode: this.listQuery.portCode,
        beginInspectTime: this.beginInspectTime,
        endInspectTime: this.endInspectTime,
        beginExpectedTime: this.beginExpectedTime,
        endExpectedTime: this.endExpectedTime,
        checkCode: this.listQuery.checkCode,
        presentCheck: this.listQuery.presentCheck,
        beginCreationTime: this.beginCreationTime,
        endCreationTime: this.endCreationTime,
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize
      }
      GetBusinessList(data).then(res => {
        if (res.success) {
          this.table.loading = false
          this.list = res.result.items
          this.page.total = res.result.totalCount
        }
      })
    },
    // 保存主表table选中结果
    onSelectChange(val) {
      this.tabelChecked = val
      console.log(this.tabelChecked)
    },
    // 点击详情
    confirmClick(row) {
      this.table.loading = true
      this.temp = Object.assign({}, row)
      const data = {
        id: row.id
      }
      GetBusInfoForEdit(data).then(res => {
        if (res.success) {
          this.table.loading = false
          if (res.result.expectedTime === null) {
            this.expectedTime = res.result.expectedTime
          } else {
            this.expectedTime = res.result.expectedTime.slice(0, 10)
          }
          this.busNO = res.result.busNO,
          this.creationTime = res.result.creationTime.slice(0, 10),
          this.businessCode = res.result.businessCode,
          this.portCode = res.result.portCode,
          this.inspectTime = res.result.inspectTime.slice(0, 10),
          this.originCountry = res.result.originCountry,
          this.packNO = res.result.packNO,
          this.exportCountry = res.result.exportCountry,
          this.startPort = res.result.startPort,
          this.importCountry = res.result.importCountry,
          this.destination = res.result.destination,

          this.modeTransport = res.result.modeTransport,
          this.carrierCode = res.result.carrierCode,
          this.blawbno = res.result.blawbno,
          this.boxMode = res.result.boxMode,
          this.containerNO = res.result.containerNO,
          this.sealNO = res.result.sealNO,
          this.productStatus = res.result.productStatus,
          this.exporterCusCode = res.result.exporterCusCode,
          this.customENFullName = res.result.customENFullName,
          this.cusAddress = res.result.cusAddress,
          this.cusTel = res.result.cusTel,
          this.fax = res.result.fax,
          this.email = res.result.email,
          this.importerCusCode = res.result.importerCusCode,
          this.importerCustomENFullName = res.result.importerCustomENFullName,
          this.importerCusAddress = res.result.importerCusAddress,
          this.importerCusTel = res.result.importerCusTel,
          this.importerFax = res.result.importerFax,
          this.importerEmail = res.result.importerEmail,
          this.dutY_NUMBER = res.result.dutY_NUMBER,
          this.finalInvoiceNO = res.result.finalInvoiceNO,
          this.invoiceTime = res.result.invoiceTime.slice(0, 10),
          this.fobPrice = res.result.fobPrice,
          this.fobCurrency = res.result.fobCurrency,
          this.formMNO = res.result.formMNO,
          this.tinno = res.result.tinno,
          this.bano = res.result.bano,
          this.pcRoute = res.result.pcRoute,
          this.rcbnNo = res.result.rcbnNo,
          this.cnasCode = res.result.cnasCode,
          this.letterNO = res.result.letterNO,
          this.pvocno = res.result.pvocno,
          this.productCategory = res.result.productCategory,
          this.cnasNo = res.result.cnasNo
        }
      })
      const pro = {
        BusNO: row.busNO
      }
      GetContinuedList(pro).then(res => {
        if (res.success) {
          this.continuedList = res.result.items
        }
      })
      // 查询附件
      const datas = {
        BusNO: row.busNO
      }
      getAnnes(datas).then(res => {
        if (res.success) {
          this.uploadList = res.result
        }
      })
      this.dialogPublishVisible = true
    },
    // 打开业务列表编辑
    handleUpdate(row) {
      const id = row.id
      const no = row.busNO
      if (row.businessCode === 'PC1 (未注册状态产品证书)' || 'PC2 (注册状态产品证书)' || 'PC3 (许可状态产品证书)') {
        this.$router.push({
          path: `/entrust/business-edit/${id}/${no}`
        })
      }
      if (row.businessCode === 'SC (SONCAP证书)') {
        this.$router.push({
          path: `/entrust/business-edit-sc/${id}/${no}`
        })
      }
    },
    // 删除业务列表
    handleDelete(row, index) {
      this.table.loading = true
      const data = {
        ids: [row.id]
      }
      getDelBus(data).then(res => {
        if (res.success) {
          this.table.loading = false
          this.$message.success('删除成功')
          this.getTableList()
        }
      })
      this.continuedList.splice(index, 1)
    },
    resetTemp() {
      this.tempXb = {
        busNO: '', hsCode: '', count: '', unit: '', brand: '', model: '', productContent: '', guideline: '', licenseNo: ''
      }
    },
    // 点击添加业务续表
    addXb() {
      this.resetTemp()
      this.xbVisible = true
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForms'].clearValidate()
      })
    },
    // 添加业务续表
    createData() {
      this.$refs['dataForms'].validate((valid) => {
        if (valid) {
          this.tempXb.busNO = this.busNO
          getCreateOrUpdateBusContinued(this.tempXb).then((res) => {
            if (res.success) {
              const pro = {
                BusNO: this.busNO
              }
              GetContinuedList(pro).then(res => {
                if (res.success) {
                  this.continuedList = res.result.items
                }
              })
              this.xbVisible = false
              this.$message.success('添加成功')
            }
          })
        }
      })
    },
    // 打开续表列表编辑
    handleXbUpdate(row) {
      this.tempXb = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.xbVisible = true
      this.$nextTick(() => {
        this.$refs['dataForms'].clearValidate()
      })
    },
    // 编辑业务续表
    updateData() {
      this.$refs['dataForms'].validate((valid) => {
        if (valid) {
          this.tempXb.busNO = this.busNO
          const tempData = Object.assign({}, this.tempXb)
          getCreateOrUpdateBusContinued(tempData).then(() => {
            const index = this.continuedList.findIndex(v => v.id === this.tempXb.id)
            this.continuedList.splice(index, 1, this.tempXb)
            this.xbVisible = false
            this.$message.success('编辑成功')
          })
        }
      })
    },
    // 删除续表
    handleXbDelete(row, index) {
      this.table.loading = true
      const data = {
        busNo: this.busNO,
        ids: [row.id]
      }
      getDelBusContinued(data).then(res => {
        if (res.success) {
          const pro = {
            BusNO: this.busNO
          }
          GetContinuedList(pro).then(res => {
            if (res.success) {
              this.continuedList = res.result.items
            }
          })
        }
      })
      this.continuedList.splice(index, 1)
    },
    // 获取树数据
    getOrganizatonTreeNoUsers() {
      this.table.loading = true
      getOrganizatonTreeNoUsers().then(res => {
        if (res.success) {
          this.table.loading = false
          this.treeComp.data = res.result
        }
      }
      )
    },
    // 删除附件
    uploadDelete(row, index) {
      this.table.loading = true
      const data = {
        ids: [row.id]
      }
      getDelAnnexs(data).then(res => {
        if (res.success) {
          this.table.loading = false
          this.$message.success('删除成功')
        }
      })
      this.uploadList.splice(index, 1)
    },
    indexMethod(index) {
      return index * 1 + 1
    },
    indexMethodXb(index) {
      return index * 1 + 1
    },
    indexMethodFj(index) {
      return index * 1 + 1
    },
    printing(row) {
      console.log(row.businessCode)
      if (row.businessCode === 'SC (SONCAP证书)') {
        const Logistics = this.$router.resolve({
          path: `/printing/${row.id}`
        })
        window.open(Logistics.href, '_blank')
      } else if (row.businessCode === 'PC1 (未注册状态产品证书)' || 'PC2 (注册状态产品证书)' || 'PC3 (许可状态产品证书) ') {
        const Logistics = this.$router.resolve({
          path: `/download/${row.id}`
        })
        window.open(Logistics.href, '_blank')
      } else {}
    },
    // 时间转化
    parseTime(time, fm) { // 解析时间  time: 时间戳或者实践对象 fm: 格式 默认是{y}-{m}-{d} {h}:{i}:{s}
      if (arguments.length === 0) {
        return null
      }
      const format = fm || '{y}-{m}-{d}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const time_str = format.replace(/{(y|m|d)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return time_str
    }
  }
}
</script>
<style>
  .page-container{background: rgb(240, 242, 245);}
  .content{padding: 20px;min-height: 100vh;}
  .wrapper-title{color: #1890ff;}
  .wrapper-form{padding: 10px 0;color: #606266;}
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
  .el-table thead{color: #1890ff}
  .pagination{margin-top: 30px}
  .filter-container .filter-item{
    margin-bottom: 0;
  }
  .wrapper-title{color: #1890ff}
  .check-style p{padding-bottom: 10px}
  .jbxx p span{color: #1890ff}
</style>
