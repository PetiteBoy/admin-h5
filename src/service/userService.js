import axios from 'axios'
import config from '../config'


class UserService {

  //   获取按钮列表
  getBtnList() {
    return axios.get(`${config.service.host}/user/audit/query`)
  }

}


const userService = new UserService()

export default userService
