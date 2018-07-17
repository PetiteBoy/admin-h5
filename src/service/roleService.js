import axios from 'axios'
import config from '../config'

import {
  getSessionStorage
} from '../utils/base.js'
class RoleService {



  getRoleData(params) {
    return axios({
      url: `${config.service.host}/role/page`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  addRoleData(params) {
    return axios({
      url: `${config.service.host}/role/add`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  delRoleData(params) {
    return axios({
      url: `${config.service.host}/role/delete`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  updateRoleData(params) {
    return axios({
      url: `${config.service.host}/role/update`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  searchRolePermission(params) {
    return axios({
      url: `${config.service.host}/role/authorities`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  addRolePermission(params) {
    return axios({
      url: `${config.service.host}/role/config/authorities`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }


  searchRoleMenu(params) {
    return axios({
      url: `${config.service.host}/role/menu`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  addRoleMenu(params) {
    return axios({
      url: `${config.service.host}/role/config/menu`,
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
