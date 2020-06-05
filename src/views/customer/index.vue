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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="180">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handlePublish(row)">
            详情
          </el-button>
          <el-button size="small" type="success" @click="handleDetails(row)">
            证书确认
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first" />
        <el-tab-pane label="货物提单信息" name="second" />
        <el-tab-pane label="出口商信息" name="third" />
        <el-tab-pane label="进口商信息" name="fourth" />
      </el-tabs>
      <el-dialog
        title="申请续表/附件"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-tabs v-model="activeContinued" @tab-click="handleClick">
          <el-tab-pane label="申请续表" name="first">
            <el-table
              :key="tableKey"
              :data="continuedList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border
              fit
              highlight-current-row
              height="300"
              style="width: 100%;"
            >
              <el-table-column label="货号" align="center" width="100px">
                <template slot-scope="{row}">
                  <span>{{ row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="HS编码" align="center" class="link-type">
                <template slot-scope="{row}">
                  <span>{{ row.HScode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="数量" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.amount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.company }}</span>
                </template>
              </el-table-column>
              <el-table-column label="品牌" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.brand }}</span>
                </template>
              </el-table-column>
              <el-table-column label="型号" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.type }}</span>
                </template>
              </el-table-column>
              <el-table-column label="产品描述" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.product }}</span>
                </template>
              </el-table-column>
              <el-table-column label="参考标准" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.consult }}</span>
                </template>
              </el-table-column>
              <el-table-column label="注册/许可号" align="center" width="110">
                <template slot-scope="{row}">
                  <span>{{ row.licenseNo }}</span>
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
          <el-tab-pane label="附件列表" name="second">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-download" style="margin-bottom: 10px">
              批量下载
            </el-button>
            <el-table
              :key="tableKey"
              :data="enclosureList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPublishVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开申请续表/附件</el-button>
        <el-button type="primary" @click="dialogPublishVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="证书确认" :visible.sync="dialogDetailsVisible">
      证书确认
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailsVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogDetailsVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'CustomerHistory',
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
      continuedList: [
        {
          'id': 1,
          'HScode': '',
          'amount': '',
          'company': '',
          'brand': '',
          'product': '',
          'consult': '',
          'licenseNo': ''
        },
        {
          'id': 2,
          'HScode': '',
          'amount': '',
          'company': '',
          'brand': '',
          'product': '',
          'consult': '',
          'licenseNo': ''
        },
        {
          'id': 3,
          'HScode': '',
          'amount': '',
          'company': '',
          'brand': '',
          'product': '',
          'consult': '',
          'licenseNo': ''
        },
        {
          'id': 4,
          'HScode': '',
          'amount': '',
          'company': '',
          'brand': '',
          'product': '',
          'consult': '',
          'licenseNo': ''
        },
        {
          'id': 5,
          'HScode': '',
          'amount': '',
          'company': '',
          'brand': '',
          'product': '',
          'consult': '',
          'licenseNo': ''
        }
      ], // 申请续表表格
      enclosureList: [
        {
          'id': 1,
          'name': '',
          'type': '',
          'uploader': '',
          'uploadDate': ''
        },
        {
          'id': 2,
          'name': '',
          'type': '',
          'uploader': '',
          'uploadDate': ''
        },
        {
          'id': 3,
          'name': '',
          'type': '',
          'uploader': '',
          'uploadDate': ''
        },
        {
          'id': 4,
          'name': '',
          'type': '',
          'uploader': '',
          'uploadDate': ''
        },
        {
          'id': 5,
          'name': '',
          'type': '',
          'uploader': '',
          'uploadDate': ''
        }
      ], // 附件列表
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
      innerVisible: false,
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
      activeName: 'first',
      activeContinued: 'first',
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
    },
    handleClick(tab, event) {
      console.log(tab, event)
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
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.continuedList.splice(index, 1)
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
</style>
