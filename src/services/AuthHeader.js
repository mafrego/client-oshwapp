import store from '../store'

export default function authHeader() {
  
    let user = store.state.user;
    let token = store.state.token;
    console.log('user: '+user+' token: '+token)
  
    if (user && token) {
      return { 'x-access-token': store.state.token };       // for Node.js Express back-end
    } else {
      return {};
    }
  }
  