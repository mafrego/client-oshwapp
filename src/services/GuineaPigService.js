import Api from '@/services/Api'
import authHeader from './AuthHeader';

export default {

  create(guinea_pig) {
    return Api()
      .post('guinea_pigs', guinea_pig, { headers: authHeader() })
  },

  getAll(){
    return Api().get('guinea_pigs')
  },
  
  search(search) {
    return Api().get('guinea_pigs_search', {
      params: {
        search: search
      }
    })
  },

  read(guinea_pigId){
    return Api().get(`guinea_pigs/${guinea_pigId}`)
  },

  update(guinea_pig) {
    return Api()
      .put('guinea_pig', guinea_pig, { headers: authHeader() })
  },
  
  delete(guinea_pigId){
    return Api().delete(`guinea_pigs/${guinea_pigId}`, { headers: authHeader() })
  }
}
