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

  // assemble(assembly, projectID) {
  //   return Api()
  //     .post(`assembly/${projectID}`, assembly, { headers: authHeader() })
  // },
  
  assembleCopy(assembly, projectID) {
    return Api()
      .post(`assemblycopy/${projectID}`, assembly, { headers: authHeader() })
  },

  // check axios docs for deleting
  disassemble(assemblyId, projectID){
    return Api().delete(`assembly/${assemblyId}`, { headers: authHeader() }, { projectID: projectID})
  },
  
  delete(assemblyId){
    return Api().delete(`assemblies/${assemblyId}`, { headers: authHeader() })
  }
}
