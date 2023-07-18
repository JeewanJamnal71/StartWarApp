import axios, { CancelTokenSource } from 'axios';
import { getItem } from '../utils/AsyncStorage';

const AUTHORIZATION = 'Authorization';

const axiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => error,
);
axiosInstance.interceptors.request.use(async config => {
  //   config.baseURL = await getBaseUrl();
  //   config.cancelToken = cancelSource.getSource().token;
  config.headers[AUTHORIZATION] = await getItem('token');
  return config;
});

export default class HTTPService {
  static get(url, params, callBack) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, { params: params })
        .then(response => {
          resolve(response);
          return;
        })
        .catch(error => {
          reject(error);
          return;
        });
    });
  }

  static put(url, body) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(url, body)
        .then(response => {
          resolve(response);
          return;
        })
        .catch(error => {
          reject(error);
          return;
        });
    });
  }

  static post(url, body) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, body)
        .then(response => {
          resolve(response);
          return;
        })
        .catch(error => {
          reject(error);
          return;
        });
    });
  }

  static delete(url, body) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(url, { data: body })
        .then(response => {
          resolve(response);
          return;
        })
        .catch(error => {
          reject(error);
          return;
        });
    });
  }
}