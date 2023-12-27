<template>
  <div class="login">
    <div class="con">
      <div class="title">
        <span style="font-size: 22px; color: rgb(93, 254, 0)"> @ </span>
        Charry's
        <span style="font-size: 22px; color: rgb(93, 254, 0)"
          ><博客后台系统/></span
        >
      </div>
      <div class="email">用户名：<input type="text" v-model="email" /></div>
      <div class="verify-box">
        <div class="verify">
          密码：<input type="password" id="code" v-model="password" />
        </div>
      </div>
      <div class="gogo" @click="loginCMS">登录</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginCMS() {
      const postData = {
        email: this.email,
        password: this.password,
      };
      axios.post("http://127.0.0.1:5000/cms/login", postData).then((res) => {
        console.log(res);
        if (res.data.status !== 200) {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        } else {
          this.$store.commit("addUser", res.data.user);
          this.$router.replace("/postblog");
        }
      });
    },
  },
};
</script>

<style scoped>
* {
  color: #000000;
  font-weight: 700;
  font-size: 17px;
}
input {
  color: #000;
  padding: 5px;
  border-radius: 3px;
  border: none;
  border-bottom: 2px solid #000000;
}
.login {
  width: 100%;
  height: 76.4vh;
  padding-top: 12.5%;
  background: linear-gradient(45deg, #ee7752, #e73c7e, #1349b6, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 10s linear infinite;
}
.login .con {
  width: 12.5%;
  min-width: 500px;
  margin: auto;
  background-color: #ffffff;
  box-shadow: rgba(136, 185, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  display: flex;
  height: 280px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  border-radius: 5px;
}
.login .con .title {
  font-size: 20px;
  font-weight: 700;
  margin: 20px 0;
  margin-bottom: 30px;
}
.login .con input {
  outline: none;
}
.login .con .verify-box {
  margin: 20px 0;
}
.login .con .verify-box .verify {
  display: flex;
  align-items: center;
  padding-left: 15px;
}
.login .con .gogo {
  padding: 5px 20px;
  background-color: rgb(255, 255, 255);
  color: #000;
  cursor: pointer;
  border: 2px solid #000;
  transition: all 0.3s;
}
.login .con .gogo:hover {
  color: aliceblue;
  background-color: rgb(0, 0, 0);
}
@keyframes gradientBG {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>