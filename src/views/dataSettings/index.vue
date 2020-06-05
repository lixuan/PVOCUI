<template>
  <div class="app-container">
    <el-input v-model="listQuery.name" placeholder="用户名称" class="filter-item" style="width: 220px" @keyup.enter.native="handleFilter" />
    <el-input v-model="listQuery.type" placeholder="所属部门" class="filter-item" style="width: 220px" @keyup.enter.native="handleFilter" />
    <el-select v-model="listQuery.roleName" placeholder="所属角色" clearable style="width: 150px" class="filter-item" @change="handleFilter">
      <el-option v-for="item in roleList" :key="item" :label="item" :value="item" />
    </el-select>
    <el-button type="primary" @click="handleFilter">
      搜索
    </el-button>
    <el-button type="success" @click="handleAddRole">
      新增用户
    </el-button>
    <el-button type="danger" @click="handleAddRole">
      批量删除
    </el-button>
    <el-table
      ref="multipleTable"
      :data="rolesList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      tooltip-effect="dark"
      style="width: 100%;margin:30px 0;"
      @selection-change="handleSelectionChange"
    >
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

      <el-table-column align="center" label="操作" min-width="18%">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="primary" size="small" @click="handleDelete(scope)">
            重置密码
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            删除
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
        :total="rolesList.length"
        prev-text="上一页"
        next-text="下一页"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑权限':'编辑权限'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="用户名称">
          <el-input v-model="role.name" placeholder="用户名称" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="role.state" placeholder="" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="role.describe"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder=""
          />
        </el-form-item>
        <el-form-item label="目录" />
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          取消
        </el-button>
        <el-button type="primary">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      role: {
        id: '',
        name: '',
        creationTime: ''
      },
      rolesList: [
        {
          id: '1',
          name: '张三',
          userName: '张三儿',
          companyWorkNo: '119',
          surname: '131',
          dpts: '部门',
          roles: '超级管理员',
          telNumber: '15111111111',
          phoneNumber: '15111111111',
          emailAddress: 'qq@qq.com',
          sex: '男',
          isActive: '未锁定',
          creationTime: '2020-02-02'
        }
      ],
      roleList: ['角色1', '角色2', '角色3', '角色4'],
      listQuery: { // 搜索条件
        page: 1,
        limit: 20,
        type: '',
        name: '',
        roleName: ''
      },
      currentPage: 1, // 默认显示页面为1
      pagesize: 20, // 每页的数据条数
      dialogVisible: false,
      dialogType: 'new',
      multipleSelection: []
    }
  },
  computed: {},
  created() {},
  methods: {
    /**
     * 点击了搜索
     */
    handleFilter() {
      this.currentPage = 1
      console.log('发生了改变')
    },
    handleAddRole() {
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    handleEmpower(scope) {},
    handleDelete({ $index, row }) {},
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
     * 点击了第几页
     */
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      // /*console.log(this.currentPage) */
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }
    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>

