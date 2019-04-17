<template>
  <v-container fluid>
    <v-layout>


      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex row xs12 md lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex row md9 lg9 xl9 class="mt-5">
        <v-layout row class="mt-5">
         <listaempleados v-if="g_loginUser.Subordinates.length > 0" titletoolbar="Empleados Evaluadores" icontoolbar="fas fa-id-card " colortoolbar="light-blue darken-2" :headers="headers" g_gridby="employeetoevaluateRH">
         </listaempleados>
        </v-layout>
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
       headers : [ 
            {
              text: "Num Emp",
              value: "Number"
            },
            {
              text: "Nombre",
              value: "PrettyName"
            },
            {
              text: "Clasificación",
              value: "Clasificacion"
            },
            {
              text: "Puesto",
              value: "Position"
            },
            {
              text: "Iniciado",
              value: "Initiated"
            },
            {
              text: "Evaluado",
              value: "Evaluated"
            },
            {
              text: "Completado",
              value: "Completed"
            },
            {
              text: "Total Evaluados",
              value: "TotalEvaluate"
            },
            {
              text: "",
              value: "Actions"
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
    methods: {},
     created: function () {
        var token = this.token;
          if(this.token == undefined){
            this.$router.push('/#login');
          }
    },
  }

</script>

<style scope>
 
    @import '../assets/css/global.css';

  @import '../assets/css/media_query.css';

</style>
