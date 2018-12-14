import Vue from 'vue';
// import dd from '../../plugins/dingtalk';

const state = {
  commonModel: {}, // 入库公共表单
  commonOutStorage: {}, // 出库公共表单
  dgiInfo: [], // 数采仪详情
  outStorageList: [], // 出库数采仪列表
};
const getters = {
  commonModel(state) {
    return JSON.parse(localStorage.getItem('commonModel')) && state.commonModel;
  },
  // async userInfo(state) {
  //   let userInfo;
  //   if (!state.userInfo.name) {
  //     dd.getAuthCode((code) => {
  //       Vue.http.get(`auth/getUserInfo/${code}`).then((result) => {
  //         userInfo = { ...result.data };
  //       });
  //     });
  //   } else {
  //     userInfo = { state };
  //   }
  //   return userInfo;
  // },
};
const actions = {
  // 获取选择框下拉数据
  async GET_SELECT_TYPE({ state, commit }, params = {}) {
    let val = state[params.codeValue];
    if (val.length === 0) {
      await Vue.http.get('sys/enumCode', {
        params: { ...params },
      }).then((response) => {
        const obj = {};
        obj.list = response.data;
        obj.params = params;
        val = response.data;
        commit('SET_SELECT_TYPE', obj);
      }, ({ response }) => {
        Vue.sys.resp(response);
      });
    }
    return val;
  },
};
const mutations = {
  setCommonModel(state, form) {
    state.commonModel = form;
    localStorage.setItem('commonModel', JSON.stringify(form));
  },
  addInStorageDgi(state, form) {
    state.dgiInfo.push({ ...form });
    // if (localStorage.getItem('dgiInfo')) {
    //   localStorage.setItem('dgiInfo', JSON.stringify(localStorage.getItem('dgiInfo').push(form)));
    // } else {
    //   localStorage.setItem('dgiInfo', JSON.stringify(form));
    // }
  },
  editInStorageDgi(state, form) {
    state.dgiInfo[form.index] = { ...form.itemModel };
  },
  deleteDgiInfo(state, formList) {
    state.dgiInfo = formList;
    // localStorage.setItem('dgiInfo', JSON.stringify(formList));
  },
  // 出库数采仪列表新增，设置
  setCommonOutStorage(state, form) {
    state.commonOutStorage = form;
  },
  addOutStorageDgi(state, form) {
    state.outStorageList.push({ ...form });
  },
  editOutStorageDgi(state, form) {
    state.outStorageList[form.index] = { ...form.itemModel };
  },
  setOutStorageList(state, formList) {
    state.outStorageList = formList;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
