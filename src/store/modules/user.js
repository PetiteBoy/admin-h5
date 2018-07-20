const state = {
  searchId: ''
}
const mutations = {
  UPDATE_SEARCH_ID(state, id) {
    state.searchId = id
  }
}
const actions = {

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
