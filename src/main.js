// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import jQuery from 'jquery';
import router from '../src/router.js'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
//import 'material-design-icons-iconfont/dist/material-design-icons.css'
//import '@mdi/font/css/materialdesignicons.css' //

//import '../src/assets/css/material-design-icons.css';
//import '../src/assets/css/fontawesome.css';
//import '@fortawesome/fontawesome-free/css/all.css' 

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue';
import VueResource from 'vue-resource';
import vuex from 'vuex';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import JsonExcel from 'vue-json-excel' 

import routerv from 'vue-router'

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(vuex);
Vue.use(Vuetify)
Vue.use(routerv);
Vue.component('downloadExcel', JsonExcel);





/* Extra components */





/* Extra components */

Vue.config.productionTip = false ; 


import store from './store/store'


/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
1