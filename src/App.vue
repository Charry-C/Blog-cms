<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import LoginVue from "./views/Login.vue";
import MainVue from "./views/Main.vue";

export default {
  name: "App",
  components: {
    MainVue,
    LoginVue,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
  border-right: 1px solid #efefef;
}

.el-main {
  background-color: #ffffff;
  color: #333;
}

.el-header {
  height: 50px !important;
  border-bottom: 1px solid #efefef;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>

