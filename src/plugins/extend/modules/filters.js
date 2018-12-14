import Vue from 'vue';

import { formatDate, formatTime } from '@/plugins/helper';

const date = (dateStr) => {
  if (typeof dateStr !== 'string') return '';
  if (dateStr.length <= 10) return dateStr;
  return dateStr.slice(0, 10);
};

// 自定义过滤器
const filters = {
  formatDate,
  formatTime,
  date,
};

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
