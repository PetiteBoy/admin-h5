<template>
  <div class="head">
    <div class="head-left">
      满分审验教育后台管理系统
    </div>
    <div class="head-right">
      <span>{{realname}}</span>
      <span @click="logout()">退出</span>
    </div>

  </div>
</template>

<script>
import { removeSessionStorage } from '../utils/base.js'
import loginService from '../service/loginService.js'
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
      loginService.loginInfo().then(res => {
        this.realname = res.data.data.username
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
  box-sizing: border-box;
  display: flex;
  z-index: 1;
}
.head-left {
  width: 250px;
  background: rgba(67, 74, 80, 1);
  line-height: 60px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
}
.head-right {
  color: #000;
  flex: 1;
  background: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(140, 140, 140, 0.5);
}
.head span {
  cursor: pointer;
  margin-right: 15px;
}
.head span:hover {
  /* color: #dddddd; */
}
</style>

