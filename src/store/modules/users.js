// import TodoService from '@/services/TodoService'

const state = () => ({
  token: null,
  user: null,
  isUserLoggedIn: false
})

const getters = {
  getToken: state => state.token,
  getUser: state => state.user,
  isUserLoggedIn: state => state.isUserLoggedIn
}

const actions = {
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  setUser({ commit }, user) {
    commit('setUser', user)
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // state.isUserLoggedIn = !!(token)
    if (token) {
      state.isUserLoggedIn = true
    } else {
      state.isUserLoggedIn = false
    }
  },
    setUser (state, user) {
      state.user = user
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
  }