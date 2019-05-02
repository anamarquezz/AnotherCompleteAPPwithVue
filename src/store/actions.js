/* http://localhost:49014
http://localhost:49014/ 
    https://intranet.valuout.com/CloverServices/
*/

import Vue from 'vue'
var values = {
  message: '',
  show: false
};
import router from '../router';

export default {

  AUTH_REQUEST: ({
    commit,
    dispatch
  }, user) => {
    try {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit('AUTH_REQUEST');

        Vue.http.post("http://localhost:49014/auth/token", {
            username: user.username,
            password: "cl0v3r",
            grant_type: "password",
            client: "EVALUATION",
            passwordhind: user.password
          }, {
            emulateJSON: true
          })
          .then(responseToken => {
            var token = "bearer" + " " + responseToken.body.access_token;
            if (token != "") {
              localStorage.setItem('user-token', token);

              // commit('AUTH_SUCCESS', token);
              dispatch('getEmpleadoInfo');
              
              resolve(responseToken);
             
            }
          }, responseToken => {
            commit('AUTH_ERROR', responseToken.body.error)
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
           
            commit('s_Loading', { 
              value: 0, 
              show: false 
            }); 

            dispatch('set_showMessage', {
              message: responseToken.body.error,
              show: true,
              title: 'Error',
              showregresar: false,
              colorThema: 'red'
            });            
          });
      })
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });
      // commit('s_Loading',{value:'100',show:false});
      commit('s_Loading', { 
        value: 0, 
        show: false 
      }); 
    }
  },

  AUTH_LOGOUT: ({
    commit,
  }) => {
    return new Promise((resolve, reject) => {      
      localStorage.removeItem('user-token') // clear your user's token from localstorage   
      localStorage.removeItem('userId');
     
      commit('s_Loading', { 
        value: 0, 
        show: false 
      }); 
      resolve();
    })
  },
  /*

    AUTH_REQUEST: function ({
      commit,
      state,
      dispatch
    }, data) {
      try {
        Vue.http.post("ttp://localhost:49014/auth/token", {
            username: data.username,
            password: "cl0v3r",
            grant_type: "password",
            client: "EVALUATION",
            passwordhind: data.password
          }, {
            emulateJSON: true,
            progress(e) {
              if (e.lengthComputable) {
                var time = Math.round(e.loaded / e.total) * 100;
                commit('s_Loading', {
                  value: time,
                  show: true
                });

              }
            },
          })
          .then(responseToken => {
              var token = "bearer" + " " + responseToken.body.access_token;
              if (token != "") {
                commit('set_token', token);
                dispatch('getEmpleadoInfo');
                localStorage.setItem('user-token', token);
              }

            },
            response => {
              commit('s_Loading', {
                value: 0,
                show: false
              });
              dispatch('set_showMessage', {
                message: response.body == "" ? "Problemas con la conexión a internet" : response.body.error,
                show: true,
                title: 'Error',
                showregresar: false,
                colorThema: 'red'
              });
              dispatch("gsw_ui", "login");
            });
      } catch (e) {
        dispatch('set_showMessage', {
          message: e.message,
          show: true,
          title: 'Error',
          showregresar: false,
          colorThema: 'red'
        });
        // commit('s_Loading',{value:'100',show:false});
      }
    },*/
  getEmpleadoInfo: function ({
    state,
    commit,
    dispatch
  }) {
    try {
      Vue.http.get("http://localhost:49014/api/evaluation/GetEmployeeInfo", {
        headers: {
          Authorization: localStorage.getItem('user-token')
        }       
      }).then(response => {
          if (response.body.Employee != "") {
            commit('set_loginUser', response.body.Employee);
           /* commit('s_Loading', { 
              value: 0, 
              show: false 
            }); */
          
          }
        },
        response => {       
          dispatch('set_showMessage', {
            message: response.body == "" ? "Problemas con la conexión a internet" : response.body.Message,
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });     
          commit('s_Loading', { 
            value: 0, 
            show: false 
          });      
        });
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });
      commit('s_Loading', { 
        value: 0, 
        show: false 
      });     
    }
  },

  getEmpleadoInfoJson: function ({
    state,
    commit,
    dispatch
  }) {
    try {
      var resultEmp = require('./jsons/Employee.json');
      commit('set_loginUser', resultEmp.Employee);


      var resultEmpSub = require('./jsons/EmployeSubordinate.json');
      commit('set_SubordinateByUser', resultEmpSub.EmployeSubordinate);



    } catch (e) {
      var values = {
        message: e.InnerException.ExceptionMessage,
        show: true
      }
      dispatch('set_showMessage', values);
    }
  },


  GetSubordinateByUser: function ({
    state,
    commit,
    dispatch
  }, values) {
    try {
      var nombreSup = localStorage.getItem('Name');
      commit('set_SubordinateByUser', {
        List: [],
        seleccionado:nombreSup
      });
      Vue.http.get("http://localhost:49014/api/evaluation/GetSubordinateByUser", {
        params: {
          number: localStorage.getItem('userId') //27045 23781
        },
        headers: {
          Authorization: localStorage.getItem('user-token')
        },
        progress(e) {}        
      }).then(response => {
          commit('set_SubordinateByUser', {
            List: response.body.EmployeeEvaluated.EmployeSubordinate,
            seleccionado:nombreSup
          });         
          commit('set_DistributionSuperviser',response.body.EmployeeEvaluated.DistributionSuperviser);
          
          router.push('/mempleadosaevaluar');

          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
        },
        response => {         
          dispatch('set_showMessage', {
            message: response.body == "" ? "Problemas con la conexión a internet" : response.body.Message,
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });      
          commit('s_Loading', { 
            value: 0, 
            show: false 
          });    
        });
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });
      commit('s_Loading', { 
        value: 0, 
        show: false 
      }); 

      

    }
  },
  GetAllEmployees: function ({
    state,
    commit,
    dispatch
  }, values) {
    try {
     
      commit('set_SubordinateByUser', {
        List: [],
        seleccionado:''
      });
      Vue.http.get("http://localhost:49014/api/evaluation/GetAllEmployees", {       
        headers: {
          Authorization: localStorage.getItem('user-token')
        },
        progress(e) {}        
      }).then(response => {
          commit('set_SubordinateByUser', {
            List: response.body.AllEmployees,
            seleccionado:''
          });                  

          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
        },
        response => {         
          dispatch('set_showMessage', {
            message: response.body == "" ? "Problemas con la conexión a internet" : response.body.Message,
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });      
          commit('s_Loading', { 
            value: 0, 
            show: false 
          });    
        });
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });
      commit('s_Loading', { 
        value: 0, 
        show: false 
      }); 
    }
  },
  //

  
  GetDistributionAll: function ({
    state,
    commit,
    dispatch
  }, values) {
    try {
      commit('GetSummarySubordinates', {
        List: []
      });
      Vue.http.get("http://localhost:49014/api/evaluation/GetDistributionAll", {
        headers: {
          Authorization: localStorage.getItem('user-token')
        }       
      }).then(response => {
          commit('GetSummarySubordinates', {
            List: response.body.Distribution
          });
          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
         
        
        },
        response => {         
          dispatch('set_showMessage', {
            message: response.body == "" ? "Problemas con la conexión a internet" : response.body.Message,
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });         
          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
        });
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });
      commit('s_Loading', { 
        value: 0, 
        show: false 
      }); 
    }
  },



  GetEmployeesBySuperviser: function ({
    state,
    commit,
    dispatch
  }, values) {
     var nombreSup = values.PrettyName;
    try {
      commit('set_SubordinateByUsers', {
        List: [],
        seleccionado:''
      });

      Vue.http.get("http://localhost:49014/api/evaluation/GetEmployeesBySuperviser", {
        params: {
          number: values.Number //27045
        },
        headers: {
          Authorization: localStorage.getItem('user-token')
        }      
      }).then(response => {
          commit('set_SubordinateByUsers', {
            List: response.body.EmployeesBySuperviser,
            seleccionado:nombreSup          
          });   
          
           
          dispatch('cambiarmenu',{
            code:'mempleadosevaluadores/mevaluadosporsupervisor'
          });


          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
     
        },
        response => {        
          dispatch('set_showMessage', {
            message: response.body == "" ? "Problemas con la conexión a internet" : response.body.Message,
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });        
          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
        });
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });
      commit('s_Loading', { 
        value: 0, 
        show: false 
      }); 

    }
  },



  GetSummarySubordinates: function ({
    state,
    commit,
    dispatch
  }, values) {
    try {
      commit('GetSummarySubordinates', {
        List: []
      });
      Vue.http.get("http://localhost:49014/api/evaluation/GetSummarySubordinates", {
        headers: {
          Authorization: localStorage.getItem('user-token')
        }       
      }).then(response => {
          commit('GetSummarySubordinates', {
            List: response.body.GetSummarySubordinates
          });
          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
         
        
        },
        response => {         
          dispatch('set_showMessage', {
            message: response.body == "" ? "Problemas con la conexión a internet" : response.body.Message,
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });         
          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
        });
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });
      commit('s_Loading', { 
        value: 0, 
        show: false 
      }); 
    }
  },

  saveUpdateUser: function ({
    state,
    commit,
    dispatch
  },data) {
    commit('saveUpdateUser',data);  
    dispatch('GuardarInfoEvalUsuario');
  },



  GuardarInfoEvalUsuario: function ({
    state,
    commit,
    dispatch
  }) {

    try {

      Vue.http.post("http://localhost:49014/api/evaluation/UpdatateEvaluation",
        state.loginUser.empleadoaEvaluar.saveUpdateUser, {
          headers: {
            Authorization: localStorage.getItem('user-token')
          },
        }, {
          emulateJSON: true
        }).then(response => {
          if(response.body.resultInfo.Valid){
          dispatch('set_showMessage', {
            message: 'Datos Almacenados!!, ' + response.body.resultInfo.Message,
            title: 'Información',
            colorThema: 'blue',
            showregresar: false,
            show: true
          });         
          commit('backevaluarempleado');       

          dispatch('GetSubordinateByUser');
        }else{
          dispatch('set_showMessage', {
            message: response.body.resultInfo.Message,
            title: 'Información',
            colorThema: 'blue',
            showregresar: false,
            show: false
          });         
        }
        },
        response => {         
          dispatch('set_showMessage', {
            message: response.body == "" ? "Problemas con la conexión a internet" : response.body.Message,
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });        
        });
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });
      commit('s_Loading', { 
        value: 0, 
        show: false 
      }); 
    }
  },
  
  guardarPeriodo: function ({
    state,
    commit,
    dispatch
  },data) {

    try {

      Vue.http.post("http://localhost:49014/api/evaluation/UpdatePeriod",
          data, {
          headers: {
            Authorization: localStorage.getItem('user-token')
          },
        }, {
          emulateJSON: true
        }).then(response => {
          dispatch('set_showMessage', {
            message: 'Datos Almacenados!!, ' + response.body,
            title: 'Información',
            colorThema: 'blue',
            showregresar: false,
            show: true
          });        
          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
        },
        response => {       
          dispatch('set_showMessage', {
            message: response.body == "" ? "Problemas con la conexión a internet" : response.body.Message,
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          }); 
          commit('s_Loading', { 
            value: 0, 
            show: false 
          });        
        });
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });
      commit('s_Loading', { 
        value: 0, 
        show: false 
      });    
    }
  },


  GetEvaluationEmployee: function ({
    state,
    commit,
    dispatch
  }, data) {
    try {
      Vue.http.get("http://localhost:49014/api/evaluation/GetEvaluationEmployee", {
        params: {
          number: data.Number
        },
        headers: {
          Authorization: localStorage.getItem('user-token')
        }
      }).then(response => {
          if (response.body.EmployeeInfo != "") {
            response.body.EmployeeInfo.empleadoInfo.Image = data.Image;
            commit('set_EmployeeInfo', response.body.EmployeeInfo);
            commit('calcularRatinguser');
            
            dispatch('cambiarmenu',{
              code:'mempleadosaevaluar/mevaluarempledo'
            });

           

          }
        },
        response => {        
          dispatch('set_showMessage', {
            message: response.body == "" ? "Problemas con la conexión a internet" : response.body.Message,
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });
          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
       
        });
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });
      commit('s_Loading', { 
        value: 0, 
        show: false 
      }); 
    }
  },

  GetPeriods: function ({
    state,
    commit,
    dispatch
  }, values) {
    commit('set_resetperiods', {
      List:[]
    });
    try {    
      Vue.http.get("http://localhost:49014/api/evaluation/GetPeriods", {
        headers: {
          Authorization: localStorage.getItem('user-token')
        },
        progress(e) {       
        }
      }).then(response => {
          commit('set_periods', {
            List: response.body.EmployeesBySuperviser
          });
          commit('s_Loading', { 
            value: 0, 
            show: false 
          }); 
        },
        response => {         
          dispatch('set_showMessage', {
            message: response.body == "" ? "Problemas con la conexión a internet" : response.body.Message,
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });      
          commit('s_Loading', { 
            value: 0, 
            show: false 
          });  
        });
    } catch (e) {
      dispatch('set_showMessage', {
        message: e.message,
        show: true,
        title: 'Error',
        showregresar: false,
        colorThema: 'red'
      });

      commit('s_Loading', { 
        value: 0, 
        show: false 
      }); 
    }
  },
  //JSON

  action_evaluarEmpleado: function({
    state,
    commit, 
    dispatch
  },data){
    var esto= this;
    dispatch("s_Loading", {
      value: 0,
      show: true
    });
    dispatch('GetEvaluationEmployee',data);
  },
  action_visualizarEmpleados: function({
    state,
    commit, 
    dispatch
  },data){
    
    dispatch("s_Loading", {
      value: 0,
      show: true
    }),
    dispatch('GetEmployeesBySuperviser',data);


  },
  backevaluarempleado: function ({ 
    commit    
  }) {
    commit('backevaluarempleado');
  },
  
  set_cDialog: function ({
    state,
    commit,
    dispatch
  }, empleadoaEvaluarSeleccionado) {
    commit('set_cDialog', empleadoaEvaluarSeleccionado);
  },
  set_showMessage: function ({
    state,
    commit,
    dispatch
  }, values) {
    commit('set_showMessage', values);
  },

  s_Loading: function ({
    state,
    commit,
    dispatch
  }, values) {
    commit('s_Loading', values);
  },

  set_loginwidthjsons: function ({
    state,
    commit,
    dispatch
  }, value) {
    commit('set_loginwidthjsons', value);
    dispatch('getEmpleadoInfoJson');
  },

  sw_dialog: function ({
    state,
    commit,
    dispatch
  }, values) {
    commit('sw_dialog', values);
  },


  sw_uimainEvaluacion: function ({
    state,
    commit,
    dispatch
  }, ui) {
    commit('sw_uimainEvaluacion', ui);
  },



  set_showMessage: function ({
    state,
    commit,
    dispatch
  }, message) {
    commit('set_showMessage', message);
  },

  s_comments: function ({
    state,
    commit,
    dispatch
  }, data) {
    commit('s_comments', data);
    dispatch('set_showMessage', {
      message: 'Comentarios actualizados, para guardar la informacion presione el boton: "Guardar".',
      title: 'Información',
      colorThema: 'blue',
      showregresar: false,
      show: true
    });
  },

  calculateRating: function ({
    state,
    commit,
    dispatch
  }, data) {

    commit('calcularRatinguser', data);
  },

  cambiarmenu({
    state,
    commit,
    dispatch
  }, item) {
    router.push('/' + item.code);
    commit('s_Loading', { 
      value: 0, 
      show: false 
    });    
  },

  set_drawer({
    commit
  }, value) {
    commit('set_drawer', value);
  }
}
