<template>
  <div class="editOrgComp">
    <el-dialog
      v-dialogDrag
      :title="type==='insert' ? '新增组织信息' : '编辑组织信息'"
      :visible.sync="windowShow"
      width="576px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="ruleForm" size="mini" :model="form" :rules="form.rules" label-width="110px">
        <el-row>
          <el-col :span="18">
            <el-form-item label="上级部门：">
              <tree-select ref="chooseEquNode" :choosed-equipment-node="choosedTreeNode" @on-treeShow-change="ontreeShowChange" />
              <div v-show="treeComp.show" class="editOrgComp-row-tree">
                <tree
                  ref="treeComp"
                  :p-check-strictly="true"
                  :radio="true"
                  :p-tree-default-props="treeComp.treeConfig"
                  :p-tree-data="treeComp.data"
                  :p-choosed-node="treeComp.choosedTreeNodeId"
                  @on-nodeChange="onNodeClick"
                  @on-outside-click="onClickOutSide"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item prop="name" label="部门名称：">
              <el-input v-model="form.name" size="small" maxlength="20" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="windowShow = false">取 消</el-button>
        <el-button type="primary" size="small" @click="save()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<style lang="scss">
    .editOrgComp{
        .chsEqp{
            height:32px;width:100%;
            .textPromt{float:left;height:30px;line-height:30px;}
            .chsEqp-select{height:30px;line-height: 30px;}
            i{float: right;margin-top: 8px;}
        }
        .editOrgComp-row-tree{
                position:absolute;
                top:40px;
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
import treeSelect from '../../../components/treeSelect/treeSelect'
import tree from '../../../components/tree/tree'
import { getOrganizatonTreeNoUsers, createOrganizaton, getOrgDetailById, updateOrganizaton } from '@/api/user/organization'
export default {
  components: {
    treeSelect,
    tree
  },
  props: {
    // pForm:{
    //     type: Object,
    //     default: function () {
    //         return {}
    //     }
    // },
    pshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type: 'insert',
      windowShow: this.pshow,
      form: {
        curOrgId: '',
        name: '',
        parentId: '-1',
        rules: {
          // parentId: [
          //     { required: true, message: '请选择上级组织', trigger: 'change' },
          // ],
          name: [
            { required: true, message: '请输入部门名称', trigger: 'blur' }
          ]
        }
      },

      treeComp: {
        show: false,
        data: [],
        choosedTreeNodeId: [] // 回显树节点ID
      },
      choosedTreeNode: []
    }
  },
  watch: {
    pshow(newValue, oldValue) {
      this.windowShow = newValue
    },
    windowShow(newValue, oldValue) {
      if (this.$refs['ruleForm']) { this.$refs['ruleForm'].resetFields() } // 清空验证

      if (!newValue) // 窗口关闭
      {
        this.form.name = ''
        this.form.parentId = '-1'
        this.choosedTreeNode = []
        this.$emit('on-show-change', newValue)
      }
    }
  },
  methods: {
    // 单击树选择框控件
    ontreeShowChange(val) {
      this.treeComp.show = val
    },
    // 树数据回调事件
    onNodeClick(clickNode) // choosedNodeID
    {
      this.form.parentId = clickNode.length > 0 ? clickNode[0].nodeId : '-1'
      this.choosedTreeNode = clickNode
    },
    // 获取树数据
    getOrganizationTree() {
      getOrganizatonTreeNoUsers().then(res => {
        if (res.success) { this.treeComp.data = res.result }
        this.disabledchooseCurOrg(this.treeComp.data)
        //
      })
    },

    // 修改当前修改部门树数据不能被选中(A节点上级不能指定A)
    disabledchooseCurOrg(nodes) {
      nodes.forEach(node => {
        if (node.nodeId == this.form.curOrgId) { node.disabled = true }
        if (node.children && node.children.length > 0) { return this.disabledchooseCurOrg(node.children) }
      })
    },

    // 根据部门ID获取部门详情
    getOrgDetailById(id) {
      this.form.curOrgId = id
      getOrgDetailById({ id: id }).then(res => {
        if (res.success) {
          this.form.name = res.result.unitName
          this.form.parentId = res.result.parentId || '-1'
          this.choosedTreeNode = res.result.parentName ? [{ nodeName: res.result.parentName }] : []

          this.$nextTick(() => {
            this.treeComp.choosedTreeNodeId = [res.result.parentId]
          })
        }
      })
    },
    //
    onClickOutSide() {
      if (this.treeComp.show == true) {
        this.treeComp.show = false
        this.$refs.chooseEquNode.iconChange()
      }
    },
    // 提交部门信息
    save() {
      const _this = this
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 新建
          if (this.type === 'insert') {
            const data = {
              parentId: _this.form.parentId,
              displayName: _this.form.name
            }
            createOrganizaton(data).then(res => {
              if (res.success) {
                // 关闭信息框，刷新主页面树
                _this.windowShow = false
                _this.$emit('on-save-success')
              }
            })
          } else // 修改
          {
            const data = {
              id: _this.form.curOrgId,
              parentId: _this.form.parentId,
              displayName: _this.form.name
            }
            updateOrganizaton(data).then(res => {
              if (res.success) {
                // 关闭信息框，刷新主页面树
                _this.windowShow = false
                _this.$emit('on-save-success')
              }
            })
          }
        }
      })
    }

  }
}
</script>
