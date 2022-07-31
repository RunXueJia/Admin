import axios from "axios";
import { Message } from 'element-ui'
import { setToken, getToken, removeToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_ApiUrl,
    timeout: 6000
})

service.interceptors.request.use(config => {
    if (getToken()) config.headers['x-token'] = getToken()
    return config
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use(response => {
    const { data, errmsg, errno } = response.data
    if (!errno) return data
    Message.error(errmsg)
    return Promise.reject(new Error(errmsg))
}, error => {
    return Promise.reject(error)
})


export default service