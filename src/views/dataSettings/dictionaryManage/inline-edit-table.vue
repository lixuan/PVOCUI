<template>
  <el-container class="app-container dicMng">
    <el-header>
      <el-form size="mini">
        <el-row :gutter="2">
          <el-col :span="4">
            <el-form-item label="类型编码：">
              <el-input v-model="search.typeCode" size="small" style="width:70%" placeholder="请输入类型编码" @keyup.enter.native="onSearchBefore();getTableList()" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="字典项编码：">
              <el-input v-model="search.code" size="small" style="width:65%" placeholder="请输入字典项编码" @keyup.enter.native="onSearchBefore();getTableList()" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="字典项名称：">
              <el-input v-model="search.name" size="small" style="width:65%" placeholder="请输入字典项名称" @keyup.enter.native="onSearchBefore();getTableList()" />
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left:20px;">
            <el-button type="primary" size="small" @click="page.currentPage=1;getTableList()">搜索</el-button>
            <el-button type="primary" size="small" @click="addDicType()">新增类型</el-button>
            <el-button type="primary" size="small" @click="editDicType()">编辑类型</el-button>
            <el-button type="primary" size="small" @click="deleteDicType()">删除类型</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-header>
    <el-container style="height:100%">
      <el-aside>
        <tree
          ref="tree"
          :p-tree-default-props="treeComp.config"
          :radio="true"
          :p-check-strictly="true"
          :p-tree-data="treeComp.data"
          @on-node-click="onNodeClick"
        />
      </el-aside>
      <el-main class="dicMng-rightMain">
        <el-row>
          <span class="dicMng-rightMain-typeName">{{ treeComp.currName }}</span>
          <el-button type="primary" size="small" @click="addTableRow()">新增字典项</el-button>
        </el-row>
        <el-row style="height:calc(100% - 80px);margin-top:10px">
          <el-form
            ref="form"
            :rules="tableForm.rules"
            :model="tableForm"
            style="height:calc(100% - 15px)"
          >
            <el-table
              ref="table"
              row-key="id"
              :data="tableForm.data"
              stripe
              size="mini"
              style="width:100%;height: 660px;overflow-y: auto;"
            >
              <el-table-column type="index" align="center" label="序号" width="80">
                <template slot-scope="scope">{{ countIndex(scope.$index) }}</template>
              </el-table-column>
              <el-table-column align="left" label="字典名称" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-form-item
                      :prop="'data.' + scope.$index + '.name'"
                      :rules="tableForm.rules.name"
                    >
                      <el-input v-model.trim="scope.row.name" size="mini" maxlength="50" />
                    </el-form-item>
                  </span>
                  <span v-else>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" label="字典编码" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-form-item
                      :prop="'data.' + scope.$index + '.code'"
                      :rules="tableForm.rules.code"
                    >
                      <el-input v-model.trim="scope.row.code" size="mini" maxlength="50" />
                    </el-form-item>
                  </span>
                  <span v-else>{{ scope.row.code }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="字典类型" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.systemSetting? '系统' : '自定义' }}</template>
              </el-table-column>
              <el-table-column align="center" label="备注" show-overflow-tooltip>
                <template slot-scope="scope">
                  <!-- <span v-if="scope.row.isSet">
                    <el-form-item
                      :prop="'data.' + scope.$index + '.remarks'"
                      :rules="tableForm.rules.code"
                    >
                      <el-input size="mini" maxlength="50" v-model.trim="scope.row.remarks"></el-input>
                    </el-form-item>
                  </span> -->
                  <span>{{ scope.row.remarks }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="150">
                <template slot-scope="scope" style="align-text:center;">

                  <el-tooltip :content="scope.row.isSet?'保存':'编辑'" placement="top">
                    <el-button v-if="!scope.row.systemSetting" circle type="primary" icon="el-icon-edit" @click="onClick(scope.row,scope.$index,true)" />
                  </el-tooltip>
                  <el-tooltip content="删除" placement="top">
                    <el-button v-if="!scope.row.systemSetting" circle type="danger" icon="el-icon-error" @click="deleteDicItem(scope.row.id)" />
                  </el-tooltip>
                  <el-tooltip content="取消" placement="top">
                    <el-button v-if="scope.row.systemSetting" circle type="info" icon="el-icon-more" @click="onClick(scope.row,scope.$index,false)" />
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
          </el-form>
        </el-row>
      </el-main>
    </el-container>
    <edit-dictionary-type ref="editDicTypeComp" :pshow="editDicComp.show" @on-show-change="onEditDicTypeCompShowChange" @on-save-success="getDictionaryTypeTree" />
  </el-container>
</template>
<style lang="scss">
  .dicMng {
    height: 100%;
    .el-header {
      height: 45px !important;
      padding:0 !important;
    }
    .el-table--scrollable-y .el-table__body-wrapper{height: auto!important;}
    .dicMng-rightMain {
      padding: 0 20px !important;
      height: 100% !important;
      .dicMng-rightMain-typeName {
        display:inline-block;
        min-width:100px;
        font-weight: 700;
      }
    }
    .templateTree .tree-message {
      margin-left: 5px;
      color: #606266 !important;
    }
  }
</style>
<script>
import tree from '../../../components/tree/tree'
import editDictionaryType from './editDictionaryType'
import { getDicTypeTree, getDicList, createOrUpdateDicItem, deleteDicType, deleteDicItem } from '@/api/publicBase/dictionaryMng'
import { tableMixin } from '../../../mixin/commTable'
import { warnMsg } from '@/utils/messageBox'
export default {
  name: 'DictionaryIndex',
  components: {
    tree,
    'edit-dictionary-type': editDictionaryType
  },

  mixins: [tableMixin],

  data() {
    return {
      search: {
        typeCode: '',
        code: '',
        name: ''
      },
      treeComp: {
        data: [],
        config: {
          children: 'children',
          label: 'typeName',
          id: 'typeCode',
          pid: 'parentCode',
          uuid: 'id',
          disabled: 'disabled',
          message: 'message'
        },
        value: '', // 选择的id,用于提交或修改字典项
        currName: '' // 当前选中的字典类型
      },
      tableForm: {
        rules: {
          code: { required: true, message: '请输入字典编码', trigger: 'blur' },
          name: { required: true, message: '请输入字典名称', trigger: 'blur' }
        },
        data: [],
        updateOldRow: {} // 修改之前的列
      },
      editDicComp: {
        show: false
      }
    }
  },
  created() {
    this.getDictionaryTypeTree()
  },
  methods: {
    // 删除字典项
    deleteDicItem(id) {
      deleteDicItem({ id: id }).then(res => {
        if (res.success) { this.getTableList(this.treeComp.value) }
      })
    },
    // 删除字典类型
    deleteDicType() {
      if (this.$refs.tree.$refs.tree.getCheckedNodes(true, false).length === 0) {
        warnMsg('请选择要删除的字典类型')
        return
      }
      this.$confirm('是否删除该字典类型?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDicType({ input: this.$refs.tree.$refs.tree.getCheckedNodes(true, false)[0].id }).then(res => {
          if (res.success) { this.getDictionaryTypeTree() }
        }
        )
      }).catch(() => {

      })
    },
    //
    onEditDicTypeCompShowChange(val) {
      this.editDicComp.show = val
    },
    // 添加字典类型
    addDicType() {
      this.editDicComp.show = true
      this.$refs.editDicTypeComp.getOrganizationTree()
    },
    // 修改字典类型
    editDicType() {
      if (this.$refs.tree.$refs.tree.getCheckedNodes(false, false).length === 0) {
        warnMsg('请选择要修改的字典类型')
        return
      }

      if (this.$refs.tree.$refs.tree.getCheckedNodes(false, false).length > 1) {
        warnMsg('不能选择多个字典类型进行修改')
        return
      }

      this.editDicComp.show = true
      this.$refs.editDicTypeComp.getOrganizationTree()
      this.$refs.editDicTypeComp.getSingleDicItem(this.$refs.tree.$refs.tree.getCheckedNodes(false, false)[0].id)
    },
    // 获取字典类型树
    getDictionaryTypeTree() {
      getDicTypeTree().then(res => {
        if (res.success) this.treeComp.data = res.result
      })
    },
    // 获取字典项列表
    getTableList(code) {
      const data = {
        typeCode: code || this.search.typeCode,
        code: code ? '' : this.search.code,
        name: code ? '' : this.search.name,
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize
      }
      this.tableForm.data = []
      this.table.loading = false
      getDicList(data).then(res => {
        this.table.loading = true
        this.page.total = res.result.totalCount
        if (res.success) {
          this.tableForm.data = res.result.items
          this.tableForm.data.forEach(item => {
            this.$set(item, 'isSet', false)
            this.$set(item, 'popShow', false)
          })
        }
      })
    },
    // 单击树节点事件
    onNodeClick(node) {
      if (!(node.children && node.children.length > 0)) {
        this.treeComp.value = node.typeCode
        this.treeComp.currName = node.typeName
        this.getTableList(node.typeCode)
      }
    },

    // 添加行
    addTableRow() {
      if (this.treeComp.value === '') {
        warnMsg('请先选择要添加的字典类型')
        return
      }
      if (this.tableForm.data.filter(x => x.isSet).length > 0) {
        warnMsg('请提交后再添加行')
        return
      }
      const newData = {
        id: '',
        code: '',
        name: '',
        remarks: '',
        isSet: true
      }

      // this.sensitiveList=[...this.sensitiveList,newData];
      this.tableForm.data.unshift(newData)
      this.$refs.table.bodyWrapper.scrollTop = 0
    },

    onClick(row, index, flag) {
      const _this = this
      for (const item of this.tableForm.data) {
        if (item.isSet && item.id != row.id) {
          this.$message.warning('请先保存当前编辑项')
          return false
        }
      }

      // 取消操作
      if (!flag) {
        if (row.id == '') this.tableForm.data.splice(index, 1)
        else {
          row['code'] = this.tableForm.updateOldRow['code']
          row['name'] = this.tableForm.updateOldRow['name']
          row['remarks'] = this.tableForm.updateOldRow['remarks']
        }
        row.isSet = !row.isSet
      } else {
        if (row.isSet) {
          // 保存
          this.$refs['form'].validate((valid, tableForm) => {
            if (valid) {
              const data = {
                id: row['id'],
                code: row['code'],
                name: row['name'],
                remarks: row['remarks'],
                baseKey_ValueTypeCode: this.treeComp.value
              }
              if (row.id == '') {
                data.systemSetting = false
                // 新增
                createOrUpdateDicItem({ baseKey_Value: data }).then(res => {
                  if (res.success) {
                    _this.getTableList(this.treeComp.value)
                  }
                })
              } // 修改
              else {
                data.systemSetting = row['systemSetting']
                createOrUpdateDicItem({ baseKey_Value: data }).then(res => {
                  if (res.success) {
                    _this.getTableList(this.treeComp.value)
                  }
                })
              }
            } else return false
          })
        } // 修改
        else {
          this.tableForm.updateOldRow = { ...row }
          row.isSet = true
        }
      }
    }
  }
}
</script>
