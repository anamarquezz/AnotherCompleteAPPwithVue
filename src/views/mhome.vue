<template>
  <v-container fluid>
    <v-layout>
      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex row xs6 md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex row xs11 md11 lg11 xl11 class="mt-5">
        <v-container  class="mt-5">
          <v-flex xs12 >
            <v-card>
              <div class="text-center">
                <img src="../assets/img/logow.png" />
              </div>
              <v-card-title primary-title>
                <div>
                  <h2 class="">Bienvenido al Sistema de Evaluación de desempeño</h2>
                  <h4 class="grey--text">Clover Wireless</h4>
                </div>               
              </v-card-title>
            </v-card>             
          </v-flex>
          <v-flex xs12>
            <div v-if="g_loginUser.isRH">
                  <v-container fluid>
                    <v-toolbar dark color="blue darken-1 white--text">
                      <h4><i class="far fa-list-alt mr-3"></i>Escala de distribución</h4>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <listaempleados from="EVAL"  :headers="headersDistribucion"  excelname="escaladistribuciontodosempleados.xls"
                      v-if="g_loginUser.Subordinates.length > 0" :list='g_loginUser.Subordinates'>
                    </listaempleados>
                  </v-container>
                </div>
            </v-flex>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex';

  import menuoptions from '../components/menuoptions.vue'
  import navbar from '../components/navbar.vue'
  import listaempleados from '../components/listaempleados.vue'


  export default {

    name: 'minicio',
    components: {
      menuoptions,
      navbar,
      listaempleados
    },
    data() {
      return {
        headersDistribucion: [{
            text: "",
            type: 'text',
            value: "ValueDefinition",
            resize: true
          }, {
            text: "Puntuación",
            type: 'text',
            value: "Puntuation",
            resize: true
          },
          {
            text: "Evaluación",
            type: 'text',
            value: "Score",
            resize: false
          },
          {
            text: "Capacidad Maxima",
            type: 'text',
            value: "Quantity",
            resize: false
          },
          {
            text: "Personas Evaluadas",
            type: 'text',
            value: "Evaluated",
            resize: false
          },
          {
            text: "% de Distribución",
            type: 'text',
            value: "Percentage",
            resize: false
          },
          {
            text: "Num de Personas",
            type: 'text',
            value: "Quantity",
            resize: false
          }, {
            text: "Nombre Personas",
            type: 'combo',
            value: "distributionByEmployee",
            iconbtn: 'fa fa-users',
            titlecombo: 'PrettyName',
            valuecombo: 'Number',
            action: "action_evaluarEmpleado",
            resize: false

          }
        ]
      }
    },
    computed: {
      ...mapGetters(["g_loginUser"]),
    },
    methods: {},
    created: function () {
      var esto = this;
      esto.$store.dispatch("s_Loading", {
          value: 0,
          show: true
        }),
        esto.$store.dispatch('GetDistributionAll');
    }
  }

</script>

<style scope>
  a {
    color: #feffff;
    text-decoration: none;
  }

  a:hover {
    color: #f7f898;
  }

  @import '../assets/css/global.css';

  @import '../assets/css/media_query.css';

</style>
