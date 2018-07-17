import loginService from '../../service/loginService.js'
import {
  setSessionStorage
} from '../../utils/base.js'
const state = {
  // 用户的登录状态
  authKey: ''
}
const mutations = {
  GET_AUTHKEY(state, authKey) {
    state.authKey = authKey
  }
}
const actions = {
  // 获取authkey
  getAuthkey({
    commit
  }, authKey) {
    commit('GET_AUTHKEY', authKey)
  },
  // 用户登录
  login({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      loginService
        .login(params)
        .then(data => {
          let result = data.data
          console.log('[loginService][login]', result)
          commit('GET_AUTHKEY', result.data.authKey)
          setSessionStorage('authKey', result.data.authKey)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  logout() {
    loginService
      .logout()
      .then(data => {})
      .catch(err => {})
  },
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
