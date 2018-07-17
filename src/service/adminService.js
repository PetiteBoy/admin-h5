import axios from 'axios'
import config from '../config'
import {
  getSessionStorage
} from '../utils/base.js'


class AdminService {

  getAdminData(params) {
    return axios({
      url: `${config.service.host}/bguser/page`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  addAdminData(params) {
    return axios({
      url: `${config.service.host}/bguser/add`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  delAdminData(params) {
    return axios({
      url: `${config.service.host}/bguser/delete`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  updateAdminData(params) {
    return axios({
      url: `${config.service.host}/bguser/update`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  searchAdminPermission(params) {
    return axios({
      url: `${config.service.host}/bguser/privilege/authorities`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  addAdminPermission(params) {
    return axios({
      url: `${config.service.host}/bguser/config/privilege/authorities`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  searchAdminRole(params) {
    return axios({
      url: `${config.service.host}/bguser/roles`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  addAdminRole(params) {
    return axios({
      url: `${config.service.host}/bguser/config/roles`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  searchAdminMenu(params) {
    return axios({
      url: `${config.service.host}/bguser/privilege/menu`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  addAdminMenu(params) {
    return axios({
      url: `${config.service.host}/bguser/config/privilege/menu`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }





}


const adminService = new AdminService()

export default adminService
