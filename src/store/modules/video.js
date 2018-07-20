import videoService from '../../service/videoService'

const state = {}
const mutations = {}
const actions = {

  // 获取列表
  getVideoData({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      videoService
        .getRoleData(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //   添加
  addVideoData({
      commit
    },
    params) {
    return new Promise((resolve, reject) => {
      videoService
        .addRoleData(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 删除  
  delVideoData({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      videoService
        .delRoleData(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  //   修改
  updateVideoData({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      videoService
        .updateRoleData(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 查询详情
  getVideoDetail({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      videoService
        .getVideoDetail(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

}
export default {
  state,
  mutations,
  actions
}
