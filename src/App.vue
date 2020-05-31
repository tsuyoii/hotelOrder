<template>
  <div id="app">
<!--    <div id="nav">-->
<!--    </div>-->
<!--    <Login></Login>-->
<!--    <indexbar></indexbar>-->

<!--
公共模块的内容可以放在App.vue中
但是通常登录页面是不需要导航的，那么就需要规避登录页
这时，就可以采用keep-alive结合$route.meta来实现这个功能。
keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。$route.meta则可以选择让需要的页面才展示。


-->
    <div v-if="$route.meta.keepAlive">
      <indexbar></indexbar>
    </div>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import indexbar from "./components/common/pcindexbar/indexbar";
import Login from "./components/common/login/Login";
export default {
  name: 'app',
  components:{
    Login,
    indexbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #F5F6FA;
  margin: 0;
  padding: 0;
}
/*#nav{*/
/*  padding:30px;*/
/*}*/
/*#nav a{*/
/*  font-weight: bold;*/
/*  color:#2c3e50;*/
/*}*/
</style>
