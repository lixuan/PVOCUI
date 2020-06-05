<template>
  <!--  <div class="page-container">-->
  <div class="components-container">
    客户信息
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'CustomerInfo',
  directives: { waves },
  data() {
    return {}
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
