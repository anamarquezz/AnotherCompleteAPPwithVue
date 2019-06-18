<template>
  <v-container fluid>
    <v-layout>


      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex row xs3 md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex row md11 lg11 xl11 class="mt-5">
        <v-container fluid>
          <v-flex xs12>
            <v-btn color="blue darken-2" dark large @click="RegresarUsuarios()"><b>
                <h4 class="dinline mr-2"><i class="fas fa-arrow-left mt-2"></i></h4>Regresar
              </b>
            </v-btn>
          </v-flex>
          <v-flex xs12>
            <v-toolbar dark color="indigo darken-4 white--text">
              <h5><i class="fas fa-users mr-3"></i>Empleados Evaluados por el Supervisor</h5>

              <v-spacer></v-spacer>
            </v-toolbar>
            <listaempleados :headers="headers" v-if="g_loginUser.Subordinatesbyuser.length > 0"
              excelname="empleadosporsupervisor.xls" :list='g_loginUser.Subordinatesbyuser'>
            </listaempleados>
          </v-flex>
          <v-flex xs12>
            <v-toolbar dark color="light-blue darken-4 white--text">
              <h4><i class="far fa-list-alt mr-3"></i>Escala de distribución</h4>
              <v-spacer></v-spacer>
            </v-toolbar>
            <listaempleados from="SUP" :headers="headersDistribucion"
              v-if="g_loginUser.DistributionSuperviser.length > 0" :list='g_loginUser.DistributionSuperviser'
              excelname="escaladistribuciontodosempleados.xls" haspagination=false>
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
  name: "mevaluadosporsupervisor",
  components: {
    menuoptions,
    navbar,
    listaempleados
  },
  data() {
    return {
      headers: [
        {
          text: "",
          type: "image",
          value: "Image",
          resize: true
        },
        {
          text: "Num Emp",
          type: "text",
          value: "Number",
          resize: false
        },
        {
          text: "Nombre",
          type: "text",
          value: "PrettyName",
          resize: true
        },
        {
          text: "Clasificación",
          type: "text",
          value: "Clasificacion",
          resize: false
        },
        {
          text: "Puesto",
          type: "text",
          value: "Position",
          resize: false
        },
        {
          text: "Estatus",
          type: "text",
          value: "Status",
          resize: false
        },
        {
          text: "Evaluacion",
          type: "text",
          value: "Score",
          resize: false
        },
        {
          text: "",
          type: "button",
          align: "left",
          btntitle: "Firmar",
          action: "action_evaluarEmpleado",
          has_condition: false,
          resize: true,
          value: "",
          color: "blue"
        }
      ],
      headersDistribucion: [
        {
          text: "",
          type: "text",
          value: "ValueDefinition",
          resize: true
        },
        /*   {
          text: "Puntuación",
          type: "text",
          value: "Puntuation",
          resize: true
        },*/
        {
          text: "Evaluación",
          type: "text",
          value: "Score",
          resize: false
        },
        {
          text: "Capacidad Maxima",
          type: "text",
          value: "Quantity",
          resize: false
        },
        {
          text: "Personas Evaluadas",
          type: "text",
          value: "Evaluated",
          resize: false
        },
        {
          text: "% de Distribución",
          type: "text",
          value: "Percentage",
          resize: false
        },
        /* {
          text: "Num de Personas",
          type: "text",
          value: "Quantity",
          resize: false
        },
        {
          text: "Nombre Personas",
          type: "combo",
          value: "distributionByEmployee",
          iconbtn: "fa fa-users",
          titlecombo: "PrettyName",
          valuecombo: "Number",
          action: "action_evaluarEmpleado",
          resize: false
        }*/
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
    ...mapState(["token"])
  },
  methods: {
    RegresarUsuarios() {
      var esto = this;
      esto.$store.dispatch("cambiarmenu", {
        code: "mempleadosevaluadores",
        show: false
      });
    }
  },
  created: function() {
    if (this.g_loginUser.Subordinatesbyuser.length == 0)
      this.$router.push("/mempleadosevaluadores");
  }
};
</script>

<style scope>
@import "../assets/css/global.css";

@import "../assets/css/media_query.css";
</style>
