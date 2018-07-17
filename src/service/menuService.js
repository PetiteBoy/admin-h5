import axios from 'axios'
import config from '../config'
import {
  getSessionStorage
} from '../utils/base.js'


class MenuService {



  getMenuList(params) {
    return axios({
      url: `${config.service.host}/menu/all`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  addMenu(params) {
    return axios({
      url: `${config.service.host}/menu/add`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }
  editMenu(params) {
    return axios({
      url: `${config.service.host}/menu/update`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }
  delMenu(params) {
    return axios({
      url: `${config.service.host}/menu/delete`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }


}


const menuService = new MenuService()

export default menuService
