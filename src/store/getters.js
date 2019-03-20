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
  gsw_uiBlackboard(state){
    return state.sw_uiBlackboard;
  },
  g_loginwidthjsons(state){
    return state.loginwidthjsons;
  }

}
