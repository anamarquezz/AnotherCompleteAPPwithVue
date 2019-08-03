<template>
  <v-container fluid>
    <v-layout>
      <navbar color="grey darken-4" textcolor="white--text"></navbar>
      <v-flex row xs3 md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>
      <v-flex row xs11 md11 lg11 xl11>


        <v-container fluid class="mt-5">
          <v-tabs centered  icons-and-text v-model="returnactiveTab">
            <v-tabs-slider color="cyan"></v-tabs-slider>


            <v-tab >
              Escala de distribución
              <v-icon>far fa-list-alt</v-icon>
            </v-tab>

            <v-tab >
              Mi Plantilla
              <v-icon>ar fa-list-alt</v-icon>
            </v-tab>

            <v-tab v-if="g_loginUser.AllUserSupervisers.length > 0">
              Plantilla Supervisores
              <v-icon>far fa-list-alt</v-icon>
            </v-tab>


            <v-tabs-items v-model="returnactiveTab">
              <v-tab-item>
                <v-container fluid>
                  <v-toolbar dark color="light-blue darken-3 white--text">
                    <h4><i class="far fa-list-alt mr-3"></i>Escala de distribución</h4>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <listaempleados from="EVAL" :headers="headersDistribucion" :pagination_name="pagination_name3"
                    v-if="g_loginUser.DistributionSuperviser.length > 0" :list='g_loginUser.DistributionSuperviser'
                    excelname="escaladistribuciontodosempleados.xls" haspagination=false>
                  </listaempleados>
                </v-container>
              </v-tab-item>

              <v-tab-item>
                <v-container fluid>
                  <v-toolbar dark color="light-blue darken-4 white--text " text-xs-center>
                    <h5><i class="fas fa-edit mr-3"></i>Proceso de Evaluaciones</h5>
                    <v-spacer></v-spacer>

                  </v-toolbar>                  
                  <listaempleados from="EVAL" :headers="headerSumarySupervisor"  :pagination_name="pagination_name3"
                    v-if="g_loginUser.SuperviserSummary.length > 0 " :list='g_loginUser.SuperviserSummary' excelname=''
                    hassearch=false haspagination=true>
                  </listaempleados>
                </v-container>

                <v-container fluid>
                  <v-toolbar dark color="light-blue darken-4 white--text">
                    <h4><i class="far fa-list-alt mr-3"></i>Mi Plantilla</h4>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <listaempleados :headers="headers" v-if="g_loginUser.Subordinates.length > 0" :pagination_name="pagination_name2"
                    :list='g_loginUser.Subordinates' excelname="empleadosEvaluadores.xls" haspagination=false>
                  </listaempleados>
                </v-container>
              </v-tab-item>

              <v-tab-item v-if="g_loginUser.AllUserSupervisers.length > 0">
                <v-container fluid>
                  <v-toolbar dark color="deep-purple darken-4 white--text">
                    <h4><i class="far fa-list-alt mr-3"></i>Plantilla de supervisores</h4>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <listaempleados from="EVAL" :headers="headersPSup" :list='g_loginUser.AllUserSupervisers' :pagination_name="pagination_name"
                    excelname="PantillaSupervisores.xls" haspagination=true>
                  </listaempleados>
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-container>





      </v-flex>
    </v-layout>


  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import listaempleados from "../components/listaempleados.vue";
import navbar from "../components/navbar.vue";
import menuoptions from "../components/menuoptions.vue";
import escaladistribucion from "../components/escaladistribucion.vue";

export default {
  name: "mempleadosaevaluar",
  components: {
    menuoptions,
    navbar,
    listaempleados,
    escaladistribucion
  },
  data() {
    return {
      pagination_name: "mempleadoaevaluar",
      pagination_name2: "mempleadoaevaluar2",
      pagination_name3: "mempleadoaevaluar3",
      pagination_name3: "pagination_name4",
      active: null,
      color: "green lighten-1",
      tabs: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      headerSumarySupervisor: [
        {
          text: "Número de Empleados",
          type: "text",
          align: "center",
          resize: false,
          value: "TotalEvaluate",
          tooltip: "Total Epleados a Evaluar"
        },
        {
          text: "No Iniciados",
          type: "text",
          align: "center",
          resize: false,
          value: "NoIniciados",
          tooltip: "Numero de Empleados que no se ha iniciado su evaluación"
        },
        {
          text: "Iniciado",
          type: "text",
          align: "center",
          resize: false,
          value: "Initiated",
          tooltip:
            "Numero de Empleados que ya se inició su evaluación pero que aun faltan puntos por califica"
        },
        {
          text: "Completado",
          type: "text",
          align: "center",
          resize: false,
          value: "Completed",
          tooltip:
            "Numero de Empleados que ya se terminaron de evaluar y está pendiente su retroalimentación"
        },
        {
          text: "Terminado",
          align: "center",
          type: "text",
          resize: false,
          value: "Terminated",
          tooltip:
            " Numero de Empleados con el proceso finalizado (evaluación, retroalimentación y firmas)"
        }
      ],
      headers: [
        {
          text: ".",
          type: "image",
          align: "center",
          value: "Image",
          resize: true
        },
        {
          text: "Num Emp",
          type: "text",
          align: "center",
          value: "Number",
          resize: false
        },
        {
          text: "Nombre",
          type: "text",
          align: "center",
          value: "PrettyName",
          resize: true
        },
        {
          text: "Supervisor",
          type: "text",
          align: "center",
          value: "PrettyNameSuperviser",
          resize: true
        },
        {
          text: "Puesto",
          type: "text",
          align: "center",
          value: "Position",
          resize: true
        },
        {
          text: "Status",
          type: "text",
          align: "center",
          value: "Status",
          resize: true
        },
        {
          text: "Evaluación",
          type: "text",
          align: "center",
          value: "Score",
          resize: true
        },
        {
          text: "",
          type: "button",
          align: "left",
          btntitle: "Evaluar",
          action: "action_evaluarEmpleado",
          returnTo: "mempleadosaevaluar",
          has_condition: true,
          condition_property: "Status",
          getconditiontext: true,
          conditionvalues: [
            {
              condition: "NO INICIADO",
              text: "Evaluar",
              color: "indigo darken-4",
              visible: true
            },
            {
              condition: "EVALUADO",
              text: "Editar",
              color: "blue darken-3",
              visible: true
            },
            {
              condition: "INICIADO",
              text: "Editar",
              color: "blue darken-3",
              visible: true
            },
            {
              condition: "COMPLETADO",
              text: "Editar",
              color: "blue darken-3",
              visible: true
            }
          ],
          resize: true,
          value: ""
        }
      ],
      headersPSup: [
        {
          text: ".",
          type: "image",
          align: "center",
          value: "Image",
          resize: true
        },
        {
          text: "Num Emp",
          type: "text",
          align: "center",
          value: "Number",
          resize: false
        },
        {
          text: "Nombre",
          type: "text",
          align: "center",
          value: "PrettyName",
          resize: true
        },
        {
          text: "Supervisor",
          type: "text",
          align: "center",
          value: "PrettyNameSuperviser",
          resize: true
        },
        {
          text: "Puesto",
          type: "text",
          align: "center",
          value: "Position",
          resize: true
        },
        {
          text: "Status",
          type: "text",
          align: "center",
          value: "Status",
          resize: true
        },
        {
          text: "Evaluación",
          type: "text",
          align: "center",
          value: "Score",
          resize: true
        },
        {
          text: "",
          type: "button",
          align: "left",
          btntitle: "Evaluar",
          action: "action_evaluarEmpleado",
          returnTo: "mempleadosaevaluar",
          has_condition: true,
          condition_property: "Status",
          getconditiontext: true,
          conditionClass: true,
          conditionvalues: [
            {
              condition: "NO INICIADO",
              text: "Evaluar",
              color: "indigo darken-4",
              class: "d-none"
            },
            {
              condition: "EVALUADO",
              text: "Aprobar",
              color: "cyan darken-3",
              class: "d-inline"
            },
            {
              condition: "INICIADO",
              text: "Editar",
              color: "blue darken-3",
              class: "d-none"
            },
            {
              condition: "COMPLETADO",
              text: "Editar",
              color: "blue darken-3",
              class: "d-none"
            }
          ],
          resize: true,
          value: ""
        }
      ],
      headersDistribucion: [
        {
          text: "",
          type: "text",
          align: "center",
          value: "ValueDefinition",
          resize: true
        },
        /*  {
            text: "Puntuación",
            type: "text",
            align: "center",
            value: "Puntuation",
            resize: true
          },*/
        {
          text: "% de Distribución",
          type: "text",
          align: "center",
          value: "Percentage",
          resize: true
        },
        {
          text: "Evaluación",
          type: "text",
          align: "center",
          value: "Score",
          resize: true
        },
        {
          text: "Capacidad Maxima",
          type: "text",
          align: "center",
          value: "Quantity",
          resize: true
        },
        {
          text: "Personas Evaluadas",
          type: "text",
          align: "center",
          value: "Evaluated",
          resize: true
        },
        {
          text: "Nombre Personas",
          type: "icon",
          value: "distributionByEmployee",
          iconbtn: "fa fa-users",
          action: "action_gridmodal",
          resize: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["g_loginUser"]),
    ...mapState(["token"]),

    returnactiveTab: {
      get() {
        return this.$store.state.returnactiveTab;
      },
      set(newValue) {
        return this.$store.dispatch("set_returnactiveTab", newValue);
      }
    }
  },
  methods: {
    activeTab(returnactiveTab) {
      this.$store.dispatch("set_returnactiveTab", returnactiveTab);
    },
    escalaDis(Score) {
      var esto = this;

      var dialog = {
        Value: true,
        Title: " Escala distribucion " + Score.Score + " ",
        Subtitle:
          Score.ValueDefinition + "  porcentaje " + Score.Percentage + "%",
        contieneImagen: false,
        Image: "",
        Paragraph: "",
        component: {
          type: "list",
          list: esto.g_loginUser.Subordinates.filter(function(el) {
            return el.Score == Score.Score;
          }),
          dindex: "Number",
          title: "PrettyName",
          subtitle: "Position",
          avatar: "Image"
        }
      };

      this.$store.dispatch("sw_dialog", dialog);
    }
  },
  mounted() {
    var esto = this;
    esto.$store.dispatch("s_Loading", {
      value: 0,
      show: true
    }),
      esto.$store.dispatch("GetSubordinateByUser");
    // esto.active = esto.returnactiveTab;
  }
};
</script>

<style scope>
@import "../assets/css/global.css";

@import "../assets/css/media_query.css";

.mr-10 {
  margin-right: 80px;
}

a:hover {
  color: #d1d2d3 !important;
}
</style>
