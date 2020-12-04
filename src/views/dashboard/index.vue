<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import adminDashboard from './admin'
import { getCookie } from '@/utils/cookie'

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {},
  created() {
    if (getCookie('Abp.AuthToken')) {
      this.currentRole = 'adminDashboard'
    }
  }
}
</script>
