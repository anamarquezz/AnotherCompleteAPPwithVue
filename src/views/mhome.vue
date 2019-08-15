<template>
  <v-container fluid>
    <v-layout>
      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex row xs6 md3 lg1 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-container grid-list-md class="mt-5">
        <v-layout row wrap class="mt-2">
          <v-flex xs12>
            <v-card class="text-center" color="black" dark>
              <img src="../assets/img/logow.png" width="350" class="mt-5" />
              <v-card-text primary-title class="mt-5 black">
                <h2 class="">Bienvenido al Sistema de Evaluación de desempeño</h2>
                <h4 class="grey--text">Clover Wireless</h4>
              </v-card-text>
            </v-card>
          </v-flex>

          <!--                                                                                                   -->
          <v-flex xs9 class="mt-4">
            <v-card class="mx-auto" color="indigo lighten-1" dark>
              <v-card-title>
                <span class="title font-weight-bold">Periodo de Revisión de Personal Asignado
                </span>
              </v-card-title>
              <v-card-text class="title">
                Durante este periodo Gerentes y/o Sup. Generales deberán revisar que les aparezca el personal que
                físicamente tienen en sus áreas. En caso de presentarse diferencias (personal faltante y/o mal asignado)
                mandar un correo con los cambios requeridos.
              </v-card-text>
              <v-card-actions class="indigo lighten-1">
              </v-card-actions>
            </v-card>
          </v-flex>


          <v-flex xs3 class="mt-4">
            <v-card class="mx-auto">
              <v-card-title class="title">
                <v-icon class="text-center fonticonsize indigo--text text--lighten-1">fas fa-lock</v-icon>
                <h5 class="ml-3 mt-4 font-weight-bold"> {{periodorevision}} </h5>
                <h1 class="ml-3 mt-4 "><i v-if="g_periods.length > 0 && g_periods[0].finalized"
                    class="fas fa-check-square green--text"></i></h1>

              </v-card-title>
              <v-card-actions class="">
              </v-card-actions>
            </v-card>
          </v-flex>



          <v-flex xs1>
          </v-flex>

          <v-flex xs8>
            <v-card class="mx-auto" color="pink lighten-2" dark>
              <v-card-title>
                <span class="title font-weight-bold">Periodo de Evaluaciones
                </span>
              </v-card-title>
              <v-card-text class="title">
                Durante este lapso cada Gerente y/o Sup. General deberá evaluar al personal a su cargo y/o reunirse con
                Supervisores para evaluar el desempeño del personal a su cargo.
              </v-card-text>
              <v-card-actions class="pink lighten-2">
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-flex xs3 class="">
            <v-card class="mx-auto" color="">
              <v-card-title class="title">
                <v-icon class="text-center fonticonsize pink--text text--lighten-2">fas fa-laptop</v-icon>
                <h5 class="ml-3 mt-4 font-weight-bold">{{periodoevaluacion}} </h5>
                <h1 class="ml-3 mt-4 "><i v-if="g_periods.length > 0 && g_periods[1].finalized"
                    class="fas fa-check-square green--text"></i></h1>
              </v-card-title>
              <v-card-actions class="">
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-flex xs2></v-flex>
          <v-flex xs7>
            <v-card class="mx-auto" color="light-blue darken-2" dark>
              <v-card-title>
                <span class="title">Periodo de Revisión por parte de RH
                </span>
              </v-card-title>
              <v-card-text class="title">
                Durante este lapso RH validara que todos los empleados hayan sido evaluados así como que se respete la
                escala de distribución previamente establecida.
              </v-card-text>
              <v-card-actions class="light-blue darken-2">
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-flex xs3>
            <v-card class="mx-auto" color="">
              <v-card-title class="title">
                <v-icon class="text-center fonticonsize light-blue--text text-darken-2">fas fa-calendar-check</v-icon>
                <h5 class="ml-3 mt-4 ">{{periodorevisionRH}} </h5>
                <h1 class="ml-3 mt-4 "><i v-if="g_periods.length > 0 && g_periods[2].finalized"
                    class="fas fa-check-square green--text"></i></h1>
              </v-card-title>
              <v-card-actions class="">
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-flex xs3>
          </v-flex>
          <v-flex xs6>
            <v-card class="mx-auto" color="orange darken-1" dark>
              <v-card-title>
                <span class="title">Periodo de Retroalimentación
                </span>
              </v-card-title>
              <v-card-text class="title">{{g_periodos}}
                Durante este lapso se debe enterar al empleado de los resultados en cada uno de los puntos que conforman
                la evaluación, dando pie a que ellos expresen su punto de vista al respecto.
              </v-card-text>
              <v-card-actions class="orange darken-1">
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-flex xs3 class="mt-3">
            <v-card class="mx-auto" color="">
              <v-card-title class="">
                <v-icon class="text-center fonticonsize orange--text text--darken-1">fas fa-user-friends</v-icon>
                <h5 class="ml-3 mt-4">{{periodoretro}} </h5>
                <h1 class="ml-3 mt-4 "><i v-if="g_periods.length > 0 && g_periods[3].finalized"
                    class="fas fa-check-square green--text"></i></h1>
              </v-card-title>
              <v-card-actions class="">
              </v-card-actions>
            </v-card>
          </v-flex>


          <v-flex xs12 class="mt-5">
            <div v-if="g_loginUser.isRH == 'true'">
              <v-container fluid>
                <v-toolbar dark color="light-blue darken-4 white--text">
                  <h4><i class="far fa-list-alt mr-3"></i>Escala de distribución</h4>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <listaempleados from="EVAL" :headers="headersDistribucion" :pagination_name="pagination_name"
                  excelname="escaladistribuciontodosempleados.xls" v-if="g_loginUser.Subordinates.length > 0"
                  :list='g_loginUser.Subordinates'>
                </listaempleados>
              </v-container>
            </div>

          </v-flex>

        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import menuoptions from "../components/menuoptions.vue";
import navbar from "../components/navbar.vue";
import listaempleados from "../components/listaempleados.vue";

export default {
  name: "minicio",
  components: {
    menuoptions,
    navbar,
    listaempleados
  },
  data() {
    return {
      pagination_name: "mhome_distr",
      periodorevision: "",
      periodoevaluacion: "",
      periodorevisionRH: "",
      periodoretro: "",
      months: [
        "Zero",
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Deciembre"
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
          type: "icon",
          value: "distributionByEmployee",
          iconbtn: "fa fa-users",
          action: "action_gridmodal",
          resize: true
        },*/
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
    ...mapGetters(["g_loginUser", "g_periods"]),
    g_periodos() {
      var periods = this.$store.getters.g_periods;
      if (periods.length > 0) {
        // 2017-08-02
        this.periodorevision =
          "Del " +
          periods[0].minDate.substr(8, 9) +
          " " +
          this.months[parseInt(periods[0].minDate.substr(5, 6))] +
          " al  " +
          periods[0].maxDate.substr(8, 9) +
          " de " +
          this.months[parseInt(periods[0].maxDate.substr(5, 6))];

        this.periodoevaluacion =
          "Del " +
          periods[1].minDate.substr(8, 9) +
          " " +
          this.months[parseInt(periods[1].minDate.substr(5, 6))] +
          " al  " +
          periods[1].maxDate.substr(8, 9) +
          " de " +
          this.months[parseInt(periods[1].maxDate.substr(5, 6))];

        this.periodorevisionRH =
          "Del " +
          periods[2].minDate.substr(8, 9) +
          " " +
          this.months[parseInt(periods[2].minDate.substr(5, 6))] +
          " al  " +
          periods[2].maxDate.substr(8, 9) +
          " de " +
          this.months[parseInt(periods[2].maxDate.substr(5, 6))];

        this.periodoretro =
          "Del " +
          periods[3].minDate.substr(8, 9) +
          " " +
          this.months[parseInt(periods[3].minDate.substr(5, 6))] +
          " al  " +
          periods[3].maxDate.substr(8, 9) +
          " de " +
          this.months[parseInt(periods[3].maxDate.substr(5, 6))];
      }
    }
  },
  methods: {},
  created: function() {
    var esto = this;
    esto.$store.dispatch("s_Loading", {
      value: 0,
      show: true
    }),
      esto.$store.dispatch("GetDistributionAll");
  }
};
</script>

<style scope>
a {
  color: #feffff;
  text-decoration: none;
}

a:hover {
  color: #f7f898;
}

.fonticonsize {
  font-size: 50px;
}

.ml-7 {
  padding-left: 17px;
}

@import "../assets/css/global.css";

@import "../assets/css/media_query.css";
</style>
