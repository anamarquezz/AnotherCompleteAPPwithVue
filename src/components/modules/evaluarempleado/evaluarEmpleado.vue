<template>
  <v-container fluid grid-list-xs>

    <div class="row mb-3">
      <div class="row">
        <div class="col text-left"></div>
        <v-btn color="blue darken-2 mnl-5" dark large @click="RegresarUsuarios()"><b>
            <h4 class="dinline mr-2"><i class="fas fa-arrow-left mt-2"></i></h4>Regresar
          </b>
        </v-btn>
        <h6 class="text-pre-wrap font-weight-bold headline ml-5">EVALUACION DE DESEMPEÑO</h6>
      </div>
    </div>

    <v-layout>
      <v-flex xs12 sm8 md8 lg8 xl8>
        <div class="text-right">
          <v-btn color="light-blue darken-4" dark large v-on:click="GuardarEvaluacion"><b>Guardar</b></v-btn>
        </div>
        <aHistorialDiciplinario></aHistorialDiciplinario>
        <aReactivosPersonal class="mt-1"></aReactivosPersonal>
        <firmas class="mt-lg-5"></firmas>
      </v-flex>

      <v-flex xs12 sm4 md4 lg4 xl4>
        <infoEmpleado class=""></infoEmpleado>
        <expansionlist></expansionlist>
        <calificacionpuntuacion></calificacionpuntuacion>
      </v-flex>
    </v-layout>
  </v-container>


</template>

<script>
  import infoEmpleado from './childs/infoEmpleado.vue';
  import firmas from './childs/firmas.vue';

  import expansionlist from '../../elemento/expansionlist.vue'

  import aHistorialDiciplinario from './childs/aHistorialDiciplinario.vue';
  import aReactivosPersonal from './childs/aReactivosPersonal.vue';

  import calificacionpuntuacion from './childs/calificacionpuntuacion.vue';

  export default {
    name: 'evaluarEmpleado',
    components: {

      infoEmpleado,
      firmas,
      aHistorialDiciplinario,
      aReactivosPersonal,
      calificacionpuntuacion,

      expansionlist
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      GuardarEvaluacion: function () {
        var esto = this;
        new Promise((resolve, reject) => {
          esto.$store.dispatch('saveUpdateUser').then(() =>
            resolve('listo!!')
            ).catch(err => console.log(err));
        }).then(() => {
          
          esto.$store.dispatch('backevaluarempleado').then( () =>{
              esto.$router.push('/mempleadosaevaluar')
          })
         
        });


      },
      RegresarUsuarios() {
        var esto = this;
        new Promise((resolve, reject) => {
          esto.$store.dispatch('GetSubordinateByUser').then(() =>
            resolve('listo!!'),
            esto.$store.dispatch('backevaluarempleado')).catch(err => console.log(err));
        }).then((successMessage) => {
          esto.$router.push('/mempleadosaevaluar');
        });


      },
      GuardarEvaluacion() {
        var esto = this;
        new Promise((resolve, reject) => {
          esto.$store.dispatch('GetSubordinateByUser').then(() =>
            resolve('listo!!'),
          ).catch(err => console.log(err));
        }).then((successMessage) => {});
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../assets/css/global.css';
  @import '../../../assets/css/media_query.css';

  .theme--dark.v-toolbar {
    background-color: #1e88e5 !important;
    color: #fff !important;
  }

</style>
