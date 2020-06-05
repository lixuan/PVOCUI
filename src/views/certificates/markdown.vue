<template>
  <div class="app-container">
    <el-row :gutter="8">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-button size="small" type="primary">点击打印</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-row :gutter="8">
          <el-col :xs="24" :sm="24" :lg="12">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传电子文件</el-button>
              <div slot="tip" class="el-upload__tip" />
            </el-upload>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import waves from '@/directive/waves' // waves directive

export default {
  name: 'MarkdownDemo',
  directives: { waves },
  data() {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  created() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-table thead{color: #1890ff}
  .el-range-editor.el-input__inner {
    vertical-align: top;
  }
</style>
