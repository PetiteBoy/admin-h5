import axios from 'axios'
import config from '../config'
import {
  getSessionStorage
} from '../utils/base.js'

class AsideService {

  getAsideList() {
    return axios({
      url: `${config.service.host}/bguser/menu`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      }
    })
  }

  getAllLeaf() {
    return axios({
      url: `${config.service.host}/menu/all-leaf`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      }
    })
  }


}


const asideService = new AsideService()

export default asideService
