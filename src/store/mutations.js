import { stat } from "fs";

export default {
  set_token: (state, value) => {
    state.token = value;
  },  
  set_sw_ui: (state, ui) => {
    return state.sw_ui = ui;
  },
  sw_uiBlackboard:(state,ui) =>{
    return state.sw_uiBlackboard =ui;
  },
  set_showMessage: (state, message) => {
    state.modalmessage.message = message;
    state.modalmessage.show = true;
  },
  sw_dialog:(state,value) => {
    state.sw_dialog = value;
  },
  set_cDialog: (state, empleadoaEvaluarSeleccionado) => {
    state.loginUser.empleadoaEvaluarSeleccionado = empleadoaEvaluarSeleccionado;
  },
  set_loginUser: (state, data) => {
    state.loginUser.userId = data.userId;
    state.loginUser.Name = data.Name;
    state.loginUser.Puesto = data.Puesto;
    state.loginUser.Shift = data.Shift;
    state.loginUser.Area = data.Area;
    state.loginUser.Job = data.Job;
    state.loginUser.UserPic = "data:image/png;base64," + data.UserPic;    
  },

  set_SubordinateByUser: (state, data) => {
    state.loginUser.Subordinates = data;

    state.loginUser.Subordinates.forEach(function (element) {         
      element.Image = "data:image/png;base64," + element.Image;
    });
  },

  set_EmployeeInfo: (state, data) => {
    state.loginUser.empleadoaEvaluar.empleadoInfo = data.empleadoInfo;
    state.loginUser.empleadoaEvaluar.indicatorTress = data.indicatorTress;
    state.loginUser.empleadoaEvaluar.indicatorConfig = data.indicatorConfig;
    state.loginUser.empleadoaEvaluar.categoryValue = data.categoryValue;
  },
  
}