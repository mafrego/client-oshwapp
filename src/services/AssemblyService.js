import Api from '@/services/Api'
import authHeader from './AuthHeader';

export default {

  index (search) {
    return Api().get('assemblies', {
      params: {
        search: search
      }
    })
  },

  show(assemblyId){
    return Api().get(`assemblies/${assemblyId}`)
  },

  post(assembly){
    return Api()
      .post('assemblies', assembly, { headers: authHeader() })
  },

  put(assembly) {
    return Api()
      .put('assembly', assembly, { headers: authHeader() })
  },
  
  assembleCopy(assembly, projectID) {
    return Api()
      .post(`assemblycopy/${projectID}`, assembly, { headers: authHeader() })
  },

  // check axios docs for deleting
  disassemble(assemblyId){
    return Api().delete(`assembly/${assemblyId}`, { headers: authHeader() })
  },
  
  delete(assemblyId){
    return Api().delete(`assemblies/${assemblyId}`, { headers: authHeader() })
  }
}
