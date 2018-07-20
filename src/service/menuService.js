import axios from 'axios'
import config from '../config'
import {
  getSessionStorage
} from '../utils/base.js'


class MenuService {

  getMenuList(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  addMenu(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }
  editMenu(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }
  delMenu(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  getAllLeaf(path) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      }
    })
  }


  getUserMenu() {
    return axios({
      url: `${config.service.host}/bguser/menu`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      }
    })
  }


}


const menuService = new MenuService()

export default menuService
