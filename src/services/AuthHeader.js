import store from '../store'

export default function authHeader() {
  
    let user = store.state.users.user;
    let token = store.state.users.token;
    // console.log('user: '+user+' token: '+token)
  
    if (user && token) {
      return { 'x-access-token': store.state.users.token }; 
    } else {
      return {};
    }
  }
  