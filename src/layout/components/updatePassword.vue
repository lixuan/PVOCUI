<template>
  <div class="createUser">
    <el-dialog
      v-dialogDrag
      title="修改密码"
      :visible.sync="windowShow"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="ruleForm" size="mini" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="旧密码：" prop="oldpass">
              <el-input v-model="form.oldpass" type="password" maxlength="10" placeholder="请输入旧密码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="pageType!='update'">
          <el-col :span="24">
            <el-form-item label="新密码：" prop="password">
              <el-input v-model="form.password" type="password" maxlength="20" placeholder="请输入新密码" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认密码：" prop="checkPass">
              <el-input v-model="form.checkPass" type="password" maxlength="20" placeholder="请输入确认密码" />
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
.createUser{
  .orgForm{
    .el-form-item__content{
      height:28px;
    }
  }
    .chsEqp{
            width:100%;
            .textPromt{float:left;}
            .chsEqp-select{height:26px;line-height: 24px;}
            i{float: right;margin-top: 6px;}
        }
        .editOrgComp-row-tree{
                position:absolute;
                top:40px;
                left:0;
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
import { getRoleList } from '@/api/user/roles'
import { UpdatePassword } from '@/api/user/user'
import { getOrganizatonTreeNoUsers } from '@/api/user/organization'
import { mobile, telephone, email } from '@/utils/validate'

export default {
  components: {
  },
  props: {
    pshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageType: '', // insert update
      windowShow: this.pshow,
      form: {
        id: '',
        oldpass: '',
        password: '',
        checkPass: ''

      },
      rules: {
        oldpass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码' }
        ],
        checkPass: [
          { required: true, message: '请输入确认密码' },
          { validator: this.validatePass2 }
        ]
      },
      roleList: [],
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
        this.form = {
          id: '',
          oldpass: '',
          password: '',
          checkPass: ''
        }
        this.$emit('update:pshow', false)
      }
    }
  },
  methods: {

    // 校验密码
    // validatePass(rule, value, callback) {
    //     if (!!value && !!this.form.password) {
    //         if(!/(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}/.test(this.form.password)) {
    //             callback(new Error('要同时含有数字和字母，且长度要在8-16位之间'));
    //         }else {
    //             this.$refs.ruleForm.validateField('checkPass');
    //             callback();
    //         }
    //     }
    // },
    // 校验确认密码
    validatePass2(rule, value, callback) {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },

    // 提交
    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const data = {
            oldPassword: this.form.oldpass,
            newPassword: this.form.password
          }
          UpdatePassword(data).then(res => {
            this.windowShow = false
            this.$emit('on-save-success')
          })
        }
      })
    }
  }
}
</script>
