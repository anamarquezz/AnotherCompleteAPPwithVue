export default {
  get_token(state){
    state.token;
  },
  gsw_ui(state){
    return state.sw_ui;
  }, 
  g_loginUser: (state, data) => {
    return state.loginUser;
  }
}