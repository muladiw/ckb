// axios
import axios from 'axios'

const axiosIns = axios.create({
    // You can add your headers here
    // ================================
    baseURL: import.meta.env.VITE_APP_BACKENDURL,
    // 'http://localhost:3002/'
    // timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
    responseType: 'json'
})

export default axiosIns