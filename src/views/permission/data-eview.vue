<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.applicantNo" placeholder="申请号" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="证书类型" clearable style="width: 150px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="listQuery.name" placeholder="客户名称" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.testAddress" placeholder="检验地点" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-date-picker
        v-model="listQuery.testDate"
        style="width: 150px;"
        type="date"
        placeholder="检验日期"
      />
      <el-date-picker
        v-model="listQuery.shipmentDate"
        style="width: 150px;"
        type="date"
        placeholder="出运日期"
      />
      <el-date-picker
        v-model="listQuery.applicantDate"
        style="width: 150px;"
        type="date"
        placeholder="申请日期"
      />
      <el-select v-model="listQuery.state" placeholder="申请状态" clearable style="width: 130px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in stateOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-star-on" @click="examineClick">
        审核
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-info" @click="examineRecordClick">
        审核记录
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="序号" align="center" width="50px">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请号" align="center" class="link-type">
        <template slot-scope="{row}">
          <span>{{ row.applicantNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证书类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检验地点" align="center">
        <template slot-scope="{row}">
          <span>{{ row.testAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检验日期" align="center">
        <template slot-scope="{row}">
          <span>{{ row.testDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出运日期" align="center">
        <template slot-scope="{row}">
          <span>{{ row.shipmentDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出运方式" align="center">
        <template slot-scope="{row}">
          <span>{{ row.shipment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="承运人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.carrier }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.applican }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请日期" align="center">
        <template slot-scope="{row}">
          <span>{{ row.applicantDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contacts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contactNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remarks }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="160">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handlePublish(row)">
            详情
          </el-button>
          <el-button size="mini" type="success" @click="handleDetails(row)">
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        v-show="pagesize>0"
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagesize"
        layout="total, sizes,prev, pager, next"
        :total="list.length"
        prev-text="上一页"
        next-text="下一页"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="查看详情" :visible.sync="dialogPublishVisible">
      内容
    </el-dialog>
    <el-dialog title="核验下发" :visible.sync="dialogDetailsVisible">
      是否
    </el-dialog>
    <el-dialog title="审核记录" :visible.sync="dialogRecordsVisible">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRecordsVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'DataReview',
  directives: { waves },
  data() {
    return {
      tableKey: '0',
      // listLoading: true,  // 加载中
      list: [
        {
          'id': 1,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 2,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 3,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 4,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 5,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 6,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 7,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 8,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 9,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 10,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 11,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 12,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 13,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 14,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 15,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 16,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 17,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 18,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },
        {
          'id': 19,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        },

        {
          'id': 20,
          'applicantNo': 'KEC1041651',
          'type': 'PC1',
          'testAddress': '山东',
          'testDate': '2020-01-01',
          'state': '登记完成',
          'shipmentDate': '2020-01-01',
          'shipment': 'Air',
          'carrier': '米奇',
          'applican': '米妮',
          'applicantDate': '2020-01-01',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'remarks': '123456'
        }
      ], // 表格
      typeOptions: ['PC1', 'PC2', 'PC3', 'SC'], // 证书类型select
      stateOptions: ['登记完成', '检验下发'], // 当前状态select
      listQuery: { // 搜索条件
        page: 1,
        limit: 20,
        commissionNo: undefined,
        name: undefined,
        idf: undefined,
        contacts: undefined,
        contactNumber: undefined,
        fax: undefined,
        state: undefined,
        remarks: undefined
      },
      currentPage: 1, // 默认显示页面为1
      pagesize: 20, // 每页的数据条数
      dialogPublishVisible: false, // 隐藏详情
      dialogPublish: '',
      dialogDetailsVisible: false, // 隐藏下发
      dialogDetails: '',
      dialogRecordsVisible: false,
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
      activities: [{
        content: '步骤1',
        timestamp: '2018-04-12 20:46',
        color: '#0bbd87'
      }, {
        content: '步骤2',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '步骤3',
        timestamp: '2018-04-03 20:46'
      }, {
        content: '步骤4',
        timestamp: '2018-04-03 20:46'
      }],
      multipleSelection: [] // 表格选中的行
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    /**
     * 获取table数据
     */
    // getList() {
    //   this.listLoading = true
    //   fetchList(this.listQuery).then(response => {
    //     this.list = response.data.items
    //     this.total = response.data.total
    //     setTimeout(() => {
    //       this.listLoading = false
    //     }, 1.5 * 1000)
    //   })
    // },
    /**
     * 点击了搜索
     */
    handleFilter() {
      this.currentPage = 1
      console.log('发生了改变')
    },
    /**
     * 保存table选中结果
     */
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    /**
     * 分页
     */
    handleSizeChange(size) {
      this.pagesize = size
    },
    /**
     * 点击了详情
     */
    handlePublish(row) {
      this.temp = Object.assign({}, row)
      this.dialogPublishVisible = true
    },
    /**
     * 点击了下发
     */
    handleDetails(row) {
      this.temp = Object.assign({}, row)
      this.dialogDetailsVisible = true
    },
    /**
     * 点击了第几页
     */
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      // /*console.log(this.currentPage) */
    },
    /**
     * 点击了审核
     */
    examineClick() {},
    /**
     * 点击了审核记录
     */
    examineRecordClick() {
      this.dialogRecordsVisible = true
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
</style>
