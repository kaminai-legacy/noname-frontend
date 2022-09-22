import axios from 'axios';
import {
  requestInterceptor, requestInterceptorCatch, responseInterceptor, responseInterceptorCatch,
} from './interceptors';
import config from './config';

// Set config defaults when creating the instance
const instance = axios.create(config);

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = '';

console.log({ ...instance });
console.log(instance.getUri());

instance.interceptors.request.use(requestInterceptor, requestInterceptorCatch);
instance.interceptors.response.use(responseInterceptor, responseInterceptorCatch);

export default instance;
