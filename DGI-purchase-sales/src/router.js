import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home'),
      children: [
        {
          path: '',
          name: 'BusinessManagement',
          component: () => import('./views/Admin/BusinessManagement'),
        },
        {
          path: 'CustomerManagement',
          name: 'CustomerManagement',
          component: () => import('./views/Admin/CustomerManagement'),
        },
        {
          path: 'ManufacturerManagement',
          name: 'ManufacturerManagement',
          component: () => import('./views/Admin/ManufacturerManagement'),
        },
        {
          path: 'StorageManagement',
          name: 'StorageManagement',
          component: () => import('./views/Admin/StorageManagement'),
        },
      ],
    }, {
      path: '/ding',
      component: () => import('./views/Ding/Index'),
      children: [
        {
          path: '/',
          name: 'DingHome',
          component: () => import('./views/Ding/Home'),
        }, {
          path: 'InStorage',
          name: 'InStorage',
          component: () => import('./views/Ding/InStorage'),
        }, {
          path: 'InfoList',
          name: 'InfoList',
          // component: () => import('./views/Ding/InfoListLongPress'),
          component: () => import('./views/Ding/InfoList'),
        }, {
          path: 'Information',
          name: 'Information',
          component: () => import('./views/Ding/Information'),
        },
      ],
    },
  ],
});
