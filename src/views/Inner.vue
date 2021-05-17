<template>
  <div v-if="topic" class="inner">
    <Panel>
      <template #content>
        <div>
          <h2>
            {{ topic.title }}
            <button v-if="isLogin" @click="collect">
              {{ topic.is_collect ? "取消收藏" : "收藏" }}
            </button>
          </h2>
          <!-- 如果发布文章的作者与登录者的loginname相同，则为作者发布 -->
          <div v-show="userInfoLoginName === authorLoginname" class="edit">
            <router-link
              :to="{ name: 'create', params: { paramsTopicId: paramsTopicId } }"
            >
              <el-button type="primary">编辑</el-button>
            </router-link>
          </div>
          <div class="inner-content" v-html="topic.content"></div>
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <div class="nav"></div>
      </template>
      <template #content>
        <!-- <div v-if="topic.replies[0].content" class="container"> -->
        <div
          class="container"
          v-for="(comment, index) in topic.replies"
          :key="comment.id"
        >
          <router-link :to="`/user/${comment.author.loginname}`">
            <img width="30px" :src="comment.author.avatar_url" alt="" />
          </router-link>
          <span>{{ comment.author.loginname }}</span>
          <span v-html="comment.content"></span>
          <div v-if="isLogin" class="icon">
            <!-- 没登录 如果没有点赞数不显示点赞按钮 -->
            <!-- 登录了 没有点赞数显示点赞按钮不显示点赞个数0 -->
            <button
              @click="upClick(comment.id, index)"
              :class="{ 'up-active': comment.is_uped }"
            >
              <img src="../assets/dianzan.png" alt="" />
              点赞 {{ comment.ups.length ? comment.ups.length : "" }}
            </button>
            <button @click="otherSubmit(comment)">
              <img src="../assets/huifu.png" alt="" /> 回复
            </button>
          </div>
          <textarea
            class="reply-text"
            ref="textarea"
            v-if="textId === comment.id"
            v-model="content"
            cols="30"
            rows="5"
          >
          </textarea>
          <el-button
            @click="otherSubmitEvent(comment)"
            class="reply-btn"
            v-if="textId === comment.id"
            >回复</el-button
          >
          <hr />
        </div>
        <!-- </div> -->
        <!-- <div v-else>暂无评论</div> -->
      </template>
    </Panel>
    <Panel>
      <template #header>
        <div class="nav">
          <span>添加回复</span>
        </div>
      </template>
      <template #content>
        <div class="container">
          <Editor
            v-model="text"
            model-event="blur change keydown paste focus"
            api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
            :init="{
              language: 'zh_CN',
              forced_root_block: false,
              elementpath: false,
              branding: false,
              height: 300,
              menubar: true,
              toolbar:
                'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
          styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
          table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
            }"
          />
          <!-- <textarea v-model="text" cols="30" rows="10"></textarea> -->
          <el-button type="primary" @click="submit">回复</el-button>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
// 文章详情页 登录不登录是展示不同的内容
// vuex 里面又能存储了登录状态，但是这个登录状态必须刷新的时候也会自动更新
// 如果 vuex 内更新登录状态 需要发请求的话, 在该组件中不一定能获取到最新的登录状态
// 取 token, 前提是登录的时候将 token 存储到了浏览器
// 貌似没采取这种方案
import Panel from "../layout/Panel.vue";
import Editor from "@tinymce/tinymce-vue";
// import tinymce from "tinymce";
export default {
  components: { Panel, Editor },
  data() {
    return {
      topic: {},
      // 富文本编辑器的评论内容
      text: "",
      userInfoId: "",
      userInfoLoginName: "",
      avatar_url: "",
      // 回复他人的id
      textId: "",
      // 回复他人的评论内容
      content: "",
      token: "",
      authorLoginname: "",
      paramsTopicId: "",
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.userInfo;
    },
  },
  async created() {
    const { topicId } = this.$route.params;
    this.paramsTopicId = this.$route.params.topicId;
    // console.log(this.paramsTopicId);
    // 刷新的时候更新userInfo, 以防刷新就退出登录
    const userInfo = localStorage.getItem("isLogin");
    this.$store.commit("getUserInfo", JSON.parse(userInfo));

    const tokenStr = localStorage.getItem("token");
    // this.$store.commit("getToken", JSON.parse(tokenStr));
    this.token = JSON.parse(tokenStr);
    const url = this.token
      ? `/topic/${topicId}?accesstoken=this.token`
      : `/topic/${topicId}`;
    const res = await this.$axios.get(url);
    this.topic = res.data;
    console.log(this.topic);

    this.authorLoginname = this.topic.author.loginname;
    // this.stateLoginname = this.$store.state.userInfo.loginname;
    // console.log(this.authorLoginname);
    // console.log(this.stateLoginname);

    if (this.isLogin) {
      this.userInfoId = this.$store.state.userInfo.id;
      this.userInfoLoginName = this.$store.state.userInfo.loginname;
      // console.log(this.userInfoLoginname);
      this.avatar_url = this.$store.state.userInfo.avatar_url;
    }
  },
  methods: {
    // 点赞和取消点赞
    async upClick(id, index) {
      // 点赞之前判断是否登录
      // 如果登录了判断是不是给自己评论点赞 (看评论的作者的 loginname 是不是自己)
      // 服务器上已更新成功
      if (
        this.topic.author.loginname !== this.userInfoLoginName &&
        this.topic.replies[index].author.loginname !== this.userInfoLoginName
      ) {
        const res = await this.$axios.post(`/reply/${id}/ups`, {
          accesstoken: this.token,
        });
        // console.log(res);// {success: true, action: "up"}

        // 更新本地 个数加一
        // 方案1 根据请求的结果 up down 去更新对应评论的 is_uped 以及 ups, 更新 ups 需要用户的 id
        const currentComment = this.topic.replies.find(
          (item) => item.id === id
        );
        // 更改点赞按钮的样式
        currentComment.is_uped = res.action === "up" ? true : false;
        // console.log(currentComment.is_uped);
        // 更改点赞数量
        res.action === "up"
          ? currentComment.ups.push(this.userInfoId)
          : currentComment.ups.splice(
              currentComment.ups.findIndex(
                (item) => item.id === this.userInfoId
              ),
              1
            );
        // 方案2 重新请求一遍 得看实际情况, 看网络请求是否特别慢, 以免造成用户体验不好
      } else {
        this.$message.error("不可以给自己点赞哦");
      }
    },
    // 文章的回复
    async submit() {
      if (this.isLogin) {
        const { text } = this;
        console.log(text);
        if (text) {
          // 新建评论
          const res = await this.$axios.post(
            `/topic/${this.topic.id}/replies`,
            {
              accesstoken: this.token,
              content: text,
            }
          );
          // 如何更新页面
          // 方案1. 根据后台 id 和 text 作假的评论对象 更新 topic
          const newComment = {
            id: res.reply_id,
            is_uped: false,
            ups: [],
            content: `<p>${text}</p>`,
            author: {
              avatar_url: this.avatar_url,
              loginname: this.userInfoLoginName,
            },
          };
          this.topic.replies.push(newComment);
          this.text = "";
          // 方案2. 重新请求
        }
      } else {
        this.$message.error("请先登录噢");
      }
    },
    // 回复个人评论
    otherSubmit(comment) {
      // 首先出现文本框
      const { id, author } = comment;
      this.textId = id;
      // 出现 @ 标识
      this.content = `@${author.loginname} `;
      // 获得焦点
      this.$nextTick(function () {
        this.$refs.textarea[0].focus();
      });
    },
    // 回复个人评论
    async otherSubmitEvent(comment) {
      // 发送请求
      const { id } = comment;
      const { content } = this;
      const { loginname } = comment.author;
      console.log(loginname);
      if (content) {
        // 新建评论
        const res = await this.$axios.post(`/topic/${this.topic.id}/replies`, {
          accesstoken: this.token,
          content: content,
          reply_id: id,
        });
        // 如何更新页面
        // 方案1. 根据后台 id 和 text 作假的评论对象 更新 topic
        const newComment = {
          id: res.reply_id,
          is_uped: false,
          ups: [],
          content: `<p>${content.replace(
            /@[\w-]+/,
            `<a href='/user/loginname'>@${loginname}</a>`
          )}</p>`,
          author: {
            avatar_url: this.avatar_url,
            loginname: this.userInfoLoginName,
          },
        };
        this.topic.replies.push(newComment);
        this.content = "";
        // 方案2. 重新请求
      }
    },
    // 收藏事件
    async collect() {
      if (this.topic.is_collect) {
        await this.$axios.post(`/topic_collect/de_collect`, {
          accesstoken: this.token,
          topic_id: this.topic.id,
        });
        this.topic.is_collect = false;
      } else {
        await this.$axios.post(`/topic_collect/collect`, {
          accesstoken: this.token,
          topic_id: this.topic.id,
        });
        this.topic.is_collect = true;
      }
    },
  },
};
</script>

<style lang="less">
.inner {
  width: 70%;
  .inner-content {
    padding: 10px 5px;
    img {
      width: 100%;
    }
  }
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
  .up-active {
    color: red;
  }
  .icon {
    button {
      background: none;
      border: none;
      cursor: pointer;
      margin-bottom: 10px;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
  .container {
    position: relative;
    .reply-btn {
      position: absolute;
      bottom: 30px;
    }
  }
}
</style>