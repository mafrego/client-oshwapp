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

  getBom (projectID) {
    return Api().get('projectBOM', {
      params: {
        projectID: projectID
      }
    })  
  },

  show(projectId){
    return Api().get(`projects/${projectId}`)
  },

  post(project) {
    return Api()
      .post('projects', project, { headers: authHeader() })
  },

  put(state, projectId) {
    return Api()
      .put(`project/${projectId}`, state, { headers: authHeader() })
  },

  delete(projectId){
    return Api().delete(`projects/${projectId}`, { headers: authHeader() })
  }
}
