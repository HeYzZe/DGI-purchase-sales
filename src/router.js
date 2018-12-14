import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
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
          component: () => import('./views/Ding/InStorage/InfoList'),
        }, {
          path: 'Information',
          name: 'Information',
          component: () => import('./views/Ding/InStorage/Information'),
        }, {
          path: 'Receive',
          name: 'Receive',
          component: () => import('./views/Ding/Receive/InfoList'),
        }, {
          path: 'ReceiveInfo',
          name: 'ReceiveInfo',
          component: () => import('./views/Ding/Receive/Information'),
        }, {
          path: 'DgiTest',
          name: 'DgiTest',
          component: () => import('./views/Ding/DgiTest/InfoList'),
        }, {
          path: 'DgiTestInfo',
          name: 'DgiTestInfo',
          component: () => import('./views/Ding/DgiTest/Information'),
        }, {
          path: 'Service',
          name: 'Service',
          component: () => import('./views/Ding/Service'),
        }, {
          path: 'OutStorage',
          name: 'OutStorage',
          component: () => import('./views/Ding/OutStorage'),
        }, {
          path: 'OutStorageList',
          name: 'OutStorageList',
          component: () => import('./views/Ding/OutStorage/InfoList'),
        }, {
          path: 'OutStorageInfo',
          name: 'OutStorageInfo',
          component: () => import('./views/Ding/OutStorage/Information'),
        },
      ],
    },
  ],
});
