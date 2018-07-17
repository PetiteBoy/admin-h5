<template>
  <div class="login">
    <div class="title">登录后台管理</div>
    <el-form label-position="left" label-width="0" :model="loginData" ref="logindata" :rules="rules">
      <el-form-item label="" prop="username">
        <el-input v-model="loginData.username" placeholder="请输入用户名" auto-complete="name"></el-input>
      </el-form-item>
      <el-form-item label="" prop=" password ">
        <el-input v-model="loginData.password " placeholder="请输入密码" type="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('logindata')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      loginData: {
        username: 'superadmin',
        password: 'superpassword'
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('login', this.loginData)
            .then(res => {
              if (res.status === '0x0000') {
              } else {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: 'warning'
                })
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                showClose: true,
                message: '服务异常请充实',
                type: 'warning'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
.title {
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
  text-align: center;
}
.login {
  width: 300px;
  text-align: center;
  margin: 0 auto;
}
</style>

