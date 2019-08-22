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
    state.loading.showlinear = data.showlinear;
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
    state.loginUser.isRH = data.userId == 28759 ? "true" : data.isRH + ""; // data.isRH + "",// Karina= 81462
    state.loginUser.allowESign = data.allowESign + '';
    state.loginUser.isSupervisor = data.userId == 28759 ? "true" : data.isSuperviser + ""; //Karina = 81462
    state.loginUser.position = data.position + "";
    state.loginUser.allowEvaluation = data.allowEvaluation + "";
    state.loginUser.descriptionPeriod = data.descriptionPeriod;
    state.loginUser.minPeriod = new Date(data.minPeriod).toLocaleDateString();
    state.loginUser.maxPeriod = new Date(data.maxPeriod).toLocaleDateString();
    state.loginUser.minYear = new Date(data.minYear).toLocaleDateString();
    state.loginUser.maxYear = new Date(data.maxYear).toLocaleDateString();
    state.loginUser.EvalYear = new Date(data.maxYear).getFullYear();
    state.supervisorSeleccionado = state.loginUser.Name;

    localStorage.setItem('userId', state.loginUser.userId);
    localStorage.setItem('Name', state.loginUser.Name);
    localStorage.setItem('supervisorSeleccionado', state.supervisorSeleccionado);
    localStorage.setItem('Puesto', state.loginUser.Puesto);
    localStorage.setItem('turno', state.loginUser.turno);
    localStorage.setItem('UserPic', state.loginUser.UserPic);
    localStorage.setItem('Area', state.loginUser.Area);
    localStorage.setItem('isRH', state.loginUser.isRH);
    localStorage.setItem('position', state.loginUser.position);
    localStorage.setItem('allowESign', state.loginUser.allowESign);
    localStorage.setItem('isSupervisor', state.loginUser.isSupervisor);
    localStorage.setItem('allowEvaluation', state.loginUser.allowEvaluation);
    localStorage.setItem('descriptionPeriod', state.loginUser.descriptionPeriod);
    localStorage.setItem('minPeriod', state.loginUser.minPeriod);
    localStorage.setItem('maxPeriod', state.loginUser.maxPeriod);
    localStorage.setItem('minYear', state.loginUser.minYear);
    localStorage.setItem('maxYear', state.loginUser.maxYear);
    localStorage.setItem('EvalYear', state.loginUser.EvalYear);

    if (state.loginUser.isSupervisor == 'true') {
      localStorage.setItem('isregresar', true + '');
    } else {
      localStorage.setItem('isregresar', false + '');
    }

    if (state.loginUser.isSupervisor == "true") {
      state.itemsmenu.splice(state.itemsmenu.length, 0, {
        icon: "far fa-list-alt light-blue--text text--darken-2",
        text: "Mi plantilla",
        code: "mempleadosaevaluar"
      });
    }
    if (state.loginUser.isRH == "true") {
      state.itemsmenu.splice(
        state.itemsmenu.length,
        0, {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          text: "Reportes",
          code: "expand",
          model: false,
          children: [{
              icon: "fa-id-card light-blue--text text--darken-2",
              text: "Gerentes/Sup. Generales",
              code: "mempleadosevaluadores"
            },
            {
              icon: "far fa-list-alt light-blue--text text--darken-2",
              text: "Plantilla Activa",
              code: "mtodosempleados"
            }
          ]
        }, {
          icon: "fas fa-calendar-alt light-blue--text text--darken-2",
          text: "Calendario",
          code: "mconfigurarfechas"
        }, {
          icon: "fas fa-user-cog light-blue--text text--darken-2",
          text: "Mantenimiento/ Evaluadores",
          code: "mmantenimientosupervisores"
        }
      );
    }

    state.itemsmenu.splice(
      state.itemsmenu.length,
      0,
      /*{
        icon: "far fa-list-alt light-blue--text text--darken-2",
        text: "Personal a Evaluar",
        code: "mevaluarempledo"
      }*/
      {
        icon: "fas fa-sign-out-alt fa-rotate-180 light-blue--text text--darken-2",
        text: "Cerrar sesión",
        code: "#login"
      }
    );

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
  set_SuperviserSummary: (state, data) => {
    state.loginUser.SuperviserSummary = data;
  },
  set_ApprovalSummary: (state, data) => {
    state.loginUser.ApprovalSummary = data;
  },
  set_AllUserSupervisers: (state, data) => {
    state.loginUser.AllUserSupervisers = data;
    state.loginUser.AllUserSupervisers.forEach(function (element) {
      if (element.Image != undefined) {
        element.Image = "data:image/png;base64," + element.Image;
      }
    });
  },
  set_SubordinateByUsers: (state, data) => {
    state.loginUser.Subordinatesbyuser = data.List;
    state.loginUser.Subordinatesbyuser.forEach(function (element) {
      element.Image = "data:image/png;base64," + element.Image;
    });
    state.loginUser.supervisorSeleccionado = data.seleccionado.PrettyName;
    state.loginUser.position = data.seleccionado.Position;
    localStorage.setItem('supervisorSeleccionado', state.loginUser.supervisorSeleccionado);
  },
  set_DistributionSuperviser: (state, data) => {
    state.loginUser.DistributionSuperviser = data;
  },
  GetSummarySubordinates: (state, data) => {
    state.loginUser.Subordinates = data.List;
  },

  set_EmployeeInfo: (state, data) => {
    state.loginUser.empleadoaEvaluar.empleadoInfo = data.empleadoInfo;
    if (data.empleadoInfo.length > 0) {
      state.loginUser.empleadoaEvaluar.empleadoInfo.forEach(function (element) {
        element.Image = "data:image/png;base64," + element.Image;
      });


      state.loginUser.empleadoaEvaluar.indicatorTressResult = data.indicatorTress.reduce(function (tot, record) {
        return tot + record.Result;
      }, 0);


      state.loginUser.empleadoaEvaluar.empleadoInfo[0].Status = data.evaluationResult.evaluationStatus == null ? "NO INICIADO" : data.evaluationResult.evaluationStatus;


    }

    state.loginUser.empleadoaEvaluar.indicatorTress = data.indicatorTress;


    state.loginUser.empleadoaEvaluar.indicatorConfig = data.indicatorConfig;
    state.loginUser.empleadoaEvaluar.indicatorConfigResult = data.indicatorConfig.reduce(function (tot, record) {
      return tot + record.Result;
    }, 0);

    state.loginUser.empleadoaEvaluar.categoryValue = data.categoryValue;


    state.loginUser.empleadoaEvaluar.evaluationResult = data.evaluationResult;
    state.loginUser.empleadoaEvaluar.saveUpdateUser.nombreEvaluador = "";
    state.loginUser.empleadoaEvaluar.saveUpdateUser.nombreEmpleado = "";
    state.loginUser.empleadoaEvaluar.isloginfirmaEmp = false;
    state.loginUser.empleadoaEvaluar.isloginfirmaEva = false;
    if (data.evaluationResult != null) {
      state.loginUser.empleadoaEvaluar.saveUpdateUser.feedback_comments = data.evaluationResult.feedback_comments;
      state.loginUser.empleadoaEvaluar.saveUpdateUser.comments = data.evaluationResult.comments;
      state.loginUser.empleadoaEvaluar.signatureInfo = data.evaluationResult.signatureInfo;
    }

    state.loginUser.empleadoaEvaluar.saveUpdateUser.number = data.empleadoInfo[0].Number;
    state.loginUser.empleadoaEvaluar.saveUpdateUser.signatureInfo = data.evaluationResult.signatureInfo;

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
    state.loginUser.empleadoaEvaluar.indicatorTressResult = 0;

    state.loginUser.empleadoaEvaluar.indicatorConfig = [];
    state.loginUser.empleadoaEvaluar.indicatorConfigResult = 0;

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

        state.loginUser.empleadoaEvaluar.indicatorConfigResult = state.loginUser.empleadoaEvaluar.indicatorConfig.reduce(function (tot, record) {
          return tot + record.Cantidad;
        }, 0);
      }
    }

    //Sacar la suma de los reactivos de indicatorTress e indicatorConfig
    var sumReactivos = state.loginUser.empleadoaEvaluar.indicatorConfigResult + state.loginUser.empleadoaEvaluar.indicatorTressResult;

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
  set_nombreFirmeEmpleado: (state, value) => {
    state.loginUser.empleadoaEvaluar.firmaValida = value;
  },
  saveUpdateUser: (state, data) => {
    // Actualizar la suma  de los result  

    state.loginUser.empleadoaEvaluar.saveUpdateUser.IndicatorResult = [];

    state.loginUser.empleadoaEvaluar.saveUpdateUser.comments = data.comments;
    state.loginUser.empleadoaEvaluar.saveUpdateUser.feedBack_Comments = data.feedback_comments;

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
  },
  set_regresar: (state, value) => {
    state.isregresar = value;
  },
  set_validhuella: (state, value) => {
    state.validhuella = value;
  },
  set_signaturepor: (state, por) => {
    state.loginUser.empleadoaEvaluar.signatureInfo[state.loginUser.empleadoaEvaluar.signatureInfo.findIndex(el => el
      .TypeCode == por)].IsSignature = true;
    state.loginUser.empleadoaEvaluar.saveUpdateUser.signatureInfo = state.loginUser.empleadoaEvaluar.signatureInfo;
  },

  set_nombreInput: (state, datos) => {
    state.loginUser[datos.By] = datos.Nombre;
  },

  set_returnactiveTab: (state, value) => {
    state.returnactiveTab = value;
  },
  set_listaManteniEValua: (state, list) => {
    state.listamantenimientoevaluadores = list;
    /*
    var listaMantenimiento = [];
    
    var listgerent = [...new Set(list.map((esc) => esc.number_approval))];

    listgerent.forEach(function (element){
      var  gerente={
        NumEmp:'',
        Nombre:'',
        Evaluadores:[
          {
          NumEmp:'',
          Nombre:'',
          Empleados:[]
          }]
      };

      gerente.NumEmp = element.number_approval;
      gerente.Nombre = element.Nombre;      
      var sup = state.listamantenimientoevaluadores.filter(evalu => eval.number_approval == element.number_approval);
      
      sup.forEach(function (element){
        gerente.Evaluadores.NumEmp = element.number_evaluator;
        gerente.Evaluadores.Nombre = element.Nombre;
        gerente.Evaluadores.Empleados= state.listamantenimientoevaluadores.filter(evalu => eval.number_approval == element.number_approval);
      });
      listaMantenimiento.push(gerente);     
    });

    state.expandlist = listaMantenimiento;
*/
  },
  set_paginationnumber: (state, values) => {
    state[values.paginationname] = values.newvalue;
  },
  set_returnto: (state, value) => {
    state.returnTo = value;
  },
  clearPag_mevaluadosporsupervisor: (state, value) => {
    var pag = {
      descending: true,
      page: 1,
      rowsPerPage: 10,
      sortBy: "name",
      rowsPerPageItems: [10, 50, 100, 300, 400, 600, 1000, 3000, 5000]
    };
    state.mevaluadosporsupervisor = pag;
    state.mevaluadosporsupervisor_escala = pag;

  },

  set_clear_paginado: (state, value) => {
    var pag = {
      descending: true,
      page: 1,
      rowsPerPage: 10,
      sortBy: "name",
      rowsPerPageItems: [10, 50, 100, 300, 400, 600, 1000, 3000, 5000]
    };

    state.cdialog = pag;
    state.mempleadoaevaluar = pag;
    state.mempleadoaevaluar2 = pag;
    state.mempleadoaevaluar3 = pag;
    state.pagination_name4 = pag;
    state.mhome_distr = pag;
    state.mempleadosevaluadores = pag;
    state.mevaluadosporsupervisor = pag;
    state.mtodosempleados = pag;
    state.mevaluadosporsupervisor_escala = pag;
    state.mempleadoaevaluar3 = pag;
    state.mantenimientoeval = pag;

  },
  set_selectmevaluadosporsupervisor: (state, value) => {
    state.selectmevaluadosporsupervisor = value;
  },
  clearVariables: (state, value) => {
    var pag = {
      descending: true,
      page: 1,
      rowsPerPage: 10,
      sortBy: "name",
      rowsPerPageItems: [10, 50, 100, 300, 400, 600, 1000, 3000, 5000]
    };

    state.itemsmenu = [{
        icon: "fas fa-home light-blue--text text--darken-2",
        text: "Inicio",
        code: "mhome"
      }],

      state.cdialog = pag;
    state.drawer = true;
    state.mempleadoaevaluar = pag;
    state.mempleadoaevaluar2 = pag;
    state.mempleadoaevaluar3 = pag;
    state.pagination_name4 = pag;
    state.mhome_distr = pag;
    state.mempleadosevaluadores = pag;
    state.mevaluadosporsupervisor = pag;
    state.mtodosempleados = pag;
    state.mevaluadosporsupervisor_escala = pag;
    state.mempleadoaevaluar3 = pag;
    state.returnactiveTab = 0;
    state.isregresar = localStorage.getItem('isregresar') || 'false';
    state.sw_ui = 'login';
    state.returnTo = 'miplantilla';
    state.sw_uimainEvaluacion = 'home';
    state.sw_dialog = {
        Value: false,
        Title: '',
        Subtitle: '',
        contieneImagen: false,
        Image: '',
        Paragraph: '',
        component: {
          type: 'expansion',
          data: {}
        }
      },
      state.modalmessage = {
        colorThema: '',
        show: false,
        message: '',
        title: '',
        showregresar: false,
      }, //
      state.continue = false,
      state.token = localStorage.getItem('user-token') || '',
      state.status = '',
      state.NumeroEmpleadoSeleccionado = '',
      state.loginwidthjsons = false,
      state.listamantenimientoevaluadores = [],
      state.expandlist = [],
      state.loading = {
        value: 0,
        show: false,
        showlinear: false,
      },
      state.validhuella = '',

      state.datePeriods = [],

      state.loginUser = {
        userId: '',
        Name: '',
        Puesto: '',
        Shift: '',
        UserPic: '',
        Area: '',
        isRH: '',
        position: '',
        allowESign: '',
        isSupervisor: "false",
        allowEvaluation: "false",
        descriptionPeriod: '',
        minPeriod: '',
        maxPeriod: '',
        minYear: '',
        maxYear: '',
        EvalYear: '',
        empleadoaEvaluarSeleccionado: '',
        supervisorSeleccionado: '',
        SuperviserSummary: [],
        AllUserSupervisers: [],
        Gerentesupervisores: [],
        Subordinates: [],
        Subordinatesbyuser: [],
        DistributionSuperviser: [],
        Nombregerente: '',
        nombreSup: '',
        nombreEmp: '',
        empleadoaEvaluar: {

          ratingEmpleado: 0,
          puntuacionEmpleado: 0,
          empleadoInfo: '',
          indicatorTressResult: '',
          indicatorTress: [{
              Cantidad: 0,
              Code: '',
              Description: '',
              Result: '',
            },
            {
              Cantidad: 0,
              Code: '',
              Description: '',
              Result: '',
            },
            {
              Cantidad: 0,
              Code: '',
              Description: '',
              Result: '',
            },
            {
              Cantidad: 0,
              Code: '',
              Description: '',
              Result: '',
            }
          ],
          indicatorConfigResult: '',
          indicatorConfig: [],
          categoryValue: [],
          evaluationResult: '',

          signatureInfo: [{
              Date: null,
              IsSignature: false,
              Name: "",
              Number: "",
              Signature: "",
              TypeCode: "EMP",
              TypeDescription: "Empleado",
              allowSignature: false
            },
            {
              Date: null,
              IsSignature: false,
              Name: "",
              Number: "",
              Signature: "",
              TypeCode: "GEAR",
              TypeDescription: "Gerente de Area",
            },
            {
              Date: null,
              IsSignature: false,
              Name: "",
              Number: "",
              Signature: "",
              TypeCode: "GRH",
              TypeDescription: "Gerencia RH",
            },
            {
              Date: null,
              IsSignature: false,
              Name: "",
              Number: "",
              Signature: "",
              TypeCode: "SUP",
              TypeDescription: "Jefe Inmediato/Sup. Gral",
            }
          ],
          saveUpdateUser: {
            number: '',
            comments: '',
            feedBack_Comments: '',
            IndicatorResult: [],
            nombreEvaluador: '',
            nombreEmpleado: '',
            signatureInfo: []
          }
        }
      }
  },


}
