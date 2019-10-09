import axios from 'axios'
import qs from 'query-string';
import config from '@/configs';

const Axios:any = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: config.api.timeout,
  withCredentials: true,
  headers: {
    // "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  },
  // proxy: "http://127.0.0.1:8888"
})

// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Axios.interceptors.request.use( (config: any) => {
  if (config.method === "post") {
    config.data = qs.stringify(config.data);
  }
  // 请求头修改
  // if (localStorage.token) {
  //   config.headers.Authorization = localStorage.token;
  // }
  return config;
},  (error: any) => {
  return Promise.reject(error);
})

Axios.interceptors.response.use( (response: any) => {
  
  return response;
},  (error: any) => {
  return Promise.reject(error);
});


const request = function(method: string, url: string, params: any, config?: object) {
  return new Promise((resolve, reject) => {
    Axios[method](url, params, Object.assign({}, config))
      .then((response: any) => {
        resolve(response.data)
      }, (err: any) => {
        if (err.Cancel) {
          console.log(err)
        } else {
          reject(err)
        }
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

class Http {
  post: (url: string, params: any) => Promise<any>;
  get: (url: string, params: any) => Promise<any>;
  constructor() {
    this.post = function(url: string, params: any) {
      return new Promise((resolve, reject) => {
        request('post', url, params)
          .then((res: any) => {
            resolve(res)
          })
          .catch((err: any) => {
            reject(err)
          })
      })
    };
    this.get = function(url: string, params: any) {
      return new Promise((resolve, reject) => {
        request('get', url, {'params': {...params}})
          .then((res: any) => {
            resolve(res)
          })
          .catch((err: any) => {
            reject(err)
          })
      })
    };;
  }
}

export default new Http()