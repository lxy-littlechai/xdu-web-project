import axios from 'axios';

// 基础的Axios实例，请求配置以及拦截器都是使用的通用的配置
const local = "/api";
const server = "http://1.14.66.64:3000"
const baseInstance = axios.create({ baseURL: local });

// Shop业务可能前缀都是/shop，可以在这里统一处理，
// 如果需要对请求和返回做特殊处理，也可以在这里加拦截器


export { baseInstance };
