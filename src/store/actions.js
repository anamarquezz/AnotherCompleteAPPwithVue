
var url = "http://localhost:49014"
import Vue from "vue";
var values = {
  message: "",
  show: false
};
import router from "../router";

export default {
  AUTH_REQUEST: ({
    commit,
    dispatch
  }, user) => {
    try {
      return new Promise((resolve, reject) => {
        // The Promise used for router redirect in login
        commit("AUTH_REQUEST");
        Vue.http
          .post(
            url + "/auth/token", {
              username: user.username,
              password: "cl0v3r",
              grant_type: "password",
              client: "EVALUATION",
              passwordhind: user.password
            }, {
              emulateJSON: true
            }
          )
          .then(
            responseToken => {
              var token = "bearer" + " " + responseToken.body.access_token;
              if (token != "") {
                localStorage.setItem("user-token", token);

                // commit('AUTH_SUCCESS', token);
                dispatch("getEmpleadoInfo");

                resolve(responseToken);
              }
            },
            response => {
              commit("AUTH_ERROR", response.body.error);
              localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
              dispatch(
                "errorResponse",
                response.body == "" ?
                "Problemas con la conexión a internet" :
                response.body.error
              );
            }
          );
      });
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },

  errorResponse({
    state,
    commit,
    dispatch
  }, message) {
    dispatch("set_showMessage", {
      message: message,
      show: true,
      title: "Error",
      showregresar: false,
      colorThema: "red"
    });

    commit("s_Loading", {
      value: 0,
      show: false
    });
  },

  AUTH_LOGOUT: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("user-token"); // clear your user's token from localstorage
      localStorage.removeItem("userId");
      commit("clearVariables", 0);

      commit("s_Loading", {
        value: 0,
        show: false
      });
      resolve();
    });
  },

  getEmpleadoInfo: function ({
    state,
    commit,
    dispatch
  }) {
    try {
      Vue.http
        .get(url + "/api/evaluation/GetEmployeeInfo", {
          headers: {
            Authorization: localStorage.getItem("user-token")
          }
        })
        .then(
          response => {
            if (response.body.Employee != "") {
              commit("set_loginUser", response.body.Employee);

              router.push("/mhome");
              /* commit('s_Loading', { 
                value: 0, 
                show: false 
               }); */
            }
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },

  GetSubordinateByUser: function ({
    state,
    commit,
    dispatch
  }, values) {
    try {
      var nombreSup = localStorage.getItem("Name");
      commit("set_SubordinateByUser", {
        List: [],
        seleccionado: nombreSup
      });
      Vue.http
        .get(url + "/api/evaluation/GetSubordinateByUser", {
          params: {
            number: localStorage.getItem("userId") //27045 23781
          },
          headers: {
            Authorization: localStorage.getItem("user-token")
          },
          progress(e) {}
        })
        .then(
          response => {
            commit("set_SubordinateByUser", {
              List: response.body.EmployeeEvaluated.EmployeSubordinate,
              seleccionado: nombreSup
            });
            commit(
              "set_SuperviserSummary",
              response.body.EmployeeEvaluated.SuperviserSummary
            );
            commit(
              "set_AllUserSupervisers",
              response.body.EmployeeEvaluated.AllUserSupervisers
            );
            commit(
              "set_DistributionSuperviser",
              response.body.EmployeeEvaluated.DistributionSuperviser
            );
            commit(
              "set_ApprovalSummary",
              response.body.EmployeeEvaluated.ApprovalSummary
            );

            // router.push(state.returnTo);

            commit("s_Loading", {
              value: 0,
              show: false
            });
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },
  getDistributionbySupervisor: function ({
      //mevaluadosporsupervisor
      state,
      commit,
      dispatch
    },
    number
  ) {
    Vue.http
      .get(url + "/api/evaluation/GetSubordinateByUser", {
        params: {
          number: number //27045 23781
        },
        headers: {
          Authorization: localStorage.getItem("user-token")
        },
        progress(e) {}
      })
      .then(response => {
        try {
          commit(
            "set_DistributionSuperviser",
            response.body.EmployeeEvaluated.DistributionSuperviser
          );

          commit("s_Loading", {
            value: 0,
            show: false
          });
        } catch (e) {
          dispatch("errorResponse", e.message);
        }
      });
  },
  GetAllEmployees: function ({
    state,
    commit,
    dispatch
  }, values) {
    try {
      commit("set_SubordinateByUser", {
        List: [],
        seleccionado: ""
      });
      Vue.http
        .get(url + "/api/evaluation/GetAllEmployees", {
          headers: {
            Authorization: localStorage.getItem("user-token")
          },
          progress(e) {}
        })
        .then(
          response => {
            commit("set_SubordinateByUser", {
              List: response.body.AllEmployees,
              seleccionado: ""
            });

            commit("s_Loading", {
              value: 0,
              show: false
            });
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },
  //

  GetDistributionAll: function ({
    state,
    commit,
    dispatch
  }, values) {
    try {
      commit("GetSummarySubordinates", {
        List: []
      });
      Vue.http
        .get(url + "/api/evaluation/GetDistributionAll", {
          headers: {
            Authorization: localStorage.getItem("user-token")
          }
        })
        .then(
          response => {
            commit("GetSummarySubordinates", {
              List: response.body.Distribution
            });
            commit("s_Loading", {
              value: 0,
              show: false
            });

            dispatch("GetPeriods");
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },

  GetEmployeesBySuperviser: function ({
    state,
    commit,
    dispatch
  }, values) {
    // var nombreSup = values.PrettyNamePrettyName;
    try {
      commit("set_SubordinateByUsers", {
        List: [],
        seleccionado: ""
      });
      values = state.selectmevaluadosporsupervisor;
      Vue.http
        .get(url + "/api/evaluation/GetEmployeesBySuperviser", {
          params: {
            number: values.Number //27045
          },
          headers: {
            Authorization: localStorage.getItem("user-token")
          }
        })
        .then(
          response => {
            commit("set_SubordinateByUsers", {
              List: response.body.EmployeesBySuperviser,
              seleccionado: values
            });

            dispatch("cambiarmenu", {
              code: "mempleadosevaluadores/mevaluadosporsupervisor",
              show: true
            });

            dispatch("getDistributionbySupervisor", values.Number);
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },

  GetSummarySubordinates: function ({
    state,
    commit,
    dispatch
  }, values) {
    try {
      commit("GetSummarySubordinates", {
        List: []
      });
      Vue.http
        .get(url + "/api/evaluation/GetSummarySubordinates", {
          headers: {
            Authorization: localStorage.getItem("user-token")
          }
        })
        .then(
          response => {
            commit("GetSummarySubordinates", {
              List: response.body.GetSummarySubordinates
            });
            commit("s_Loading", {
              value: 0,
              show: false
            });
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },

  saveUpdateUser: function ({
    state,
    commit,
    dispatch
  }, data) {
    commit("saveUpdateUser", data);
    dispatch("GuardarInfoEvalUsuario");
  },
  set_saveUpdateUser: function ({
    state,
    commit,
  }, data) {
    commit("saveUpdateUser", data);
  },

  GuardarInfoEvalUsuario: function ({
    state,
    commit,
    dispatch
  }) {
    try {
      Vue.http
        .post(
          url + "/api/evaluation/UpdatateEvaluation",
          state.loginUser.empleadoaEvaluar.saveUpdateUser, {
            headers: {
              Authorization: localStorage.getItem("user-token")
            }
          }, {
            emulateJSON: true
          }
        )
        .then(
          response => {
            if (response.body.resultInfo.Valid) {
              dispatch("set_showMessage", {
                message: "Datos Almacenados!!, " + response.body.resultInfo.Message,
                title: "Información",
                colorThema: "blue",
                showregresar: false,
                show: true
              });
              commit("backevaluarempleado");

              dispatch("GetSubordinateByUser");
              if (state.returnTo == "mempleadosevaluadores/mevaluadosporsupervisor")
                dispatch("GetEmployeesBySuperviser");
              router.push(state.returnTo);
            } else {
              dispatch("set_showMessage", {
                message: response.body.resultInfo.Message,
                title: "Error",
                colorThema: "red",
                showregresar: false,
                show: true
              });
              commit("s_Loading", {
                value: 0,
                show: false
              });


            }
          },
          response => {
            dispatch("set_showMessage", {
              message: response.body == "" ?
                "Problemas con la conexión a internet" : response.body.ExceptionMessage,
              show: true,
              title: "Error",
              showregresar: false,
              colorThema: "red"
            });
            commit("s_Loading", {
              value: 0,
              show: false
            });
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },

  guardarPeriodo: function ({
    state,
    commit,
    dispatch
  }, data) {
    try {
      Vue.http
        .post(
          url + "/api/evaluation/UpdatePeriod",
          data, {
            headers: {
              Authorization: localStorage.getItem("user-token")
            }
          }, {
            emulateJSON: true
          }
        )
        .then(
          response => {
            dispatch("set_showMessage", {
              message: response.body,
              title: "Información",
              colorThema: "blue",
              showregresar: false,
              show: true
            });
            commit("s_Loading", {
              value: 0,
              show: false
            });
          },
          response => {
            dispatch("set_showMessage", {
              message: response.body == "" ?
                "Problemas con la conexión a internet" : response.body.ExceptionMessage,
              show: true,
              title: "Error",
              showregresar: false,
              colorThema: "red"
            });
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },


  GetEvaluationEmployee: function ({
    state,
    commit,
    dispatch
  }, data) {
    try {
      Vue.http
        .get(url + "/api/evaluation/GetEvaluationEmployee", {
          params: {
            number: data.items.Number
          },
          headers: {
            Authorization: localStorage.getItem("user-token")
          }
        })
        .then(
          response => {
            if (response.body.EmployeeInfo != "") {
              response.body.EmployeeInfo.empleadoInfo.Image = data.items.Image;

              commit(
                "set_EmployeeInfo",
                response.body.EmployeeInfo.empleadoInfo.length > 0 ?
                response.body.EmployeeInfo : []
              );
              commit("calcularRatinguser");

              commit("set_returnto", data.headers.returnTo);

              dispatch("cambiarmenu", {
                code: "mevaluarempledo",
                show: false
              });
            }
          },
          response => {
            dispatch("set_showMessage", {
              message: response.body == "" ?
                "Problemas con la conexión a internet" : response.body.ExceptionMessage,
              show: true,
              title: "Error",
              showregresar: false,
              colorThema: "red"
            });
            commit("s_Loading", {
              value: 0,
              show: false
            });
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },

  GetPeriods: function ({
    state,
    commit,
    dispatch
  }, values) {
    commit("set_resetperiods", {
      List: []
    });
    try {
      Vue.http
        .get(url + "/api/evaluation/GetPeriods", {
          headers: {
            Authorization: localStorage.getItem("user-token")
          },
          progress(e) {}
        })
        .then(
          response => {
            commit("set_periods", {
              List: response.body.PeriodInfo
            });
            commit("s_Loading", {
              value: 0,
              show: false
            });
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },
  //JSON

  firmas: function ({
    state,
    commit,
    dispatch
  }, datos) {
    try {
      //commit("set_signaturepor", datos.firmapor);
      var d = {
        usuario: '',
        contrasena: '',
        numberSign: '',
        codeSignature: '',
        evaluationResult: ''
      };
      d.usuario = datos.usuario;
      d.contrasena = datos.contrasena;
      d.numberSign = datos.numberSign;
      d.codeSignature = datos.codeSignature;
      d.evaluationResult = state.loginUser.empleadoaEvaluar.saveUpdateUser;

      Vue.http
        .post(
          url + "/api/evaluation/ValidateSignature",
          d, {
            headers: {
              Authorization: localStorage.getItem("user-token")
            }
          }, {
            emulateJSON: true
          }
        )
        .then(
          response => {
            if (response.body.userInfo.Valid) {
              var values = response.body.userInfo.Data[0];
              values.por = datos.codeSignature;
              commit("set_signaturepor", values);
            } else {
              dispatch(
                "errorResponse",
                response.body == "" ?
                "Problemas con la conexión a internet" :
                response.body.userInfo.Message
              );
            }
            commit("s_Loading", {
              value: 0,
              show: false
            });
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },

  validUser: function ({
    state,
    commit,
    dispatch
  }, datos) {
    try {
      Vue.http
        .get(url + "/api/util/UserInActiveDirectory", {
          params: {
            usuario: datos.usuario,
            contrasena: datos.contrasena,
            extra: datos.extra,
            validby: "usuariocode"
          },
          headers: {
            Authorization: localStorage.getItem("user-token")
          },
          progress(e) {}
        })
        .then(
          response => {
            if (response.body.userInfo.Valid) {
              commit("set_nombreInput", {
                Nombre: response.body.userInfo.Data[0].cname,
                By: datos.by
              });
            } else {
              commit("set_nombreInput", {
                Nombre: response.body.userInfo.Message,
                By: datos.by
              });
              // dispatch('errorResponse', response.body == "" ? "Problemas con la conexión a internet" : response.body.userInfo.Message);
            }
            commit("s_Loading", {
              value: 0,
              show: false
            });
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },
  GetConfiguracionEvaluadores({
    commit,
    dispatch
  }) {
    try {
      Vue.http
        .get(url + "/api/evaluation/GetConfigEvaluation", {
          params: {},
          headers: {
            Authorization: localStorage.getItem("user-token")
          },
          progress(e) {}
        })
        .then(
          response => {
            if (response.body.ConfigEvaluation != "") {
              commit("set_listaManteniEValua", response.body.ConfigEvaluation);
            } else {
              dispatch(
                "errorResponse",
                response.body == "" ?
                "Problemas con la conexión a internet" :
                response.body.userInfo.Message
              );
            }
            commit("s_Loading", {
              value: 0,
              show: false
            });
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },

  GuardarConfiguracionEvaluadores({
    commit,
    dispatch
  }, datos) {
    try {
      Vue.http
        .post(
          url + "/api/evaluation/UpdateConfigEvaluation", {
            number_approval: datos.number_approval,
            number_evaluator: datos.number_evaluator,
            number_evaluated: datos.number_evaluated,
            active: datos.active == undefined ? 0 : 1
          }, {
            headers: {
              Authorization: localStorage.getItem("user-token")
            },
            progress(e) {}
          }
        )
        .then(
          response => {
            if (response.body.ConfigEvaluation.Valid) {
              dispatch("set_showMessage", {
                message: response.body.ConfigEvaluation.Message,
                title: "Información",
                colorThema: "blue",
                showregresar: false,
                show: true
              });
              dispatch("s_Loading", {
                value: 0,
                show: true
              });
              dispatch("GetConfiguracionEvaluadores");
            } else {
              dispatch(
                "errorResponse",
                response.body == "" ?
                "Problemas con la conexión a internet" :
                response.body.ConfigEvaluation.Message
              );
            }
            commit("s_Loading", {
              value: 0,
              show: false
            });
          },
          response => {
            dispatch(
              "errorResponse",
              response.body == "" ?
              "Problemas con la conexión a internet" :
              response.body.ExceptionMessage
            );
          }
        );
    } catch (e) {
      dispatch("errorResponse", e.message);
    }
  },
  action_evaluarEmpleado: function ({
    state,
    commit,
    dispatch
  }, data) {
    var esto = this;
    dispatch("s_Loading", {
      value: 0,
      show: true
    });
    dispatch("GetEvaluationEmployee", data);
  },
  action_visualizarEmpleados: function ({
    state,
    commit,
    dispatch
  }, data) {
    dispatch("s_Loading", {
        value: 0,
        show: true
      }),
      commit("set_selectmevaluadosporsupervisor", data.items);
    dispatch("GetEmployeesBySuperviser");
  },
  set_signaturepor({
    commit
  }, por) {
    commit("set_signaturepor", por);
  },

  backevaluarempleado: function ({
    commit
  }) {
    commit("backevaluarempleado");
  },

  set_cDialog: function ({
      state,
      commit,
      dispatch
    },
    empleadoaEvaluarSeleccionado
  ) {
    commit("set_cDialog", empleadoaEvaluarSeleccionado);
  },
  set_showMessage: function ({
    state,
    commit,
    dispatch
  }, values) {
    commit("set_showMessage", values);
  },

  s_Loading: function ({
    state,
    commit,
    dispatch
  }, values) {
    commit("s_Loading", values);
  },

  set_loginwidthjsons: function ({
    state,
    commit,
    dispatch
  }, value) {
    commit("set_loginwidthjsons", value);
    dispatch("getEmpleadoInfoJson");
  },

  sw_dialog: function ({
    state,
    commit,
    dispatch
  }, values) {
    commit("sw_dialog", values);
  },
  action_gridmodal: function ({
    state,
    commit,
    dispatch
  }, values) {
    var headerss = [{
        text: "Numero",
        type: "text",
        value: "Number",
        resize: true
      },
      {
        text: "Nombre",
        type: "text",
        value: "PrettyName",
        resize: true
      },
      {
        text: "Puesto",
        type: "text",
        value: "Position",
        resize: true
      },
      {
        text: "Supervisor",
        type: "text",
        value: "Superviser",
        resize: true
      },
      {
        text: "Departamento",
        type: "text",
        value: "Department",
        resize: true
      },
      {
        text: "Calificación",
        type: "text",
        value: "Score",
        resize: true
      }
    ];
    var calificacion =
      values.items.distributionByEmployee.length > 0 ?
      values.items.distributionByEmployee[0].Score :
      0;
    var dialog = {
      Value: true,
      Title: "Escala distribución",
      Subtitle: calificacion == 0 ? "" : "Calificación:" + calificacion, //Score.ValueDefinition + "  porcentaje " + Score.Percentage + "%",
      contieneImagen: false,
      Image: "",
      Paragraph: "",
      component: {
        type: "grid",
        list: values.items.distributionByEmployee,
        headers: headerss,
        dindex: "",
        title: "",
        subtitle: "",
        avatar: ""
      }
    };
    this.dispatch("sw_dialog", dialog);
  },

  sw_uimainEvaluacion: function ({
    state,
    commit,
    dispatch
  }, ui) {
    commit("sw_uimainEvaluacion", ui);
  },

  set_showMessage: function ({
    state,
    commit,
    dispatch
  }, message) {
    commit("set_showMessage", message);
  },

  s_comments: function ({
    state,
    commit,
    dispatch
  }, data) {
    commit("s_comments", data);
    dispatch("set_showMessage", {
      message: 'Comentarios actualizados, para guardar la informacion presione el boton: "Guardar".',
      title: "Información",
      colorThema: "blue",
      showregresar: false,
      show: true
    });
  },

  calculateRating: function ({
    state,
    commit,
    dispatch
  }, data) {
    commit("calcularRatinguser", data);
  },

  cambiarmenu({
    state,
    commit,
    dispatch
  }, item) {
    if (item.code == "mevaluadosporsupervisor") {
      dispatch("GetEmployeesBySuperviser", state.selectmevaluadosporsupervisor);
    } else {
      router.push("/" + item.code);
    }
    commit("s_Loading", {
      value: 0,
      show: item.show
    });
  },

  set_drawer({
    commit
  }, value) {
    commit("set_drawer", value);
  },
  getEmpleadoInfoJson: function ({
    state,
    commit,
    dispatch
  }) {
    try {
      var resultEmp = require("./jsons/Employee.json");
      commit("set_loginUser", resultEmp.Employee);

      var resultEmpSub = require("./jsons/EmployeSubordinate.json");
      commit("set_SubordinateByUser", resultEmpSub.EmployeSubordinate);
    } catch (e) {
      var values = {
        message: e.InnerException.ExceptionMessage,
        show: true
      };
      dispatch("set_showMessage", values);
    }
  },

  set_regresar: (state, value) => {
    state.isregresar = value;
  },
  set_validhuella: function ({
    commit
  }, value) {
    commit("set_validhuella", value);
  },

  set_returnactiveTab: function ({
    commit
  }, value) {
    commit("set_returnactiveTab", value);
  },
  set_nombreInput: function ({
    state,
    commit,
    dispatch
  }, datos) {
    commit("set_nombreInput", {
      Nombre: datos.Nombre,
      By: datos.By
    });
  },
  set_paginationnumber: function ({
    state,
    commit,
    dispatch
  }, datos) {
    commit("set_paginationnumber", datos);
  },
  set_returnto: function ({
    commit
  }, value) {
    commit("set_returnto", value);
  },
  set_clear_paginado: function ({
    commit
  }, value) {
    commit("set_clear_paginado", value);
  },
  set_clearPag_mevaluadosporsupervisor: function ({
    commit
  }, value) {
    commit("clearPag_mevaluadosporsupervisor", value);
  }
};
