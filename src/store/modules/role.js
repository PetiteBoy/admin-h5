import roleService from '../../service/roleService'

const state = {}
const mutations = {

}
const actions = {

  // 获取列表
  getRoleData({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      roleService
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
  addRoleData({
      commit
    },
    params) {
    return new Promise((resolve, reject) => {
      roleService
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
  delRoleData({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      roleService
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
  updateRoleData({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      roleService
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
  // 查询角色已有权限
  searchRolePermission({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      roleService
        .searchRolePermission(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 添加角色权限
  addRolePermission({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      roleService
        .addRolePermission(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 查询角色菜单
  searchRoleMenu({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      roleService
        .searchRoleMenu(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 添加角色菜单
  addRoleMenu({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      roleService
        .addRoleMenu(params)
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
