<template>
  <div class="info">
    <Panel>
      <template #header>
        <div class="nav">
          <span>主页</span>
          <span> / </span>
          <span>新消息</span>
        </div>
      </template>
      <template #content>
        <div v-if="notReadMessage" class="container">
          <div v-for="message in notReadMessage" :key="message.id">
            <p>
              <router-link :to="`/user/${message.author.loginname}`">{{
                message.author.loginname
              }}</router-link>
              <span> 回复了你的话题 </span>
              <router-link
                :to="{ name: 'inner', params: { topicId: message.topic.id } }"
                >{{ message.topic.title }}</router-link
              >
              <el-button @click="hasRead(message.id)" style="margin-left: 10px"
                >标为已读</el-button
              >
            </p>
          </div>
        </div>
        <div v-else class="container">
          <p>无消息</p>
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <div class="nav">
          <span>过往消息</span>
        </div>
      </template>
      <template #content>
        <div v-if="readMessage" class="container">
          <div v-for="message in readMessage" :key="message.id">
            <p v-if="message.type === 'at'">
              <router-link :to="`/user/${message.author.loginname}`">{{
                message.author.loginname
              }}</router-link>
              <span> 在话题 </span>
              <router-link
                :to="{ name: 'inner', params: { topicId: message.topic.id } }"
                >{{ message.topic.title }}</router-link
              >
              <span> 中@了你</span>
            </p>
            <p v-if="message.type === 'reply'">
              <router-link :to="`/user/${message.author.loginname}`">{{
                message.author.loginname
              }}</router-link>
              <span> 回复了你的话题 </span>
              <router-link
                :to="{ name: 'inner', params: { topicId: message.topic.id } }"
                >{{ message.topic.title }}</router-link
              >
            </p>
            <hr />
          </div>
        </div>
        <div v-else class="container">
          <p>无消息</p>
        </div>
        <!-- <span>{{ getCount }}</span> -->
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
      messages: "",
      readMessage: "",
      notReadMessage: "",
      count: 0,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.userInfo;
    },
  },
  async created() {
    const res = localStorage.getItem("isLogin");
    this.$store.commit("getUserInfo", JSON.parse(res));
    this.$store.dispatch("getToken");
    this.token = this.$store.state.token;
    // console.log(this.token);

    // 获取已读和未读消息
    if (this.isLogin) {
      const messages = await this.$axios.get(
        `messages?accesstoken=${this.token}`
      );
      // console.log(messages);
      this.readMessage = messages.data.has_read_messages;
      this.notReadMessage = messages.data.hasnot_read_messages;
      // console.log(this.notReadMessage);
    }
  },
  async destroyed() {
    // 标记全部消息为已读
    if (this.isLogin) {
      const mark_all = await this.$axios.post("/message/mark_all", {
        accesstoken: this.token,
      });
      console.log(mark_all);
    }
  },
  methods: {
    async hasRead(id) {
      console.log(id);
      const res = await this.$axios.post(
        `/message/mark_one/${id}?accesstoken=${this.token}`
      );
      console.log(res);
      const messages = await this.$axios.get(
        `messages?accesstoken=${this.token}`
      );
      this.readMessage = messages.data.has_read_messages;
      this.notReadMessage = messages.data.hasnot_read_messages;
    },
  },
};
</script>

<style lang="less">
.info {
  width: 70%;
  a {
    color: #0088cc;
  }
  //   background-color: #ccc;
  .nav {
    padding: 10px;
    height: 50px;
    line-height: 30px;
    border-top: #69c 2px solid;
    border-radius: 3px 3px 0 0;
    background: #f2f2f2;
  }
  .container {
    padding: 10px 20px;
  }
}
</style>