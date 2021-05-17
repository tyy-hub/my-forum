<template>
  <header>
    <!-- <router-link to="/" class="logo"
      ><img src="../assets/logo.png" alt="Vue logo"
    /></router-link> -->
    <!-- <router-link to="/" class="logo"> -->
    <!-- <img src="../assets/nav.jpg" alt="" /> -->
    <!-- </router-link> -->
    <div class="nav">
      <router-link to="/all" class="home">首页</router-link>
      <router-link to="/info" class="info"
        >未读消息<span v-if="getCount" class="count">{{
          getCount
        }}</span></router-link
      >
      <router-link to="/getstart" class="getstart">新手入门</router-link>
      <router-link to="/api" class="api">API</router-link>
      <router-link to="/about" class="about">关于</router-link>
      <span v-if="isLogin" @click="logout" class="signout">退出</span>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComp",
  data() {
    return {
      token: "",
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.userInfo;
    },
    getCount() {
      return this.$store.state.count;
    },
  },
  async created() {
    const res = localStorage.getItem("isLogin");
    this.$store.commit("getUserInfo", JSON.parse(res));
    this.$store.dispatch("getToken");
    this.token = this.$store.state.token;
    // console.log(this.token);
    if (this.isLogin) {
      this.$store.dispatch({ type: "getCount", token: this.token });
    }
  },
  methods: {
    logout() {
      // this.$router.push("/");
      // 1. 清空在浏览器中存储的登录状态
      localStorage.removeItem("isLogin");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // 2. 跳转到登录页面
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less">
header {
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #e7e7e7;
  background: #444;
  // background: rgba(52, 50, 53);
  // line-height: 50px;
  color: #e7e7e7;
  position: relative;
  .logo {
    img {
      height: 100%;
      width: 100%;
      border-bottom: solid 1px #e7e7e7;
    }
  }
  .nav {
    // background: red;
    width: 500px;
    height: 100%;
    padding: 15px 0;
    position: absolute;
    right: 10px;
    top: 0;
    a {
      color: #e7e7e7;
      margin-right: 40px;
    }
    span.count {
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: center;
      background-color: #80bd01;
      border-radius: 15px;
      margin-left: 5px;
    }
    span.signout {
      cursor: pointer;
    }
  }
}
</style>
