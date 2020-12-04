<template>
  <div class="page-container">
    <el-row :gutter="8">
      <el-col :xs="24" :sm="24" :lg="6">
        <div class="background-fff" style="margin-bottom: 20px;">
          <div class="wrapper-title">基本信息</div>
          <div style="padding: 20px 0 20px 20px">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-row :xs="24" :sm="24" :lg="24">
                <el-form-item label="拟稿人：" prop="name">
                  员工甲
                </el-form-item>
                <el-form-item label="拟稿时间：" prop="name">
                  2020-4-2
                </el-form-item>
                <el-form-item label="证书编号：" prop="name">
                  <el-input v-model="ruleForm.number" placeholder="" class="filter-item" style="margin-bottom: 5px" />
                  <el-button type="primary">生成编号</el-button>
                </el-form-item>
                <el-form-item label="出证地点：" prop="name">
                  国内出证
                </el-form-item>
                <el-form-item label="复核人：" prop="name">
                  复核人甲
                </el-form-item>
                <el-form-item label="复核时间：" prop="name">
                  2020-4-5
                </el-form-item>
                <el-form-item label="复核意见：" prop="">
                  <el-input v-model="ruleForm.desc" type="textarea" />
                </el-form-item>
                <el-form-item label="附件：" prop="name">
                  <span class="wrapper-title">点击上传附件</span>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="18">
        <div class="background-fff" style="margin-bottom: 20px;">
          <div class="wrapper-title">COC/NCR证书</div>
          <div style="padding: 20px 0 20px 20px">
            <el-form ref="ruleFormCoc" :model="ruleFormCoc" label-width="160px" class="demo-ruleForm">
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="IDF编号：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="Date of RFC receipt：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="一致性证书状态：" prop="name">
                    <el-radio v-model="ruleFormCoc.radio" label="1">NCR</el-radio>
                    <el-radio v-model="ruleFormCoc.radio" label="2">COR</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="业务号：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="COC编号：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="字数限制100字以内" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="签发人：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="字数限制100字以内" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="进口商：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="地址1：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="100字以内" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="地址2：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="100字以内" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="城市：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="国家：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="邮编：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="电话：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="传真：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="E-mail：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="出口商：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="地址1：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="100字以内" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="地址2：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="100字以内" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="城市：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="国家：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="邮编：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="电话：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="传真：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="E-mail：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="检验时间及地点：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="格式示例：2020-04-01 HENAN" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="目的港：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="供货国家：" prop="name">
                    <el-select v-model="ruleFormCoc.region" placeholder="请选择供货国家" style="width: 100%;">
                      <el-option label="区域一" value="shanghai" />
                      <el-option label="区域二" value="beijing" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="FOB价值：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="发票计价货币单位：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="发票汇率：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="发票号：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="发票日期：" prop="name">
                    <el-date-picker v-model="ruleFormCoc.date1" type="date" placeholder="选择日期" style="width: 100%;" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="交货数量：" prop="name">
                    <el-input v-model="ruleFormCoc.input3" placeholder="" class="input-with-select">
                      <el-select slot="prepend" v-model="ruleFormCoc.select" placeholder="请选择" style="width: 120px;">
                        <el-option label="PULL" value="1" />
                        <el-option label="测试数据1" value="2" />
                        <el-option label="测试数据2" value="3" />
                      </el-select>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="封条号：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="航班描述：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="100字以内" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="航班描述2：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="100字以内" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="UCR Reference No：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="毛重：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="带单位，示例：1000KGS" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="附件：" prop="name">
                    <el-input v-model="ruleFormCoc.SealValue" placeholder="" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="复核意见：" prop="">
                <el-input v-model="ruleForm.desc" type="textarea" />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'CertificateDetails',
  directives: { waves },
  data() {
    return {
      checkList: [], // 一致性证书状态
      examineOptions: [{
        value: '选项1',
        label: '审核通过'
      }, {
        value: '选项2',
        label: '审核未通过'
      }],
      ruleForm: {
        name: '',
        number: '',
        type: '',
        delivery: false,
        SealValue: '',
        desc: '',
        examineValue: ''
      },
      ruleFormCoc: {
        select: '',
        date1: '',
        region: '',
        name: '',
        number: '',
        type: '',
        delivery: false,
        SealValue: '',
        desc: '',
        examineValue: '',
        radio: '1',
        input3: ''
      }
    }
  },
  created() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .page-container{background: rgb(240, 242, 245);padding: 20px;min-height: 100vh;}
  .background-fff{background: #fff;padding: 16px 16px 0;}
  .wrapper-title{color: #1890ff}
  .pad-15{padding-bottom: 15px}
</style>
