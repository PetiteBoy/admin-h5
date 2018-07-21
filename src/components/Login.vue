<template>
  <div id="login">
    <div class="wrapper">
      <div class="login">
        <div class="loginform">
          <div id="owl-login" :class="{'password': passwordStatus}">
            <div class="hand"></div>
            <div class="hand hand-r"></div>
            <div class="arms">
              <div class="arm"></div>
              <div class="arm arm-r"></div>
            </div>
          </div>
          <div class="pad">
            <div class="control-group">
              <div class="controls">
                <el-input placeholder="请输入账号" id="username" v-model="loginData.username" autofocus></el-input>
              </div>
            </div>
            <div class="control-group">
              <div class="controls">
                <el-input type="password" placeholder="请输入密码" id="password" v-model="loginData.password" @focus="passwordFouce()" @blur="passwordBlur()"></el-input>
              </div>
            </div>
            <div class="control-group">
              <div class="controls">
                <div class="message">账号或密码错误</div>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <el-button type="primary" @click="login()">登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setSessionStorage } from '../utils/base.js'
import loginService from '../service/loginService.js'
export default {
  data() {
    return {
      loginData: {
        username: 'superadmin',
        password: 'superpassword'
      },
      passwordStatus: false
    }
  },
  methods: {
    //  用户登录
    login() {
      if (this.loginData.username && this.loginData.password) {
        loginService
          .login(this.loginData)
          .then(res => {
            setSessionStorage('authKey', res.data.data.authKey)
            this.$router.push('/bm')
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'warning'
            })
          })
      } else {
        this.$message({
          showClose: true,
          message: '请输入账号密码',
          type: 'warning'
        })
      }
    },
    // 密码获取焦点
    passwordFouce() {
      this.passwordStatus = true
    },
    // 密码是去焦点
    passwordBlur() {
      this.passwordStatus = false
    }
  },
  mounted() {}
}
</script>

<style>
#login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url('../assets/login.jpg') no-repeat;
  background-size: cover;
}
#login #owl-login,
#register #owl-login {
  width: 211px;
  height: 108px;
  background: url('../assets/owl-login.png');
  position: absolute;
  top: -100px;
  left: 50%;
  margin-left: -111px;
}
@media all and (-webkit-min-device-pixel-ratio: 1.5),
  (min--moz-device-pixel-ratio: 1.5),
  (-o-min-device-pixel-ratio: 1.5/1),
  (min-device-pixel-ratio: 1.5),
  (min-resolution: 138dpi),
  (min-resolution: 1.5dppx) {
  #login #owl-login,
  #register #owl-login {
    background: url('../assets/owl-login@2x.png');
    -webkit-background-size: 211px 108px;
    -moz-background-size: 211px 108px;
    background-size: 211px 108px;
  }
}
#login #owl-login .hand,
#register #owl-login .hand {
  width: 34px;
  height: 34px;
  -webkit-border-radius: 40px;
  border-radius: 40px;
  background-color: #472d20;
  -webkit-transform: scaleY(0.6);
  -moz-transform: scaleY(0.6);
  -o-transform: scaleY(0.6);
  -ms-transform: scaleY(0.6);
  transform: scaleY(0.6);
  -webkit-transition: 0.3s ease-out;
  -moz-transition: 0.3s ease-out;
  -o-transition: 0.3s ease-out;
  -ms-transition: 0.3s ease-out;
  transition: 0.3s ease-out;
  position: absolute;
  left: 14px;
  bottom: -8px;
}
#login #owl-login .hand.hand-r,
#register #owl-login .hand.hand-r {
  left: 170px;
}
#login #owl-login.password .hand,
#register #owl-login.password .hand {
  -webkit-transform: translateX(42px) translateY(-15px) scale(0.7);
  -moz-transform: translateX(42px) translateY(-15px) scale(0.7);
  -o-transform: translateX(42px) translateY(-15px) scale(0.7);
  -ms-transform: translateX(42px) translateY(-15px) scale(0.7);
  transform: translateX(42px) translateY(-15px) scale(0.7);
}
#login #owl-login.password .hand.hand-r,
#register #owl-login.password .hand.hand-r {
  -webkit-transform: translateX(-42px) translateY(-15px) scale(0.7);
  -moz-transform: translateX(-42px) translateY(-15px) scale(0.7);
  -o-transform: translateX(-42px) translateY(-15px) scale(0.7);
  -ms-transform: translateX(-42px) translateY(-15px) scale(0.7);
  transform: translateX(-42px) translateY(-15px) scale(0.7);
}
#login #owl-login .arms,
#register #owl-login .arms {
  top: 58px;
  position: absolute;
  width: 100%;
  height: 41px;
  overflow: hidden;
}
#login #owl-login .arms .arm,
#register #owl-login .arms .arm {
  width: 40px;
  height: 65px;
  position: absolute;
  left: 20px;
  top: 40px;
  background: url('../assets/owl-login-arm.png');
  -webkit-transition: 0.3s ease-out;
  -moz-transition: 0.3s ease-out;
  -o-transition: 0.3s ease-out;
  -ms-transition: 0.3s ease-out;
  transition: 0.3s ease-out;
  -webkit-transform: rotate(-20deg);
  -moz-transform: rotate(-20deg);
  -o-transform: rotate(-20deg);
  -ms-transform: rotate(-20deg);
  transform: rotate(-20deg);
}
@media all and (-webkit-min-device-pixel-ratio: 1.5),
  (min--moz-device-pixel-ratio: 1.5),
  (-o-min-device-pixel-ratio: 1.5/1),
  (min-device-pixel-ratio: 1.5),
  (min-resolution: 138dpi),
  (min-resolution: 1.5dppx) {
  #login #owl-login .arms .arm,
  #register #owl-login .arms .arm {
    background: url('../assets/owl-login-arm@2x.png');
    -webkit-background-size: 40px 65px;
    -moz-background-size: 40px 65px;
    background-size: 40px 65px;
  }
}
#login #owl-login .arms .arm.arm-r,
#register #owl-login .arms .arm.arm-r {
  -webkit-transform: rotate(20deg) scaleX(-1);
  -moz-transform: rotate(20deg) scaleX(-1);
  -o-transform: rotate(20deg) scaleX(-1);
  -ms-transform: rotate(20deg) scaleX(-1);
  transform: rotate(20deg) scaleX(-1);
  left: 158px;
}
#login #owl-login.password .arms .arm,
#register #owl-login.password .arms .arm {
  -webkit-transform: translateY(-40px) translateX(40px);
  -moz-transform: translateY(-40px) translateX(40px);
  -o-transform: translateY(-40px) translateX(40px);
  -ms-transform: translateY(-40px) translateX(40px);
  transform: translateY(-40px) translateX(40px);
}
#login #owl-login.password .arms .arm.arm-r,
#register #owl-login.password .arms .arm.arm-r {
  -webkit-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  -moz-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  -o-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  -ms-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  transform: translateY(-40px) translateX(-40px) scaleX(-1);
}
#login .loginform,
#register .loginform {
  position: relative;
  border: 1px solid #ddd;
  background-color: #fff;
  position: relative;
  max-width: 400px;
  padding: 0;
  margin: 200px auto 0 auto;
}
#login .loginform.center,
#register .loginform.center {
  text-align: center;
}
#login .loginform.center p,
#register .loginform.center p {
  color: #777;
  margin-bottom: 0;
}
#login .loginform h3,
#register .loginform h3 {
  margin: 0;
  text-align: center;
  color: #333;
  margin-bottom: 10px;
}
#login .loginform .logo,
#register .loginform .logo {
  text-align: center;
}
#login .loginform .controls .message {
  color: #f00;
  font-size: 12px;
  padding: 10px 0;
  text-align: center;
  display: none;
}
#login .loginform .controls,
#register .loginform .controls {
  position: relative;
  margin-bottom: 10px;
}
#login .loginform input,
#register .loginform input {
  color: #444;
}
#login .loginform .pad,
#register .loginform .pad {
  overflow: hidden;
  padding: 30px;
}

#login .loginform .pad .controls {
  position: relative;
}
#login .loginform .pad .controls label {
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 10px;
  color: #666;
}

#login .loginform .pad .el-input__inner {
  padding-left: 30px;
}
#login .loginform .form-actions,
#register .loginform .form-actions {
  border-top: 1px solid #e4e4e4;
  background-color: #f7f7f7;
  padding: 15px 30px;
  text-align: right;
}
#login .copyright {
  text-align: center;
  font-size: 12px;
  padding: 20px 0;
  color: #999;
}
#login .loginform .error,
#register .loginform .error {
  padding-top: 4px;
  font-size: 13px;
  color: #a31717;
}
#login input:-webkit-autofill,
#register input:-webkit-autofill {
  color: #fff !important;
}
</style>
