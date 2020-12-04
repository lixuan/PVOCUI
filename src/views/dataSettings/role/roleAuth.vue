<template>
  <div class="roleAuth">
    <el-dialog
      v-dialogDrag
      title="授权角色"
      :visible.sync="windowShow"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-input v-model="filterText" size="mini" placeholder="输入关键字进行过滤" />
      <!-- <tree ref="tree" :pTreeData="treeData" ></tree> -->
      <el-scrollbar class="page-component__scroll">
        <el-tree
          ref="roleSourceTree"
          style="padding-top:20px;"
          check-strictly
          :filter-node-method="filterNode"
          :data="treeData"
          show-checkbox

          node-key="id"
          highlight-current
          :default-checked-keys="ids"
          :props="defaultProps"
        />
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="windowShow = false">取 消</el-button>
        <el-button type="primary" size="small" @click="save()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<style lang="scss">
  .roleAuth{
    .el-dialog__body{height:500px;padding:20px;}
  }
</style>
<script>
import { updateRolePermissions, getPermissionsByRoleId } from '@/api/user/roles'
import tree from '../../../components/tree/tree'
import { mapGetters } from 'vuex'
export default {
  props: {
    pRoleID: {
      type: String,
      default: false
    },
    pshow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // permission:function(){
    //     return this.$store.getters.permission
    // },
    ...mapGetters([
      'allRoutes'
    ])
  },
  watch: {
    pshow(newValue, oldValue) {
      this.windowShow = newValue
    },
    windowShow(newValue, oldValue) {
      if (!newValue) // 窗口关闭
      {
        this.$emit('on-show-change', newValue)
      }
    },
    filterText(val) {
      this.$refs.roleSourceTree.filter(val)
    }
  },
  data() {
    return {
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      windowShow: this.pshow,
      treeId: 0,
      permissionArr: [],
      ids: []
    }
  },
  mounted() {

  },
  methods: {
    filterMethod(query, item) {
      return item.name.indexOf(query) > -1
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },

    // 根据角色ID获取权限
    async getPermissionsByRoleId(roleId) {
      const res = await getPermissionsByRoleId({ id: roleId })
      if (res.success) {
        this.permissionArr = res.result.grantedPermissionNames
        this.initData()
      }
      // .then(res => {
      //     if(res.success) {
      //         console.log(res)
      //         this.permissionArr = res.result.grantedPermissionNames
      //     }
      // })
    },

    /**
         * 递归遍历路由生成树数据，获取所拥有权限的菜单id(用于树回显)
         * @list        router.children
         * @curNode     当前要添加的children的节点
         */
    traverseRoutePermissionTree(list, curNode) {
      list.forEach(item => {
        this.treeId++
        // 页面
        const node = (item.children && item.children.length > 0)
          ? { id: this.treeId.toString(), name: item.meta.title, type: 'P', pid: curNode.id || '0', permission: item.meta.roles && item.meta.roles[0], disabled: true }
          : { id: this.treeId.toString(), name: item.meta.title, type: 'P', pid: curNode.id || '0', permission: item.meta.roles && item.meta.roles[0], disabled: false }

        // 获取所拥有权限菜单的id
        if (item.meta.roles) {
          this.permissionArr.some(i => i === item.meta.roles[0]) && this.ids.push(node.id)
        }
        curNode.push(node)

        if (item.children && item.children.length > 0) { // 有下级菜单
          if (item.meta.title === '业务编辑') {
            node.children = []
          } else {
            node.children = []
            this.traverseRoutePermissionTree(item.children, node.children)
          }
          //   node.children = []
          //   this.traverseRoutePermissionTree(item.children,node.children)
          // console.log(item.children)
        } else {
          if (item.btn) { // 按钮
            node.children = []
            // 遍历页面下的按钮
            Object.values(item.btn).forEach(btnItem => {
              this.treeId++
              node.children.push({ id: this.treeId.toString(), name: btnItem.name, type: 'B', pid: node.id, permission: btnItem.permission })

              // 获取所拥有权限按钮的id
              this.permissionArr.some(i => i === btnItem.permission) && this.ids.push(this.treeId.toString())
            })
          }
        }
      })
    },
    // 初始化树数据
    initData() {
      this.treeData = []
      this.traverseRoutePermissionTree(this.allRoutes, this.treeData)
    },
    // 保存权限
    save() {
      const nodeList = this.$refs.roleSourceTree.getCheckedNodes(false, false)
      const data = {
        id: this.pRoleID,
        grantedPermissionNames: nodeList.map(item => item.permission)
      }
      updateRolePermissions(data).then(res => {
        if (res.success) {
          this.windowShow = false
        }
      })
    }
  }
}
</script>
