<template>
  <div class="app-container">
    <div class="filter-container">
      <!--      <el-input v-model="listQuery.commissionNo" placeholder="委托号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />-->
      <el-input v-model="listQuery.commissionNo" placeholder="委托号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.state" placeholder="当前状态" clearable style="width: 130px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in stateOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <!--      <el-input v-model="listQuery.name" placeholder="客户名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />-->
      <el-input v-model="listQuery.name" placeholder="客户名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!--      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <!--      <el-button v-waves class="filter-item" type="success" icon="" @click="handleModifyStatus()">-->
      <el-button v-waves class="filter-item" type="success" icon="el-icon-star-on">
        核验下发
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
      <el-table-column label="序号" prop="id" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="委托号" align="center" class="link-type">
        <template slot-scope="{row}">
          <span>{{ row.commissionNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" align="center" width="230px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IDF编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.idf }}</span>
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
      <el-table-column label="传真" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fax }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remarks }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handlePublish(row)">
            详情
          </el-button>
          <el-button size="mini" type="success" @click="handleDetails(row)">
            下发
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
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'RolePermission',
  directives: { waves },
  data() {
    return {
      tableKey: '0',
      // listLoading: true,  // 加载中
      list: [
        {
          'id': 0,
          'commissionNo': 'KEC1041651',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 1,
          'commissionNo': 'KEC1041652',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 2,
          'commissionNo': 'KEC1041653',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 3,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 4,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 5,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 6,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 7,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 8,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 9,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 10,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 11,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 12,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 13,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 14,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 15,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 16,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 17,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 18,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },
        {
          'id': 19,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        },

        {
          'id': 20,
          'commissionNo': 'KEC1041650',
          'name': 'WEDDDEF DSFSG  DVSDVDSV',
          'idf': 'E170252333-1',
          'contacts': '张三',
          'contactNumber': '15999999999',
          'fax': '123456',
          'state': '登记完成',
          'remarks': '123456'
        }
      ], // 表格
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
    handleSizeChange: function(size) {
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
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      // /*console.log(this.currentPage) */
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-table thead{color: #1890ff}
  .pagination{margin-top: 30px}
</style>
