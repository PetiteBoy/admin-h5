import menuService from '../../service/menuService.js'
const state = {
  menuList: []
}
const mutations = {
  GET_MENU_LIST(state, list) {
    state.menuList = list
  }
}
const actions = {

  getMenuList({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      menuService
        .getMenuList(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  addMenu({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      menuService
        .addMenu(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  editMenu({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      menuService
        .editMenu(params)
        .then(res => {
          let result = res.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  delMenu({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      menuService
        .delMenu(params)
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
