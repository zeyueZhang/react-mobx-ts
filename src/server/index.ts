import axios from 'axios'
import qs from 'query-string';
import { func } from 'prop-types';
import { reject } from 'q';

const config = require('@/configs')

const Axios:any = axios.create({
  baseURL: config.baseURL,
  timeout: config.api.timeout,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
})

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
        resolve(response.date)
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