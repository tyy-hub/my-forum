<template>
  <div id="app">
    <Header/>
    <div class="main">
      <router-view class="left"/>
      <Right-panel class="right"/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import RightPanel from './components/RightPanel.vue'


export default {
  components: { Header, RightPanel },
  name: 'app',
}
</script>

<style lang='less'>
#app{
  .main{
    display: flex;
    .left{
      width: 70%;
      margin:10px 30px;
      margin-right: 30px;
      margin-left: 50px;
    }
    .right{
      width:20%;
      margin-top: 10px;
    }
  }
}
</style>
