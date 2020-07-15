import axios from 'axios'

let url = null

if (process.env.NODE_ENV === 'production') {
    url = 'https://server-oshwapp.herokuapp.com:80/'
} else {
    url = process.env.VUE_APP_BASE_URL
}

export default () => {
    return axios.create({
        // baseURL: `http://localhost:8081/`
        // baseURL: `http://192.168.1.109:8081/`
        baseURL: url
    })
}