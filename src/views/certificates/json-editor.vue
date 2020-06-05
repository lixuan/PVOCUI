<template>
  <div class="components-container">
    <el-row :gutter="100">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
          <el-form-item label="证书号：">
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
          <el-form-item label="邮寄人：">
            <el-input v-model="formLabelAlign.region" />
          </el-form-item>
          <el-form-item label="邮寄日期：">
            <el-date-picker
              v-model="mailValue"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="快递公司：">
            <el-select v-model="expressValue" placeholder="请选择">
              <el-option
                v-for="item in expressOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号：">
            <el-input v-model="formLabelAlign.type" />
          </el-form-item>
          <el-form-item label="发票号：">
            <el-input v-model="formLabelAlign.type" />
          </el-form-item>
          <el-form-item label="证书扫描附件：">
            <span style="color: #1890ff">点击上传附件</span>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="formLabelAlign.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" />
      <el-col :xs="24" :sm="24" :lg="8" />
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'JsonEditorDemo',
  components: {},
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        desc: ''
      },
      mailValue: '',
      expressOptions: [{
        value: '选项1',
        label: '顺丰快递'
      }, {
        value: '选项2',
        label: '圆通快递'
      }, {
        value: '选项3',
        label: '韵达快递'
      }, {
        value: '选项4',
        label: '中通快递'
      }, {
        value: '选项5',
        label: '邮政快递'
      }],
      expressValue: ''
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>

