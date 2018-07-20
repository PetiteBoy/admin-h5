import axios from 'axios'
import config from '../config'

import {
  getSessionStorage
} from '../utils/base.js'
class VideoService {

  getVideoData(params) {
    return axios({
      url: `${config.service.host}/video/page`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  addVideoData(params) {
    return axios({
      url: `${config.service.host}/video/add`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  delVideoData(params) {
    return axios({
      url: `${config.service.host}/video/delete`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      params
    })
  }

  updateVideoData(params) {
    return axios({
      url: `${config.service.host}/video/update`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

  getVideoDetail(params) {
    return axios({
      url: `${config.service.host}/role/detail`,
      method: 'post',
      headers: {
        authKey: getSessionStorage('authKey')
      },
      data: params
    })
  }

}


const videoService = new VideoService()

export default videoService
