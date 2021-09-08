import axios from 'axios';
// cookies
import { getToken, getUsername } from "./cookie";
// ElementUI 单独引入
import { Message } from 'element-ui';
// 创建实例
const service = axios.create({
    baseURL: '/api', //请求地址
    timeout: 5000 // 超时
})

// 请求拦截器
service.interceptors.request.use( (config) => {
    // 在发送请求前做什么
    config.headers['Token'] = getToken(); // 携带token
    config.headers['Username'] = getUsername(); // 携带token
    return config
}, (error) => {
    // 请求出错
    return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use( (response) => {
    const data = response.data;
    // 不为 0，即接口异常
    if(data.meta.status !== 200){
        Message.error(data.meta.msg)
        return Promise.reject(data)
    }else {
        return Promise.resolve(data)
    }
}, (error) => {
    return Promise.reject(error)
})

export default service