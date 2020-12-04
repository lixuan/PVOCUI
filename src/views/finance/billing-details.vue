<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.busNO" placeholder="申请号" style="width: 150px;" class="filter-item" @keyup.enter.native="getTableList()" />
      <el-select v-model="listQuery.businessCode" placeholder="证书类型" clearable style="width: 150px" class="filter-item" @change="getTableList()">
        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="listQuery.portCode" placeholder="检验地点" style="width: 150px;" class="filter-item" @keyup.enter.native="getTableList()" />
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
      <!--      @selection-change="onselectionChange"-->
      <!--      <el-table-column type="selection" align="center" />-->
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="200px">
        <template slot-scope="{row,$index}">
          <el-button size="small" type="success" @click="chargingClick(row)">
            计费详情
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

    <el-dialog title="计费详情" :visible.sync="dialogPublishVisible">
      <el-form ref="form">
        <el-row>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="计费人：">
              admin
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="计费时间：">
              2020-07-10
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column label="计费项" align="center" :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <span>{{ row.feeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="货币类型" align="center" :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <span>{{ row.currency }}</span>
            </template>
          </el-table-column>
          <el-table-column label="金额" align="center" :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <span>{{ row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="200px">
            <template slot-scope="{row,$index}">
              <el-button size="small" type="danger" @click="delChargingClick(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-form ref="form">
        <el-row>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="合计：">
              {{ this.sumCurrency || '' }} {{ this.sumTotal || '0' }}元
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogPublishVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="dialogPublishVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tree from '../../components/tree/tree'
import waves from '@/directive/waves'
import { GetBusinessList, getDelBus } from '@/api/business'
import { getFeeDetailtList, getCreateOrUpdateFeeDetail, getFeeDetailLists, getDelFee, getRateList } from '@/api/finance/index'
import { tableMixin } from '../../mixin/commTable'
import Pagination from '@/components/Pagination'

export default {
  name: 'BillingDetails',
  components: { Pagination, tree },
  directives: { waves },
  mixins: [tableMixin],
  data() {
    return {
      feeList: [],
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
      total: 0,
      tableKey: '0',
      list: [], // 表格
      typeOptions: ['PC1', 'PC2', 'PC3', 'SC'], // 证书类型select
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
      endCreationTime: '',
      // listLoading: true,  // 加载中
      dialogPublish: '',
      temp: {
        id: undefined,
        commissionNo: '',
        name: '',
        idf: '',
        contacts: '',
        contactNumber: '',
        fax: '',
        state: 1,
        remarks: ''
      },
      tableData: [],
      tabelChecked: [],
      multipleSelection: [], // 表格选中的行
      jfId: '', // 计费id
      ids: [], // 批量计费id
      JfBusNO: '', // 单号
      multipleSelectionList: [],
      sumTotal: '',
      sumCurrency: ''
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
        checkCode: '6',
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
    // // 获取费目
    // getRateList() {
    //   getRateList().then(res => {
    //     if(res.success) {
    //       this.tableData = res.result.items
    //     }
    //   })
    // },
    onSelectChange(val) {
      this.multipleSelection = val
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.multipleSelectionList.push(this.multipleSelection[i].feeCode)
      }
    },
    onselectionChange(val) {
      this.tabelChecked = val
    },
    // 打开计费详情
    chargingClick(row) {
      this.dialogPublishVisible = true
      this.JfBusNO = row.busNO
      const data = {
        busNO: this.JfBusNO
      }
      getFeeDetailLists(data).then(res => {
        if (res.success) {
          if (res.result.items.length === 0) {
            this.tableData = res.result.items
          } else if (res.result.items.length !== 0) {
            this.tableData = res.result.items
            this.sumCurrency = res.result.items[0].currency
            let sum = 0
            for (let i = 0; i < res.result.items.length; i++) {
              sum += parseInt(res.result.items[i].amount)
              this.sumTotal = sum
            }
            return sum
          }
        }
      })
    },
    delChargingClick(row, index) {
      this.table.loading = true
      const data = {
        ids: [row.id]
      }
      getDelFee(data).then(res => {
        if (res.success) {
          this.table.loading = false
          const pro = {
            busNO: this.JfBusNO
          }
          getFeeDetailLists(pro).then(res => {
            if (res.success) {
              this.tableData = res.result.items
              this.sumCurrency = res.result.items[0].currency
              let sum = 0
              for (let i = 0; i < res.result.items.length; i++) {
                sum += parseInt(res.result.items[i].amount)
                this.sumTotal = sum
              }
              return sum
            }
          })
          this.$message.success('删除成功')
        }
      })
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
