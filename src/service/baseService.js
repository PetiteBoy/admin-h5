import axios from 'axios'
import config from '../config'
import {
  getSessionStorage
} from '../utils/base.js'


class BaseService {

  basePostData(path, params = {}) {
    return axios({
      url: `${config.service.host}${path}`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  baseGetData(path, delId) {
    return axios({
      url: `${config.service.host}${path}?id=${delId}`,
      method: 'get',
      headers: {
        authKey: getSessionStorage('authKey')
      }
    })
  }
}


const baseService = new BaseService()

export default baseService
