import Api from '@/services/Api'
import authHeader from './AuthHeader';

export default {

  getAllUsers () {
    return Api().get('allusers', { headers: authHeader() }) 
  },

  getAllProjects () {
    return Api().get('allprojects', { headers: authHeader() }) 
  },

  downloadProjectBop(project){
    return Api().post('downloadprojectbop', project, { headers: authHeader() })
  },

  deleteProject(projectId){
    return Api().delete(`deleteproject/${projectId}`, { headers: authHeader() })
  },

  deleteUser(userId){
    return Api().delete(`deleteuser/${userId}`, { headers: authHeader() })
  }

  // index (search) {
  //   return Api().get('atoms', {
  //     params: {
  //       search: search
  //     }
  //   })
  // },

  // show(atomId){
  //   return Api().get(`atoms/${atomId}`)
  // },

  // post (atom) {
  //   return Api()
  //     .post('atoms', atom, { headers: authHeader() })
  // },
  
  // delete(atomId){
  //   return Api().delete(`atoms/${atomId}`, { headers: authHeader() })
  // }
}
