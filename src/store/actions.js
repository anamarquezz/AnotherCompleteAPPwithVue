/* http://localhost:49014
    https://intranet.valuout.com/CloverServices/CloverServices/
*/

import Vue from 'vue'

export default {

  _token: function ({
    commit,
    state,
    dispatch
  }, data) {

    Vue.http.post("http://localhost:49014/auth/token", {
        username: data.username,
        password: "cl0v3r",
        grant_type: "password",
        client: "TRAINNING",
        passwordhind: data.password
      }, {
        emulateJSON: true
      })
      .then(responseToken => {      
       var token = "bearer" + " " + responseToken.body.access_token;
        if (token != "") {
          commit('set_token', token);
          dispatch('getEmpleadoInfo');
        }
      });
  },
  getEmpleadoInfo: function ({
    state,
    commit,
    dispatch
  }) {
    try {
      Vue.http.get("http://localhost:49014/api/training/GetEmployeeInfo", {
        params: {
          user_id:0
        },
        headers: {
          Authorization: state.token
        }
      }).then(response => {
        if (response.body.Employee != "") {
          commit('set_loginUser', response.body.Employee);   
          dispatch('GetSubordinateByUser');   
        }
      });
    } catch (e) {
      dispatch('set_showMessage', 'Problem with Application');
      commit('set_loading', false);
    }
  },

  GetSubordinateByUser: function ({
    state,
    commit,
    dispatch
  }) {
    try {
      Vue.http.get("http://localhost:49014/api/evaluation/GetSubordinateByUser", {
        params: {
          number: 27045//state.loginUser.userId
        },
        headers: {
          Authorization: state.token
        }
      }).then(response => {
        if (response.body.EmployeSubordinate != "") {
          commit('set_SubordinateByUser', response.body.EmployeSubordinate);
          commit('set_sw_ui','blackboard');
        }
      });
    } catch (e) {
      dispatch('set_showMessage', 'Problem with Application');
      commit('set_loading', false);
    }
  },

  

  GetEvaluationEmployee: function ({
    state,
    commit,
    dispatch
  },empleadoInfo) {
    try {
      Vue.http.get("http://localhost:49014/api/evaluation/GetEvaluationEmployee", {
        params: {
          number: empleadoInfo.number
        },
        headers: {
          Authorization: state.token
        }
      }).then(response => {
        if (response.body.EmployeeInfo != "") {          
          commit('set_EmployeeInfo', response.body.EmployeeInfo);
          commit('sw_uiBlackboard','evaluarEmpleado');
          commit('sw_dialog',false);
        }
      });
    } catch (e) {
      dispatch('set_showMessage', 'Problem with Application');
      commit('set_loading', false);
    }
  },

  set_cDialog: function({
    state,
    commit,
    dispatch
  },empleadoaEvaluarSeleccionado){   
    commit('set_cDialog',empleadoaEvaluarSeleccionado);
  }, 

  sw_dialog: function({
    state,
    commit,
    dispatch
  },value){   
    commit('sw_dialog',value);
  }, 

  
  sw_uiBlackboard: function({
    state,
    commit,
    dispatch
  },ui){
    commit('sw_uiBlackboard',ui);
  },

  gsw_ui: function({
    state,
    commit,
    dispatch
  },ui){
    commit('set_sw_ui',ui);
  },

  set_showMessage: function ({
    state,
    commit,
    dispatch
  }, message) {
    commit('set_showMessage', message);
  }
}