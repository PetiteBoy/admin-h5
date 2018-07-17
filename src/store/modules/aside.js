import asideService from '../../service/asideService.js'
const state = {
  // 用户的登录状态
  asideList: []
}
const mutations = {
  GET_ASIDE_LIST(state, list) {
    state.asideList = list
  }
}
const actions = {
  getAsideList({
    commit
  }) {
    return new Promise((resolve, resject) => {
      asideService.getAsideList().then((res) => {
        let result = res.data
        if (result.status === '0x0000') {
          commit('GET_ASIDE_LIST', result.data)
        }
        resolve(result)

      }).catch(err => {
        resject(err)
      })
    })
  },

  getAllLeaf({
    commit
  }) {
    return new Promise((resolve, resject) => {
      asideService.getAllLeaf().then((res) => {
        let result = res.data
        resolve(result)
      }).catch(err => {
        resject(err)
      })
    })
  }


}
export default {
  state,
  mutations,
  actions
}
