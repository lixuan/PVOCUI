<template>
  <div class="customInfo-Detail">
    <el-form ref="ruleForm" size="mini" :model="form" label-width="120px">

      <el-row>
        <el-col :span="6">
          <el-form-item label="英文简称：" prop="customENShortName">
            <el-input v-model="form.customENShortName" size="mini" :disabled="inputDisabled" maxlength="300" placeholder="请输入英文简称" @input="form.customENShortName = form.customENShortName.toUpperCase()" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="英文全称：" prop="customENFullName">
            <el-input v-model="form.customENFullName" size="mini" :disabled="inputDisabled" maxlength="300" placeholder="请输入英文全称" @input="form.customENFullName = form.customENFullName.toUpperCase()" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="中文简称：" prop="customCNShortName">
            <el-input v-model="form.customCNShortName" size="mini" :disabled="inputDisabled" maxlength="150" placeholder="请输入中文简称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="中文全称：" prop="customName">
            <el-input v-model="form.customName" size="mini" :disabled="inputDisabled" maxlength="200" placeholder="请输入中文全称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="财务编码：" prop="financiaL_CODE">
            <el-input v-model="form.financiaL_CODE" size="mini" :disabled="inputDisabled" maxlength="36" placeholder="请输入财务编码" @input="form.financiaL_CODE = form.financiaL_CODE.toUpperCase()" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="税号：" prop="dutY_NUMBER">
            <el-input v-model="form.dutY_NUMBER" size="mini" :disabled="inputDisabled" maxlength="25" placeholder="请输入税号" @input="form.dutY_NUMBER = form.dutY_NUMBER.toUpperCase()" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金蝶应付编码：" prop="kingdeE_PAY_CODE">
            <el-input v-model="form.kingdeE_PAY_CODE" size="mini" :disabled="inputDisabled" maxlength="15" placeholder="请输入金蝶应付编码" @input="form.kingdeE_PAY_CODE = form.kingdeE_PAY_CODE.toUpperCase()" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金蝶应收编码：" prop="kingdeE_REC_CODE">
            <el-input v-model="form.kingdeE_REC_CODE" size="mini" :disabled="inputDisabled" maxlength="15" placeholder="请输入金蝶应收编码" @input="form.kingdeE_REC_CODE = form.kingdeE_REC_CODE.toUpperCase()" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="组织规模级别：" prop="organizatioN_CUSTOMER_LEVEL">
            <el-input v-model="form.organizatioN_CUSTOMER_LEVEL" size="mini" :disabled="inputDisabled" maxlength="3" placeholder="请输入组织规模级别" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户等级：" prop="customeR_CLASS">
            <el-input v-model="form.customeR_CLASS" size="mini" :disabled="inputDisabled" maxlength="10" placeholder="请输入客户等级" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结费类型：">
            <el-checkbox-group v-model="form.checkedCusType">
              <el-checkbox v-for="cus in form.jieTypeList" :key="cus.code" :disabled="inputDisabled" :label="cus.code">{{ cus.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否冻结：" prop="isForzen">
            <el-switch v-model="form.isForzen" :disabled="inputDisabled" active-color="#13ce66" inactive-color="#C0C4CC" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="注册地址：" prop="cusAddress">
            <el-input v-model="form.cusAddress" size="mini" :disabled="inputDisabled" maxlength="300" placeholder="请输入注册地址" @input="form.cusAddress = form.cusAddress.toUpperCase()" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话：" prop="cusTel">
            <el-input v-model="form.cusTel" size="mini" :disabled="inputDisabled" maxlength="50" placeholder="请输入电话" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="传真：" prop="fax">
            <el-input v-model="form.fax" size="mini" :disabled="inputDisabled" maxlength="50" placeholder="请输入传真" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="AEO：" prop="aeo">
            <el-input v-model="form.aeo" size="mini" :disabled="inputDisabled" maxlength="25" placeholder="请输入AEO" @input="form.aeo = form.aeo.toUpperCase()" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="客户代码：" prop="cusCode">
            <el-input v-model="form.cusCode" size="mini" :disabled="inputDisabled" maxlength="50" placeholder="请输入客户代码" @input="form.cusCode = form.cusCode.toUpperCase()" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
          <el-form-item label="备注：" prop="remarks">
            <el-input
              v-model="form.remarks"
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              maxlength="500"
              :disabled="inputDisabled"
              @input="form.remarks = form.remarks.toUpperCase()"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs v-model="activeName" type="card" style="margin-left:20px;" @tab-click="handleClick">
      <el-tab-pane label="联系人" name="1" />
      <el-tab-pane label="客户收付款信息" name="2" />
      <el-tab-pane label="默认生成费目" name="3" />
    </el-tabs>
    <div style="margin:10px 20px 20px 20px;height:calc(100% - 370px);">
      <cus-contact-index v-show="activeName==='1'" ref="cusContactComp" :cus-id="form.id" style="height:100%" />
      <cus-bank-info-index v-show="activeName==='2'" ref="cusBankInfoComp" :cus-id="form.id" style="height:100%" />
      <cus-fee-item-index v-show="activeName==='3'" ref="cusFeeItemComp" :cus-id="form.id" style="height:100%" />
    </div>

  </div>
</template>

<script>
import {
  getCustomInfoById
} from 'api/publicBase/custom/customInfo'
import { getDicListByDitType } from 'api/publicBase/dictionaryMng'
import cusContactIndex from '../cusContact/cusContactIndex'
import cusBankInfoIndex from '../cusBankInfo/cusBankInfoIndex'
import cusFeeItemIndex from '../feeItemDefault/cusFeeItemIndex'
export default {
  components: { cusContactIndex, cusBankInfoIndex, cusFeeItemIndex },
  props: {
    inputDisabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeName: '1',
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
        checkedCusType: [],
        cusTypeList: [],
        jieTypeList: [],
        cusType: []
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
  created() {

  },
  mounted() {
    if (this.$route.query && this.$route.query.id) {
      this.getCusTypeList()
      this.getJieTypeList()
      this.getCustomInfoInfoById(this.$route.query.id)
      this.$refs.cusContactComp.getTableList()
      this.$refs.cusBankInfoComp.getTableList()
      this.$refs.cusFeeItemComp.getTableList()
      this.form.id = this.$route.query.id
    }
  },
  methods: {
    handleClick(tab, event) {

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
        _this.form.checkedCusType = res.result.customeR_TYPE ? res.result.customeR_TYPE.split(';') : []
        _this.form.cusType = res.result.cusType ? res.result.cusType.split(';') : []
      })
    }

  }
}
</script>

<style lang="scss">
.customInfo-Detail {
    margin-top:20px;height:100%;width: 98%;
    .el-tabs__header{margin:0px !important;}
}

</style>
