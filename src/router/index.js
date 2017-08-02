import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Paginate from 'vuejs-paginate';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Router);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(Paginate);

import DisasterData from '@/components/DisasterData';
import DisasterTable from '@/components/DisasterTable';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DisasterData',
      component: DisasterData
    },
  ]
})
