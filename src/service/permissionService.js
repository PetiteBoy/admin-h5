import axios from 'axios'
import config from '../config'
import {
  getSessionStorage
} from '../utils/base.js'


class PermissionService {


  getPermissionData(params) {
    return axios({
      url: `${config.service.host}/authority/page`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  addPermissionData(params) {
    return axios({
      url: `${config.service.host}/authority/add`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  delPermissionData(id) {
    return axios({
      url: `${config.service.host}/authority/delete?id=${id}`,
      method: 'get',
      headers: {
        authKey: getSessionStorage('authKey')
      }
    })
  }

  updatePermissionData(params) {
    return axios({
      url: `${config.service.host}/authority/update`,
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
