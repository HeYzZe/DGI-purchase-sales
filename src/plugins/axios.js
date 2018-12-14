import axios from 'axios';
import nprogress from 'nprogress';
import qs from 'qs';
import store from '../store/index';

const Axios = axios.create({
  timeout: 5000,
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' }),
});

// const { CancelToken } = axios;
// const requestMap = new Map();

// // 是否启用自动刷新 token
// const canRefresh = window.localStorage.getItem('canRefresh');

// // 检测 token 到期
// const checkExpireToken = error => new Promise((resolve, reject) => {
//   if (!canRefresh) {
//     store.commit('auth/Logout');
//     window.location.reload();
//     return reject(error);
//   }
//   return store.dispatch('auth/RefreshToken', error.config).then((newResponse) => {
//     resolve(newResponse);
//   });
// });

// // 请求前置拦截器
Axios.interceptors.request.use(
  (config) => {
    // 显示请求发送状态
    nprogress.configure({ showSpinner: false });
    nprogress.start();

    // 设置凭证
    if (config.url !== 'auth/getMenus') {
      if (store.state.token && !config.headers.Authorization) {
        config.headers.Authorization = store.state.token;
      }
    }

    // 防止重复请求
    // const keyString = qs.stringify(Object.assign({}, { url: config.url, method: config.method }, config.data));
    // if (requestMap.get(keyString)) {
    //   config.cancelToken = new CancelToken((cancel) => {
    //     cancel('请求发送中...');
    //   });
    // }
    // requestMap.set(keyString, true);
    // Object.assign(config, { ckeyString: keyString });

    return config;
  },
  error => Promise.reject(error)
);

// // 响应前置拦截器
Axios.interceptors.response.use(
  (response) => {
    // 完成进度条
    nprogress.done();

    // 重置requestMap
    // const { config } = response;
    // requestMap.set(config.ckeyString, false);

    // if (response.data.success && response.data.data.token) {
    //   store.commit('auth/SetToken', response.data.data.token);
    // }

    return response;
  },
  // (error) => {
  //   requestMap.set(error.config.ckeyString, false);

  //   if (!/auth\/jwt\/token/.test(error.config.url) && error.data.code === 500) {
  //     return checkExpireToken(error);
  //   }

  //   return Promise.reject(error);
  // }
);

export default {
  install(Vue) {
    // eslint-disable-next-line
    Vue.http = Vue.prototype.$http = Axios;
  },
};
