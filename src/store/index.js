import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import todos from './modules/todos'
import users from './modules/users'

Vue.use(Vuex)

// const userState = createPersistedState({
//   paths: ['token', 'user', 'isUserLoggedIn']
// })

export default new Vuex.Store({
  modules: {
    todos,
    users
  },
  strict: true,

  // plugins: [userState]

  plugins: [
    createPersistedState()
  ],
})
