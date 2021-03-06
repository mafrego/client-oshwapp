import Api from '@/services/Api'
import authHeader from './AuthHeader';

export default {

  index (search) {
    return Api().get('atoms', {
      params: {
        search: search
      }
    })
  },

  show(atomId){
    return Api().get(`atoms/${atomId}`)
  },

  post (atom) {
    return Api()
      .post('atoms', atom, { headers: authHeader() })
  },
  
  addAtomToBom (atom, projectID) {
    return Api()
      .post(`atom/${projectID}`, atom, { headers: authHeader() })
  },
  
  put (atom) {
    return Api()
      .put('atom', atom, { headers: authHeader() })
  },
  
  delete(atomId){
    return Api().delete(`atoms/${atomId}`, { headers: authHeader() })
  }
}
