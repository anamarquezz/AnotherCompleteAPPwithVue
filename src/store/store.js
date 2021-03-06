import Vue from 'vue'
import Vuex from 'vuex'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import actions from './actions';
import mutations from './mutations'
import getters from './getters'

var pag = {
  descending: true,
  page: 1,
  rowsPerPage: 10,
  sortBy: "name",
  rowsPerPageItems: [10, 50, 100, 300, 400, 600, 1000, 3000, 5000]
};

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemsmenu: localStorage.getItem('itemsmenu') || [],
    cdialog: pag,
    drawer: true,
    mempleadoaevaluar: pag,
    mempleadoaevaluar2: pag,
    mempleadoaevaluar3: pag,
    pagination_name4: pag,
    mhome_distr: pag,
    mempleadosevaluadores: pag,
    mevaluadosporsupervisor: pag,
    mtodosempleados: pag,
    mevaluadosporsupervisor_escala: pag,
    mempleadoaevaluar3: pag,
    mantenimientoeval: pag,
    returnactiveTab: 0,
    selectmevaluadosporsupervisor: {},
    isregresar: localStorage.getItem('isregresar') || 'false',
    sw_ui: 'login',
    returnTo: 'mhome',
    sw_uimainEvaluacion: 'home',
    sw_dialog: {
      Value: false,
      Title: '',
      Subtitle: '',
      contieneImagen: false,
      Image: '',
      Paragraph: '',
      component: {
        type: 'expansion',
        data: {}
      }
    },
    modalmessage: {
      colorThema: '',
      show: false,
      message: '',
      title: '',
      showregresar: false,
    }, //
    continue: false,
    token: localStorage.getItem('user-token') || '',
    status: '',
    NumeroEmpleadoSeleccionado: '',
    loginwidthjsons: false,
    listamantenimientoevaluadores: [],
    expandlist: [],
    loading: {
      value: 0,
      show: false,
      showlinear: false,
    },
    validhuella: '',

    datePeriods: [],

    loginUser: {
      userId: localStorage.getItem('userId') || '',
      Name: localStorage.getItem('Name') || '',
      Puesto: localStorage.getItem('Puesto') || '',
      Shift: localStorage.getItem('Shift') || '',
      UserPic: localStorage.getItem('UserPic') || '',
      Area: localStorage.getItem('Area') || '',
      isRH: localStorage.getItem('isRH') || '',
      position: localStorage.getItem('position' || ''),
      allowESign: localStorage.getItem('allowESign') || '',
      isSupervisor: localStorage.getItem('isSupervisor') || "false",
      allowEvaluation: localStorage.getItem('allowEvaluation') || "false",
      descriptionPeriod: localStorage.getItem('descriptionPeriod') || '',
      minPeriod: localStorage.getItem('minPeriod') || '',
      maxPeriod: localStorage.getItem('maxPeriod') || '',
      minYear: localStorage.getItem('minYear') || '',
      maxYear: localStorage.getItem('maxYear') || '',
      EvalYear: localStorage.getItem('EvalYear') || '',
      empleadoaEvaluarSeleccionado: '',
      supervisorSeleccionado: localStorage.getItem('supervisorSeleccionado') || '',
      SuperviserSummary: [],
      AllUserSupervisers: [],
      Gerentesupervisores: [],
      Subordinates: [],
      Subordinatesbyuser: [],
      DistributionSuperviser: [],
      Nombregerente: '',
      nombreSup: '',
      nombreEmp: '',
      empleadoaEvaluar: {

        ratingEmpleado: 0,
        puntuacionEmpleado: 0,
        empleadoInfo: '',
        indicatorTressResult: '',
        indicatorTress: [{
            Cantidad: 0,
            Code: '',
            Description: '',
            Result: '',
          },
          {
            Cantidad: 0,
            Code: '',
            Description: '',
            Result: '',
          },
          {
            Cantidad: 0,
            Code: '',
            Description: '',
            Result: '',
          },
          {
            Cantidad: 0,
            Code: '',
            Description: '',
            Result: '',
          }
        ],
        indicatorConfigResult: '',
        indicatorConfig: [],
        categoryValue: [],
        evaluationResult: '',

        signatureInfo: [{
            Date: null,
            IsSignature: false,
            Name: "",
            Number: "",
            Signature: "",
            TypeCode: "EMP",
            TypeDescription: "Empleado",
            allowSignature: false
          },
          {
            Date: null,
            IsSignature: false,
            Name: "",
            Number: "",
            Signature: "",
            TypeCode: "GEAR",
            TypeDescription: "Gerente de Area",
          },
          {
            Date: null,
            IsSignature: false,
            Name: "",
            Number: "",
            Signature: "",
            TypeCode: "GRH",
            TypeDescription: "Gerencia RH",
          },
          {
            Date: null,
            IsSignature: false,
            Name: "",
            Number: "",
            Signature: "",
            TypeCode: "SUP",
            TypeDescription: "Jefe Inmediato/Sup. Gral",
          }
        ],
        saveUpdateUser: {
          number: '',
          comments: '',
          feedBack_Comments: '',
          IndicatorResult: [],
          nombreEvaluador: '',
          nombreEmpleado: '',
          signatureInfo: []
        }
      }
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
});
