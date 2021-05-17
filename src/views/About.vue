<template>
  <div class="about">
    <Panel>
      <template #header>
        <div class="nav">
          <span>主页</span>
          <span> / </span>
          <span>关于</span>
        </div>
      </template>
      <template #content>
        <div class="container">
          <h3>关于</h3>
          <p>
            CNode 社区为国内最大最具影响力的 Node.js 开源技术社区，致力于
            Node.js 的技术研究。
          </p>
          <p>
            CNode 社区由一批热爱 Node.js
            技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对
            Node.js 感兴趣的朋友。
          </p>
          <p>CNode 的 SLA 保证是，一个9，即 90.000000%。</p>
          <p>
            社区目前由<a href="@alsotang">@alsotang</a>在维护，有问题请联系:<a
              href="https://github.com/alsotang"
              >https://github.com/alsotang</a
            >
          </p>
          <p>
            请关注我们的官方微博<a href="http://weibo.com/cnodejs"
              >http://weibo.com/cnodejs</a
            >
          </p>
          <h3>移动客户端</h3>
          <p>客户端由<a href="@soliury">@soliury</a>开发维护</p>
          <p>
            源码地址：<a href=" https://github.com/soliury/noder-react-native">
              https://github.com/soliury/noder-react-native</a
            >。
          </p>
          <p>立即体验 CNode 客户端，直接扫描页面右侧二维码。</p>
          <p>
            另，安卓用户同时可选择：<a
              href="https://github.com/TakWolf/CNode-Material-Design"
              >https://github.com/TakWolf/CNode-Material-Design</a
            >
            ，这是 Java 原生开发的安卓客户端。
          </p>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  created() {
    const res = localStorage.getItem("isLogin");
    this.$store.commit("getUserInfo", JSON.parse(res));
  },
};
</script>

<style lang="less">
.about {
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
      margin-top: 30px;
      margin-bottom: 5px;
    }
    h3:first-child {
      margin-top: 0;
    }
    p {
      line-height: 2em;
    }
  }
}
</style>