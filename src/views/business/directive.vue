<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.busNO" placeholder="申请号" style="width: 150px;" class="filter-item" @keyup.enter.native="getTableList()" />
      <el-select v-model="listQuery.businessCode" placeholder="证书类型" clearable style="width: 150px" class="filter-item" @change="getTableList()">
        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="listQuery.portCode" placeholder="检验地点" style="width: 150px;" class="filter-item" @keyup.enter.native="getTableList()" />
      <el-select v-model="listQuery.checkCode" placeholder="申请状态" clearable style="width: 130px" class="filter-item" @change="getTableList()">
        <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
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
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" align="center" width="50px" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请号" align="center" class="link-type" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.busNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证书类型" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.businessCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检验地点" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.portName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检验日期" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.inspectTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请状态" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.checkName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出运日期" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.expectedTime }} - {{ row.EndExpectedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出运方式" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.modeTransport }}</span>
        </template>
      </el-table-column>
      <el-table-column label="承运人" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.carrierCodeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.creatorUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请日期" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.creationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.cusName|| '客户1' }} </span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.cusTel || '暂无' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.remarks || '无' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="confirmClick(row)">
            详情
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

    <el-dialog title="查看详情" :visible.sync="dialogPublishVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <div class="jbxx">
            <el-row>
              <el-col :xs="24" :sm="24" :lg="12">
                <p><span>申请号:</span> {{ this.busNO }}</p>
                <p><span>申请日期:</span> {{ this.creationTime }}</p>
                <p><span>所申请证书类型:</span> {{ this.businessCode }}</p>
                <p><span>检验港口:</span> {{ this.portCode }}</p>
                <p><span>预约检验时间:</span> {{ this.inspectTime }}</p>
                <p><span>出口商/制造商信息名称:</span> {{ this.exportCountry }}</p>
                <p><span>进口商信息名称:</span> {{ this.importCountry }}</p>
                <p><span>发票号:</span> {{ this.finalInvoiceNO }}</p>
                <p><span>发票日期:</span> {{ this.invoiceTime }}</p>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="12">
                <p><span>FOB价格:</span> {{ this.fobPrice }}</p>
                <p><span>FOB币种:</span> {{ this.fobCurrency }}</p>
                <p><span>Form ‘M’号:</span> {{ this.formMNO }}</p>
                <p><span>TIN NO.:</span> {{ this.tinno }}</p>
                <p><span>BA NO.:</span> {{ this.bano }}</p>
                <p><span>PC类型:</span> {{ this.pcRoute }}</p>
                <p><span>RC/BN No:</span> {{ this.rcbnNo }}</p>
                <p><span>CNAS机构代码:</span> {{ this.cnasCode }}</p>
                <p><span>信用证号:</span> {{ this.letterNO }}</p>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="申请续表" name="second">
          <el-table
            :key="tableKey"
            :data="continuedList"
            border
            fit
            highlight-current-row
            height="300"
            style="width: 100%;"
          >
            <el-table-column label="序号" prop="id" sortable="custom" align="center" width="80">
              <template slot-scope="{row}">
                <span>{{ row.id }}</span>
              </template>
            </el-table-column>
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
            <el-table-column label="注册/许可号" class-name="status-col" align="center">
              <template slot-scope="{row}">
                {{ row.licenseNo }}
              </template>
            </el-table-column>
            <!--            <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="160">-->
            <!--              <template slot-scope="{row,$index}">-->
            <!--                <el-button size="mini" type="primary" @click="handleUpdate(row)">-->
            <!--                  编辑-->
            <!--                </el-button>-->
            <!--                <el-button size="mini" type="success" @click="handleDelete(row,$index)">-->
            <!--                  删除-->
            <!--                </el-button>-->
            <!--              </template>-->
            <!--            </el-table-column>-->
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="附件列表" name="three">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-download" style="margin-bottom: 10px">
            批量下载
          </el-button>
          <el-table
            :key="tableKey"
            border
            fit
            highlight-current-row
            height="300"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" />
            <el-table-column label="附件名称" align="center" class="link-type">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" align="center">
              <template slot-scope="{row}">
                <span>{{ row.type }}</span>
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
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPublishVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPublishVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tree from '../../components/tree/tree'
import waves from '@/directive/waves'
import {
  GetBusinessList,
  GetContinuedList,
  GetBusInfoForEdit
} from '@/api/business'
import { tableMixin } from '../../mixin/commTable'
import Pagination from '@/components/Pagination'
import { getCookie, setCookie } from '@/utils/cookie'
import { getOrganizatonTreeNoUsers } from '@/api/user/organization'

export default {
  name: 'RolePermission',
  components: { Pagination, tree },
  directives: { waves },
  mixins: [tableMixin],
  data() {
    return {
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
      importerCusCode: '',
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
      creationTime: '',
      activeName: 'first',
      total: 0,
      tableKey: '0',
      list: [], // 表格
      continuedList: [{ id: undefined, busNO: '', hsCode: '', count: '', unit: '', brand: '', model: '', productContent: '', guideline: '', licenseNo: '' }], // 申请续表表格
      enclosureList: [], // 附件列表
      typeOptions: ['PC1', 'PC2', 'PC3', 'SC'], // 证书类型select
      stateOptions: [{
        value: '1',
        label: '信息录入'
      }, {
        value: '2',
        label: '检验下发'
      }, {
        value: '3',
        label: '检验分配'
      }, {
        value: '4',
        label: '初检'
      }, {
        value: '5',
        label: '复检'
      }, {
        value: '6',
        label: '费用生成'
      },
      {
        value: '7',
        label: '证书生成'
      },
      {
        value: '8',
        label: '证书邮寄'
      }
      ], // 当前状态select
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
      beginInspectTime: '',
      endInspectTime: '',
      beginExpectedTime: '',
      endExpectedTime: '',
      beginCreationTime: '',
      endCreationTime: ''
    }
  },
  created() {
    this.getTableList()
  },
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
        endCreationTime: this.endCreationTime
      }
      GetBusinessList(data).then(res => {
        if (res.success) {
          this.table.loading = false
          this.list = res.result.items
        }
      })
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
          this.busNO = res.result.busNO,
          this.creationTime = res.result.creationTime,
          this.businessCode = res.result.businessCode,
          this.portCode = res.result.portCode,
          this.inspectTime = res.result.inspectTime,
          this.originCountry = res.result.originCountry,
          this.packNO = res.result.packNO,
          this.exportCountry = res.result.exportCountry,
          this.startPort = res.result.startPort,
          this.importCountry = res.result.importCountry,
          this.destination = res.result.destination,
          this.expectedTime = res.result.expectedTime,
          this.modeTransport = res.result.modeTransport,
          this.carrierCode = res.result.carrierCode,
          this.blawbno = res.result.blawbno,
          this.boxMode = res.result.boxMode,
          this.containerNO = res.result.containerNO,
          this.sealNO = res.result.sealNO,
          this.productStatus = res.result.productStatus,
          this.exporterCusCode = res.result.exporterCusCode,
          this.importerCusCode = res.result.importerCusCode,
          this.finalInvoiceNO = res.result.finalInvoiceNO,
          this.invoiceTime = res.result.invoiceTime,
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
          this.productCategory = res.result.productCategory
          this.table.loading = false
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
      this.dialogPublishVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-table thead{color: #1890ff}
  .pagination{margin-top: 30px}
  .filter-container .filter-item{
    margin-bottom: 0;
  }
  .wrapper-title{color: #1890ff}
  .check-style p{padding-bottom: 10px}
  .jbxx p span{color: #1890ff}
</style>
