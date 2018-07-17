import userService from '../../service/userService.js'
const state = {
  btnList: [],
  searchId: ''
}
const mutations = {
  UPDATE_SEARCH_ID(state, id) {
    state.searchId = id
  },
  GET_BTN_LIST(state, btnList) {
    state.btnList = btnList
  }
}
const actions = {

  getBtnList({
    commit
  }, params) {
    console.log('[getBtnList]===>', params.pageId)
    userService.getBtnList(params).then((res) => {
      commit('GET_BTN_LIST', res.data)
    })
  },

  updateSearchId({
    commit
  }, id) {
    commit('UPDATE_SEARCH_ID', id)
  }

}
export default {
  state,
  mutations,
  actions
}
