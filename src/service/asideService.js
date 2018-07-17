import axios from 'axios'
import config from '../config'
import store from '../store'


class AsideService {

  getAsideList() {
    return axios({
      url: `${config.service.host}/bguser/menu`,
      method: 'post',
      headers: {
        authKey: store.state.login.authKey
      }
    })
  }

  getAllLeaf() {
    return axios({
      url: `${config.service.host}/menu/all-leaf`,
      method: 'post',
      headers: {
        authKey: store.state.login.authKey
      }
    })
  }


}


const asideService = new AsideService()

export default asideService
