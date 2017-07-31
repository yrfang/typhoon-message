import Vue from 'vue'
import Router from 'vue-router'
// import jQuery from 'jQuery'
import DisasterData from '@/components/DisasterData'
import DisasterTable from '@/components/DisasterTable'

// import 'jquery'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
// Vue.use(Jquery)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DisasterData',
      component: DisasterData
    },
  ]
})
