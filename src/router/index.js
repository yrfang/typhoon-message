import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Icon from 'vue-awesome/components/Icon'

Vue.use(Router);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.component('icon', Icon);

import DisasterData from '@/components/DisasterData';
import DisasterTable from '@/components/DisasterTable';
import Pagination from '@/components/Pagination';
import DisasterMap from '@/components/DisasterMap';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DisasterData',
      component: DisasterData,
      props: true,
    },
    {
      path: '/map',
      name: 'DisasterMap',
      component: DisasterMap,
      // props: true,
    },
  ]
});
