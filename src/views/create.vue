<template>
  <div class="create">
    <Panel>
      <template #header>
        <div class="nav">
          <span>主页</span>
          <span> / </span>
          <span>发布话题</span>
        </div>
      </template>
      <template #content>
        <div class="container">
          <div class="table-select">
            <span>选择版块：</span>
            <select name="" id="">
              <option value="">请选择</option>
              <option value="">分享</option>
              <option value="">问答</option>
              <option value="">招聘</option>
              <option value="">客户端测试</option>
            </select>
          </div>
          <div class="title">
            <textarea
              v-model="title"
              placeholder="标题字数10字以上"
              cols="30"
              rows="1"
            ></textarea>
          </div>
          <Editor
            v-model="content"
            model-event="blur change keydown paste focus"
            api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
            :init="{
              language: 'zh_CN',
              forced_root_block: false,
              elementpath: false,
              branding: false,
              height: 400,
              menubar: true,
              toolbar:
                'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
          styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
          table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
            }"
          />
          <el-button
            v-if="topic_id === 'newCreate'"
            type="primary"
            @click="createTopic"
            >提交</el-button
          >
          <el-button
            type="primary"
            v-if="topic_id !== 'newCreate'"
            @click="editTopic"
            >提交</el-button
          >
          <!-- <button @click="test">test</button> -->
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
import Editor from "@tinymce/tinymce-vue";
export default {
  components: { Panel, Editor },
  data() {
    return {
      content: "",
      token: "",
      title: "",
      topic_id: "",
      topic: "",
      id: "",
    };
  },
  async created() {
    const userInfo = localStorage.getItem("isLogin");
    this.$store.commit("getUserInfo", JSON.parse(userInfo));

    this.token = JSON.parse(localStorage.getItem("token"));
    // console.log(this.token);

    const { paramsTopicId } = this.$route.params;
    // console.log(paramsTopicId);
    this.topic_id = paramsTopicId;
    // console.log(this.id);

    // const { topicId } = this.$route.params;
    if (this.topic_id !== "newCreate") {
      const url = this.token
        ? `/topic/${paramsTopicId}`
        : `/topic/${paramsTopicId}`;
      const res = await this.$axios.get(url);
      this.topic = res.data;
      console.log(this.topic);
      this.title = this.topic.title;
      this.content = this.topic.content;
      console.log(this.title, this.content);
    }
  },
  methods: {
    async createTopic() {
      var num = 0;
      if (num <= 7 && num >= 0) {
        const res = await this.$axios.post("/topics", {
          accesstoken: this.token,
          title: this.title,
          tab: "dev",
          content: this.content,
        });
        num++;
        console.log(res);
        this.topic_id = res.topic_id;
        this.title = "";
        this.content = "";
      } else {
        this.$message.error("一天最多只允许发七次噢");
      }
    },
    // test() {
    //   console.log(this.token);
    //   console.log(this.topic_id);
    //   console.log(this.title);
    //   console.log(this.content);
    // },
    async editTopic() {
      const res = await this.$axios.post("/topics/update", {
        accesstoken: this.token,
        topic_id: this.topic_id,
        title: this.title,
        tab: "job",
        content: this.content,
      });
      console.log(res);
      this.title = "";
      this.content = "";
    },
  },
};
</script>

<style lang="less">
.create {
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
    .title {
      margin: 15px 0;
      textarea {
        border: 1px solid #ccc;
        width: 100%;
        resize: none;
        border-radius: 4px;
        font-size: 16px;
      }
    }
  }
}
</style>