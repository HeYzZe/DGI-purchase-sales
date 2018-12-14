const state = {
  receiveList: [], // 领用列表
  testList: [], // 测试列表
};
const getters = {};

const actions = {};

const mutations = {
  // 领用
  addDgiInfo(state, form) {
    state.receiveList.push({ ...form });
  },
  editReceiveDgiList(state, form) {
    state.receiveList[form.index] = { ...form.itemModel };
  },
  setDgiInfo(state, formList) {
    state.receiveList = formList;
  },
  // 测试
  addTestDgiInfo(state, form) {
    state.testList.push({ ...form });
  },
  editTestDgiInfo(state, form) {
    state.testList[form.index] = { ...form.itemModel };
  },
  setTestDgiInfo(state, formList) {
    state.testList = formList;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
