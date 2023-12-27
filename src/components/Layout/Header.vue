<template>
  <div class="header">
    <div class="name">
      {{ this.$store.state.User == "root" ? "超级管理员" : "普通管理员" }}：{{
        this.$store.state.User
      }}
    </div>
    <div class="logout">
      <el-button type="danger" @click="LOGOUT">退出系统</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    LOGOUT() {
      this.$store.commit("clearUser");
      console.log("111", this.$store.state.User === null);
      this.$router.replace("/login");
    },
  },
};
</script>
<style lang="less">
.header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: right;
  margin-right: 20px;
  color: #c71494;

  div {
    padding: 0 10px;
    line-height: 30px;
    font-weight: 700;
    &::selection {
      background-color: rgb(71, 255, 47);
      color: rgb(0, 0, 0);
    }
  }
  .el-button {
    padding: 8px 15px;
    background-color: #ca0000;
  }
}
</style>