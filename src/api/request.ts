import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import SessionStoreUtil from '@/util/sessionStoreUtil'
import MessageUtil from '@/util/MessageUtil'

const whiteList = ['login/username', 'login/token']

class AxiosService {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000, // 设置超时时间
    });

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        for (let i = 0; i < whiteList.length; i++){
          const whiteItem = whiteList[i]

          if (config.url && config.url.includes(whiteItem)){
            return config
          }
        }

        // 添加token到headers
        config.headers['Authorization'] = SessionStoreUtil.getToken();
        return config;
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 对响应数据做点什么
        if (response.data.code !== 200) {
          // 提示错误信息
          MessageUtil.error(response.data.msg);
          // 中断返回
          return Promise.reject(response.data);
        }
        return response.data;
      },
      (error) => {
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }

  // GET请求
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  // POST请求
  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  // PUT请求
  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  // PATCH请求
  public patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }

  // DELETE请求
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
}

const request = new AxiosService('');

export default request;
