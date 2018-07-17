<template>
  <div class="head">
    <span>{{realname}}</span>
    <span @click="logout()">退出</span>
  </div>
</template>

<script>
import { removeSessionStorage } from '../utils/base.js'
export default {
  name: '',
  data() {
    return {
      realname: ''
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('loginInfo').then(res => {
        this.realname = res.data.realname
      })
    },
    logout() {
      removeSessionStorage('authKey')
      this.$router.push('/login')
    }
  }
}
</script>
<style>
.head {
  height: 60px;
  background: #545c64;
  width: 100%;
  line-height: 60px;
  color: #ffffff;
  text-align: right;
  padding: 0 10px;
  box-sizing: border-box;
}
.head span {
  cursor: pointer;
  margin-right: 15px;
}
.head span:hover {
  color: #dddddd;
}
</style>

