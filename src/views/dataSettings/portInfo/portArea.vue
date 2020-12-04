<template>
  <div class="portAreaHead">
    <el-card shadow="always" style="height:calc(50%)" body-style="height:80%;padding-top:10px;">
      <el-form size="mini">
        <el-row>
          <el-col :span="6" style=" margin-bottom:-15px;">
            <el-form-item label prop>
              <label style="margin-right:10px;">{{ this.selectedPortInfoCode }}</label>
              <el-button type="primary" size="mini" @click="newcreate2">新增港口区域</el-button>
              <el-button type="primary" size="mini" @click="batchDeleteInfo2">批量删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        v-loading="table.loading"
        :data="portAreaTable"
        :row-key="getRowKeys"
        :cell-class-name="tableRowClassName"
        border
        stripe
        highlight-current-row
        fit
        ref="table"
        height="100%"
        style="width:100%;height:100%;margin-top:10px; "
        @selection-change="onSelectChange"
        @sort-change="sortChange"
      >
        <el-table-column :reserve-selection="true" type="selection" width="40" />
        <el-table-column type="index" align="center" label="序号">
          <template slot-scope="scope">{{ countIndex(scope.$index) }}</template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          prop="portCode"
          label="港口标准码"
          show-overflow-tooltip
          min-width="10%"
          sortable="portCode"
        ></el-table-column> -->
        <el-table-column
          align="center"
          prop="areaCode"
          label="港口区域代码"
          show-overflow-tooltip
          width="200"
          sortable="areaCode"
        />
        <el-table-column
          align="center"
          prop="areaCnName"
          label="中文名称"
          sortable="areaCnName"
          show-overflow-tooltip
          width="300"
        />
        <el-table-column
          align="center"
          prop="areaEnName"
          label="英文名称"
          sortable="areaEnName"
          show-overflow-tooltip
          width="400"
        />
        <!-- <el-table-column
          align="center"
          prop="terminal"
          label="码头"
          sortable="terminal"
          show-overflow-tooltip
          min-width="10%"
        ></el-table-column> -->
        <el-table-column
          align="center"
          prop="remarks"
          label="备注"
          show-overflow-tooltip
          width="400"
        />

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div class="tableBtn" @click="updateInfo2(scope.row.id)">编辑</div>
            <el-popover v-model="scope.row.popShow" placement="top" width="160">
              <p>是否确认删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.popShow = false">取消</el-button>
                <el-button type="danger" size="mini" @click="deleteinfo2(scope.row.id)">删除</el-button>
              </div>
              <div slot="reference" class="tableBtn">删除</div>
            </el-popover>
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
    <add-Update2
      ref="addOrUpdateCompPortArea"
      :pshow="addOrUpdateShow2"
      @on-show-change="addOrUpdateClose2"
      @on-save-success="onSaveSuccess"
    />
  </div>
</template>

<style lang="scss">
.portAreaHead {
  height: 100%;
  margin-top: 10px;
}
</style>

<script>
import { tableMixin } from '../../../mixin/commTable'

import {
  getList2,
  getOne2,
  createOrUpdateInfo2,
  batchDeleteInfo2
} from '@/api/publicBase/portArea'

import addOrUpdate2 from './addOrUpdatePortArea'
import { warnMsg } from '@/utils/messageBox'

export default {

  components: {
    'add-Update2': addOrUpdate2
  },
  mixins: [tableMixin],

  data() {
    return {
      selectedPortInfoCode: '',
      portAreaTable: [],
      name: 'portArea',
      treeComp: {
        show: false,
        data: []
      },
      choosedTreeNode: [],
      addOrUpdateShow2: false
    }
  },
  created() {},
  methods: {
    getRowKeys(row) {
      return row.id.toString()
    },

    // 查询港口区域
    getTableList(code) {
      this.tableData = []
      this.table.loading = true
      if (code == '' || code == undefined) {
        code = '-10'
      }

      if (code == '-10' && this.selectedPortInfoCode != '-10') {
        code = this.selectedPortInfoCode
      } else {
        this.selectedPortInfoCode = code
      }
      const data = {
        isOnlyGetRecycleData: false,
        portCode: code,
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        filter: '',
        sorting: this.table.order.sort
      }

      getList2(data).then(res => {
        if (res.success) {
          this.table.loading = false
          this.portAreaTable = res.result.items
          this.portAreaTable.forEach(item => {
            this.$set(item, 'popShow', false)
          })
          this.page.total = res.result.totalCount
        }
      })
    },

    // 新建港口区域
    newcreate2() {
      if (
        this.selectedPortInfoCode != '' &&
        this.selectedPortInfoCode != undefined &&
        this.selectedPortInfoCode != -10
      ) {
        this.addOrUpdateShow2 = true
        this.$refs.addOrUpdateCompPortArea.setPortCode(
          this.selectedPortInfoCode
        )
        // this.$refs.addOrUpdateCompPortArea.setTerminalList();
      } else {
        warnMsg('请先选择一条港口信息！')
      }
    },

    // 修改港口区域
    updateInfo2(portAreaCode) {
      this.addOrUpdateShow2 = true
      // this.$refs.addOrUpdateCompPortArea.setTerminalList();
      this.$refs.addOrUpdateCompPortArea.getInfoByID(portAreaCode)
    },
    // 关闭港口区域弹窗  刷新港口区域
    addOrUpdateClose2(val) {
      this.addOrUpdateShow2 = val
    },

    // 添加或修改成功事件
    onSaveSuccess() {
      this.getTableList(this.selectedPortInfoCode)
    },

    // 单体删除港口区域
    deleteinfo2(id) {
      batchDeleteInfo2([id]).then(res => {
        this.$refs.table.clearSelection()
        this.getTableList(this.selectedPortInfoCode)
      })
    },

    // 批量删除港口区域
    batchDeleteInfo2() {
      if (this.table.choosedRow.length === 0) {
        warnMsg('请选择要删除的港口区域')
        return
      }
      this.$confirm('是否确定删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(({ value }) => {
        const arr = this.table.choosedRow.map(item => item.id)
        batchDeleteInfo2(arr).then(res => {
          this.$refs.table.clearSelection()
          this.getTableList(this.selectedPortInfoCode)
        })
      })
    }
  }
}
</script>
