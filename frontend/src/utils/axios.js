import axios from 'axios'

const instance = axios.create({
    baseURL:import.meta.env.PROD ? '' : 'http://localhost:4000'
})

export default instance