import Vue from 'vue'
import Vuex from 'vuex'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import actions from './actions';
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    sw_ui: 'login',
    sw_uiBlackboard: 'home',
    sw_dialog:{
      Value:false,
      Title:'',
      Subtitle:'',
      contieneImagen:false,
      Image:'',
      Paragraph:''
    },
    continue: false,
    token: null,
    modalmessage: {
      show: false,
      message: ''
    },
    loginwidthjsons:false,
    loginUser: {
      userId: '',
      Name: '',
      Puesto: '',
      Shift: '',
      UserPic: '',
      Area: '',
      Job: '',
      Subordinates: [],
      empleadoaEvaluarSeleccionado: '',
      empleadoaEvaluar: {
        empleadoInfo: '',
        indicatorTress: [],
        indicatorConfig: [],
        categoryValue: []
      }
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
});