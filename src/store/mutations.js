import {
  stat
} from "fs";

export default {
  AUTH_REQUEST: (state) => {
    state.status = 'loading'
  },
  AUTH_SUCCESS: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  AUTH_ERROR: (state) => {
    state.status = 'error'
  },
  set_token: (state, value) => {
    state.token = value;
  },

  set_headers: (state, headers) => {
    state.loginUser.headersGrid = headers;
  },
  sw_uimainEvaluacion: (state, ui) => {
    state.sw_uimainEvaluacion = ui;
  },
  s_Loading(state, data) {
    state.loading.value = data.value;
    state.loading.show = data.show;
  },
  set_showMessage: (state, values) => {
    state.modalmessage.message = values.message;
    state.modalmessage.show = values.show;
    state.modalmessage.title = values.title;
    state.modalmessage.colorThema = values.colorThema;
    state.modalmessage.showregresar = values.showregresar;

  },
  sw_dialog: (state, value) => {
    state.sw_dialog.Value = value.Value;
    state.sw_dialog.Title = value.Title;
    state.sw_dialog.Subtitle = value.Subtitle;
    state.sw_dialog.contieneImagen = value.contieneImagen;
    state.sw_dialog.Image = value.Image;
    state.sw_dialog.Paragraph = value.Paragraph;
    state.sw_dialog.component = value.component;


  },
  set_cDialog: (state, empleadoaEvaluarSeleccionado) => {
    state.loginUser.empleadoaEvaluarSeleccionado = empleadoaEvaluarSeleccionado;
  },
  set_loginwidthjsons: (state, value) => {
    state.loginwidthjsons = value;
  },
  set_loginUser: (state, data) => {
    state.loginUser.userId = data.userId;
    state.loginUser.Name = data.name + ' ' + data.paternalSurname;
    state.loginUser.Puesto = data.position;
    state.loginUser.turno = data.turno;
    state.loginUser.Area = data.department;
    state.loginUser.UserPic = "data:image/png;base64," + data.Image;
    state.loginUser.isRH = true; //data.isRH;
    state.loginUser.isSupervisor = data.isSupervisor;
    state.loginUser.allowEvaluation = data.allowEvaluation;
    state.loginUser.descriptionPeriod = data.descriptionPeriod;
    state.loginUser.minPeriod = new Date(data.minPeriod).toLocaleDateString();
    state.loginUser.maxPeriod = new Date(data.maxPeriod).toLocaleDateString();
    state.loginUser.minYear = new Date(data.minYear).toLocaleDateString();
    state.loginUser.maxYear = new Date(data.maxYear).toLocaleDateString();
    state.loginUser.EvalYear = new Date(data.maxYear).getFullYear();
    state.supervisorSeleccionado = state.loginUser.Name;

    localStorage.setItem('userId', state.loginUser.userId);
    localStorage.setItem('Name', state.loginUser.Name);
    localStorage.setItem('supervisorSeleccionado',  state.supervisorSeleccionado);
    localStorage.setItem('Puesto', state.loginUser.Puesto);
    localStorage.setItem('turno', state.loginUser.turno);
    localStorage.setItem('UserPic', state.loginUser.UserPic);
    localStorage.setItem('Area', state.loginUser.Area);
    localStorage.setItem('isRH', state.loginUser.isRH);
    localStorage.setItem('isSupervisor', state.loginUser.isSupervisor);
    localStorage.setItem('allowEvaluation', state.loginUser.allowEvaluation);
    localStorage.setItem('descriptionPeriod', state.loginUser.descriptionPeriod);
    localStorage.setItem('minPeriod', state.loginUser.minPeriod);
    localStorage.setItem('maxPeriod', state.loginUser.maxPeriod);
    localStorage.setItem('minYear', state.loginUser.minYear);
    localStorage.setItem('maxYear', state.loginUser.maxYear);
    localStorage.setItem('EvalYear', state.loginUser.EvalYear);

  },

  set_SubordinateByUser: (state, data) => {
    state.loginUser.Subordinates = data.List;
    state.loginUser.Subordinates.forEach(function (element) {
      if (element.Image != undefined) {
        element.Image = "data:image/png;base64," + element.Image;
      }
    });
    state.loginUser.supervisorSeleccionado = data.seleccionado;
    localStorage.setItem('supervisorSeleccionado', state.loginUser.supervisorSeleccionado);


  },
  set_SubordinateByUsers: (state, data) => {
    state.loginUser.Subordinatesbyuser = data.List;
    state.loginUser.Subordinatesbyuser.forEach(function (element) {
      element.Image = "data:image/png;base64," + element.Image;
    });   
    state.loginUser.supervisorSeleccionado = data.seleccionado;
    localStorage.setItem('supervisorSeleccionado', state.loginUser.supervisorSeleccionado );    
  },
  set_DistributionSuperviser: (state, data) => {
    state.loginUser.DistributionSuperviser = data;
  },
  s_comments: (state, data) => {
    state.loginUser.empleadoaEvaluar.saveUpdateUser.comments = data.comments;
    state.loginUser.empleadoaEvaluar.saveUpdateUser.feedBack_Comments = data.feedback_comments;
  },
  GetSummarySubordinates: (state, data) => {
    state.loginUser.Subordinates = data.List;
  },

  set_EmployeeInfo: (state, data) => {
    state.loginUser.empleadoaEvaluar.empleadoInfo = data.empleadoInfo;
    state.loginUser.empleadoaEvaluar.empleadoInfo.forEach(function (element) {
      element.Image = "data:image/png;base64," + element.Image;
    });

    state.loginUser.empleadoaEvaluar.indicatorTress = data.indicatorTress;
    state.loginUser.empleadoaEvaluar.indicatorTress.SumResult = data.indicatorTress.reduce(function (tot, record) {
      return tot + record.Result;
    }, 0);

    state.loginUser.empleadoaEvaluar.indicatorConfig = data.indicatorConfig;
    state.loginUser.empleadoaEvaluar.indicatorConfig.SumResult = data.indicatorConfig.reduce(function (tot, record) {
      return tot + record.Result;
    }, 0);

    state.loginUser.empleadoaEvaluar.categoryValue = data.categoryValue;


    state.loginUser.empleadoaEvaluar.evaluationResult = data.evaluationResult;
    if (data.evaluationResult != null) {
      state.loginUser.empleadoaEvaluar.saveUpdateUser.feedBack_Comments = data.evaluationResult.feedback_comments;
      state.loginUser.empleadoaEvaluar.saveUpdateUser.comments = data.evaluationResult.comments;
    }

    state.loginUser.empleadoaEvaluar.saveUpdateUser.number = data.empleadoInfo[0].Number;


    var data = {
      "indicator_code": '',
      "score": ''
    };

    state.loginUser.empleadoaEvaluar.indicatorConfig.forEach(function (element) {
      data.indicator_code = element.IndicatorCode;
      data.score = element.Result;
      state.loginUser.empleadoaEvaluar.saveUpdateUser.IndicatorResult.push(data);
    });
  },

  backevaluarempleado: (state) => {
    state.loginUser.empleadoaEvaluar.empleadoInfo = {};

    state.loginUser.empleadoaEvaluar.indicatorTress = [];
    state.loginUser.empleadoaEvaluar.indicatorTress.SumResult = 0;

    state.loginUser.empleadoaEvaluar.indicatorConfig = [];
    state.loginUser.empleadoaEvaluar.indicatorConfig.SumResult = 0;

    state.loginUser.empleadoaEvaluar.categoryValue = [];


    state.loginUser.empleadoaEvaluar.evaluationResult = [];

    state.loginUser.empleadoaEvaluar.saveUpdateUser.number = '';
    state.loginUser.empleadoaEvaluar.saveUpdateUser.feedBack_Comments = '';
    state.loginUser.empleadoaEvaluar.saveUpdateUser.comments = '';
    state.loginUser.empleadoaEvaluar.IndicatorResult = [];

  },
  set_resetperiods: (state) => {
    state.datePeriods = [];
  },
  set_periods: (state, data) => {

    data.List.forEach(function (element) {
      element.minDate = new Date(element.minDate).toISOString().substr(0, 10);
      element.maxDate = new Date(element.maxDate).toISOString().substr(0, 10);
    });

    state.datePeriods = data.List;
  },

  calcularRatinguser: (state, data) => {

    // modificar el valor del Result De acuerdo al codigo


    if (data != undefined) {
      if (data.Result != null) {

        state.loginUser.empleadoaEvaluar.indicatorConfig[state.loginUser.empleadoaEvaluar.indicatorConfig.findIndex(el => el.IndicatorCode === data.IndicatorCode)].Cantidad = data.Result;
        state.loginUser.empleadoaEvaluar.indicatorConfig[state.loginUser.empleadoaEvaluar.indicatorConfig.findIndex(el => el.IndicatorCode === data.IndicatorCode)].Result = data.Result;

        state.loginUser.empleadoaEvaluar.indicatorConfig.SumResult = state.loginUser.empleadoaEvaluar.indicatorConfig.reduce(function (tot, record) {
          return tot + record.Cantidad;
        }, 0);
      }
    }

    //Sacar la suma de los reactivos de indicatorTress e indicatorConfig
    var sumReactivos = state.loginUser.empleadoaEvaluar.indicatorConfig.SumResult + state.loginUser.empleadoaEvaluar.indicatorTress.SumResult;

    //Obtener el score de acuerdo a la condicion de max y minimo que contiene cada indicador
    //var score = state.loginUser.empleadoaEvaluar.categoryValue[state.loginUser.empleadoaEvaluar.categoryValue.findIndex(dato => dato.Min >= sumReactivos && dato.Max <= sumReactivos)].Score;    

    var index;
    state.loginUser.empleadoaEvaluar.categoryValue.some(function (entry, i) {
      index = i;
      return sumReactivos >= entry.Min && sumReactivos <= entry.Max;
    });

    //Asignar el score para obtener el rating del empleado
    state.loginUser.empleadoaEvaluar.ratingEmpleado = (state.loginUser.empleadoaEvaluar.categoryValue[index].Score);
    state.loginUser.empleadoaEvaluar.puntuacionEmpleado = sumReactivos;
  },



  saveUpdateUser: (state, data) => {
    // Actualizar la suma  de los result  

    state.loginUser.empleadoaEvaluar.saveUpdateUser.IndicatorResult = [];

    state.loginUser.empleadoaEvaluar.indicatorConfig.reduce(function (tot, element) {
      state.loginUser.empleadoaEvaluar.saveUpdateUser.IndicatorResult.push({
        "indicator_code": element.IndicatorCode,
        "score": element.Result
      });
    }, 0);


    state.loginUser.empleadoaEvaluar.indicatorTress.forEach(function (element) {
      state.loginUser.empleadoaEvaluar.saveUpdateUser.IndicatorResult.push({
        "indicator_code": element.Code,
        "score": element.Result
      });
    });
  },

  set_drawer: (state, value) => {
    state.drawer = value;
  }

}
