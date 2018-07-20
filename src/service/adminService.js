import axios from 'axios'
import config from '../config'
import {
  getSessionStorage
} from '../utils/base.js'


class AdminService {

  getAdminData(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  addAdminData(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  delAdminData(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  updateAdminData(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  searchAdminPermission(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  addAdminPermission(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  searchAdminRole(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  addAdminRole(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  searchAdminMenu(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  addAdminMenu(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
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
