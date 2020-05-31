"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from "qs"


//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8099'

axios.interceptors.request.use(
    config => {
      console.log(config)
      // if (localStorage.getItem('Authorization')) {
      // config.headers.Authorization = localStorage.getItem('Authorization');
      config.headers.Authorization = window.sessionStorage.getItem('token');
      console.log(config)
      // }
      return config;
    },
    error => {
      return Promise.reject(error);
    });

//使得每一个vue的组件都可以通过this直接访问到$http从而发送ajax请求
Vue.prototype.$http = axios

Vue.prototype.qs = qs;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
