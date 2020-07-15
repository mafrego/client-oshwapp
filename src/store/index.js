import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import todos from './modules/todos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todos
  },
  strict: true,
  plugins: [
    createPersistedState()
  ],
  // TODO create module for the following stuff()
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      // state.isUserLoggedIn = !!(token)
      if(token){
        state.isUserLoggedIn = true
      }else{
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})
