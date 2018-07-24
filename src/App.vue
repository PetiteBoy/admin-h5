<template>
  <!-- APP主入口 -->
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import $store from './store'
export default {
  // 组件名
  name: 'app',
  $store
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>

