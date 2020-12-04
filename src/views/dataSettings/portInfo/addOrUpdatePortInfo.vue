<template>
  <div class="createUser">
    <el-dialog
      v-dialogDrag
      :title="form.id?'编辑港口信息':'新增港口信息'"
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
        label-width="100px"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="港口标准码：" prop="portCode">
              <el-input
                v-model="form.portCode"
                size="mini"
                maxlength="5"
                placeholder="请输入港口标准码"
                @input="form.portCode = form.portCode.toUpperCase()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属国家：" prop="countryCode">
              <el-select
                v-model="form.countryCode"
                placeholder="请选择所属国家"
                clearable
                style="width:100%"
                filterable
              >
                <el-option
                  v-for="item in countryList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中文名称：" prop="portCNName">
              <el-input v-model="form.portCNName" size="mini" maxlength="100" placeholder="请输入中文名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名称" prop="portNameEN">
              <el-input
                v-model="form.portNameEN"
                size="mini"
                maxlength="150"
                placeholder="请输入英文名称"
                @input="form.portNameEN = form.portNameEN.toUpperCase()"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="港口数字码：" prop>
              <el-input v-model="form.numCode" size="mini" maxlength="6" placeholder="请输入港口数字码" />
            </el-form-item>
          </el-col>
          <!--          <el-col :span="12">-->
          <!--            <el-form-item label="时区：" prop="clockArea">-->
          <!--              <el-select-->
          <!--                v-model="form.clockArea"-->
          <!--                placeholder="请选择时区"-->
          <!--                clearable-->
          <!--                style="width:100%"-->
          <!--                filterable-->
          <!--              >-->
          <!--                <el-option-->
          <!--                  v-for="item in shiquList"-->
          <!--                  :key="item.code"-->
          <!--                  :label="item.name"-->
          <!--                  :value="item.code"-->
          <!--                ></el-option>-->
          <!--              </el-select>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
        </el-row>
        <el-row>
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
        <el-button type="primary" size="small" @click="saveInfo">确 定</el-button>
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
import { createOrUpdateInfo, getOne } from '@/api/publicBase/portInfo'
import { getDicListByDitType, getDicList } from '@/api/publicBase/dictionaryMng'
import { GetCountryShortNameEdit } from '@/api/publicBase/baseCountry'

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
      windowShow: this.pshow,
      formLoading: false,
      shiquList: [],
      countryList: [],
      value: '',
      form: {
        id: '',
        portCode: '',
        numCode: '',
        portCNName: '',
        portNameEN: '',
        countryCode: '',
        remarks: ''
      },
      rules: {
        portCode: [
          { required: true, message: '请输入港口标准码', trigger: 'blur' },
          { pattern: /^[a-z,A-Z]+$/, message: '只能输入固定长度5位英文' },
          { len: 5, message: '只能输入固定长度5位英文', trigger: 'blur' }
        ],
        numCode: [
          { required: true, message: '请输入6位港口数字码', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '只能输入数字码' },
          { len: 6, message: '请输入6位港口数字码', trigger: 'blur' }
        ],
        portCNName: [
          { pattern: chineOrCharacter, message: '请输入中文名称' },
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],

        portNameEN: [
          { pattern: englishOrCharacter, message: '只能输入英文字母' },
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ],
        countryCode: [
          { required: true, message: '请选择国家', trigger: 'change' }
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
          numCode: '',
          portCNName: '',
          portNameEN: '',
          countryCode: '',
          remarks: ''
        }
        this.$emit('on-show-change', newValue)
      }
    }
  },

  methods: {
    // 根据ID 获取港口
    getInfoByID(id) {
      this.formLoading = true
      getOne({ id: id })
        .then(res => {
          this.form.id = res.result.portInfoDetailsInfo.id
          this.form.portCode = res.result.portInfoDetailsInfo.portCode
          this.form.numCode = res.result.portInfoDetailsInfo.numCode
          this.form.portCNName = res.result.portInfoDetailsInfo.portCNName
          this.form.portNameEN = res.result.portInfoDetailsInfo.portNameEN
          this.form.countryCode = res.result.portInfoDetailsInfo.countryCode
          this.form.remarks = res.result.portInfoDetailsInfo.remarks
          this.formLoading = false
        })
        .catch(e => {
          this.formLoading = false
        })
    },

    setCombox() {
      const data = {
        typeCode: 'SHIQU',
        code: '',
        name: '',
        maxResultCount: 50,
        skipCount: 0,
        sorting: 'CreationTime'
      }
      getDicList(data).then(res => {
        if (res.success) {
          this.shiquList = res.result.items
        }
      })
      // getDicListByDitType({ TypeCode: "SHIQU" }).then(res => {
      //   console.log(res.result);
      //   this.shiquList = res.result;
      // });
      GetCountryShortNameEdit().then(res => {
        this.countryList = res.result.countryCode
      })
    },

    // 保存或修改港口
    saveInfo() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const msg = this.form.id ? '编辑港口信息' : '新增港口信息'
          this.formLoading = true
          const data = {
            portInfoDetailsInfo: {
              id: this.form.id,
              portCode: this.form.portCode,
              numCode: this.form.numCode, // 工号
              portCNName: this.form.portCNName,
              portNameEN: this.form.portNameEN,
              countryCode: this.form.countryCode,
              remarks: this.form.remarks
            }
          }

          createOrUpdateInfo(data, msg)
            .then(res => {
              this.formLoading = false
              this.windowShow = false

              this.$emit('on-save-success', this.form.portCode)
            })
            .catch(e => {
              this.formLoading = false
            })
        }
      })
    }
  }
}
</script>
