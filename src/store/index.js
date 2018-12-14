import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Message from 'element-ui';
import dd from '../plugins/dingtalk';
import InStorage from './modules/InStorage';
import Receive from './modules/Receive';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: window.localStorage.getItem('token') || '',
    userInfo: {}, // 用户信息
    customerList: [], // 购买商企业列表
    PsBaseList: [], // 生产商企业列表
  },
  getters: {
    isMob() {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    },
    loginStatus: state => state.token,
  },
  mutations: {
    // 获取 token
    setToken(state, token) {
      window.localStorage.setItem('token', token);
    },
    setUserInfo(state, data) {
      state.userInfo = data;
      localStorage.setItem('userInfo', JSON.stringify(data));
    },
    setCustomerList(state, data) {
      state.customerList = data;
    },
    setPsBaseList(state, data) {
      state.PsBaseList = data;
    },
  },
  actions: {
    async GET_TOKEN({ state, commit }, body) {
      return new Promise((resolve, reject) => {
        const obj = body ? { ...body } : {
          userId: state.userInfo.userid,
          psId: 'psId',
          depIds: state.userInfo.department,
        };
        Vue.http.post('auth/getMenus', obj).then((response) => {
          axios.defaults.headers.common.Authorization = response.headers.authorization;
          commit('setToken', response.headers.authorization);
          resolve(response);
        }).catch((response) => {
          reject(response);
        });
      });
    },
    GET_USER_INFO({ commit }) {
      return new Promise((resolve, reject) => {
        dd.getAuthCode((code) => {
          Vue.http.get(`auth/getUserInfo/${code}`).then((result) => {
            commit('setUserInfo', { ...result.data });
            resolve(result);
          }).catch((response) => {
            reject(response);
          });
        });
      });
    },
    GET_CUSTOMER_LIST({ state, commit }) {
      if (state.customerList.length === 0) {
        Vue.http.get('dgi/psBaseInfo', {
          params: {
            psName: '',
            psType: 2,
            page: 1,
            rows: 100,
          },
        }).then((response) => {
          if (response.status === 200) {
            commit('setCustomerList', [...response.data.rows]);
          } else {
            Message({
              showClose: true,
              message: response.data.message,
              type: 'error',
            });
          }
        }, ({ response }) => {
          Vue.hp.resp(response);
        });
      }
    },
    GET_PSBASE_LIST({ state, commit }) {
      if (state.PsBaseList.length === 0) {
        Vue.http.get('dgi/psBaseInfo', {
          params: {
            psName: '',
            psType: 1,
            page: 1,
            rows: 100,
          },
        }).then((response) => {
          if (response.status === 200) {
            commit('setPsBaseList', [...response.data.rows]);
          } else {
            Message({
              showClose: true,
              message: response.data.message,
              type: 'error',
            });
          }
        }, ({ response }) => {
          Vue.hp.resp(response);
        });
      }
    },
  },
  modules: {
    InStorage,
    Receive,
  },
});
