<template>
  <div class="loginin">
    <div class="username">
      <span>用户名</span>
      <el-input type="text" v-model="username"></el-input>
    </div>
    <div class="userpassword">
      <span>密码</span>
      <el-input v-model.trim="token" type="text"></el-input>
    </div>
    <el-button @click="login" type="primary">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
      // 1ef019ec-f5fe-421a-8a93-6b7efbfea09a
      token: "1ef019ec-f5fe-421a-8a93-6b7efbfea09a",
    };
  },

  methods: {
    login() {
      // 判断之前是否登录过
      this.$axios
        .post("/accesstoken", {
          accesstoken: this.token,
        })
        .then((res) => {
          this.$router.push("/");
          console.log(res);
          this.$store.commit("getUserInfo", res);
          localStorage.setItem("isLogin", JSON.stringify(res));
          localStorage.setItem("token", JSON.stringify(this.token));
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("token错误");
        });
    },
  },
};
</script>

<style lang="less">
.loginin {
  width: 700px;
  height: 200px;
  padding: 10px;
  // background-color: red;
  .username {
    width: 500px;
    display: flex;
    span {
      display: inline-block;
      padding: 9px 5px;
      width: 70px;
      height: 40px;
      margin-right: 30px;
    }
    input {
      width: 200px;
    }
  }
  .userpassword {
    margin-top: 20px;
    width: 500px;
    display: flex;
    span {
      display: inline-block;
      padding: 9px 5px;
      width: 70px;
      height: 40px;
      margin-right: 30px;
    }
    input {
      width: 200px;
    }
  }
  button {
    margin-top: 20px;
    margin-left: 230px;
  }
}
</style>