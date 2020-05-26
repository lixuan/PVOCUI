/* eslint-disable */
<template>
  <div class="page-container">
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="background-fff">
          <div class="wrapper-title">基本信息</div>
          <div style="padding: 20px 0 20px 20px">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-row :xs="24" :sm="24" :lg="24">
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="编号：" prop="name">
                    KER100049001
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="指令编号：" prop="type">
                    KEC1041650
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="检验公司：" prop="number">
                    中地汉盛检验认证
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="检验员：" prop="delivery">
                    员工甲
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :xs="24" :sm="24" :lg="24">
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="检验时间：" prop="">
                    2020-03-27
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="检验地点：" prop="">
                    山东省青岛市黄岛区前港湾路三期码头
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="出运方式：" prop="">
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox label="整箱" style="margin-bottom: 5px" />
                      <el-checkbox label="拼箱" />
                      <el-checkbox label="散货" />
                      <el-checkbox label="未指定" />
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :xs="24" :sm="24" :lg="24">
                <el-col :xs="24" :sm="24" :lg="12">
                  <el-form-item label="封识号码：" prop="">
                    <el-input v-model="ruleForm.SealValue" placeholder="请输入封识号码" class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="background-fff">
          <div class="wrapper-title">封识信息</div>
          <div style="padding: 20px 0 20px 20px">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-row :xs="24" :sm="24" :lg="24">
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="集装箱编号：" prop="name">
                    <el-input v-model="ruleForm.name" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="集装箱类型：" prop="type">
                    <el-input v-model="ruleForm.name" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="封识编号：" prop="number">
                    <el-input v-model="ruleForm.name" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="商品类别：" prop="delivery">
                    <el-input v-model="ruleForm.name" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :xs="24" :sm="24" :lg="24">
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="上传人：" prop="">
                    员工甲
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="上传时间：" prop="">
                    2020-3-28
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                  <el-form-item label="检验完成时间：" prop="" label-width="130px">
                    2020-3-28
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="4" />
              </el-row>
              <el-row :xs="24" :sm="24" :lg="24">
                <el-form-item label="附件：" prop="">
                  <span style="color: #1890ff">附件文件</span>
                </el-form-item>
              </el-row>
              <el-row :gutter="8">
                <el-col :xs="24" :sm="24" :lg="12">
                  <el-form-item label="说明：" prop="">
                    <el-input v-model="ruleForm.desc" type="textarea" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="12">
                  <el-button type="primary">添加</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="background-fff">
          <div style="padding: 20px 0 20px 20px">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-row :xs="24" :sm="24" :lg="24">
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="审核人：" prop="name">
                    admin
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="审核日期：" prop="type">
                    2020-3-31
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="审核状态：" prop="number">
                    <el-select v-model="ruleForm.examineValue" placeholder="请选择审核状态">
                      <el-option
                        v-for="item in examineOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6" />
              </el-row>
              <el-row :gutter="8">
                <el-col :xs="24" :sm="24" :lg="12">
                  <el-form-item label="审核意见：" prop="">
                    <el-input v-model="ruleForm.desc" type="textarea" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="background-fff">
          <div style="padding: 20px 0 20px 20px">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-row :xs="24" :sm="24" :lg="24">
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="复核人：" prop="name">
                    admin
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="复核日期：" prop="type">
                    2020-3-31
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-form-item label="复核状态：" prop="number">
                    <el-select v-model="ruleForm.examineValue" placeholder="请选择审核状态">
                      <el-option
                        v-for="item in examineOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6" />
              </el-row>
              <el-row :gutter="8">
                <el-col :xs="24" :sm="24" :lg="12">
                  <el-form-item label="复核意见：" prop="">
                    <el-input v-model="ruleForm.desc" type="textarea" />
                  </el-form-item>
                </el-col>
              </el-row>
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
  name: 'ToReview',
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
  .background-fff{background: #fff;padding: 16px 16px 0;margin-bottom: 20px;}
  .wrapper-title{color: #1890ff}
  .pad-15{padding-bottom: 15px}
</style>
