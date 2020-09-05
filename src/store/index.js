import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import projects from './modules/projects'
import UserService from '@/services/UserService'

Vue.use(Vuex)

// if module present has to be here before new Vuex.Store.... otherwise app doesn't load

export default new Vuex.Store({

  strict: process.env.NODE_ENV !== 'production',

  modules: {
    // todos: todos,
    projects: projects,
    // users: users
  },

  // used for dev purpose: do not keep jsw token in local storage in production!
  // plugins: [
  //   createPersistedState({
  //     paths: [
  //       'token', 
  //       'user', 
  //       'isUserLoggedIn', 
  //       'projects.projects', 
  //       'projects.project'
  //     ]
  //   })
  // ],

  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    userLoading: false,
    userError: null
  },

  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    async reviseUser({commit, state}) {
        try {
            commit('setUserLoading', true)
            const response = await UserService.put(state.user)
            commit('updateUser', response.data)
            return response
        } catch (error) {
            commit('setUserError', error)
        } finally {
            commit('setUserLoading', false)
        }
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
    },
    updateUser(state, user){
      state.user = user
    },
    updateUserDescription(state, description) {
      state.user.description = description
    },
    setUserLoading(state, userLoading){
      state.userLoading = userLoading
    },
    setUserError(state, userError){
      state.userError = userError
    },
  }

})