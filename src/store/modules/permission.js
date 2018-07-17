import permissionService from '../../service/permissionService'

const state = {
  permissionData: ['']
}
const mutations = {
  //  更新权限列表数据
  GET_PERMISSION_DATA(state, dataList) {
    state.permissionData = dataList
  }
}
const actions = {

  // 获取列表
  getPermissionData({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      permissionService
        .getPermissionData(params)
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
  addPermissionData({
      commit
    },
    params) {
    return new Promise((resolve, reject) => {
      permissionService
        .addPermissionData(params)
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
  delPermissionData({
    commit
  }, id) {
    return new Promise((resolve, reject) => {
      permissionService
        .delPermissionData(id)
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
  updatePermissionData({
      commit
    },
    params) {
    return new Promise((resolve, reject) => {
      permissionService
        .updatePermissionData(params)
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
