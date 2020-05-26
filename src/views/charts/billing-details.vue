/* eslint-disable */
<template>
  <div class="page-container">
    <el-row>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="background-fff">
          <div class="wrapper-title">商品信息</div>
          <div style="padding: 20px 0 20px 20px">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="品名：" prop="name">
                LCD MONTIOR/ST23320LF AND ST2321LF
              </el-form-item>
              <el-form-item label="规格：" prop="name" />
              <el-form-item label="HS编码：" prop="name">
                85284100
              </el-form-item>
              <el-form-item label="ICS编码：" prop="name" />
              <el-form-item label="生产商：" prop="name">
                CHIMEI INNOLUX CORPORATION
              </el-form-item>
              <el-form-item label="出口商：" prop="name" />
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="background-fff">
          <div class="wrapper-title">商品信息</div>
          <div style="padding: 20px 0 20px 20px">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="project"
                label="计费项"
                width="180"
              />
              <el-table-column
                prop="type"
                label="货币类型"
                width="180"
              />
              <el-table-column
                prop="amount"
                label="金额"
              />
              <el-table-column
                prop="rate"
                label="汇率"
              />
              <el-table-column
                prop="conversion"
                label="折合人民币金额"
              />
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'BillingDetails',
  directives: { waves },
  data() {
    return {
      checkList: [], // 出运方式
      SealValue: '', // 封识号码
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
      tableData: [{
        project: '基本检验费',
        type: 'USD',
        amount: '0',
        rate: '6.89',
        conversion: ''
      }, {
        project: '检测样品取样费',
        type: 'USD',
        amount: '0',
        rate: '6.89',
        conversion: ''
      }, {
        project: '产品审核注册费',
        type: 'USD',
        amount: '0',
        rate: '6.89',
        conversion: ''
      }, {
        project: '产品进口许可证申请费',
        type: 'USD',
        amount: '375',
        rate: '6.89',
        conversion: '2583.75'
      }, {
        project: '产品检验检测费',
        type: 'USD',
        amount: '0',
        rate: '6.89',
        conversion: ''
      }, {
        project: '证书邮寄费',
        type: 'USD',
        amount: '0',
        rate: '6.89',
        conversion: ''
      }, {
        project: '合计',
        type: '',
        amount: '0375',
        rate: '6.89',
        conversion: '2583.75'
      }]
    }
  },
  created() {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .page-container{background: rgb(240, 242, 245);padding: 20px;min-height: 100vh;}
  .background-fff{background: #fff;padding: 16px 16px 0;margin-bottom: 20px;}
  .wrapper-title{color: #1890ff}
  .pad-15{padding-bottom: 15px}
</style>
