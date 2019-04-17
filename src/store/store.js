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
    drawer:true,
    sw_ui: 'login',   
    sw_uimainEvaluacion: 'home',
    sw_dialog: {
      Value: false,
      Title: '',
      Subtitle: '',
      contieneImagen: false,
      Image: '',
      Paragraph: ''
    },
    modalmessage: {
      colorThema:'',
      show: false,
      message: '',
      title:'',
      showregresar:false,
    },
    continue: false,
    token: localStorage.getItem('user-token') || '',    
    status:'',
    NumeroEmpleadoSeleccionado: '',
    loginwidthjsons: false,
    loading:{
      value:0,
      show:false
    },
    datePeriods:[],
    loginUser: {
      userId:localStorage.getItem('userId') || '',
      Name: localStorage.getItem('Name') || '',
      Puesto: localStorage.getItem('Puesto') || '',
      Shift: localStorage.getItem('Shift') || '',
      UserPic: localStorage.getItem('UserPic') || '',
      Area: localStorage.getItem('Area') || '', 
      isRH:localStorage.getItem('isRH') || true,
      isSupervisor:localStorage.getItem('isSupervisor') || false,
      allowEvaluation:localStorage.getItem('allowEvaluation') || false,
      descriptionPeriod:localStorage.getItem('descriptionPeriod') || '',
      minPeriod:localStorage.getItem('minPeriod') || '',
      maxPeriod:localStorage.getItem('maxPeriod') || '',
      minYear:localStorage.getItem('minYear') || '',
      maxYear:localStorage.getItem('maxYear') || '',
      empleadoaEvaluarSeleccionado: '',
      Subordinates:localStorage.getItem('Subordinates') || [],
      empleadoaEvaluar: {
        ratingEmpleado: 0,
        puntuacionEmpleado: 0,
        empleadoInfo: '',
        indicatorTress: [],
        indicatorConfig: [],
        categoryValue: [],
        evaluationResult: '',
        saveUpdateUser: {
          number: '',        
          comments: '',
          feedBack_Comments: '',
          IndicatorResult: []
        }
      }
     }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
});