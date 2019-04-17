export default {
  get_token(state){
    state.token;
  },
  gsw_ui(state){
    return state.sw_ui;
  }, 
  g_loginUser(state){
    return state.loginUser;
  },
  gsw_dialog(state){
    return state.sw_dialog;
  },  
  g_empleadoaEvaluar(state){
    return state.loginUser.empleadoaEvaluar;
  },
  g_cDialog(state){
    return state.loginUser.empleadoaEvaluarSeleccionado;
  },
  gsw_uimainEvaluacion(state){
    return state.sw_uimainEvaluacion;
  },
  g_loginwidthjsons(state){
    return state.loginwidthjsons;
  },
  g_userRating(state){
    return state.loginUser.empleadoaEvaluar.ratingEmpleado;
  },
  g_showMessage(state){
    return state.modalmessage;
  },
  g_Loading(state){
    return state.loading;
  },
  g_headers(state){
    return   state.loginUser.headersGrid;
  },
  g_periods:(state, data) =>{
    return state.datePeriods;  
  },


}
