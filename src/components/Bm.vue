<template>
  <div class="wrapper">

    <Head></Head>
    <div class="inner">
      <div class="main">
        <Aside class="sidebar" />
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
  data() {
    return {}
  },
  components: {
    Head,
    Aside
  },
  mounted() {
    // 判断用户是否登录
    let authKey = getSessionStorage('authKey')
    if (!authKey) {
      this.$router.push('/bm')
    } else {
      this.$store.dispatch('getAuthkey', authKey)
      // 进入页面会去更新页面菜单
      this.$store.dispatch('getAsideList').then(res => {
        console.log(res)
        if (res.status === '0x5002') {
          this.$router.push('/bm')
        }
      })
    }
  },
  methods: {
    getBtnList(pageId) {
      this.$store.dispatch('getBtnList', {
        pageId
      })
    },
    logout() {
      removeSessionStorage('authKey')
      // this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
  watch: {
    $route: function() {
      let pageId = this.$route.query.pageId
      if (pageId) {
        this.getBtnList(pageId)
      }
    },
    authKey() {
      if (!this.authKey) {
        this.$router.push('/bm')
      }
    }
  }
}
</script>
<style>
.wrapper {
  flex: 1;
  display: flex;
  background: #eeeeee;
  flex-direction: column;
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
  padding: 15px;
  box-sizing: border-box;
  overflow: auto;
}
</style>


