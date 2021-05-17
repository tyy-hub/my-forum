<template>
  <div class="getstart">
    <Panel>
      <template #header>
        <div class="nav">
          <span>主页</span>
          <span> / </span>
          <span>Node.js 新手入门</span>
        </div>
      </template>
      <template #content>
        <div class="container">
          <h2>Node.js 入门</h2>
          <p>《汇智网 Node.js 课程》</p>
          <p>
            <a href="http://www.hubwiz.com/course/?type=nodes"
              >http://www.hubwiz.com/course/?type=nodes</a
            >
          </p>
          <p>《快速搭建Node.js 开发环境及加速npm》</p>
          <p>
            <a
              href="http://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html"
              >http://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html</a
            >
          </p>
          <p>《Node.js 包教不会包》</p>
          <p>
            <a href="https://github.com/alsotang/node-lessons"
              >https://github.com/alsotang/node-lessons</a
            >
          </p>
          <p>《ECMAScript 6 入门》</p>
          <p>
            <a href="http://es6.ruanyifeng.com/">http://es6.ruanyifeng.com/</a>
          </p>
          <p>《七天学会 NodeJS》</p>
          <p>
            <a href="https://github.com/nqdeng/7-days-nodejs"
              >https://github.com/nqdeng/7-days-nodejs</a
            >
          </p>
          <p>《Node 入门-一本全面的Node.js 教程》</p>
          <p>
            <a href="http://www.nodebeginner.org/index-zh-cn.html"
              >http://www.nodebeginner.org/index-zh-cn.html</a
            >
          </p>
          <h2>Node.js 资源</h2>
          <p>《node weekly》</p>
          <p>
            <a href="http://nodeweekly.com/issues"
              >http://nodeweekly.com/issues</a
            >
          </p>
          <p>《node123-node.js中文资料导航》</p>
          <p>
            <a href="https://github.com/youyudehexie/node123"
              >https://github.com/youyudehexie/node123</a
            >
          </p>
          <p>《A curated list of delightful Node.js packages and resources》</p>
          <p>
            <a href="https://github.com/sindresorhus/awesome-nodejs"
              >https://github.com/sindresorhus/awesome-nodejs</a
            >
          </p>
          <p>《Node.js Books》</p>
          <p>
            <a href="https://github.com/pana/node-books"
              >https://github.com/pana/node-books</a
            >
          </p>
          <h2>Node.js 名人</h2>
          <p>《名人堂》</p>
          <p>
            <a href="https://github.com/cnodejs/nodeclub/wiki/名人堂"
              >https://github.com/cnodejs/nodeclub/wiki/名人堂</a
            >
          </p>
          <h2>Node.js 服务器</h2>
          <p>
            新手搭建 Node.js 服务器，推荐使用无需备案的
            <a href="DigitalOcean(https://www.digitalocean.com/)"
              >DigitalOcean(https://www.digitalocean.com/)</a
            >
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
.getstart {
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
    a {
      color: #0088cc;
    }
    a:hover {
      text-decoration: underline;
    }
    h2 {
      margin-top: 30px;
      border-bottom: 1px solid #ccc;
    }
    h2:first-child {
      margin-top: 0;
    }
    p {
      height: 25px;
      line-height: 25px;
    }
  }
}
</style>