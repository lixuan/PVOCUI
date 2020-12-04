<template>
  <div :class="{'has-logo':showLogo}">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" class="sideBar">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        mode="vertical"

        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>

  <!-- background-color="#304156" -->
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {}

}
</script>
<style  rel="stylesheet/scss" lang="scss">
  .el-menu{background-color: #304156;}
  .sideBar{
    .el-scrollbar__view{height:100%;}

    height:100%;
    .el-scrollbar__wrap{overflow-x: hidden;}

    .el-menu{height: 100%;}
  }

</style>
