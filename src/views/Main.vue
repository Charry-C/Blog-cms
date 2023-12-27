<template>
  <el-container>
    <el-aside width="200px"><aside-menu-vue /></el-aside>
    <el-container>
      <el-header style="padding: 0"><header-vue /></el-header>
      <el-main style="padding: 20px 50px"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenuVue from "../components/Layout/AsideMenu.vue";
import HeaderVue from "../components/Layout/Header.vue";
// import postViewVue from "./postArticle/postView.vue";
export default {
  components: {
    AsideMenuVue,
    HeaderVue,
    // postViewVue,
  },
};
</script>
<style lang="less">
</style>