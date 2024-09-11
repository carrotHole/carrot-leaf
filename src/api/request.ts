import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const whiteList = ['/login', '/register'];

// 创建一个 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做一些事情，例如添加 token
    if (whiteList.includes(config.url)) {
      return config;
    }
    // 设置token
    config.headers.Authorization = SessionStoreUtil.getToken();
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些处理
    return response.data;
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

// 定义请求方法
export const request = {
  get: (url: string, params?: any) => instance.get(url, { params }),
  post: (url: string, data?: any) => instance.post(url, data),
  put: (url: string, data?: any) => instance.put(url, data),
  delete: (url: string, data?: any) => instance.delete(url, { data }),
};
