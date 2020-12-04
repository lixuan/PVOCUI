<template>
  <div class="page-container">
    <div class="content">
      <el-form ref="businessForm" v-loading="loading" :rules="rules" :model="businessForm" class="background-fff clearfix">
        <el-row :gutter="8" class="clearfix">
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="">
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
                      <el-select v-model="businessForm.portCode" filterable placeholder="请选择港口" style="width: 220px">
                        <el-option
                          v-for="item in portValueOptions"
                          :key="item.value"
                          :label="item.displayText"
                          :value="item.code"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="CNAS证书编号:" prop="cnasNo" style="padding-top: 16px;">
                      <el-input v-model="businessForm.cnasNo" placeholder="请输入CNAS证书编号" style="width: 220px" />
                    </el-form-item>
                    <!--                    <el-form-item label="参考标准:" prop="Standard" style="padding-top: 16px;">-->
                    <!--                      <el-input v-model="businessForm.Standard" placeholder="请输入参考标准" style="width: 220px"/>-->
                    <!--                    </el-form-item>-->
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="预约检验时间:" prop="inspectTime">
                      <el-date-picker
                        v-model="businessForm.inspectTime"
                        type="date"
                        placeholder="预约检验时间"
                        style="width: 220px"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div style="padding-bottom: 10px;">
                <div class="wrapper-title" style="font-size: 14px;color: #606266;line-height: 36px;font-weight: 700;">附件(共3个文件，必填)：</div>
                <el-row :gutter="2">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-upload
                      ref="upload"
                      class="upload-demo"
                      action="/BaseDataService/api/services/app/Business/AnnexUpload"
                      :on-remove="handleRemove"
                      :http-request="httpRequest"
                      :show-file-list="true"
                      :limit="5"
                      :auto-upload="true"
                    >
                      <el-button slot="trigger" size="small" type="primary">上传 有效测试报告/证书 文件</el-button>
                    </el-upload>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-upload
                      ref="upload"
                      class="upload-demo"
                      action="/BaseDataService/api/services/app/Business/AnnexUpload"
                      :on-remove="handleRemove"
                      :http-request="httpRequest2"
                      :show-file-list="true"
                      :limit="5"
                      :auto-upload="true"
                    >
                      <el-button slot="trigger" size="small" type="primary">上传 ISO质量认证等体系复印件 文件</el-button>
                    </el-upload>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-upload
                      ref="upload"
                      class="upload-demo"
                      action="/BaseDataService/api/services/app/Business/AnnexUpload"
                      :on-remove="handleRemove"
                      :http-request="httpRequest3"
                      :show-file-list="true"
                      :limit="5"
                      :auto-upload="true"
                    >
                      <el-button slot="trigger" size="small" type="primary">上传 厂检/测试报告 文件</el-button>
                    </el-upload>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <!--货物提单信息-->
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="">
              <div class="wrapper-title">出口商/制造商信息</div>
              <div class="wrapper-form">
                <div>
                  <el-row :gutter="2">
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="exporterCusCode">
                        <el-input v-model="businessForm.exporterCusCode" placeholder="请输入名称" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="cusAddress">
                        <el-input v-model="businessForm.cusAddress" placeholder="请输入地址" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="customENFullName">
                        <el-input v-model="businessForm.customENFullName" placeholder="请输入联系人" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div style="padding-top: 16px">
                  <el-row :gutter="2">
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="cusTel">
                        <el-input v-model="businessForm.cusTel" placeholder="请输入电话" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="fax">
                        <el-input v-model="businessForm.fax" placeholder="请输入传真" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="email">
                        <el-input v-model="businessForm.email" placeholder="请输入E-mail" class="filter-item" style="width: 200px" />
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
                        <el-input v-model="businessForm.importerCusCode" placeholder="请输入名称" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="importerCusAddress">
                        <el-input v-model="businessForm.importerCusAddress" placeholder="请输入地址" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="importerCustomENFullName">
                        <el-input v-model="businessForm.importerCustomENFullName" placeholder="请输入联系人" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div style="padding-top: 16px">
                  <el-row :gutter="2">
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="importerCusTel">
                        <el-input v-model="businessForm.importerCusTel" placeholder="请输入电话" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="importerFax">
                        <el-input v-model="businessForm.importerFax" placeholder="请输入传真" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="8">
                      <el-form-item prop="importerEmail">
                        <el-input v-model="businessForm.importerEmail" placeholder="请输入E-mail" class="filter-item" style="width: 200px" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <div class="goods-wrapper background-fff clearfix" style="padding-top: 36px">
          <div style="padding-bottom: 20px;" class="clearfix">
            <div class="wrapper-title" style="padding-top: 10px;float: left">申请续表</div>
            <div style="float: right">
              <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
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
          <div class="fr" style="padding-bottom: 20px;padding-top: 40px;">
            <el-button type="primary" @click="onSubmit">取消</el-button>
            <el-button type="success" :loading="loading" @click="onPreserve('businessForm')">提交</el-button>
          </div>
        </div>
      </el-row>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="130px" style="width: 500px; margin-left:50px;">
          <el-form-item label="HS编码" prop="type" style="margin-bottom: 10px">
            <el-input v-model="temp.hsCode" />
          </el-form-item>
          <el-form-item label="数量" prop="timestamp" style="margin-bottom: 10px">
            <el-input v-model="temp.count" />
          </el-form-item>
          <el-form-item label="单位" prop="title" style="margin-bottom: 10px">
            <el-input v-model="temp.unit" />
          </el-form-item>
          <el-form-item label="品牌" prop="timestamp" style="margin-bottom: 10px">
            <el-input v-model="temp.brand" />
          </el-form-item>
          <el-form-item label="型号" prop="timestamp" style="margin-bottom: 10px">
            <el-input v-model="temp.model" />
          </el-form-item>
          <el-form-item label="产品描述" prop="timestamp" style="margin-bottom: 10px">
            <el-input v-model="temp.productContent" />
          </el-form-item>
          <el-form-item label="参考标准" prop="timestamp" style="margin-bottom: 10px">
            <el-input v-model="temp.guideline" />
          </el-form-item>
          <el-form-item label="注册/许可号" prop="timestamp">
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
  GetBusInfoForEdit,
  GetBusContinuedInfoForEdit,
  getBaseKeyValue,
  getDelBusContinued, getAnnexUpload
} from '@/api/business/index'
import { getCountryInfoListNew } from '@/api/publicBase/baseCountry/index'
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import { getRoleSelectList } from '@/api/user/roles'
import { batchDeleteInfo, getList } from '@/api/publicBase/portInfo'
import { getCookie, setCookie } from '@/utils/cookie'
import { warnMsg } from '@/utils/messageBox'

export default {
  name: 'BusinessPC1',
  components: {
    Pagination
  },
  directives: { waves },
  mixins: [tableMixin],
  data() {
    return {
      loading: false,
      systemDate: '',
      businessForm: {
        busNO: '',
        businessCode: 'P1',
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
        cnasNo: ''
      },
      continuedList: [{ id: undefined, busNO: '', hsCode: '', count: '', unit: '', brand: '', model: '', productContent: '', guideline: '', licenseNo: '' }],
      tableKey: 0,
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      portValueOptions: [], // 港口下拉
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
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        portCode: [
          { required: true, message: '请选择检验港口', trigger: 'change' }
        ],
        inspectTime: [
          { required: true, message: '请选择预约检验时间', trigger: 'change' }
        ],
        Standard: [
          { required: true, message: '请输入参考标准', trigger: 'blur' }
        ],
        cnasNo: [
          { required: true, message: '请输入CNAS证书编号', trigger: 'blur' }
        ],
        importerCusCode: [
          { required: true, message: '请输入进口商名称', trigger: 'blur' }
        ],
        importerCustomENFullName: [
          { required: true, message: '请输入进口商名称', trigger: 'blur' }
        ],
        importerCusAddress: [
          { required: true, message: '请输入进口商联系人', trigger: 'blur' }
        ],
        importerCusTel: [
          { required: true, message: '请输入进口商电话', trigger: 'blur' }
        ],
        importerFax: [
          { required: true, message: '请输入进口商传真', trigger: 'blur' }
        ],
        importerEmail: [
          { required: true, message: '请输入进口商E-mail', trigger: 'blur' }
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
    this.getBusInfoForEdit()
  },
  mounted() {},
  methods: {
    // 获取当前日期
    addDate() {
      console.log(this.$route.params.id)
      console.log(this.$route.params.no)
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      this.systemDate = date.year + '-' + 0 + date.month + '-' + date.date
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
    // 获取业务续表
    getTableList() {
      this.table.loading = true
      const data = {
        BusNO: this.$route.params.no,
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
          this.temp.busNO = this.$route.params.no
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
          this.temp.busNO = this.$route.params.no
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
        busNo: getCookie('busNO'),
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
    // 取消
    onSubmit() {
      this.$message.success('取消编辑')
    },
    // 附件上传
    httpRequest(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('busno', this.$route.params.no)
      getAnnexUpload(formData).then(res => {
        if (res.success) {
          this.$message.success('文件上传成功!')
        }
      })
    },
    httpRequest2(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('busno', this.$route.params.no)
      getAnnexUpload(formData).then(res => {
        if (res.success) {
          this.$message.success('文件上传成功!')
        }
      })
    },
    httpRequest3(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('busno', this.$route.params.no)
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
    // 获取主业务编辑
    getBusInfoForEdit() {
      this.loading = true
      const data = {
        id: this.$route.params.id
      }
      GetBusInfoForEdit(data).then(res => {
        if (res.success) {
          res.result.creationTime = res.result.creationTime.slice(0, 10)
          this.businessForm.busNO = res.result.busNO
          this.businessForm.businessCode = res.result.businessCode
          this.businessForm.portCode = res.result.portCode
          this.businessForm.inspectTime = res.result.inspectTime
          this.businessForm.cnasNo = res.result.cnasNo
          this.businessForm.exporterCusCode = res.result.exporterCusCode
          this.businessForm.cusAddress = res.result.cusAddress
          this.businessForm.customENFullName = res.result.customENFullName
          this.businessForm.cusTel = res.result.cusTel
          this.businessForm.fax = res.result.fax
          this.businessForm.email = res.result.email
          this.businessForm.importerCusCode = res.result.importerCusCode
          this.businessForm.importerCusAddress = res.result.importerCusAddress
          this.businessForm.importerCustomENFullName = res.result.importerCustomENFullName
          this.businessForm.importerCusTel = res.result.importerCusTel
          this.businessForm.importerFax = res.result.importerFax
          this.businessForm.importerEmail = res.result.importerEmail
          this.loading = false
        }
      })
    },
    // 取消
    onSubmit() {
      this.$router.go(-1)
    },
    // 提交主业务表
    onPreserve(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            busNO: this.businessForm.busNO,
            businessCode: this.businessForm.businessCode,
            portCode: this.businessForm.portCode,
            // Standard: this.businessForm.Standard,
            inspectTime: this.businessForm.inspectTime,
            cnasNo: this.businessForm.cnasNo,
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
            id: this.$route.params.id
          }
          getCreateOrUpdateBus(data).then(res => {
            if (res.success) {
              this.loading = false
              this.$message.success('提交成功')
              this.$router.go(-1)
            }
          })
        } else {
          return false
        }
      })
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
  .el-form-item{margin-bottom: 1px!important;}
  .fr{
    float: right;
  }
</style>
