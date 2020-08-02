import Api from '@/services/Api'
import authHeader from './AuthHeader';

export default {

  index (userID) {
    return Api().get('projects', {
      params: {
        userID: userID
      }
    })  
  },

  // getBom (projectID) {
  //   return Api().get('projectBOM', {
  //     params: {
  //       projectID: projectID
  //     }
  //   })  
  // },

  getBom (projectID) {
    return Api().get(`projectBOM/${projectID}`)  
  },

  getAssemblableProducts(projectId){
    return Api().get(`getassemblables/${projectId}`)
  },

  show(projectId){
    return Api().get(`projects/${projectId}`)
  },

  post(project) {
    return Api()
      .post('projects', project, { headers: authHeader() })
  },

  put(project, projectId) {
    return Api()
      .put(`project/${projectId}`, project, { headers: authHeader() })
  },

  delete(projectId){
    return Api().delete(`projects/${projectId}`, { headers: authHeader() })
  }
}
