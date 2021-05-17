<template>
  <div
    v-if="!$route.path.includes('api') && !$route.path.includes('login')"
    class="right-panel"
  >
    <Panel class="message">
      <template #header>
        <div v-if="userInfo || user" class="right-title">
          <span>个人信息</span>
        </div>
        <div v-else class="right-title">
          <span>网站信息</span>
        </div>
      </template>
      <template #content>
        <div v-if="userInfo || user" class="right-container">
          <div v-if="$route.path.includes('inner')">
            <img :src="inneruser.avatar_url" alt="" />
            <span>{{ inneruser.loginname }}</span>
          </div>
          <div v-else-if="$route.path.includes('user')">
            <img :src="user.avatar_url" alt="" />
            <span>{{ user.loginname }}</span>
          </div>
          <div v-else class="right-container">
            <img :src="userInfo.avatar_url" alt="" />
            <span>{{ userInfo.loginname }}</span>
          </div>
        </div>
        <div v-else class="right-container">
          <p>Node.js专业中文社区</p>
          <router-link to="/login">登录</router-link>
        </div>
      </template>
    </Panel>
    <Panel v-if="userInfo">
      <template #content>
        <div class="create-topic">
          <router-link
            :to="{ name: 'create', params: { paramsTopicId: 'newCreate' } }"
          >
            <el-button>发布话题</el-button>
          </router-link>
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <div class="right-title">
          <span>友情社区</span>
        </div>
      </template>
      <template #content>
        <div class="container-two">
          <img
            src="https://static2.cnodejs.org/public/images/ruby-china-20150529.png"
            alt=""
          />
          <img
            src="https://static2.cnodejs.org/public/images/golangtc-logo.png"
            alt=""
          />
          <img
            src="https://static2.cnodejs.org/public/images/phphub-logo.png"
            alt=""
          />
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <div class="right-title">
          <span>客户端二维码</span>
        </div>
      </template>
      <template #content>
        <div class="container-three">
          <img
            src="https://static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU"
            alt=""
          />
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  data() {
    return {
      token: "",
      topic: "",
      loginName: "",
      inneruser: "",
      user: "",
    };
  },
  created() {
    localStorage.getItem("user");
  },
  async updated() {
    localStorage.getItem("user");
    const { topicId } = this.$route.params;
    if (this.$route.path.includes("inner")) {
      // console.log(topicId);
      const tokenStr = localStorage.getItem("token");
      this.token = JSON.parse(tokenStr);
      const url = this.token
        ? `/topic/${topicId}?accesstoken=this.token`
        : `/topic/${topicId}`;
      const res = await this.$axios.get(url);
      this.topic = res.data;
      // console.log(res.data);
      this.loginName = this.topic.author.loginname;
      console.log(this.loginName);
      const loginres = await this.$axios.get(`/user/${this.loginName}`);
      this.inneruser = loginres.data;
    }
    if (this.$route.path.includes("user")) {
      const { loginname } = this.$route.params;
      console.log(loginname);
      const loginres = await this.$axios.get(`/user/${loginname}`);
      this.user = loginres.data;
      // console.log(this.user);
      localStorage.setItem("user", JSON.stringify(this.user));
    }
  },
  computed: {
    userInfo() {
      // 如何处理  刷新页面的时候 store 数据被清空
      // 当第一次登陆的时候可以直接将 userInfo 转化成 json 串存储到浏览器中
      // created 先看能不能取到 vuex 数据, 不能的话直接去浏览器中取 并更新 store
      // 当点击退出按钮的时候清空 store 以及浏览器存储的数据
      return this.$store.state.userInfo;
    },
    // isTopicId() {
    //   return this.$route.params.topicId;
    // },
  },
};
</script>

<style lang="less">
.right-title {
  width: 100%;
  height: 40px;
  line-height: 30px;
  padding: 5px 10px;
  // border-top: #69c 2px solid;
  background: #f2f2f2;
}
.right-container {
  width: 100%;
  height: 90px;
  display: flex;
  position: relative;
  img {
    width: 70px;
    height: 70px;
  }
  a {
    color: #666666;
    position: absolute;
    left: 0;
    bottom: 20px;
  }
  span {
    display: inline-block;
    color: #666666;
    margin-left: 20px;
  }
}
.container-two {
  img {
    height: 20%;
    width: 60%;
    margin: 10px 0;
  }
}
.container-three {
  img {
    width: 100%;
    height: 100%;
  }
}
.create-topic {
  height: 50px;
}
</style>