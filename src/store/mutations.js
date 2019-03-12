export default {
  set_token: (state, value) =>{
    state.token = value;
  },
  set_sw_ui:(state,ui) => {
    return state.sw_ui = ui;
  }, 
  set_showMessage: (state, message) => {
    state.modalmessage.message = message;
    state.modalmessage.show = true;
  },

  set_loginUser: (state, data) => {
    state.loginUser.userId= data.userId;
    state.loginUser.Name= data.Name;
    state.loginUser.Puesto= data.Puesto;
    state.loginUser.Shift= data.Shift;
    state.loginUser.Area= data.Area;
    state.loginUser.Job= data.Job;
    state.loginUser.UserPic= "data:image/png;base64,"+data.UserPic;  
  },

  set_loginUserPhoto: (state, data) => {
  
  },
}
