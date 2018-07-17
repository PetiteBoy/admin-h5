import adminService from '../../service/adminService.js'

const state = {}
const mutations = {

}
const actions = {

  // 获取列表
  getAdminData({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      adminService
        .getAdminData(params)
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
  addAdminData({
      commit
    },
    params) {
    return new Promise((resolve, reject) => {
      adminService
        .addAdminData(params)
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
  delAdminData({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      adminService
        .delAdminData(params)
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
  updateAdminData({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      adminService
        .updateAdminData(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //  查询用户权限
  searchAdminPermission({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      adminService
        .searchAdminPermission(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 添加用户无权限
  addAdminPermission({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      adminService
        .addAdminPermission(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 查询用户角色
  searchAdminRole({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      adminService
        .searchAdminRole(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 添加用户角色
  addAdminRole({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      adminService
        .addAdminRole(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 查询用户菜单
  searchAdminMenu({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      adminService
        .searchAdminMenu(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 添加用户菜单
  addAdminMenu({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      adminService
        .addAdminMenu(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}
export default {
  state,
  mutations,
  actions
}
