import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Do something before request is sent
const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // check that headers is defined
  config.headers = config.headers ?? {};

  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

const requestInterceptorCatch = (error: AxiosError): Promise<AxiosError> => {
  console.error(error);
  // Do something with request error
  return Promise.reject(error);
};

const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  console.log(response);
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
};

const responseInterceptorCatch = (error: AxiosError): Promise<AxiosError> => {
  console.error(error);
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
};

export {
  requestInterceptor, requestInterceptorCatch, responseInterceptor, responseInterceptorCatch,
};
