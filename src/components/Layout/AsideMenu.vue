<template>
  <el-menu
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#fff"
    text-color="#000"
    active-text-color="rgb(14, 181, 89)"
  >
    <router-link
      v-for="item in sideMenu"
      :key="item.name"
      :to="item.path"
      active-class="active"
    >
      <el-menu-item style="padding-left: 0px">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeRoute: null,
      sideMenu: [
        {
          name: "博客发布",
          path: "/postblog",
          icon: "el-icon-s-promotion",
        },
        {
          name: "博客管理",
          path: "/manageblog",
          icon: "el-icon-s-operation",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less" scoped>
.el-menu {
  border: none;
  height: 100%;
}
.el-menu-item {
  font-weight: bolder;
  i {
    color: #000;
  }

  &:hover {
    background-color: rgba(119, 119, 119, 0.147) !important;
  }
}
a {
  text-decoration: none;
}
.router-link-exact-active {
  .el-menu-item {
    background-color: #000 !important;
    font-weight: bolder;
    i {
      color: aliceblue;
    }
    span {
      color: #ffffff;
    }
  }
}
</style>