<template>
  <v-container fluid>
    <v-layout>

      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex row xs3 md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex row md11 lg11 xl11 class="mt-5">
        <v-container fluid class="ml-6">
          <v-flex xs12 class="">
            <v-toolbar dark color="indigo darken-4 white--text">
              <h4><i class="fas fa-id-card mr-3"></i>Gerentes/Sup. Generales</h4>
              <v-spacer></v-spacer>
            </v-toolbar>
            <listaempleados from="EVAL" :headers="headers" v-if="g_loginUser.Subordinates.length > 0" :pagination_name="pagination_name"
              excelname="supervisoresaevaluar.xls" :list='g_loginUser.Subordinates'>
            </listaempleados>
          </v-flex>
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

export default {
  name: "mempleadosevaluadores",
  components: {
    menuoptions,
    navbar,
    listaempleados
  },
  data() {
    return {
      pagination_name: "mempleadosevaluadores",
      mevaluadosporsupervisor_escala: "mevaluadosporsupervisor_escala",
      headers: [
        {
          text: "Num Emp",
          type: "text",
          resize: true,
          value: "Number"
        },
        {
          text: "Nombre",
          type: "text",
          resize: true,
          value: "PrettyName"
        },
        {
          text: "Clasificación",
          type: "text",
          align: "center",
          value: "Clasificacion",
          resize: true
        },
        {
          text: "Puesto",
          type: "text",
          value: "Position"
        },
        {
          text: "N# Empleados",
          type: "text",
          resize: true,
          value: "TotalEvaluate",
          tooltip: "Total Epleados a Evaluar"
        },
        {
          text: "No Iniciados",
          type: "text",
          resize: true,
          value: "NoIniciados",
          tooltip: "Numero de Empleados que no se ha iniciado su evaluación"
        },
        {
          text: "Iniciado",
          type: "text",
          resize: true,
          value: "Initiated",
          tooltip:
            "Numero de Empleados que ya se inició su evaluación pero que aun faltan puntos por calificar"
        },
        {
          text: "Evaluado",
          type: "text",
          resize: true,
          value: "Evaluated",
          tooltip:
            "Numero de Empleados que ya se firmo su evaluación por parte del Supervisor y Gerente del Area"
        },
        {
          text: "Completado",
          type: "text",
          resize: true,
          value: "Completed",
          tooltip:
            "Numero de Empleados que ya se terminaron de evaluar y está pendiente su retroalimentación"
        },
        {
          text: "Terminado",
          type: "text",
          resize: true,
          value: "Terminated",
          tooltip:
            "Numero de Empleados con el proceso finalizado (evaluación, retroalimentación y firmas)"
        },
        {
          text: "",
          type: "button",
          btntitle: "Visualizar",
          action: "action_visualizarEmpleados",
          returnTo: "mempleadosevaluadores",
          has_condition: false,
          resize: true,
          color: "blue darken-3",
          condition_property: "Terminated",
          value: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["g_loginUser"]),
    ...mapState(["token"])
  },
  methods: {},

  mounted: function() {
    var esto = this;
    esto.$store.dispatch("s_Loading", {
      value: 0,
      show: true
    }),
      esto.$store.dispatch("GetSummarySubordinates");
  }
};
</script>

<style scope>
@import "../assets/css/global.css";

@import "../assets/css/media_query.css";

.ml-6 {
  margin-left: 68px;
}
</style>
