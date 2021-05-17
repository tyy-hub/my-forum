<template>
  <div class="api">
    <Panel>
      <template #header>
        <div class="nav">
          <span>主页</span>
          <span> / </span>
          <span>API</span>
        </div>
      </template>
      <template #content>
        <div class="container">
          <p>
            以下 api 路径均以<a href=" https://cnodejs.org/api/v1">
              https://cnodejs.org/api/v1</a
            >为前缀
          </p>
          <h3>主题</h3>
          <h4>get/topics 主题首页</h4>
          <p>接收 get 参数</p>
          <ul>
            <li>page<code> Number </code>页数</li>
            <li>
              tab<code> String </code>主题分类。目前有<code> ask </code
              ><code> share </code><code> job </code><code> good </code>
            </li>
            <li>limit<code> Number </code>每一页的主题数量</li>
            <li>
              mdrender<code> String </code>当为<code> false </code
              >时，不渲染。默认为<code> true </code>，渲染出现的所有 markdown
              格式文本
            </li>
          </ul>
          <p>示例：<a href="/api/v1/topics">/api/v1/topics</a></p>
          <h4>get/topics/:id 主题详情</h4>
          <p>接收 get 参数</p>
          <ul>
            <li>
              mdrender<code> String </code>当为<code> false </code
              >时，不渲染。默认为<code> true </code>，渲染出现的所有 markdown
              格式文本
            </li>
            <li>
              accesstoken<code> String </code
              >当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的<code>
                is_collect </code
              >以及<code> replies </code>列表中的<code> is_uped </code>值 。
            </li>
          </ul>
          <p>
            示例：<a href="/api/v1/topic/5433d5e4e737cbe96dcef312"
              >/api/v1/topic/5433d5e4e737cbe96dcef312</a
            >
          </p>
          <h4>post/topics 新建主题</h4>
          <p>接收 post 参数</p>
          <ul>
            <li>accesstoken<code> String </code>用户的 accessToken</li>
            <li>title<code> String </code>标题</li>
            <li>
              tab<code> String </code>目前有<code> ask </code
              ><code> share </code><code> job </code
              ><code> dev </code
              >。新开发新客户端的同学，请务必将你们的测试贴发在<code>
                dev
              </code>
              专区，以免污染日常的片面，否则会进行封号一周处理。
            </li>
            <li>content<code> String </code>主体内容</li>
          </ul>
          <p>返回值示例</p>
          <code>{success: true, topic_id: '5433d5e4e737cbe96dcef312'}</code>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
};
</script>

<style lang="less">
.api {
  width: 70%;
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
    a {
      color: #0088cc;
    }
    a:hover {
      text-decoration: underline;
    }
    h3 {
      border-bottom: 1px solid #ccc;
    }
    h4 {
      border-bottom: 1px solid #ccc;
      margin-top: 30px;
    }
    ul {
      li {
        line-height: 2em;
      }
    }
  }
}
</style>