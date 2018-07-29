<template>
  <div class="wrapper">

    <!-- 头部 -->

    <Head class="head"></Head>
    <div class="inner">
      <div class="main">
        <!-- 侧边导航 -->
        <Aside></Aside>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../components/Head.vue'
import Aside from './Aside'
import { getSessionStorage, removeSessionStorage } from '../utils/base.js'
export default {
  name: 'App',
  components: {
    Head,
    Aside
  },
  mounted() {
    // 判断用户是否登录
    let authKey = getSessionStorage('authKey')
    if (!authKey) {
      this.$router.push('/login')
    }
  },
  methods: {
    getBtnList(pageId) {
      this.$store.dispatch('getBtnList', {
        pageId
      })
    }
  },
  watch: {
    $route: function() {
      let pageId = this.$route.query.pageId
      if (pageId) {
        // this.getBtnList(pageId)
      }
    }
  }
}
</script>
<style>
.wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 1440px;
  min-height: 716px;
}
.head {
  box-shadow: 0px 1px 3px 0px rgba(140, 140, 140, 0.5);
}
.inner {
  display: flex;
  flex: 1;
}
.main {
  display: flex;
  flex: 1;
  flex-direction: row;
}
.content {
  flex: 1;
  box-sizing: border-box;
  overflow: auto;
}
</style>


