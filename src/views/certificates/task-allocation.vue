<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.applicantNo" placeholder="申请号" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="证书类型" clearable style="width: 150px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="listQuery.name" placeholder="客户名称" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-button v-waves class="filter-item" type="success" icon="el-icon-thumb" @click="handleFilter">
        分配
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-close" @click="handleFilter">
        驳回
      </el-button>
      <!--      <el-button v-waves class="filter-item" type="primary" icon="el-icon-info" @click="handleFilter">-->
      <!--        审核记录-->
      <!--      </el-button>-->
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="230">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handlePublish(row)">
            详情
          </el-button>
          <el-button size="mini" type="success" @click="handleDetails(row)">
            分配
          </el-button>
          <el-button size="mini" type="danger" @click="handleReject(row)">
            驳回
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
    <el-dialog title="查看详情" :visible.sync="dialogDetailsVisible">
      内容
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailsVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogDetailsVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="检验分配" :visible.sync="dialogPublishVisible">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <el-row :gutter="8">
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="background-fff">
              <div class="wrapper-title">检验项目</div>
              <div style="padding: 20px 0 20px 20px" class="check-style">
                <el-checkbox-group v-model="checkList">
                  <p><el-checkbox label="VISUAL QUALIT" /></p>
                  <p><el-checkbox label="QUANTITY/WEIGHT" /></p>
                  <p><el-checkbox label="MODEL" /></p>
                  <p><el-checkbox label="SPECIFICATION/DIMENSION" /></p>
                  <p><el-checkbox label="SERIAL,No" /></p>
                  <p><el-checkbox label="MANFACTURER AND/OR BRAND" /></p>
                  <p><el-checkbox label="COUNTRY OF ORIGIN" /></p>
                  <p><el-checkbox label="PACKING" /></p>
                  <p><el-checkbox label="SHIPPING MARK" /></p>
                  <p><el-checkbox label="LABELING AND MARKING" /></p>
                  <p><el-checkbox label="MF DATE;EXP DATE(if applicable)" /></p>
                  <p><el-checkbox label="ELECTRIC RATING(RATED VOLAGE,CYCLE" /></p>
                  <p><el-checkbox label="TAKE PHOTO" /></p>
                  <p><el-checkbox label="SAMPLING AND SEALING" /></p>
                  <p><el-checkbox label="SUPERVISE CONTANER LOADING AND SEALING" /></p>
                  <p><el-checkbox label="TESTING" /></p>
                  <p><el-checkbox label="WITNESS TESTING" /></p>
                  <p><el-checkbox label="FACTORY INSPECTION" /></p>
                  <p><el-checkbox label="FUMIGATION(for wooden package)" /></p>
                </el-checkbox-group>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="background-fff">
              <div class="wrapper-title">检验依据</div>
              <div style="padding: 20px 0 20px 20px" class="check-style">
                <el-checkbox-group v-model="checkLists">
                  <p><el-checkbox label="PS操作程序" /></p>
                  <p><el-checkbox label="形式发票" /></p>
                  <p><el-checkbox label="装箱单" /></p>
                  <p><el-checkbox label="IDF/FORM" /></p>
                  <p><el-checkbox label="合同" /></p>
                  <p><el-checkbox label="L/C" /></p>
                  <p><el-checkbox label="标准" /></p>
                  <p><el-checkbox label="注册证" /></p>
                  <p><el-checkbox label="许可证" /></p>
                  <p><el-checkbox label="测试报告" /></p>
                </el-checkbox-group>
              </div>
            </div>
          </el-col>
        </el-row>
        <div style="padding: 20px 0 20px 20px">
          <el-form-item label="请选择检验人员：" prop="" label-width="150px">
            <el-checkbox-group v-model="checkList3">
              <el-checkbox label="检验人员甲" name="type" />
              <el-checkbox label="检验人员乙" name="type" />
              <el-checkbox label="检验人员丙" name="type" />
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailsVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogDetailsVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="驳回" :visible.sync="dialogRejectVisible">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div style="padding: 20px 0 20px 20px">
          <el-form-item label="退回原因：" prop="" label-width="150px">
            <el-input v-model="ruleForm.desc" type="textarea" placeholder="请填写退回原因" />
          </el-form-item>
          <el-form-item label="请选择工作部门：" prop="" label-width="150px">
            <el-radio v-model="workRadio" label="1">检验鉴定</el-radio>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRejectVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogRejectVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'TaskAllocation',
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
      dialogPublishVisible: false, // 隐藏分配
      dialogPublish: '',
      dialogDetailsVisible: false, // 隐藏详情
      dialogDetails: '',
      dialogRejectVisible: false, // 隐藏驳回
      dialogReject: '',
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
      ruleForm: {},
      checkList: [], // 检验项目
      checkLists: [], // 检验依据
      checkList3: [], // 选择部门
      multipleSelection: [], // 表格选中的行
      workRadio: '1'
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
      this.dialogDetailsVisible = true
    },
    /**
     * 点击了分配
     */
    handleDetails(row) {
      this.temp = Object.assign({}, row)
      this.dialogPublishVisible = true
    },
    /**
     * 点击了驳回
     */
    handleReject(row) {
      this.temp = Object.assign({}, row)
      this.dialogRejectVisible = true
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
  .filter-container .filter-item{
    margin-bottom: 0;
  }
  .wrapper-title{color: #1890ff}
</style>
