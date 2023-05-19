import axios from 'axios'

const instance = axios.create({
    baseURL:import.meta.env.PROD ? '' : 'http://localhost:4000'
})


instance.interceptors.request.use((config)=>{
    if(config.headers) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken')
        return config
    }
}, (error) =>{
    console.log(error)
    return Promise.reject(error)
})


export default instance