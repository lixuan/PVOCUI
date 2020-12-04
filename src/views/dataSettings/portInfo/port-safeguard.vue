<template>
  <div class="app-container">
    <el-card shadow="always" style="height:100%" body-style="height:100%">
      <el-form size="mini" @submist.native.prevent>
        <el-row style="margin-bottom:10px;">
          <el-col :span="5">
            <el-form-item label="港口代码：" prop>
              <el-input
                v-model="search.portCode"
                placeholder="港口代码"
                style="width:70%;"
                size="mini"
                clearable
                @change="onSearchBefore();getTableList()"
                @keyup.enter.native="onSearchBefore();getTableList()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="港口名称：" prop>
              <el-input
                v-model="search.portName"
                placeholder="港口中/英文名称"
                style="width:70%;"
                size="mini"
                clearable
                @change="onSearchBefore();getTableList()"
                @keyup.enter.native="onSearchBefore();getTableList()"
              />
              <!-- <el-input size="mini" v-model="form.userName" placeholder="请输入登陆账户"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left:10px;">
            <el-form-item label prop>
              <el-button type="primary" size="mini" @click="onSearchBefore(); getTableList()">搜索</el-button>
              <el-button v-if="checkBtnPeimission(portPage.addPortPage.permission)" type="primary" size="mini" @click="newCreate">新增港口</el-button>
              <el-button v-if="checkBtnPeimission(portPage.deletesPortPage.permission)" type="primary" size="mini" @click="batchDeleteInfo">批量删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        v-loading="table.loading"
        :data="userTableList"
        size="mini"
        :row-key="getRowKeys"
        :cell-style="{padding: '5px'}"
        :cell-class-name="tableRowClassName"
        border
        stripe
        ref="table"
        highlight-current-row
        fit
        style="width:100%;height: 660px;overflow-y: auto;"
        @selection-change="onSelectChange"
        @cell-dblclick="onPortInfoTableChange"
        @sort-change="sortChange"
      >
        <el-table-column :reserve-selection="true" type="selection" width="40" />
        <el-table-column type="index" align="center" label="序号" width="80">
          <template slot-scope="scope">{{ countIndex(scope.$index) }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="portCode"
          label="港口标准码"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="numCode"
          label="港口数字码"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="portCNName"
          label="中文名称"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="portNameEN"
          label="英文名称"
          show-overflow-tooltip
        />
        <!--        <el-table-column-->
        <!--          align="center"-->
        <!--          prop="clockArea"-->
        <!--          label="时区"-->
        <!--          sortable="clockArea"-->
        <!--          show-overflow-tooltip-->
        <!--          width="100"-->
        <!--        ></el-table-column>-->
        <el-table-column
          align="center"
          prop="countryCode"
          label="所属国家英文"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="countryName"
          label="所属国家中文"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="remarks"
          label="备注"
          show-overflow-tooltip
          width="200"
        />

        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button v-if="checkBtnPeimission(portPage.addPortPage.permission)" circle type="success" icon="el-icon-edit" @click="updateInfo(scope.row.id)" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button v-if="checkBtnPeimission(portPage.deletePortPage.permission)" circle type="danger" icon="el-icon-error" @click="deleteinfo(scope.row.id)" />
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
    </el-card>

    <!--    <portArea ref="portAreaComp" :portInfoCode="selectedPortCode"></portArea>-->

    <add-Update
      ref="addOrUpdateComp"
      :pshow="addOrUpdateShow"
      @on-show-change="addOrUpdateClose"
      @on-save-success="onSaveSuccess"
    />
  </div>
</template>

<style lang="scss">
  .portInfoHead {
    margin: 20px;
  }
  .el-table--scrollable-y .el-table__body-wrapper{height: auto!important;}
</style>

<script>
import { tableMixin } from '../../../mixin/commTable'
import { warnMsg } from '@/utils/messageBox'
import {
  getList,
  getOne,
  createOrUpdateInfo,
  batchDeleteInfo
} from '@/api/publicBase/portInfo'

import addOrUpdate from './addOrUpdatePortInfo'
// import portArea from "./portArea";
import { checkBtnPeimission, portPage } from '@/utils/btnRole'

export default {
  name: 'PortInfo',
  components: {
    'add-Update': addOrUpdate
  },
  mixins: [tableMixin],

  data() {
    return {
      portPage,
      userTableList: [],
      selectedPortCode: '0',
      search: {
        portCode: '',
        portName: ''
      },

      treeComp: {
        show: false,
        data: []
      },
      choosedTreeNode: [],
      addOrUpdateShow: false,
      addOrUpdateShow2: false
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    checkBtnPeimission,
    getRowKeys(row) {
      return row.id.toString()
    },

    // 查询港口
    getTableList() {
      this.tableData = []
      this.table.loading = true
      const data = {
        isOnlyGetRecycleData: false,
        portCode: this.search.portCode,
        portName: this.search.portName,
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        filter: this.search.name,
        sorting: this.table.order.sort
      }
      getList(data)
        .then(res => {
          if (res.success) {
            this.table.loading = false
            this.userTableList = res.result.items
            this.userTableList.forEach(item => {
              this.$set(item, 'popShow', false)
            })
            this.page.total = res.result.totalCount
          }
        })
        .catch(err => {
          this.table.loading = false
        })
    },
    // 关闭港口弹窗  刷新港口
    addOrUpdateClose(val) {
      this.addOrUpdateShow = val
    },

    // 添加或修改成功事件
    onSaveSuccess(portCode) {
      this.getTableList()
      this.$refs.portAreaComp.getTableList(portCode)
    },

    // 新增港口
    newCreate() {
      // this.getBankByID();
      this.addOrUpdateShow = true
      this.$refs.addOrUpdateComp.setCombox()
    },
    // 修改港口
    updateInfo(bankID) {
      this.addOrUpdateShow = true
      this.$refs.addOrUpdateComp.setCombox()
      this.$refs.addOrUpdateComp.getInfoByID(bankID)
    },

    // 获取选中的最后一条港口下港口区域信息
    onPortInfoTableChange(row) {
      this.selectedPortCode = row.portCode
      this.$refs.portAreaComp.getTableList(this.selectedPortCode)
    },

    // 单体删除港口
    deleteinfo(id) {
      batchDeleteInfo([id]).then(res => {
        this.$refs.table.clearSelection()
        this.getTableList()
      })
    },

    // 批量删除港口
    batchDeleteInfo() {
      if (this.table.choosedRow.length === 0) {
        warnMsg('请选择要删除的港口')
        return
      }
      this.$confirm('是否确定删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(({ value }) => {
        const arr = this.table.choosedRow.map(item => item.id)

        batchDeleteInfo(arr).then(res => {
          this.$refs.table.clearSelection()
          this.getTableList()
        })
      })
    }
  }
}
</script>
