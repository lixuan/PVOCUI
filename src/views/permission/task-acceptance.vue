/* eslint-disable */
<template>
  <div class="page-container">
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="8">
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="background-fff">
            <div class="wrapper-title">基本信息</div>
            <div style="padding: 20px 0 20px 20px">
              <el-form-item label="协调中心：" prop="name">
                协调中心
              </el-form-item>
              <el-form-item label="指令编号：" prop="name">
                KEC1041650
              </el-form-item>
              <el-form-item label="Route：" prop="name">
                RouteA
              </el-form-item>
              <el-form-item label="出口商：" prop="name">
                BFDHBGTH GDGFHTNF
              </el-form-item>
              <el-form-item label="联系人：" prop="name">
                联系人甲
              </el-form-item>
              <el-form-item label="电话：" prop="name">
                0532-76543210
              </el-form-item>
              <el-form-item label="手机：" prop="name">
                18765432109
              </el-form-item>
              <el-form-item label="E-mail：" prop="name">
                321456@NN.com
              </el-form-item>
              <el-form-item label="出运时间：" prop="name">
                2020-04-10
              </el-form-item>
              <el-form-item label="预检时间：" prop="name">
                2020-04-09
              </el-form-item>
              <el-form-item label="检验地点：" prop="name">
                山东省青岛市黄岛区前港湾路三期码头
              </el-form-item>
              <el-form-item label="出运方式：" prop="name">
                Sea
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="background-fff">
            <div class="wrapper-title">检验项目</div>
            <div style="padding: 20px 0 20px 20px" class="check-style">
              <el-checkbox-group v-model="checkList">
                <p><el-checkbox label="VISUAL QUALIT" name="type" /></p>
                <p><el-checkbox label="QUANTITY/WEIGHT" name="type" /></p>
                <p><el-checkbox label="MODEL" name="type" /></p>
                <p><el-checkbox label="SPECIFICATION/DIMENSION" name="type" /></p>
                <p><el-checkbox label="SERIAL,No" name="type" /></p>
                <p><el-checkbox label="MANFACTURER AND/OR BRAND" name="type" /></p>
                <p><el-checkbox label="COUNTRY OF ORIGIN" name="type" /></p>
                <p><el-checkbox label="PACKING" name="type" /></p>
                <p><el-checkbox label="SHIPPING MARK" name="type" /></p>
                <p><el-checkbox label="LABELING AND MARKING" name="type" /></p>
                <p><el-checkbox label="MF DATE;EXP DATE(if applicable)" name="type" /></p>
                <p><el-checkbox label="ELECTRIC RATING(RATED VOLAGE,CYCLE" name="type" /></p>
                <p><el-checkbox label="TAKE PHOTO" name="type" /></p>
                <p><el-checkbox label="SAMPLING AND SEALING" name="type" /></p>
                <p><el-checkbox label="SUPERVISE CONTANER LOADING AND SEALING" name="type" /></p>
                <p><el-checkbox label="TESTING" name="type" /></p>
                <p><el-checkbox label="WITNESS TESTING" name="type" /></p>
                <p><el-checkbox label="FACTORY INSPECTION" name="type" /></p>
                <p><el-checkbox label="FUMIGATION(for wooden package)" name="type" /></p>
              </el-checkbox-group>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="background-fff">
            <div class="wrapper-title">检验依据</div>
            <div style="padding: 20px 0 20px 20px" class="check-style">
              <el-checkbox-group v-model="checkList">
                <p><el-checkbox label="PS操作程序" name="type" /><el-checkbox label="形式发票" name="type" /></p>
                <p><el-checkbox label="装箱单" name="type" /><el-checkbox label="IDF/FORM" name="type" /></p>
                <p><el-checkbox label="合同" name="type" /><el-checkbox label="L/C" name="type" /></p>
                <p><el-checkbox label="标准" name="type" /><el-checkbox label="注册证" name="type" /></p>
                <p><el-checkbox label="许可证" name="type" /><el-checkbox label="测试报告" name="type" /></p>
              </el-checkbox-group>
              <span style="line-height: 19px;font-size: 14px;color: #606266;font-weight: 500;display: block;padding-bottom: 10px">备注</span>
              <el-input v-model="ruleForm.desc" type="textarea" />
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="background-fff">
            <div class="wrapper-title">进口商信息</div>
            <div style="padding: 20px 0 20px 20px" class="">
              暂无相关信息
            </div>
            <div class="wrapper-title">货物信息</div>
            <div style="padding: 20px 0 20px 20px" class="check-style">
              暂无相关信息
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="background-fff">
            <div style="padding: 20px 0 20px 20px">
              <el-form-item label="退回原因：" prop="" label-width="150px">
                <el-input v-model="ruleForm.desc" type="textarea" placeholder="检验任务如果退回，退回原因为必填项" />
              </el-form-item>
              <el-form-item label="请选择工作部门：" prop="" label-width="150px">
                <el-radio v-model="workRadio" label="1">检验鉴定</el-radio>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'TaskAcceptance',
  directives: { waves },
  data() {
    return {
      ruleForm: {
        name: '',
        number: '',
        type: '',
        delivery: false,
        SealValue: '',
        desc: '',
        examineValue: ''
      },
      checkList: '',
      workRadio: '1'
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
  .check-style p{margin-bottom: 25px}
</style>
