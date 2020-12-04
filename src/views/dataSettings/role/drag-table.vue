<template>
  <div class="app-container">
    <el-row :gutter="100" style="margin-bottom:10px;">
      <el-col :span="4">
        <el-input v-model="search.roleName" placeholder="角色名称" size="mini" clearable />
      </el-col>
      <el-col :span="18">
        <el-button type="primary" size="mini" @click="getTableList()">搜索</el-button>
        <el-button v-if="checkBtnPeimission(rolePage.addRole.permission)" type="primary" size="mini" @click="addTableRow()">新增角色</el-button>
        <!-- <el-button type="primary" size="mini" @click="skip()">跳转</el-button> -->
      </el-col>
    </el-row>
    <el-row>
      <el-form ref="form" :rules="tableForm.rules" :model="tableForm" style="height:calc(100% - 15px)">
        <el-table
          ref="table"
          v-loading="table.loading"
          :data="tableForm.data"
          border
          size="mini"
          style="width:100%;height: 660px;overflow-y: auto;"
        >
          <el-table-column type="index" align="center" label="序号" width="50px">
            <template slot-scope="scope">
              {{ countIndex(scope.$index) }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="角色名称">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-form-item :prop="'data.' + scope.$index + '.displayName'" :rules="tableForm.rules.displayName">
                  <el-input v-model.trim="scope.row.displayName" size="mini" maxlength="50" />
                </el-form-item>
              </span>
              <span v-else>{{ scope.row.displayName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creationTime" align="center" label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.creationTime|parseTime() }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="20%">
            <template slot-scope="scope" style="align-text:center;">

              <el-tooltip content="授权" placement="top">
                <el-button circle type="success" icon="el-icon-info" @click="openRoleAuth(scope.row)" />
              </el-tooltip>
              <el-tooltip :content="scope.row.isSet?'保存':'编辑'" placement="top">
                <el-button v-if="checkBtnPeimission(rolePage.updateRole.permission)" circle type="primary" icon="el-icon-edit" @click="onClick(scope.row,scope.$index,true)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button v-if="checkBtnPeimission(rolePage.deleteRole.permission)" circle type="danger" icon="el-icon-error" @click="removeRole(scope.row)" />
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
    <role-auth ref="roleAuth" :pshow="roleAuthComp.show" :p-role-i-d="roleAuthComp.roleId" @on-show-change="onRoleAuthShowChange" />
  </div>
</template>
<style lang="scss" scoped>
  .roleMng{
    padding:20px
  }
</style>
<script>
import {
  getRoleList,
  insertRole,
  updateRoleName,
  deleteRoleById,
  getRoleSelectList
} from '@/api/user/roles'
import { parseTime } from '@/utils'
import roleAuth from './roleAuth'
import { tableMixin } from '../../../mixin/commTable'
import { checkBtnPeimission, rolePage } from '@/utils/btnRole'
export default {
  name: 'RoleManageIndex',
  components: {
    roleAuth
  },
  mixins: [tableMixin],
  data() {
    // console.log(table.data)
    return {
      rolePage,
      search: {
        roleName: ''
      },
      tableForm: {
        rules: {
          displayName: { required: true, message: '请输入角色名称', trigger: 'blur' }
        },
        data: [],
        updateOldRow: {} // 修改之前的列
      },

      roleAuthComp: {
        roleId: '',
        show: false
      }
    }
  },
  created() {
    // console.log(parseTime(Date().toString(),'{y}-{m}-{d} {h}:{i}:{s}'))
    this.getTableList()
  },
  methods: {
    checkBtnPeimission,
    // skip(){
    //     this.$router.push({name: 'userManageIndex',params:{id: '123'}})
    // },
    // 打开授权对话框
    openRoleAuth(row) {
      this.roleAuthComp.show = true
      this.roleAuthComp.roleId = row.id.toString()
      this.$refs.roleAuth.getPermissionsByRoleId(row.id)
      // this.$refs.roleAuth.initData()
    },
    onRoleAuthShowChange(val) {
      this.roleAuthComp.show = val
    },

    // 获取角色列表
    getTableList() {
      const data = {
        FilterText: this.search.roleName,
        MaxResultCount: this.page.pageSize,
        SkipCount: (this.page.currentPage - 1) * this.page.pageSize
      }
      this.table.loading = true
      this.tableForm.data = []
      getRoleList(data).then(res => {
        this.table.loading = false
        if (res.success) {
          this.tableForm.data = res.result.items
          this.tableForm.data.forEach(item => {
            this.$set(item, 'isSet', false)
            this.$set(item, 'popShow', false)
          })
          this.page.total = res.result.totalCount
        }
      })
    },
    // 添加行
    addTableRow() {
      if (this.tableForm.data.filter(x => x.isSet).length > 0) {
        this.$message.warning('请提交后再添加行')
        return
      }
      const newData = {
        id: '',
        isDefault: false,
        displayName: '',
        isSet: true
      }

      // this.sensitiveList=[...this.sensitiveList,newData];
      this.tableForm.data.unshift(newData)
      this.$refs.table.bodyWrapper.scrollTop = 0
    },
    // 删除行
    removeTableRow(row) {
      row.popShow = true
    },
    // 删除角色
    removeRole(row) {
      deleteRoleById({ id: row.id }).then(res => {
        if (res.success) {
          row.popShow = false
          this.getTableList()
        }
      })
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
        if (row.id == '') { this.tableForm.data.splice(index, 1) } else {
          row['isDefault'] = this.tableForm.updateOldRow['isDefault']
          row['displayName'] = this.tableForm.updateOldRow['displayName']
        }
        row.isSet = !row.isSet
      } else {
        if (row.isSet) { // 保存
          this.$refs['form'].validate((valid, tableForm) => {
            if (valid) {
              const data = {
                id: row['id'],
                isDefault: row['isDefault'],
                displayName: row['displayName']
              }
              if (row.id == '') // 新增
              {
                const d = {
                  grantedPermissionNames: [],
                  role: data
                }
                insertRole(d).then(res => {
                  if (res.success) {
                    _this.getTableList()
                  }
                })
              } else // 修改
              {
                updateRoleName(data).then(res => {
                  if (res.success) {
                    _this.getTableList()
                  }
                })
              }
            } else { return false }
          })
        } else // 修改
        {
          this.tableForm.updateOldRow = { ...row }
          row.isSet = true
        }
      }
    }
  }
}
</script>
