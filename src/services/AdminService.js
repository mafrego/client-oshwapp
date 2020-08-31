import Api from '@/services/Api'
import authHeader from './AuthHeader';

export default {

  getAllUsers () {
    return Api().get('allusers', { headers: authHeader() }) 
  },

  getAllProjects () {
    return Api().get('allprojects', { headers: authHeader() }) 
  },

  deleteProject(projectId){
    return Api().delete(`deleteproject/${projectId}`, { headers: authHeader() })
  },

  deleteUser(userId){
    return Api().delete(`deleteuser/${userId}`, { headers: authHeader() })
  }
}
