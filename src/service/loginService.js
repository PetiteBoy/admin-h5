import axios from 'axios'
import config from '../config'
import {
  getSessionStorage
} from '../utils/base.js'

class LoginService {

  login(params) {
    return axios({
      url: `${config.service.host}/user/login`,
      method: 'post',
      params: params
    })
  }

  logout() {
    return axios.get(`${config.service.host}/user/audit/query`)
  }

  loginInfo() {
    return axios({
      url: `${config.service.host}/bguser/info`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      }
    })
  }

}


const loginService = new LoginService()

export default loginService
