import axios from 'axios'

const instance = axios.create({
    baseURL:import.meta.env.PROD ? '' : 'http://localhost:4000'
})

instance.interceptors.request.use((config)=>{
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken')
    return config
}, (error) =>{
    return Promise.reject(error)
})

instance.interceptors.response.use((response)=>{
    return response
}, (error) =>{
    if(error.response.data === 'jwt expired') {
        window.location.reload()
    }
    
    return Promise.reject(error)
})


export default instance