import Api from '@/services/Api'
import authHeader from './AuthHeader';

export default {

  get(){
    return Api().get('todos')
  },

  post (todo) {
    return Api().post('todos', todo, { headers: authHeader() })
  },

  put(id, todo){
      return Api().put(`todos/${id}`, todo)
  },
  
  delete(todoId){
    return Api().delete(`todos/${todoId}`, { headers: authHeader() })
  }
}