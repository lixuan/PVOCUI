<template>
  <div class="app-container userMng">
    <el-form size="mini">
      <el-row style="margin-bottom:10px;">
        <el-col :span="5">
          <el-form-item label="用户名：" prop="">
            <el-input v-model="search.name" placeholder="用户名" style="width:70%;" size="mini" clearable />
            <!-- <el-input size="mini" v-model="form.userName" placeholder="请输入登陆账户"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="所属部门：" prop="orgId" style="position:relative;">
            <tree-select ref="chooseEquNode" :choosed-equipment-node="choosedTreeNode" style="width:70%" @on-treeShow-change="ontreeShowChange" />
            <div v-show="treeComp.show" class="editOrgComp-row-tree">
              <tree
                ref="treeComp"
                :p-tree-data="treeComp.data"
                :p-choosed-node="treeComp.choosedTreeNodeId"
                @on-nodeChange="onNodeClick"
                @on-outside-click="onClickOutSide"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="所属角色：" prop="">
            <el-select v-model="search.roleIds" multiple collapse-tags placeholder="请选择角色" style="width:70%">
              <el-option v-for="item in roleList" :key="item.id" :label="item.displayName" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="" prop="">
            <el-button type="primary" size="mini" @click="onSearchBefore()">搜索</el-button>
            <el-button v-if="checkBtnPeimission(userPage.addUser.permission)" type="primary" size="mini" @click="openAddUserComp()">新增用户</el-button>
            <el-button v-if="checkBtnPeimission(userPage.deleteUser.permission)" type="primary" size="mini" @click="onBatchDelete()">批量删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="height:calc(100% - 110px)">
      <el-table
        v-loading="table.loading"
        :cell-class-name="tableRowClassName"
        :data="userTableList"
        :row-key="getRowKeys"
        size="mini"
        style="width:100%;height: 660px;overflow-y: auto;"
        border
        stripe
        ref="table"
        highlight-current-row
        fit
        :cell-style="{padding: '5px'}"
        @selection-change="onSelectChange"
      >
        <!-- <el-table-column type="index" align="center" label="序号">
            <template slot-scope="scope">
                {{countIndex(scope.$index)}}
            </template>
        </el-table-column> -->
        <el-table-column :reserve-selection="true" type="selection" width="40" />
        <el-table-column align="center" prop="name" label="姓名" show-overflow-tooltip min-width="5%" />
        <el-table-column align="center" prop="userName" label="用户名" show-overflow-tooltip min-width="5%" />
        <el-table-column align="center" prop="companyWorkNo" label="集团编号" show-overflow-tooltip min-width="6%" />
        <el-table-column align="center" prop="surname" label="公司编号" show-overflow-tooltip min-width="6%" />
        <el-table-column align="center" prop="dpts" label="部门" show-overflow-tooltip min-width="10%" />
        <el-table-column align="center" prop="roles" label="角色" show-overflow-tooltip min-width="10%" />
        <el-table-column align="center" prop="telNumber" label="电话" show-overflow-tooltip min-width="7%" />
        <el-table-column align="center" prop="phoneNumber" label="手机" show-overflow-tooltip min-width="8%" />
        <el-table-column align="center" prop="emailAddress" label="邮箱" show-overflow-tooltip min-width="10%" />
        <el-table-column align="center" prop="sex" label="性别" show-overflow-tooltip min-width="5%">
          <template slot-scope="scope">
            {{ scope.row.sex == 0 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isActive" label="锁定状态" show-overflow-tooltip min-width="5%" />
        <el-table-column align="center" prop="creationTime" label="创建时间" show-overflow-tooltip min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.creationTime|parseTime('{y}-{m}-{d}') }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" min-width="13%">
          <template slot-scope="scope">
            <el-tooltip content="重置密码" placement="top">
              <el-button circle type="success" icon="el-icon-info" @click="ResetPassword(scope.row.id)" />
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <el-button v-if="checkBtnPeimission(userPage.updateUser.permission)" circle type="primary" icon="el-icon-edit" @click="openUpdateUserComp(scope.row)" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button v-if="checkBtnPeimission(userPage.deleteUser.permission)" circle type="danger" icon="el-icon-error" @click="deleteSingleUser(scope.row.id)" />
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
    <create-user ref="createUserComp" :pshow="createUserComp.show" @on-show-change="onCreateUserCompShowChange" @on-save-success="onSaveSuccess" />
  </div>
</template>
<style lang="scss">
  .userMng{
    .chsEqp{
      width:100%;
      .textPromt{float:left;}
      .chsEqp-select{height:26px;line-height: 24px;}
      i{float: right;margin-top: 6px;}
    }
    .editOrgComp-row-tree{
      position:absolute;
      top:40px;
      left:70px;
      background-color: #fff;
      z-index: 10;
      padding:0;
      margin:0;
      width:300px;
      height:450px;
      clear: both;

    }
  }
</style>
<script>
import { tableMixin } from '../../../mixin/commTable'
import { getAllUserList, deleteBatchUser, ResetPassword } from '@/api/user/user'
import { warnMsg } from '@/utils/messageBox'

import createUser from './createUser'

import treeSelect from '../../../components/treeSelect/treeSelect'
import tree from '../../../components/tree/tree'

import { getRoleSelectList } from '@/api/user/roles'
import { getOrganizatonTreeNoUsers } from '@/api/user/organization'
import { getCookie } from '@/utils/cookie'
import { checkBtnPeimission, userPage } from '@/utils/btnRole'
export default {
  name: 'UserManagement',
  components: {
    createUser,
    treeSelect,
    tree
  },
  mixins: [tableMixin],
  data() {
    return {
      userPage,
      userTableList: [],
      search: {
        name: '',
        roleIds: [],
        orgId: ''
      },
      roleList: [],
      treeComp: {
        show: false,
        data: []
      },
      choosedTreeNode: [],
      createUserComp: {
        show: false
      }
    }
  },
  created() {
    this.getTableList()
    this.GetRoleList()
    this.getOrganizationTree()
  },
  methods: {
    checkBtnPeimission,
    getRowKeys(row) {
      return row.id.toString()
    },
    // 搜索
    onSearchBefore() {
      const data = {
        permission: this.choosedTreeNode,
        role: this.search.roleIds.map(item => parseInt(item)),
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        filter: this.search.name
      }
      this.tableData = []

      this.table.loading = true
      getAllUserList(data).then(res => {
        this.table.loading = false
        if (res.success) {
          this.userTableList = res.result.items
          this.userTableList.forEach(item => {
            this.$set(item, 'popShow', false)
            this.$set(item, 'pop1Show', false)
          })
          this.page.total = res.result.totalCount
        }
      })
    },
    // 获取用户列表
    getTableList() {
      const data = {
        permission: this.choosedTreeNode,
        role: this.search.roleIds.map(item => parseInt(item)),
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        filter: this.search.name
      }
      this.tableData = []

      this.table.loading = true
      getAllUserList(data).then(res => {
        this.table.loading = false
        if (res.success) {
          this.userTableList = res.result.items
          this.userTableList.forEach(item => {
            this.$set(item, 'popShow', false)
            this.$set(item, 'pop1Show', false)
          })
          this.page.total = res.result.totalCount
        }
      })
    },
    // 打开添加用户窗口
    openAddUserComp() {
      this.createUserComp.show = true
      this.$refs.createUserComp.pageType = 'insert'
      this.$refs.createUserComp.GetRoleList()
      this.$refs.createUserComp.getOrganizationTree()
    },
    // 打开修改用户窗口
    openUpdateUserComp(row) {
      this.createUserComp.show = true
      this.$refs.createUserComp.pageType = 'update'
      this.$refs.createUserComp.getUserInfoById(row.id)
      this.$refs.createUserComp.GetRoleList()
      this.$refs.createUserComp.getOrganizationTree()
    },
    onCreateUserCompShowChange(val) {
      this.createUserComp.show = val
    },

    // 添加或修改用户成功事件
    onSaveSuccess() {
      this.getTableList()
    },
    // 重置密码
    ResetPassword(id) {
      ResetPassword({ id: id }).then(res => {
      })
    },
    // 批量删除
    onBatchDelete() {
      if (this.table.choosedRow.length === 0) {
        warnMsg('请选择要删除的人员')
        return
      }
      this.$confirm('是否确定删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(({ value }) => {
        const arr = this.table.choosedRow.map(item => item.id)
        deleteBatchUser(arr).then(res => {
          this.batchDeleteSearch()
          this.$refs.table.clearSelection()
          // this.getTableList()
        })
      })
    },
    // 删除单个用户
    deleteSingleUser(id) {
      deleteBatchUser([id]).then(res => {
        this.getTableList()
      })
    },

    // 获取角色列表
    GetRoleList() {
      getRoleSelectList().then(res => {
        if (res.success) {
          this.roleList = res.result
        }
      })
    },
    // 获取组织树
    getOrganizationTree() {
      getOrganizatonTreeNoUsers().then(res => {
        console.log(res)
        if (res.success) {
          this.treeComp.data = res.result
          console.log(this.treeComp.data)
        }
      })
    },
    // 树数据回调事件
    onNodeClick(clickNode) // choosedNodeID
    {
      // this.form.parentId = clickNode.nodeId
      this.choosedTreeNode = clickNode
    },
    //
    onClickOutSide() {
      if (this.treeComp.show === true) {
        this.treeComp.show = false
        this.$refs.chooseEquNode.iconChange()
      }
    },
    // 单击树选择框控件
    ontreeShowChange(val) {
      this.treeComp.show = val
    }

  }

}
</script>
