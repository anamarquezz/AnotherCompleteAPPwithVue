<template>
  <v-container fluid>
    <v-layout>


      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex row xs3 md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex row md11 lg11 xl11 class="mt-5">

      <v-container fluid>

          <v-toolbar dark color="indigo darken-4 white--text">
            <h4><i class="fas fa-id-card mr-3"></i>Gerentes/Sup. Generales</h4>

            <v-spacer></v-spacer>
          </v-toolbar>
          <listaempleados from="EVAL" :headers="headers" v-if="g_loginUser.Subordinates.length > 0" excelname="supervisoresaevaluar.xls"
            :list='g_loginUser.Subordinates'>
          </listaempleados>
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

  import listaempleados from '../components/listaempleados.vue'
  import navbar from '../components/navbar.vue'
  import menuoptions from '../components/menuoptions.vue'

  export default {

    name: 'mempleadosevaluadores',
    components: {
      menuoptions,
      navbar,
      listaempleados
    },
    data() {
      return {
        headers: [{
            text: "Num Emp",
            type: 'text',
            resize: false,
            value: "Number"
          },
          {
            text: "Nombre",
            type: 'text',
            resize: true,
            value: "PrettyName"
          },
          {
            text: "Clasificación",
            type: 'text',
            resize: false,
            value: "Clasificacion"
          },
          {
            text: "Puesto",
            type: 'text',
            resize: false,
            value: "Position"
          },
           {
            text: "Número de Empleados",
            type: 'text',
            resize: false,
            value: "TotalEvaluate",
            tooltip:'Total Epleados a Evaluar'          
          },
           {
            text: "No Iniciados",
            type: 'text',
            resize: false,
            value: "NoIniciados",
             tooltip:'Numero de Empleados que no se ha iniciado su evaluación'
          },
          {
            text: "Iniciado",
            type: 'text',
            resize: false,
            value: "Initiated",
            tooltip:'Numero de Empleados que ya se inició su evaluación pero que aun faltan puntos por califica'
          },
           {
            text: "Completado",
            type: 'text',
            resize: false,
            value: "Completed",
              tooltip:'Numero de Empleados que ya se terminaron de evaluar y está pendiente su retroalimentación'
          },
          {
            text: "Terminado",
            type: 'text',
            resize: false,
            value: "Evaluated",
              tooltip:' Numero de Empleados con el proceso finalizado (evaluación, retroalimentación y firmas)'
          },
         
         

          {
            text: "",
            type: 'button',
            btntitle: 'Visualizar',
            action: "action_visualizarEmpleados",
            has_condition: false,
            resize: true,
            color:'blue darken-3',
            condition_property: 'Evaluated',              
            value: ""
          }
        ]
      }
    },
    computed: {
      ...mapGetters(["g_loginUser"]),
      ...mapState([
        'token'
      ])
    },
    methods: {

    },

    mounted: function () {

      var esto = this;
      esto.$store.dispatch("s_Loading", {
          value: 0,
          show: true
        }),
        esto.$store.dispatch('GetSummarySubordinates');

    },
  }

</script>

<style scope>
  @import '../assets/css/global.css';

  @import '../assets/css/media_query.css';

</style>
