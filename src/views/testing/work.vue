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
      @selection-change="onSelectChange"
    >
      <el-table-column type="selection" align="center" />
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="210px">
        <template slot-scope="{row,$index}">
          <el-button size="small" type="primary" @click="handlePublish(row)">
            工作记录
          </el-button>
          <el-button size="small" type="primary" @click="handlePublishsBg(row)">
            检验报告
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

    <el-dialog title="工作记录" :visible.sync="dialogPublishVisible">
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="background-fff">
            <div class="wrapper-title">基本信息</div>
            <div style="padding: 20px 0 20px 20px">
              <el-form ref="" label-width="90px" class="demo-ruleForm">
                <el-row :xs="24" :sm="24" :lg="24">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="提单号：" prop="name">
                      {{ this.busNO }}
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="检验公司：" prop="number">
                      中地汉盛检验验证有限公司
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="检验员：" prop="delivery">
                      admin
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :xs="24" :sm="24" :lg="24">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="检验时间：" prop="">
                      {{ this.systemDate }}
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="检验地点：" prop="">
                      {{ this.portCode }}
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="出运方式：" prop="">
                      {{ this.modeTransport }}
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
            <el-form label-width="100px" class="demo-ruleForm">
              <div v-show="addJzx">
                <el-row style="padding-bottom: 10px;">
                  <el-row type="flex" class="row-bg" justify="end">
                    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
                    <el-col :span="6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <el-button size="mini" type="primary" @click="createOrUpdateContainerAdd">保存</el-button>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row :xs="24" :sm="24" :lg="24" :gutter="10">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="集装箱编号：" prop="name">
                      <el-input v-model="containerNOAdd" style="width: 180px" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="集装箱类型：" prop="type">
                      <el-select v-model="containerTypeAdd" placeholder="请选择集装箱类型" style="width: 180px">
                        <el-option
                          v-for="item in containerTypeOptions"
                          :key="item.id"
                          :label="item.name"
                          :value="item.code"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="封识编号：" prop="number">
                      <el-input v-model="sealNOAdd" style="width: 180px" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-show="bjJzx">
                <el-row style="padding-bottom: 10px;">
                  <el-row type="flex" class="row-bg" justify="end">
                    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
                    <el-col :span="6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <el-button size="mini" type="primary" @click="createOrUpdateContainerBj">保存</el-button>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row :xs="24" :sm="24" :lg="24" :gutter="10">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="集装箱编号：" prop="name">
                      <el-input v-model="containerNOAdds" style="width: 180px" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="集装箱类型：" prop="type">
                      <el-select v-model="containerTypeAdds" placeholder="请选择集装箱类型" style="width: 180px">
                        <el-option
                          v-for="item in containerTypeOptions"
                          :key="item.id"
                          :label="item.name"
                          :value="item.code"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-form-item label="封识编号：" prop="number">
                      <el-input v-model="sealNOAdds" style="width: 180px" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <!--              <el-row :xs="24" :sm="24" :lg="24" :gutter="10">-->

              <!--                &lt;!&ndash;                  <el-col :xs="24" :sm="24" :lg="12">&ndash;&gt;-->
              <!--                &lt;!&ndash;                    <el-form-item label="商品类别：" prop="delivery">&ndash;&gt;-->
              <!--                &lt;!&ndash;                      <el-input v-model="val.category" style="width: 280px"/>&ndash;&gt;-->
              <!--                &lt;!&ndash;                    </el-form-item>&ndash;&gt;-->
              <!--                &lt;!&ndash;                  </el-col>&ndash;&gt;-->
              <!--              </el-row>-->
              <el-table
                v-show="tableShow"
                :data="tableData"
                size="mini"
                border
                fit
                highlight-current-row
                style="width: 100%"
                @selection-change="onSelectChange"
              >
                <el-table-column label="序号" prop="id" sortable="custom" align="center" width="80px" :show-overflow-tooltip="true" />
                <el-table-column label="集装箱编号" align="center" :show-overflow-tooltip="true">
                  <template slot-scope="{row}">
                    <span>{{ row.containerNO }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="集装箱类型" align="center" :show-overflow-tooltip="true">
                  <template slot-scope="{row}">
                    <span>{{ row.containerType }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="封识编号" align="center" :show-overflow-tooltip="true">
                  <template slot-scope="{row}">
                    <span>{{ row.sealNO }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="封识编号" align="center" :show-overflow-tooltip="true">
                  <template slot-scope="{row,$index}">
                    <el-button size="small" type="primary" @click="tableDataBj(row)">
                      编辑
                    </el-button>
                    <!--                    <el-button size="small" type="danger" @click="tableDataDel(row)">-->
                    <!--                      删除-->
                    <!--                    </el-button>-->
                  </template>
                </el-table-column>
                <!--                  <el-table-column-->
                <!--                    prop=""-->
                <!--                    label="商品类别">-->
                <!--                  </el-table-column>-->
              </el-table>
              <el-row :xs="24" :sm="24" :lg="24" style="margin-top: 20px">
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="上传人：" prop="">
                    admin
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="上传时间：" prop="">
                    {{ this.systemDate }}
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="检验完成时间：" prop="" label-width="130px">
                    {{ this.systemDate }}
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="4" />
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="附件：" prop="">
                    <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      multiple
                      :limit="3"
                      :file-list="fileList"
                    >
                      <el-button size="small" type="primary">点击上传附件</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="审核通过：" prop="">
                    <el-radio v-for="(item,index) in radioArr" :key="index" v-model="radio" :label="item.id" @change="radioChange">
                      {{ item.name }}
                    </el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="8">
                <el-col :xs="24" :sm="24" :lg="12">
                  <el-form-item label="说明：" prop="">
                    <el-input v-model="checkSuggest" type="textarea" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPublishVisible = false">取 消</el-button>
        <el-button type="primary" @click="preservationClick">保 存</el-button>
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
  GetBusInfoForEdit,
  getCreateOrUpdateContainer,
  getContainerList, getUpdateCheck, getBaseKeyValue
} from '@/api/business'
import { tableMixin } from '../../mixin/commTable'
import Pagination from '@/components/Pagination'
import { getCookie, setCookie } from '@/utils/cookie'
import { getOrganizatonTreeNoUsers } from '@/api/user/organization'
export default {
  name: 'WorkPermission',
  components: { Pagination, tree },
  directives: { waves },
  mixins: [tableMixin],
  data() {
    return {
      tableShow: false,
      tableData: [],
      radio: '',
      radioArr: [
        {
          name: '是',
          id: '1'
        },
        {
          name: '否',
          id: '2'
        }
      ],
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
      containerTypeOptions: [], // 集装箱类型
      examineOptions: [{
        value: '选项1',
        label: '审核通过'
      }, {
        value: '选项2',
        label: '审核未通过'
      }],
      addJzx: true,
      bjJzx: false,
      containerNOAdd: '',
      sealNOAdd: '',
      containerTypeAdd: '',
      containerNOAdds: '',
      sealNOAdds: '',
      containerTypeAdds: '',
      checkSuggest: '',
      systemDate: '',
      fileList: [],
      multipleSelection: [], // 表格选中的行
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
      listQuery: { // 搜索条件
        busNO: '',
        businessCode: '',
        portCode: '',
        checkCode: '',
        jyTime: '',
        cyTime: '',
        sqTime: ''
      },
      dialogPublishVisible: false, // 隐藏工作记录
      beginInspectTime: '',
      endInspectTime: '',
      beginExpectedTime: '',
      endExpectedTime: '',
      beginCreationTime: '',
      endCreationTime: '',
      assingId: '',
      jzxId: ''
    }
  },
  created() {
    this.addDate()
    this.getTableList()
  },
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
        checkCode: '3',
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
    // 获取集装箱类型
    getBaseKeyValues() {
      const data = {
        TypeCode: 'CONTAINERTYPE'
      }
      getBaseKeyValue(data).then(res => {
        if (res.success) {
          this.containerTypeOptions = res.result.items
          this.containerTypeOptions.id = res.result.items.id
          this.containerTypeOptions.code = res.result.items.code
          this.containerTypeOptions.name = res.result.items.name
        }
      })
    },
    // 点击工作记录
    handlePublish(row) {
      this.dialogPublishVisible = true
      this.assingId = row.busNO
      this.jzxId = row.id
      this.getBaseKeyValues()
      const data = {
        id: row.id
      }
      GetBusInfoForEdit(data).then(res => {
        if (res.success) {
          this.table.loading = false
          this.busNO = res.result.busNO
          this.creationTime = res.result.creationTime
          this.portCode = res.result.portCode
          this.modeTransport = res.result.modeTransport
        }
      })
      const pro = {
        busNO: row.busNO
      }
      getContainerList(pro).then(res => {
        if (res.success) {
          if (res.result.items.length === 0) {
            this.tableShow = false
          } else {
            this.tableData = res.result.items
            this.tableShow = true
          }
        }
      })
    },
    // 保存集装箱列表
    createOrUpdateContainerAdd() {
      const data = {
        busNO: this.assingId,
        containerNO: this.containerNOAdd,
        sealNO: this.sealNOAdd,
        containerType: this.containerTypeAdd
      }
      getCreateOrUpdateContainer(data).then(res => {
        if (res.success) {
          const data = {
            busNO: this.assingId
          }
          getContainerList(data).then(res => {
            if (res.success) {
              this.tableData = res.result.items
            }
          })
          this.containerNOAdd = ''
          this.sealNOAdd = ''
          this.containerTypeAdd = ''
        }
      })
      this.tableShow = true
    },
    // 编辑集装箱
    tableDataBj(row) {
      this.bjJzx = tree
      this.addJzx = false
      this.jzxId = row.id
      this.containerNOAdds = row.containerNO
      this.sealNOAdds = row.sealNO
      this.containerTypeAdds = row.containerType
    },
    createOrUpdateContainerBj() {
      const data = {
        busNO: this.assingId,
        containerNO: this.containerNOAdds,
        sealNO: this.sealNOAdds,
        containerType: this.containerTypeAdds,
        id: this.jzxId
      }
      getCreateOrUpdateContainer(data).then(res => {
        if (res.success) {
          const data = {
            busNO: this.assingId
          }
          getContainerList(data).then(res => {
            if (res.success) {
              this.tableData = res.result.items
            }
          })
          this.bjJzx = false
          this.addJzx = true
          this.containerNOAdds = ''
          this.sealNOAdds = ''
          this.containerTypeAdds = ''
        }
      })
    },
    // 删除集装箱
    tableDataDel() {},
    // 保存工作记录
    radioChange(val) {
      console.log(val)
      this.radio = val
      console.log(this.radio)
    },
    preservationClick() {
      if (this.radio === '1') {
        const data = {
          id: this.jzxId,
          type: true,
          fulfil: false,
          checkSuggest: this.checkSuggest
        }
        getUpdateCheck(data).then(res => {
          if (res.success) {
            this.getTableList()
            this.dialogPublishVisible = false
          }
        })
      } else {
        const data = {
          id: this.jzxId,
          type: false,
          fulfil: false,
          checkSuggest: this.checkSuggest
        }
        getUpdateCheck(data).then(res => {
          if (res.success) {
            this.getTableList()
            this.dialogPublishVisible = false
          }
        })
      }
    },
    // 点击检验报告
    handlePublishsBg(row) {
      const id = row.id
      this.$router.push({
        path: `/quality-testing/inspection-report/${id}`
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
