<template>
  <el-container class="orgMng">
    <el-aside style="padding:20px 0px 20px 20px;">

      <tree ref="tree" :p-check-strictly="true" :p-tree-data="treeComp.data" @on-node-click="onNodeClick" />

    </el-aside>
    <el-main class="height:100%">
      <el-header style="height:30px;">
        <el-button v-if="checkBtnPeimission(orgPage.addOrg.permission)" type="primary" size="small" @click="openInsertOrganization()">{{ orgPage.addOrg.name }}</el-button>
        <el-button v-if="checkBtnPeimission(orgPage.updateOrg.permission)" type="primary" size="small" @click="openUpdateOrganization()">{{ orgPage.updateOrg.name }}</el-button>
        <el-button v-if="checkBtnPeimission(orgPage.deleteOrg.permission)" type="primary" size="small" @click="deleteOrganization()">{{ orgPage.deleteOrg.name }}</el-button>
        <el-button v-if="checkBtnPeimission(orgPage.addUser.permission)" type="primary" size="small" @click="openInsertUser()">{{ orgPage.addUser.name }}</el-button>

      </el-header>
      <el-main>
        <el-row style="">
          <el-table
            v-loading="table.loading"
            :data="tableData"
            size="mini"
            :row-key="getRowKeys"
            stripe
            style="width:100%;height: 660px;overflow-y: auto;"
            @selection-change="onSelectChange"
          >
            <el-table-column type="index" align="center" label="序号" min-width="3%">
              <template slot-scope="scope">
                {{ countIndex(scope.$index) }}
              </template>
            </el-table-column>
            <el-table-column prop="name" align="left" label="人员名称" />
            <el-table-column prop="workNo" align="center" label="工号" />
            <el-table-column prop="email" align="center" label="个人邮箱" />
            <el-table-column prop="unitNames" align="center" label="所属部门" />
          </el-table>
        </el-row>
        <el-row>
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

      </el-main>

    </el-main>
    <edit-organization ref="editOrganizatonComp" :pshow="editOrganizationComp.show" @on-show-change="closeOrgCompShowChange" @on-save-success="getOrganizatonTreeNoUsers" />
    <add-user ref="addUserComp" :p-org-id="addUserComp.orgId" :pshow="addUserComp.show" @on-refreshOrgLisg="getOrganizatonTreeNoUsers" @on-show-change="closeAddUserCompShowChange" />
  </el-container>
</template>
<style lang="scss">
  .orgMng{
    height:100%;
    .templateTree .tree-message{margin-left:5px ;color:#606266 !important;}
    .orgMng-left{
      width:300px;

    }
  }
  .el-table--scrollable-y .el-table__body-wrapper{height: auto!important;}
</style>
<script>
import tree from '../../../components/tree/tree'
import editOrganization from './editOrganization'
import addUser from '../user/addUser'
import { getUserListByOrgId } from '@/api/user/user'
import { tableMixin } from '../../../mixin/commTable'
import { getOrganizatonTreeNoUsers, deleteOrganizaton } from '@/api/user/organization'
import { warnMsg } from '@/utils/messageBox'
import { checkBtnPeimission, orgPage } from '@/utils/btnRole'
export default {
  name: 'OrganizationIndex',
  components: {
    tree,
    editOrganization,
    addUser
  },
  mixins: [tableMixin],

  data() {
    return {
      orgPage,
      tableData: [],
      editOrganizationComp: {
        show: false
      },
      addUserComp: {
        show: false,
        orgId: ''
      },
      treeComp: {
        data: [],
        currNodeID: ''
      }
    }
  },
  mounted() {
    this.getOrganizatonTreeNoUsers()
  },
  created() {

  },
  methods: {
    checkBtnPeimission,

    onNodeClick(node) {
      this.page.currentPage = 1
      this.treeComp.currNodeID = node.nodeId
      this.getTableList()
    },
    getRowKeys(row) {
      return row.id.toString()
    },

    // 关闭添加部门弹出框
    closeOrgCompShowChange(val) {
      this.editOrganizationComp.show = val
    },
    // 关闭添加人员弹出框
    closeAddUserCompShowChange(val) {
      this.addUserComp.show = val
    },
    // 打开添加人员弹出框
    openInsertUser() {
      if (this.$refs.tree.$refs.tree.getCheckedNodes(true, false).length === 0) {
        warnMsg('请选择添加人员的部门')
        return
      }
      if (this.$refs.tree.$refs.tree.getCheckedNodes(true, false).length > 1) {
        warnMsg('不能选择多个部门进行人员添加')
        return
      }

      this.addUserComp.show = true
      this.addUserComp.orgId = this.$refs.tree.$refs.tree.getCheckedNodes(true, false)[0].nodeId.toString()
      this.$nextTick(() => {
        this.$refs.addUserComp.getTableList()
      })
    },
    // 打开新建部门
    openInsertOrganization() {
      this.$refs.editOrganizatonComp.type = 'insert'
      this.editOrganizationComp.show = true
      // 获取组织树
      this.$refs.editOrganizatonComp.getOrganizationTree()
    },
    // 打开修改部门
    openUpdateOrganization() {
      if (this.$refs.tree.$refs.tree.getCheckedNodes(false, false).length === 0) {
        warnMsg('请选择要修改的部门')
        return
      }

      if (this.$refs.tree.$refs.tree.getCheckedNodes(false, false).length > 1) {
        warnMsg('不能选择多个部门进行修改')
        return
      }
      this.$refs.editOrganizatonComp.type = 'update'
      // this.$refs.editOrganizatonComp.form.name=''
      this.editOrganizationComp.show = true
      // 获取组织树
      this.$refs.editOrganizatonComp.getOrganizationTree()

      this.$refs.editOrganizatonComp.getOrgDetailById(this.$refs.tree.$refs.tree.getCheckedNodes(false, false)[0].nodeId)
    },
    // 删除组织机构
    deleteOrganization() {
      if (this.$refs.tree.$refs.tree.getCheckedNodes(true, false).length === 0) {
        warnMsg('请选择要删除的部门')
        return
      }
      this.$confirm('是否删除该部门?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrganizaton({ id: this.$refs.tree.$refs.tree.getCheckedNodes(true, false)[0].nodeId }).then(res => {
          if (res.success) { this.getOrganizatonTreeNoUsers() }
        }
        )
      }).catch(() => {

      })
    },

    // 获取组织机构树
    getOrganizatonTreeNoUsers() {
      this.$refs.tree.loading = true
      getOrganizatonTreeNoUsers().then(res => {
        if (res.success) { this.treeComp.data = res.result }
        this.$refs.tree.loading = false
      }
      )
    },

    // 获取用户列表
    getTableList() {
      this.tableData = []
      this.table.loading = true
      const data = {
        organizationUnitId: this.treeComp.currNodeID,
        type: 1,
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        filter: ''
      }
      getUserListByOrgId(data).then(res => {
        this.table.loading = false
        if (res.success) {
          this.tableData = res.result.items
          this.page.total = res.result.totalCount
        }
      })
    }
  }
}
</script>
