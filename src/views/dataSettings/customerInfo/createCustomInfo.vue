<template>
  <div class="createCustomInfo">
    <el-dialog
      v-dialogDrag
      :title="form.id?'编辑客户资料':'新增客户资料'"
      :visible.sync="windowShow"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="ruleForm" v-loading="loading" size="mini" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户代码：" prop="cusCode">
              <el-input v-model="form.cusCode" size="mini" :disabled="inputDisabled" maxlength="20" placeholder="请输入客户代码" @input="form.cusCode = form.cusCode.toUpperCase()" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户类型：" prop="cusType">
              <el-select v-model="form.cusType" size="mini" style="width:100%" :disabled="inputDisabled" collapse-tags multiple filterable placeholder="请选择客户类型">
                <el-option
                  v-for="item in form.cusTypeList"
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
            <el-form-item label="英文简称：" prop="customENShortName">
              <el-input v-model="form.customENShortName" size="mini" :disabled="inputDisabled" maxlength="300" placeholder="请输入英文简称" @input="form.customENShortName = form.customENShortName.toUpperCase()" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文全称：" prop="customENFullName">
              <el-input v-model="form.customENFullName" size="mini" :disabled="inputDisabled" maxlength="300" placeholder="请输入英文全称" @input="form.customENFullName = form.customENFullName.toUpperCase()" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中文简称：" prop="customCNShortName">
              <el-input v-model="form.customCNShortName" size="mini" :disabled="inputDisabled" maxlength="150" placeholder="请输入中文简称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中文全称：" prop="customName">
              <el-input v-model="form.customName" size="mini" :disabled="inputDisabled || !form.isOwnAdd" maxlength="200" placeholder="请输入中文全称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="财务编码：" prop="financiaL_CODE">
              <el-input v-model="form.financiaL_CODE" size="mini" maxlength="36" placeholder="请输入财务编码" @input="form.financiaL_CODE = form.financiaL_CODE.toUpperCase()" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税号：" prop="dutY_NUMBER">
              <el-input v-model="form.dutY_NUMBER" size="mini" :disabled="inputDisabled" maxlength="25" placeholder="请输入税号" @input="form.dutY_NUMBER = form.dutY_NUMBER.toUpperCase()" />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="金蝶应付编码：" prop="kingdeE_PAY_CODE">
              <el-input v-model="form.kingdeE_PAY_CODE" size="mini" maxlength="15" placeholder="请输入金蝶应付编码" @input="form.kingdeE_PAY_CODE = form.kingdeE_PAY_CODE.toUpperCase()" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金蝶应收编码：" prop="kingdeE_REC_CODE">
              <el-input v-model="form.kingdeE_REC_CODE" size="mini" maxlength="15" placeholder="请输入金蝶应收编码" @input="form.kingdeE_REC_CODE = form.kingdeE_REC_CODE.toUpperCase()" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="组织规模级别：" prop="organizatioN_CUSTOMER_LEVEL">
              <el-input v-model="form.organizatioN_CUSTOMER_LEVEL" size="mini" :disabled="inputDisabled" maxlength="3" placeholder="请输入组织规模级别" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户等级：" prop="customeR_CLASS">
              <el-input v-model="form.customeR_CLASS" size="mini" :disabled="inputDisabled" maxlength="10" placeholder="请输入客户等级" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="结费类型：">
              <el-checkbox-group v-model="form.checkedCusType">
                <el-checkbox v-for="cus in form.jieTypeList" :key="cus.code" :disabled="inputDisabled" :label="cus.code">{{ cus.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否冻结：" prop="isForzen">
              <el-switch v-model="form.isForzen" :disabled="inputDisabled" active-color="#13ce66" inactive-color="#C0C4CC" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="注册地址：" prop="cusAddress">
              <el-input v-model="form.cusAddress" size="mini" :disabled="inputDisabled" maxlength="300" placeholder="请输入注册地址" @input="form.cusAddress = form.cusAddress.toUpperCase()" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话：" prop="cusTel">
              <el-input v-model="form.cusTel" size="mini" :disabled="inputDisabled" maxlength="50" placeholder="请输入电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="传真：" prop="fax">
              <el-input v-model="form.fax" size="mini" :disabled="inputDisabled" maxlength="50" placeholder="请输入传真" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="AEO：" prop="aeo">
              <el-input v-model="form.aeo" size="mini" :disabled="inputDisabled" maxlength="25" placeholder="请输入AEO" @input="form.aeo = form.aeo.toUpperCase()" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" prop="remarks">
              <el-input
                v-model="form.remarks"
                type="textarea"
                :rows="2"
                placeholder="请输入备注"
                maxlength="500"
                :disabled="inputDisabled"
                show-word-limit
                @input="form.remarks = form.remarks.toUpperCase()"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="windowShow = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="btnLoading" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCustomInfoById,
  createorUpdateCustomInfo
} from '@/api/publicBase/custom/customInfo'
import { getDicListByDitType } from '@/api/publicBase/dictionaryMng'
import { englishOrCharacter, english, noEnglish, numbers, englishOrNumber, telephone, noChinese, noCharacter } from '@/utils/validate'
export default {
  components: { },
  props: {
    pshow: {
      type: Boolean,
      default: false
    },
    inputDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      windowShow: this.pshow,
      form: {
        id: '',
        financiaL_CODE: '',
        cusCode: '',
        customENShortName: '',
        customENFullName: '',
        customCNShortName: '',
        customName: '',
        organizatioN_CUSTOMER_LEVEL: '',
        remarks: '',
        isForzen: false,
        customeR_CLASS: '',
        dutY_NUMBER: '',
        kingdeE_PAY_CODE: '',
        kingdeE_REC_CODE: '',
        cusAddress: '',
        cusTel: '',
        fax: '',
        aeo: '',
        cusType: [],
        checkedCusType: [],
        cusTypeList: [],
        jieTypeList: [],
        isOwnAdd: true
      },
      rules: {
        cusType: [
          { required: true, message: '请选择客户类型', trigger: 'change' }
        ],
        financiaL_CODE: [
          // { required: true, message: "请输入账务编码", trigger: "blur" },
          { pattern: noChinese, message: '只能输入字母、数字与特殊字符' }
        ],
        cusCode: [
          // { required: true, message: "请输入客户代码", trigger: "blur" },
          { pattern: noCharacter, message: '只能输入字母、数字、汉字' }
        ],
        customCNShortName: [
          // { required: true, message: "请输入中文简称", trigger: "blur" },
          // { pattern: noEnglish, message: "只能输入汉字、数字、特殊字符" }
        ],
        customName: [
          { required: true, message: '请输入中文全称', trigger: 'blur' }
          // { pattern: noEnglish, message: "只能输入汉字、数字、特殊字符" }
        ],
        customENShortName: [
          // { required: true, message: "请输入英文简称", trigger: "blur" },
          {
            pattern: englishOrCharacter,
            message: '只能输入英文与特殊字符'
          }
        ],
        customENFullName: [
          // { required: true, message: "请输入英文全称", trigger: "blur" },
          {
            pattern: englishOrCharacter,
            message: '只能输入英文与特殊字符'
          }
        ],
        dutY_NUMBER: [
          { validator: this.validatePass },
          { pattern: englishOrNumber, message: '只能输入字母、数字' }
        ],
        kingdeE_PAY_CODE: [
          //  { required: true, message: "请输入金蝶应付编码", trigger: "blur" },
          { pattern: noChinese, message: '只能输入字母、数字与特殊字符' }
        ],
        kingdeE_REC_CODE: [
          //  { required: true, message: "请输入金蝶应收编码", trigger: "blur" },
          { pattern: noChinese, message: '只能输入字母、数字与特殊字符' }
        ],
        cusTel: [
          { pattern: telephone, message: '请输入正确的电话' }
        ],
        fax: [
          { pattern: telephone, message: '请输入正确的传真' }
        ],
        aeo: [
          { pattern: englishOrNumber, message: '只能输入字母、数字' }
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
        this.form.id = ''
        this.form.checkedCusType = []
        this.$emit('on-show-change', newValue)
      }
    }
  },
  methods: {
    // 如果客户类型不是个人或散货，则税号为必填
    validatePass(rule, value, callback) {
      if (this.form.cusType.filter(p => p != 'GEREN' && p != 'SANHUO' && p != 'KHLXQT').length > 0) {
        if (this.form.dutY_NUMBER == '') {
          callback(new Error('请输入税号'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 取客户类型列表
    getCusTypeList() {
      getDicListByDitType({ TypeCode: 'KHLX', Code: '', Name: '' }).then(
        res => {
          this.form.cusTypeList = res.result
        }
      )
    },
    // 取结费类型列表
    getJieTypeList() {
      getDicListByDitType({ TypeCode: 'JIEFEILX', Code: '', Name: '' }).then(
        res => {
          this.form.jieTypeList = res.result
        }
      )
    },
    // 获取单个客户信息
    getCustomInfoInfoById(id) {
      this.loading = true
      const _this = this
      getCustomInfoById({ id: id }).then(res => {
        _this.form.id = res.result.id
        _this.form.cusCode = res.result.cusCode
        _this.form.customENShortName = res.result.customENShortName
        _this.form.customENFullName = res.result.customENFullName
        _this.form.customCNShortName = res.result.customCNShortName
        _this.form.customName = res.result.customName
        _this.form.organizatioN_CUSTOMER_LEVEL = res.result.organizatioN_CUSTOMER_LEVEL
        _this.form.financiaL_CODE = res.result.financiaL_CODE
        _this.form.remarks = res.result.remarks
        _this.form.isForzen = res.result.isForzen
        _this.form.customeR_CLASS = res.result.customeR_CLASS
        _this.form.dutY_NUMBER = res.result.dutY_NUMBER
        _this.form.kingdeE_PAY_CODE = res.result.kingdeE_PAY_CODE
        _this.form.kingdeE_REC_CODE = res.result.kingdeE_REC_CODE
        _this.form.cusAddress = res.result.cusAddress
        _this.form.cusTel = res.result.cusTel
        _this.form.fax = res.result.fax
        _this.form.aeo = res.result.aeo
        _this.form.isOwnAdd = res.result.isOwnAdd
        _this.form.checkedCusType = res.result.customeR_TYPE ? res.result.customeR_TYPE.split(';') : []
        _this.form.cusType = res.result.cusType ? res.result.cusType.split(';') : []
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
    // 提交
    async save() {
      const val = await this.$refs['ruleForm'].validate().catch(e => {})
      if (val) {
        this.btnLoading = true
        const data = {
          customInfo: {
            id: this.form.id,
            financiaL_CODE: this.form.financiaL_CODE,
            cusCode: this.form.cusCode,
            customENShortName: this.form.customENShortName,
            customENFullName: this.form.customENFullName,
            customCNShortName: this.form.customCNShortName,
            customName: this.form.customName,
            customeR_TYPE: this.form.checkedCusType.join(';'),
            cusType: this.form.cusType.join(';'),
            organizatioN_CUSTOMER_LEVEL: this.form.organizatioN_CUSTOMER_LEVEL,
            remarks: this.form.remarks,
            isForzen: this.form.isForzen,
            customeR_CLASS: this.form.customeR_CLASS,
            dutY_NUMBER: this.form.dutY_NUMBER,
            kingdeE_PAY_CODE: this.form.kingdeE_PAY_CODE,
            kingdeE_REC_CODE: this.form.kingdeE_REC_CODE,
            cusAddress: this.form.cusAddress,
            cusTel: this.form.cusTel,
            fax: this.form.fax,
            aeo: this.form.aeo
          }

        }
        createorUpdateCustomInfo(data).then(res => {
          this.btnLoading = false
          this.windowShow = false
          this.$emit('on-save-success')
        }).catch(err => {
          this.btnLoading = false
        })
      }
    }
  }
}
</script>
