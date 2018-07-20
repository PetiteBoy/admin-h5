import axios from 'axios'
import config from '../config'

import {
  getSessionStorage
} from '../utils/base.js'
class RoleService {



  getRoleData(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  addRoleData(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  delRoleData(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  updateRoleData(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  searchRolePermission(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  addRolePermission(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }


  searchRoleMenu(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  addRoleMenu(path, params) {
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


const roleService = new RoleService()

export default roleService
