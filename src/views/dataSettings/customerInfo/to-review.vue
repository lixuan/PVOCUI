<template>
  <div class="app-container customInfo">
    <el-form size="mini" @submit.native.prevent>
      <el-row style="margin-bottom:10px">
        <el-col :span="4">
          <el-form-item label="客户代码：">
            <el-input
              v-model="search.customInfoCode"
              placeholder="客户代码"
              style="width:70%"
              size="mini"
              clearable
              @keyup.enter.native="onSearchBefore();getTableList()"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="中文名称：">
            <el-input
              v-model="search.chineseName"
              placeholder="中文简称/ 中文全称"
              style="width:70%"
              size="mini"
              clearable
              @keyup.enter.native="onSearchBefore();getTableList()"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="英文名称：">
            <el-input
              v-model="search.englishName"
              placeholder="英文简称/英文全称"
              style="width:70%"
              size="mini"
              clearable
              @keyup.enter.native="onSearchBefore();getTableList()"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="财务编码：">
            <el-input
              v-model="search.fINANCIAL_CODE"
              placeholder="财务编码"
              style="width:70%"
              size="mini"
              clearable
              @keyup.enter.native="onSearchBefore();getTableList()"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="税号：">
            <el-input
              v-model="search.dutyNUMBER"
              placeholder="税号"
              style="width:70%"
              size="mini"
              clearable
              @keyup.enter.native="onSearchBefore();getTableList()"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="客户类型：">
            <el-select v-model="search.cusType" size="mini" style="width:70%" clearable filterable placeholder="请选择客户类型" @change="onSearchBefore();getTableList()">
              <el-option
                v-for="item in search.cusTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <!--          <el-form-item label prop>-->
          <!--            <el-button type="primary" size="mini" @click="onSearchBefore();getTableList()" >搜索</el-button>-->
          <!--&lt;!&ndash;            <el-button type="primary" size="mini" @click="openSyncCustomInfoComp" v-if="checkBtnPeimission(customPage.addCustomInfo.permission)">同步客户</el-button>&ndash;&gt;-->
          <!--            <el-button type="primary" size="mini" @click="openAddCustomInfoComp" v-if="checkBtnPeimission(customPage.addCustomInfo.permission)">新增</el-button>-->
          <!--            &lt;!&ndash; <el-button type="primary" size="mini" @click="onBatchDelete" v-if="checkBtnPeimission(customPage.deleteCustomInfo.permission)">批量删除</el-button> &ndash;&gt;-->
          <!--            <el-button type="primary" size="mini" @click="FinanceEdit" v-if="checkBtnPeimission(customPage.editCustomInfo.permission)">财务编码编辑</el-button>-->
          <!--            <el-button type="primary" size="mini" @click="updateDishonestyFlag" v-if="checkBtnPeimission(customPage.dishonestyFlag.permission)">添加到失信客户</el-button>-->
          <!--            <el-button type="primary" size="mini" @click="cancelDishonestyFlag" v-if="checkBtnPeimission(customPage.dishonestyFlag.permission)">取消失信客户</el-button>-->
          <!--            <el-button type="primary" size="mini"  @click="exportCustomInfo" >导出</el-button>-->
          <!--          </el-form-item>-->
          <el-form-item label prop>
            <el-button type="primary" size="mini" @click="onSearchBefore();getTableList()">搜索</el-button>
            <!--            <el-button type="primary" size="mini" @click="openSyncCustomInfoComp" v-if="checkBtnPeimission(customPage.addCustomInfo.permission)">同步客户</el-button>-->
            <el-button v-if="checkBtnPeimission(customPage.addCustomInfo.permission)" type="primary" size="mini" @click="openAddCustomInfoComp">新增</el-button>
            <!-- <el-button type="primary" size="mini" @click="onBatchDelete" v-if="checkBtnPeimission(customPage.deleteCustomInfo.permission)">批量删除</el-button> -->
            <el-button type="primary" size="mini" @click="FinanceEdit">财务编码编辑</el-button>
            <el-button type="primary" size="mini" @click="updateDishonestyFlag">添加到失信客户</el-button>
            <el-button type="primary" size="mini" @click="cancelDishonestyFlag">取消失信客户</el-button>
            <el-button type="primary" size="mini" @click="exportCustomInfo">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="customInfo-tableRow">
      <el-table
        v-loading="table.loading"
        size="mini"
        :cell-class-name="tableRowClassName"
        :data="customInfoList"
        :row-key="getRowKeys"
        border
        ref="table"
        stripe
        highlight-current-row
        fit
        style="width:100%;height: 660px;overflow-y: auto;"
        @selection-change="onSelectChange"
        @sort-change="sortChange"
      >
        <el-table-column :reserve-selection="true" type="selection" width="40" />
        <el-table-column type="index" align="center" label="序号" width="80">
          <template slot-scope="scope">{{ countIndex(scope.$index) }}</template>
        </el-table-column>
        <el-table-column align="center" prop="customName" show-overflow-tooltip label="中文全称" />
        <el-table-column align="center" prop="customCNShortName" show-overflow-tooltip label="中文简称" />
        <el-table-column align="center" prop="cusCode" show-overflow-tooltip label="客户代码" />
        <el-table-column align="center" prop="customENShortName" show-overflow-tooltip label="英文简称" />
        <el-table-column align="center" prop="customENFullName" show-overflow-tooltip label="英文全称" />
        <el-table-column align="center" prop="dishonestyFlag" label="失信客户" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.dishonestyFlag == 1 ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="dutY_NUMBER" label="税号" show-overflow-tooltip />
        <el-table-column align="center" prop="kingdeE_PAY_CODE" label="金蝶应付编码" show-overflow-tooltip />
        <el-table-column align="center" prop="kingdeE_REC_CODE" label="金蝶应收编码" show-overflow-tooltip />
        <el-table-column align="center" prop="cusType" label="客户类型" show-overflow-tooltip />
        <el-table-column align="center" prop="isForzen" label="是否冻结" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.isForzen == 0 ? '否' : '是' }}</template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="financiaL_CODE" label="财务编码" show-overflow-tooltip sortable="custom" width="150"></el-table-column>
        <el-table-column align="center" prop="organizatioN_CUSTOMER_LEVEL" label="组织规模级别" show-overflow-tooltip sortable="custom" width="120"></el-table-column>
        <el-table-column align="center" prop="customeR_CLASS" label="客户等级" show-overflow-tooltip sortable="custom" width="100"></el-table-column>
        <el-table-column align="center" prop="cusAddress" label="注册地址" show-overflow-tooltip sortable="custom" width="120"></el-table-column>
        <el-table-column align="center" prop="cusTel" label="电话" show-overflow-tooltip sortable="custom" width="100"></el-table-column>
        <el-table-column align="center" prop="fax" label="传真" show-overflow-tooltip sortable="custom" width="100"></el-table-column>
        <el-table-column align="center" prop="aeo" label="AEO" show-overflow-tooltip sortable="custom" width="100"></el-table-column> -->
        <el-table-column align="center" prop="remarks" show-overflow-tooltip label="备注" />
        <el-table-column align="center" prop="isForzen" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.creationTime |parseTime() }}</template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button v-if="checkBtnPeimission(customPage.updateCustomInfo.permission)" circle type="success" icon="el-icon-edit" @click="openUpdateCustomInfoComp(scope.row,false)" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button v-if="checkBtnPeimission(customPage.deleteCustomInfo.permission)" circle type="danger" icon="el-icon-error" @click="deleteSingleCustomInfo(scope.row.id)" />
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
    </el-row>
    <create-custom-info
      ref="createCustomInfoComp"
      :pshow="createCustomInfoComp.show"
      :input-disabled="createCustomInfoComp.inputDisabled"
      @on-show-change="oncreateCustomInfoCompShowChange"
      @on-save-success="onSaveSuccess"
    />
    <!--    <sync-custom ref="syncCustomComp" :pshow="syncCustomComp.show" @on-show-change="onsyncCustomCompShowChange"-->
    <!--                 @on-save-success="onSaveSuccess"-->
    <!--    ></sync-custom>-->
  </div>
</template>
<style lang="scss">
  .customInfo {
    height: 100%;
    .customInfo-tableRow {
      height: calc(100% - 130px)
    }
  }
  .el-table--scrollable-y .el-table__body-wrapper{height: auto!important;}
</style>
<script>
import { tableMixin } from '../../../mixin/commTable'
import { getAllCustomInfoList, deleteBatchCustomInfo, UpdateDishonestyFlag, getExportCustomData } from '@/api/publicBase/custom/customInfo'
import { getDicListByDitType } from '@/api/publicBase/dictionaryMng'
import { Server } from 'net'
import createCustomInfo from './createCustomInfo'
// import syncCustom from "./syncCustom"
import { checkBtnPeimission, customPage } from '@/utils/btnRole'
import { warnMsg } from '@/utils/messageBox'
import { exportFile } from '@/utils/processFile'
export default {
  name: 'CustomInfoIndex',
  components: { createCustomInfo },
  mixins: [tableMixin],
  data() {
    return {
      customPage,
      customInfoList: [],
      createCustomInfoComp: {
        show: false,
        inputDisabled: false
      },
      // syncCustomComp: {
      //   show: false
      // },
      search: {
        customInfoCode: '',
        chineseName: '',
        englishName: '',
        fINANCIAL_CODE: '',
        dutyNUMBER: '',
        cusType: '',
        cusTypeList: []
      }
    }
  },
  created() {
    this.getCusTypeList()
    this.getTableList()
  },
  methods: {
    checkBtnPeimission,
    getRowKeys(row) {
      return row.id.toString()
    },
    // 取客户类型列表
    getCusTypeList() {
      getDicListByDitType({ TypeCode: 'KHLX', Code: '', Name: '' }).then(
        res => {
          this.search.cusTypeList = res.result
        }
      )
    },
    // 获取客户列表
    getTableList() {
      this.tableData = []
      this.table.loading = true
      const data = {
        CusCode: this.search.customInfoCode,
        ChineseName: this.search.chineseName,
        EnglishName: this.search.englishName,
        FINANCIAL_CODE: this.search.fINANCIAL_CODE,
        DUTY_NUMBER: this.search.dutyNUMBER,
        cusType: this.search.cusType,
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        sorting: this.table.order.sort
      }

      getAllCustomInfoList(data).then(res => {
        this.table.loading = false
        if (res.success) {
          this.customInfoList = res.result.items
          this.customInfoList.forEach(item => {
            this.$set(item, 'popShow', false)
          })
          this.page.total = res.result.totalCount
        }
      })
    },
    // 导出
    exportCustomInfo() {
      const data = {
        CusCode: this.search.customInfoCode,
        ChineseName: this.search.chineseName,
        EnglishName: this.search.englishName,
        FINANCIAL_CODE: this.search.fINANCIAL_CODE,
        DUTY_NUMBER: this.search.dutyNUMBER,
        cusType: this.search.cusType,
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        sorting: this.table.order.sort
      }
      getExportCustomData(data).then(res => {
        if (res.success) {
          exportFile({
            title: ``,
            titleStartRow: 0,
            titleStartCol: 0,
            data: res.result.data,
            header: res.result.header,
            fileName: `客户资料`,
            startRow: 0,
            Func: (ws) => {
              // 筛选带有$的列数组->标题中有$列的数据变色
              const titleArr = Object.values(res.result.header)
              return ws
            }
          })
        }
      })
        .catch(err => {

        })
    },

    // 删除单个客户
    deleteSingleCustomInfo(id) {
      deleteBatchCustomInfo([id]).then(res => {
        this.batchDeleteSearch()
        // this.getTableList()
      })
    },
    // 打开新增客户窗口
    openAddCustomInfoComp() {
      this.createCustomInfoComp.inputDisabled = false
      this.createCustomInfoComp.show = true
      this.$refs.createCustomInfoComp.getCusTypeList()
      this.$refs.createCustomInfoComp.getJieTypeList()
    },
    // 打开编辑客户窗口
    openUpdateCustomInfoComp(row, isDisabled) {
      this.createCustomInfoComp.show = true
      this.createCustomInfoComp.inputDisabled = isDisabled
      this.$refs.createCustomInfoComp.getCusTypeList()
      this.$refs.createCustomInfoComp.getJieTypeList()
      this.$refs.createCustomInfoComp.getCustomInfoInfoById(row.id)
    },
    // 查看详情页面
    openCustomInfoDetailsComp(row) {
      this.$router.push({
        path: 'customInfoDetail',
        query: { id: row.id }
      })
    },
    // 打开同步客户窗口
    // openSyncCustomInfoComp() {
    //   this.syncCustomComp.show = true
    // },
    // 财务编辑
    FinanceEdit() {
      if (this.table.choosedRow.length === 0) {
        warnMsg('请选择要编辑的客户')
        return
      }
      if (this.table.choosedRow.length > 1) {
        warnMsg('只能选择一个客户')
        return
      }
      this.openUpdateCustomInfoComp(this.table.choosedRow[0], true)
    },
    // 失信客户
    updateDishonestyFlag() {
      if (this.table.choosedRow.length === 0) {
        warnMsg('请选择要操作的客户')
        return
      }
      // 已经确认的不能再确认
      if (this.table.choosedRow.filter(p => p.dishonestyFlag == true).length > 0) {
        warnMsg('已经为失信客户，不能再操作')
        return false
      }
      this.$confirm('是否确定添加为失信客户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(({ value }) => {
        const arr = this.table.choosedRow.map(item => item.id)
        UpdateDishonestyFlag(arr).then(res => {
          this.$refs.table.clearSelection()
          this.getTableList()
        })
      })
    },
    // 取消失信客户
    cancelDishonestyFlag() {
      if (this.table.choosedRow.length === 0) {
        warnMsg('请选择要取消的客户')
        return
      }
      // 已经取消的不能再取消
      if (this.table.choosedRow.filter(p => p.dishonestyFlag != true).length > 0) {
        warnMsg('不是失信客户的不能取消')
        return false
      }
      this.$confirm('是否确定取消失信客户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(({ value }) => {
        const arr = this.table.choosedRow.map(item => item.id)
        UpdateDishonestyFlag(arr).then(res => {
          this.$refs.table.clearSelection()
          this.getTableList()
        })
      })
    },
    // 批量删除
    onBatchDelete() {
      if (this.table.choosedRow.length === 0) {
        warnMsg('请选择要删除的客户')
        return
      }
      this.$confirm('是否确定删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(({ value }) => {
        const arr = this.table.choosedRow.map(item => item.id)
        deleteBatchCustomInfo(arr).then(res => {
          this.batchDeleteSearch()
          this.$refs.table.clearSelection()
          // this.getTableList()
        })
      })
    },
    oncreateCustomInfoCompShowChange(val) {
      this.createCustomInfoComp.show = val
    },
    onsyncCustomCompShowChange(val) {
      this.syncCustomComp.show = val
    },
    // 新增或编辑用户成功事件
    onSaveSuccess() {
      this.getTableList()
    }
  }
}
</script>
