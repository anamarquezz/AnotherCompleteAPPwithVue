/* http://localhost:49014
    https://intranet.valuout.com/CloverServices/CloverServices/
*/

import Vue from 'vue'

export default {


  init: function ({
    state,
    commit,
    dispatch
  }) {},


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
          commit('set_sw_ui','mainevaluation');
        }
      });
    } catch (e) {
      dispatch('set_showMessage', 'Problem with Application');
      commit('set_loading', false);
    }
  },
  set_showMessage: function ({
    state,
    commit,
    dispatch
  }, message) {
    commit('set_showMessage', message);
  }
}