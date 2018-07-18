import loginService from '../../service/loginService.js'
import {
  setSessionStorage
} from '../../utils/base.js'
const state = {}
const mutations = {}
const actions = {
  // 用户登录
  login({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      loginService
        .login(params)
        .then(data => {
          let result = data.data
          setSessionStorage('authKey', result.data.authKey)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 用户退出
  logout() {
    loginService
      .logout()
      .then(data => {})
      .catch(err => {})
  },
  // 获取登录用户信息
  loginInfo() {
    return new Promise((resolve, reject) => {
      loginService
        .loginInfo()
        .then(data => {
          let result = data.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export default {
  state,
  mutations,
  actions
}
