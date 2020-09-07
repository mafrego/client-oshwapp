// import axios from 'axios';
import Api from '@/services/Api'
import authHeader from './AuthHeader';

// let url = null

// if (process.env.NODE_ENV === 'production') {
//     url = `https://server-oshwapp.herokuapp.com/`
// } else {
//     url = process.env.VUE_APP_BASE_URL
// }

// const API_URL = url+'api/test/';

class UserService {
  // getPublicContent() {
  //   return axios.get(API_URL + 'all');
  // }

  // getUserBoard() {
  //   return axios.get(API_URL + 'user', { headers: authHeader() });
  // }

  // getAssemblerBoard() {
  //   return axios.get(API_URL + 'assembler', { headers: authHeader() });
  // }

  // getAdminBoard() {
  //   return axios.get(API_URL + 'admin', { headers: authHeader() });
  // }

  put (user) {
    return Api()
      .put('user', user, { headers: authHeader() })
  }
  
  updateQuestionnaire (questionnaire) {
    return Api()
      .put('questionnaire', questionnaire, { headers: authHeader() })
  }
  
}

export default new UserService();