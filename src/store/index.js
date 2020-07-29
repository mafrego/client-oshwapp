import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import todos from './modules/todos'
import projects from './modules/projects'
// import users from './modules/users'

Vue.use(Vuex)

// if module present has to be here before new Vuex.Store.... otherwise app doesn't load

export default new Vuex.Store({

  strict: process.env.NODE_ENV !== 'production',

  modules: {
    // todos: todos,
    projects: projects,
    // users: users
  },

  plugins: [
    createPersistedState({paths: ['token', 'user', 'isUserLoggedIn', 'projects.projects']})
  ],

  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },

  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    }
  },

  mutations: {
    setToken(state, token) {
      state.token = token
      // state.isUserLoggedIn = !!(token)
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser(state, user) {
      state.user = user
    }
  }

})