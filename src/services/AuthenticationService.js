import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api()
      .post('register', credentials)

      //if there is an error this will be propagated to the calling function(in this case in Register.vue)
  },

  login (credentials) {
    return Api()
      .post('login', credentials)
  }
}
