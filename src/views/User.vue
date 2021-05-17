<template>
  <div v-if="user" class="user">
    <Panel>
      <template #header>
        <div class="nav">
          <router-link to="/">主页 /</router-link>
        </div>
      </template>
      <template #content>
        <div class="container">
          <div>
            <img :src="user.avatar_url" alt="" />
            <span>{{ user.loginname }}</span>
            <div class="score">{{ user.score }} 积分</div>
            <div class="create-date">
              注册时间 {{ user.create_at | formatDateFromNow }}
            </div>
          </div>
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <div class="nav">
          <span>最近创建的话题</span>
        </div>
      </template>
      <template #content>
        <div
          v-for="item in user.recent_topics"
          :key="item.id"
          class="container"
        >
          <router-link :to="`/user/${item.author.loginname}`">
            <img :src="item.author.avatar_url" alt="" />
          </router-link>
          <router-link class="title" :to="`/inner/${item.id}`">{{
            item.title
          }}</router-link>
          <span class="date">{{ item.last_reply_at | formatDateFromNow }}</span>
          <hr />
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <div class="nav">
          <span>最近参与的话题</span>
        </div>
      </template>
      <template #content>
        <div
          v-for="item in user.recent_replies"
          :key="item.id"
          class="container"
        >
          <router-link :to="`/user/${item.author.loginname}`">
            <img :src="item.author.avatar_url" alt="图片加载失败" />
          </router-link>
          <router-link class="title" :to="`/inner/${item.id}`">{{
            item.title
          }}</router-link>
          <span class="date">{{ item.last_reply_at | formatDateFromNow }}</span>
          <hr />
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
      user: null,
    };
  },
  watch: {
    "$route.params": {
      async handler() {
        const { loginname } = this.$route.params;
        const res = await this.$axios.get(`/user/${loginname}`);
        this.user = res.data;
      },
      immediate: true,
    },
  },
  async created() {},
};
</script>

<style lang="less">
.user {
  width: 70%;
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
    position: relative;
    .create-date {
      color: #ababab;
      margin-top: 10px;
    }
    .score {
      margin-top: 10px;
      color: #333333;
    }
    a {
      color: #0088cc;
    }
    a:hover {
      text-decoration: underline;
    }
    .title {
      display: inline-block;
      width: 75%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    img {
      width: 40px;
      margin-right: 10px;
      font-size: 12px;
      vertical-align: middle;
    }
    .date {
      position: absolute;
      width: 100px;
      display: inline-block;
      right: 10px;
      top: 15px;
      color: #778087;
    }
  }
}
</style>