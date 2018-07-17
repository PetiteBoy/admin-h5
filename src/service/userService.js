import axios from 'axios'
import config from '../config'
import store from '../store'


class UserService {

  /**
   * 服务鉴权
   */
  getAuthorization() {
    return {
      authKey: store.state.login.authKey
    }
  }

  getPermissionList() {
    return axios.get(`${config.service.host}/user/audit/query`)
  }

  //   获取按钮列表
  getBtnList() {
    // return axios.get(`${config.service.host}/user/audit/query`)
    return Promise.resolve({
      code: 1,
      message: '',
      data: [{
        path: '',
        id: ''
      }]
    })
  }


  //   用户相关
  getAdmineData() {
    return axios.get(`${config.service.host}/bguser/page`)
  }

  addAdmineData() {
    return axios.get(`${config.service.host}/bguser/add`)
  }

  delAdmineData() {
    return axios.get(`${config.service.host}/bguser/delete`)
  }

  updateAdmineData() {
    return axios.get(`${config.service.host}/bguser/update`)
  }


}


const userService = new UserService()

export default userService
