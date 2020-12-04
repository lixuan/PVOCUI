<template>
  <div class="createUser">
    <el-dialog
      v-dialogDrag
      :title="form.id?'编辑港口区域信息':'新增港口区域信息'"
      :visible.sync="windowShow"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="ruleForm"
        v-loading="formLoading"
        size="mini"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="港口标准码：" prop="portCode">
              <el-input
                v-model="form.portCode"
                size="mini"
                maxlength="10"
                placeholder="请输入港口标准码"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域英文代码：" prop="areaCode">
              <el-input
                v-model="form.areaCode"
                size="mini"
                maxlength="20"
                placeholder="请输入英文代码"
                @input="form.areaCode = form.areaCode.toUpperCase()"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="区域英文名称：" prop="areaEnName">
              <el-input
                v-model="form.areaEnName"
                size="mini"
                maxlength="20"
                placeholder="请输入英文名称"
                @input="form.areaEnName = form.areaEnName.toUpperCase()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域中文名称：" prop="areaCnName">
              <el-input v-model="form.areaCnName" size="mini" maxlength="100" placeholder="请输入中文名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="所属码头：" prop="remarks">
              <el-select v-model="form.terminal" multiple placeholder="请选择码头" style="width:100%" filterable>
                <el-option
                  v-for="item in terminalList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="备注：" prop="remarks">
              <el-input
                v-model="form.remarks"
                size="mini"
                maxlength="500"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6}"
                placeholder="请输入备注"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="windowShow = false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" size="small" @click="saveInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.createUser {
  .chsEqp {
    height: 32px;
    width: 100%;
    .textPromt {
      float: left;
      height: 30px;
      line-height: 30px;
    }
    .chsEqp-select {
      height: 30px;
      line-height: 30px;
    }
    i {
      float: right;
      margin-top: 8px;
    }
  }
  .editOrgComp-row-tree {
    position: absolute;
    top: 40px;
    left: 0;
    background-color: #fff;
    z-index: 10;
    padding: 0;
    margin: 0;
    width: 300px;
    height: 450px;
    clear: both;
  }
}
</style>

<script>
import { tableMixin } from '../../../mixin/commTable'
import { getOne2, createOrUpdateInfo2 } from '@/api/publicBase/portArea'
import { getTerminalComboxBox } from '@/api/publicBase/terminalBerth/terminalInfo'
import {
  englishOrCharacter,
  englishOrNumber,
  chineOrCharacter
} from '@/utils/validate'
export default {
  props: {
    pshow: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      pageType: '',
      portInfoCode: '',
      formLoading: false,
      btnLoading: false,
      windowShow: this.pshow,
      terminalList: [],
      value: '',
      form: {
        id: '',
        portCode: '',
        areaCode: '',
        areaEnName: '',
        areaCnName: '',
        remarks: '',
        terminal: ''
      },
      rules: {
        portCode: [
          { required: true, message: '请输入港口标准码', trigger: 'blur' },
          { min: 1, max: 10, message: '长度10位数字', trigger: 'blur' }
        ],
        areaCode: [
          { pattern: englishOrCharacter, message: '只能输入英文字母' },
          {
            required: true,
            message: '请输入港口区域英文代码',
            trigger: 'blur'
          }
        ],
        areaEnName: [
          { pattern: englishOrCharacter, message: '只能输入英文字母' },
          {
            required: true,
            message: '请输入港口区域英文名称',
            trigger: 'blur'
          }
        ],
        areaCnName: [
          { pattern: chineOrCharacter, message: '只能输入中文汉字' },
          { required: true, message: '请输入区域中文名称', trigger: 'blur' }
        ]
      }
    }
  },

  watch: {
    pshow(newValue, oldValue) {
      this.windowShow = newValue
    },

    windowShow(newValue, oldValue) {
      if (this.$refs['ruleForm']) this.$refs['ruleForm'].resetFields() // 清空验证

      if (!newValue) {
        // 窗口关闭
        this.form = {
          id: '',
          portCode: '',
          areaCode: '',
          areaEnName: '',
          areaCnName: '',
          remarks: '',
          terminal: ''
        }
        this.$emit('on-show-change', newValue)
      }
    },
    portInfoCode(newValue, oldValue) {
      this.form.portCode = newValue
    }
  },

  methods: {
    setPortCode(code) {
      this.portInfoCode = code
    },

    // 根据ID 获取港口
    getInfoByID(id) {
      this.formLoading = true
      this.pageType = '编辑港口区域信息'
      getOne2({ id: id })
        .then(res => {
          this.form.id = res.result.portAreaDetailsInfo.id
          this.form.portCode = res.result.portAreaDetailsInfo.portCode
          this.form.areaCode = res.result.portAreaDetailsInfo.areaCode
          this.form.areaEnName = res.result.portAreaDetailsInfo.areaEnName
          this.form.areaCnName = res.result.portAreaDetailsInfo.areaCnName
          this.form.remarks = res.result.portAreaDetailsInfo.remarks
          this.formLoading = false
          // this.form.terminal = res.result.portAreaDetailsInfo.terminal;
        })
        .catch(e => {
          this.formLoading = false
        })
    },
    // 保存或修改港口
    saveInfo() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const msg = this.form.id ? '编辑港口区域' : '新增港口区域'
          this.btnLoading = true
          const data = {
            portAreaDetailsInfo: {
              id: this.form.id,
              portCode: this.form.portCode,
              areaCode: this.form.areaCode, // 工号
              areaEnName: this.form.areaEnName,
              areaCnName: this.form.areaCnName,
              remarks: this.form.remarks
              // terminal: this.form.terminal
            }
          }

          createOrUpdateInfo2(data, msg)
            .then(res => {
              this.btnLoading = false
              this.windowShow = false
              this.$emit('on-save-success')
            })
            .catch(e => {
              this.btnLoading = false
            })
        }
      })
    }
  }
}
</script>
