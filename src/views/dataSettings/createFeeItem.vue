<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="form.id==''?'新增费目':'编辑费目'"
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
        label-width="140px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="费目代码：" prop="feeCode">
              <el-input
                v-model="form.feeCode"
                placeholder="请输入费目代码"
                size="mini"
                maxlength="10"
                clearable
                @input="form.feeCode = form.feeCode.toUpperCase()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主数据平台费目代码：" prop>
              <el-input
                v-model="form.mainPlatformFeeCode"
                placeholder="请输入主数据平台费目代码"
                size="mini"
                maxlength="50"
                clearable
                @input="form.mainPlatformFeeCode = form.mainPlatformFeeCode.toUpperCase()"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="费目名称：" prop="feeName">
              <el-input
                v-model="form.feeName"
                placeholder="请输入费目名称"
                size="mini"
                maxlength="50"
                clearable
                @input="form.feeName = form.feeName.toUpperCase()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="费目显示内容：" prop>
              <el-input
                v-model="form.displayFeeName"
                placeholder="请输入费目显示内容"
                size="mini"
                maxlength="50"
                clearable
                @input="form.displayFeeName = form.displayFeeName.toUpperCase()"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="税收分类编码：" prop="taxClassificationId">
              <el-select
                v-model="form.taxClassificationId"
                size="mini"
                filterable
                placeholder="请选择税收分类编码"
                style="width:100%"
                clearable
              >
                <el-option
                  v-for="item in taxClassificationList"
                  :key="item.taxID"
                  :label="item.taxClassificationCode"
                  :value="item.taxID"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务类型：" prop="businessTypeCode">
              <el-select
                v-model="form.businessTypeCode"
                size="mini"
                filterable
                placeholder="请选择业务类型"
                style="width:100%"
              >
                <el-option
                  v-for="item in businessTypeCodeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否使用：" prop>
              <el-switch v-model="form.isUse" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否押箱费目：" prop>
              <el-switch v-model="form.isYX" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" prop="remarks">
              <el-input
                v-model="form.remarks"
                type="textarea"
                placeholder="请输入备注"
                :autosize="{ minRows: 2, maxRows: 6}"
                style="width:100%"
                maxlength="500"
                show-word-limit
                @input="form.remarks = form.remarks.toUpperCase()"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="windowShow = false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" size="small" @click="save()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  addEdit,
  getSingle,
  getTaxClassificationID
} from 'api/publicBase/fee/feeItem'
import {
  englishOrNumber,
  chineOrNumbers,
  chineseOrEnglishOrCharacter
} from 'utils/validate'
import { getDicListByDitType } from 'api/publicBase/dictionaryMng'
export default {
  props: {
    pshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      windowShow: this.pshow,
      btnLoading: false,
      formLoading: false,
      businessTypeCodeList: [],
      taxClassificationList: [],
      form: {
        id: '',
        feeCode: '', // 费目代码
        mainPlatformFeeCode: '', // 主数据平台费目代码
        feeName: '', // 费目名称
        displayFeeName: '', // 费目显示内容
        taxClassificationId: '', // 税收分类编码
        businessTypeCode: '', // 业务类型名称
        isUse: true, // 是否使用
        isYX: false, // 是否押箱费目
        remarks: '' // 备注
      },
      // 定义字段校验规则
      rules: {
        feeCode: [
          { required: true, message: '请输入费目代码', trigger: 'blur' },
          { pattern: englishOrNumber, message: '只允许输入英文和数字' }
        ],
        feeName: [
          { required: true, message: '请输入费目名称', trigger: 'blur' },
          {
            pattern: chineseOrEnglishOrCharacter,
            message: '只允许输入中文、英文和数字'
          }
        ],
        taxClassificationId: [
          { required: true, message: '请选择税收分类编码', trigger: 'change' }
        ],
        businessTypeCode: [
          { required: true, message: '请选择业务类型', trigger: 'change' }
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
          feeCode: '', // 费目代码
          mainPlatformFeeCode: '', // 主数据平台费目代码
          feeName: '', // 费目名称
          displayFeeName: '', // 费目显示内容
          taxClassificationId: '', // 税收分类编码
          businessTypeCode: '', // 业务类型名称
          isUse: true, // 是否使用
          isYX: false, // 是否押箱费目
          remarks: '' // 备注
        }
        this.$emit('on-show-change', newValue)
      }
    }
  },
  methods: {
    // 根据Id获取船东事务
    getShipownerAffairsSingle(id) {
      this.formLoading = true
      getSingle({ id: id })
        .then(res => {
          this.form = res.result
          this.formLoading = false
        })
        .catch(e => {
          this.formLoading = false
        })
    },
    // 获取税收分类编码下拉
    getTaxClassification() {
      getTaxClassificationID().then(res => {
        this.taxClassificationList = res.result.taxCode
      })
    },
    // 获取业务类型名称下拉
    getBusinessTypeProcess() {
      getDicListByDitType({ TypeCode: 'YEWULEIXING', Code: '', Name: '' }).then(
        res => {
          this.businessTypeCodeList = res.result
        }
      )
    },
    // 提交船东事务
    save() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const msg = this.form.id ? '编辑费目' : '新增费目'
          this.btnLoading = true
          addEdit({ FeeItemDetailsDto: this.form }, msg)
            .then(res => {
              this.btnLoading = false
              this.windowShow = false
              this.$emit('on-save-success')
            })
            .catch(err => {
              this.btnLoading = false
            })
        }
      })
    }
  }
}
</script>
