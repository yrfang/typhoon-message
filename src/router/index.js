import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Router);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

import DisasterData from '@/components/DisasterData';
import DisasterTable from '@/components/DisasterTable';
import Pagination from '@/components/Pagination';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DisasterData',
      component: DisasterData
    },
  ]
});
