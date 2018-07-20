import axios from 'axios'
import config from '../config'
import {
  getSessionStorage
} from '../utils/base.js'


class PermissionService {


  getPermissionData(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  addPermissionData(path, params) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  delPermissionData(path, id) {
    return axios({
      url: `${config.service.host}${path}?id=${id}`,
      method: 'get',
      headers: {
        authKey: getSessionStorage('authKey')
      }
    })
  }

  updatePermissionData(path, params) {
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


const permissionService = new PermissionService()

export default permissionService
