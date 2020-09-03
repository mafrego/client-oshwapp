import Api from '@/services/Api'
import authHeader from './AuthHeader';

export default {
  
  sendBom (formData, projectId) {
    return Api()
      .post(`bomupload/${projectId}`, formData, { headers: authHeader() })
  },

  // checkBom (formData, projectId) {
  //   return Api()
  //     .post(`bomcheck/${projectId}`, formData, { headers: authHeader() })
  // },

  checkBom (formData, projectId) {
    return Api()
      .post(`bomcheck/${projectId}`, formData, { headers: authHeader() })
  },

  uploadImages(formData, projectId) {
    return Api()
      .post(`imagesupload/${projectId}`, formData,{ headers: authHeader()})
  },

  sendSingleFile (file) {
    return Api()
      .post('single/', file, { headers: authHeader() })
  },

  sendMultipleFiles (files) {
    return Api()
      .post('multiple/', files, { headers: authHeader() })
  },

}
