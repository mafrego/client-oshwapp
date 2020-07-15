import axios from 'axios'

export default () => {
    return axios.create({
        // baseURL: `http://localhost:8081/`
        // baseURL: `http://192.168.1.109:8081/`
        baseURL: process.env.VUE_APP_BASE_URL
    })
}