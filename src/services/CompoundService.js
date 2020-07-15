import Api from '@/services/Api'
import authHeader from './AuthHeader';

export default {

  index (search) {
    return Api().get('compounds', {
      params: {
        search: search
      }
    })
  },

  show(compoundId){
    return Api().get(`compounds/${compoundId}`)
  },

  post(compound){
    return Api()
      .post('compounds', compound, { headers: authHeader() })
  },
  
  delete(compoundId){
    return Api().delete(`compounds/${compoundId}`, { headers: authHeader() })
  }
}
