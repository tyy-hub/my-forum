<template>
  <div class="home">
    <Panel>
      <template #header>
        <div class="nav">
          <router-link
            :class="$route.params.tab === 'all' ? 'active' : ''"
            to="/all"
            >首页</router-link
          >
          <router-link
            :class="$route.params.tab === 'good' ? 'active' : ''"
            to="/good"
            >精华</router-link
          >
          <router-link
            :class="$route.params.tab === 'share' ? 'active' : ''"
            to="/share"
            >分享</router-link
          >
          <router-link
            :class="$route.params.tab === 'ask' ? 'active' : ''"
            to="/ask"
            >问答</router-link
          >
          <router-link
            :class="$route.params.tab === 'job' ? 'active' : ''"
            to="/job"
            >招聘</router-link
          >
          <router-link
            :class="$route.params.tab === 'dev' ? 'active' : ''"
            to="/dev"
            >客户端测试</router-link
          >
        </div>
      </template>
      <template #content>
        <div v-if="posts.length">
          <div class="post-item" v-for="post in posts" :key="post.id">
            <router-link :to="`/user/${post.author.loginname}`">
              <img
                :src="post.author.avatar_url"
                :title="post.author.loginname"
                alt=""
              />
            </router-link>
            <span class="count"
              ><span class="repiles">{{ post.reply_count }}</span
              >/<span class="visits">{{ post.visit_count }}</span></span
            >
            <span
              v-if="
                !$route.params.tab ||
                $route.params.tab === 'all' ||
                post.top ||
                post.good
              "
              :class="post.top || post.good ? 'active-tab' : 'tab'"
              >{{ post | getPostChineseTab }}</span
            >
            <router-link
              :to="{ name: 'inner', params: { topicId: post.id } }"
              class="title"
              :title="post.title"
              >{{ post.title }}</router-link
            >
            <span class="date">{{
              post.last_reply_at | formatDateFromNow
            }}</span>
          </div>
        </div>
        <div v-else>请稍等...</div>
      </template>
    </Panel>
    <el-pagination
      background
      :page-size="10"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange($route.params.tab)"
      layout="prev, pager, next"
      :total="100"
    >
    </el-pagination>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  name: "Home",
  data() {
    return {
      posts: [],
      currentPage: 1,
    };
  },
  created() {
    const res = localStorage.getItem("isLogin");
    this.$store.commit("getUserInfo", JSON.parse(res));
    // console.log(res);
  },
  watch: {
    "$route.params.tab": {
      async handler(newValue) {
        const tab = newValue || "all";
        const res = await this.$axios.get(`/topics?page=1&limit=20&tab=${tab}`);
        this.posts = res.data;
        this.currentPage = 1;
        // console.log(this.posts);
      },
      immediate: true,
    },
  },
  methods: {
    async handleCurrentChange(tab) {
      // console.log(this.currentPage);
      const { currentPage } = this;
      const res = await this.$axios.get(
        `/topics?page=${currentPage}&limit=20&tab=${tab}`
      );
      this.posts = res.data;
    },
  },
};
</script>
<style lang="less">
.home {
  .nav {
    padding: 10px;
    height: 50px;
    line-height: 30px;
    border-top: #69c 2px solid;
    border-radius: 3px 3px 0 0;
    background: #f2f2f2;
    a {
      margin: 10px;
      color: #666;
    }
    .active {
      background: #69c;
      color: #fff;
      padding: 3px 4px;
      border-radius: 3px;
    }
  }
  .post-item {
    height: 50px;
    line-height: 40px;
    padding: 4px 10px;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    display: flex;
    img {
      width: 40px;
      height: 40px;
      margin-right: 20px;
      vertical-align: middle;
    }
    .count {
      display: inline-block;
      width: 90px;
      // height: 40px;
      // line-height: 10px;
      padding: 0 5px;
      // vertical-align: middle;
      .repiles {
        color: #9e78c0;
      }
      .visits {
        color: #b4b4b4;
      }
    }
    a {
      margin-left: 20px;
      color: #333;
    }
    .title {
      width: 65%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .active-tab {
      background: #69c;
      padding: 2px 4px;
      display: inline-block;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      border-radius: 3px;
      color: #fff;
      font-size: 12px;
    }
    .tab {
      background-color: #e5e5e5;
      color: #999;
      display: inline-block;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 2px 5px;
      border-radius: 3px;
      font-size: 12px;
    }
    .date {
      position: absolute;
      right: 10px;
      display: inline-block;
      width: 150px;
      overflow: hidden;
      height: 40px;
      text-align: right;
      white-space: nowrap;
      color: #778087;
    }
  }
}
</style>