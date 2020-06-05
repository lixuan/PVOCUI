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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="{row}">
          <el-button size="small" type="primary" @click="handlePublish(row)">
            工作记录
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
    <el-dialog title="工作记录" :visible.sync="dialogPublishVisible">
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="background-fff">
            <div class="wrapper-title">基本信息</div>
            <div style="padding: 20px 0 20px 20px">
              <el-form ref="ruleForm" :model="ruleForm" label-width="90px" class="demo-ruleForm">
                <el-row :xs="24" :sm="24" :lg="24">
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="编号：" prop="name">
                      KER100049001
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="指令编号：" prop="type">
                      KEC1041650
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="检验公司：" prop="number">
                      中地汉盛检验认证
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="检验员：" prop="delivery">
                      员工甲
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :xs="24" :sm="24" :lg="24">
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="检验时间：" prop="">
                      2020-03-27
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="检验地点：" prop="">
                      山东省青岛市黄岛区前港湾路三期码头
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="出运方式：" prop="">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox label="整箱" style="margin-bottom: 5px" />
                        <el-checkbox label="拼箱" />
                        <el-checkbox label="散货" />
                        <el-checkbox label="未指定" />
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :xs="24" :sm="24" :lg="24">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="封识号码：" prop="">
                      <el-input v-model="ruleForm.SealValue" placeholder="请输入封识号码" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="background-fff">
            <div class="wrapper-title">封识信息</div>
            <div v-for="(item , i) in lists" :key="i" style="padding: 20px 0 20px 20px">
              <el-form v-for="(val,key) in item" :key="key" :model="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row :xs="24" :sm="24" :lg="24" :gutter="10">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="集装箱编号：" prop="name">
                      <el-input v-model="val.number" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="集装箱类型：" prop="type">
                      <el-input v-model="val.type" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :xs="24" :sm="24" :lg="24" :gutter="10">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="封识编号：" prop="number">
                      <el-input v-model="val.no" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="商品类别：" prop="delivery">
                      <el-input v-model="val.category" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :xs="24" :sm="24" :lg="24">
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="上传人：" prop="">
                      员工甲
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-form-item label="上传时间：" prop="">
                      2020-3-28
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="检验完成时间：" prop="" label-width="130px">
                      2020-3-28
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="4" />
                </el-row>
                <el-row :xs="24" :sm="24" :lg="24">
                  <el-form-item label="附件：" prop="">
                    <span style="color: #1890ff">附件文件</span>
                  </el-form-item>
                </el-row>
                <el-row :gutter="8">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="说明：" prop="">
                      <el-input v-model="val.desc" type="textarea" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-col :xs="24" :sm="24" :lg="12">
                  <el-button size="small" type="primary" @click="add">添加</el-button>
                </el-col>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'

const baseInfo = [
  { number: '', no: '', category: '', desc: '', type: null }
]
export default {
  name: 'WorkPermission',
  directives: { waves },
  data() {
    return {
      lists: [baseInfo],
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
      checkList: [], // 出运方式
      SealValue: '', // 封识号码
      examineOptions: [{
        value: '选项1',
        label: '审核通过'
      }, {
        value: '选项2',
        label: '审核未通过'
      }],
      ruleForm: {
        name: '',
        number: '',
        type: '',
        delivery: false,
        SealValue: '',
        desc: '',
        examineValue: ''
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
    add() {
      this.lists.push(baseInfo)
    },
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
  .pad-15{padding-bottom: 15px}
</style>
