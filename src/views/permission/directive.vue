<template>
  <div class="components-container">
    未通过申请
  </div>
</template>

<script>

export default {
  name: 'DirectivePermission',
  components: {},
  directives: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .app-container {
    /deep/ .permission-alert {
      width: 320px;
      margin-top: 15px;
      background-color: #f0f9eb;
      color: #67c23a;
      padding: 8px 16px;
      border-radius: 4px;
      display: inline-block;
    }
    /deep/ .permission-sourceCode {
      margin-left: 15px;
    }
    /deep/ .permission-tag {
      background-color: #ecf5ff;
    }
  }
</style>

