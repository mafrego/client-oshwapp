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
    return Api().get(`projectBOM/${projectID}`)  
  },

  getAllProducts(projectId){
    return Api().get(`productsbyproject/${projectId}`)
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

  // projectState = { state: state}
  updateProjectState(projectState, projectId) {
    return Api()
      .put(`projectstate/${projectId}`, projectState, { headers: authHeader() })
  },

  updateProject(project, projectId) {
    return Api()
      .put(`project/${projectId}`, project, { headers: authHeader() })
  },

  // projectId = { projectId: projectId}
  updateProjectBom(projectId) {
    return Api().put('projectbom', projectId, { headers: authHeader() })
  },

  delete(projectId){
    return Api().delete(`projects/${projectId}`, { headers: authHeader() })
  },

  deleteBom(projectId){
    return Api().delete(`projectbom/${projectId}`, { headers: authHeader() })
  }
}
