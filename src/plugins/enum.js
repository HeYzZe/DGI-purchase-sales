// 枚举常量 Enum Constant

const enums = {
  // 领用目的
  receivePurpose: {
    1: '测试',
    2: '维修',
  },
  destroyCause: {
    1: '通过',
    2: '不通过',
  },
  // 测试结果
  testResult: {
    1: '通过',
    2: '不通过',
  },
  // 企业类型
  psType: {
    1: '生产厂商',
    2: '客户',
  },
  status: {
    1: '已入库',
    2: '测试中',
    3: '测试不通过',
    4: '测试通过',
    5: '维修中',
    6: '维修完成',
    7: '已出库',
    8: '已报废',
  },
};

export default {
  install(Vue) {
    // eslint-disable-next-line
    Vue.enum = Vue.prototype.$enum = enums;
  },
};
