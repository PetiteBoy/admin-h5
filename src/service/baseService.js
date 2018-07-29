import axios from 'axios'
import config from '../config'
import {
  getSessionStorage
} from '../utils/base.js'


class BaseService {

  basePostData(path, params = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${config.service.host}${path}`,
        method: 'post',
        headers: {
          authKey: getSessionStorage('authKey')
        },
        data: params
      }).then(res => {
        let result = res.data
        if (result.status === '0x5002') {
          location.hash = '/login'
        } else {
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  baseGetData(path, delId) {
    return new Promise((resolve, reject) => {
      let url = ''
      if(delId){
        url = `${config.service.host}${path}?id=${delId}`
      }else{
        url = `${config.service.host}${path}`
      }
     
      axios({
        url: url,
        method: 'get',
        headers: {
          authKey: getSessionStorage('authKey')
        }
      }).then(res => {
        let result = res.data
        if (result.status === '0x5002') {
          location.hash = '/login'
        } else {
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}


const baseService = new BaseService()

export default baseService
