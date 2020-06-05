<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">
      新增角色
    </el-button>
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="id" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限规则" width="220">
        <template slot-scope="scope">
          {{ scope.row.jurisdiction }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="220">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.describe }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            编辑权限
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑权限':'编辑权限'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="id">
          <el-input v-model="role.id" placeholder="" />
        </el-form-item>
        <el-form-item label="角色名">
          <el-input v-model="role.name" placeholder="" />
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
        jurisdiction: '',
        state: '',
        describe: ''
      },
      rolesList: [
        {
          id: '1',
          name: '张三',
          jurisdiction: '张三',
          state: '已启用',
          describe: '超级用户'
        }
      ],
      dialogVisible: false,
      dialogType: 'new'
    }
  },
  computed: {},
  created() {},
  methods: {
    handleAddRole() {
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    handleDelete({ $index, row }) {}
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

