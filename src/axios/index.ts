import axios from 'axios'

import config from './config'
import {
  requestInterceptor,
  requestInterceptorCatch,
  responseInterceptor,
  responseInterceptorCatch,
} from './interceptors'

// Set config defaults when creating the instance
const instance = axios.create(config)

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = '';

console.log({ ...instance })
console.log(instance.getUri())

instance.interceptors.request.use(requestInterceptor, requestInterceptorCatch)
instance.interceptors.response.use(responseInterceptor, responseInterceptorCatch)

export default instance

export const apiAxios = axios.create({
  ...config,
  baseURL: config.baseURL + '/api',
  withCredentials: true, // required to handle the CSRF token
})

apiAxios.interceptors.request.use(requestInterceptor, requestInterceptorCatch)
apiAxios.interceptors.response.use(responseInterceptor, responseInterceptorCatch)
