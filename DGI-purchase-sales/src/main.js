import Vue from 'vue';
import ElementUI from 'element-ui';

// 静态资源引入
import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-chalk/display.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// 引入模块
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from './plugins/axios';
import Helper from './plugins/helper';
// import utils from './plugin/utils';
import dd from './plugins/dingtalk';

import './styles/style.scss';

// 组件化
Vue.use(ElementUI, { size: 'mini' });

Vue.use(Axios);
Vue.use(Helper);

Vue.prototype.$dd = dd;
const obj = {
  userId: '用户id',
  psId: 'psId',
  depIds: [1, 2, 3],
};
Vue.http.post('auth/getMenus', obj).then((response) => {
  store.commit('setToken', response.headers.authorization);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
