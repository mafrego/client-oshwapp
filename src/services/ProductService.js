import Api from '@/services/Api'
import authHeader from './AuthHeader';

export default {

  index (search) {
    return Api().get('products', {
      params: {
        search: search
      }
    })
  },

  show(productId){
    return Api().get(`products/${productId}`)
  },

  getChildren(productId){
    return Api().get(`products/children/${productId}`)
  },

  getTree(productId){
    return Api().get(`products/tree/${productId}`)
  },
  
  delete(productId){
    return Api().delete(`products/${productId}`, { headers: authHeader() })
  }
}
