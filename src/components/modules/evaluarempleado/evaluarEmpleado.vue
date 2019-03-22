<template>
  <v-container fluid grid-list-xs text-xs-center>
    <div class="row mb-3">
      <div class="col-md-7 col-lg-7 col-xl-10 mt-2">
        <v-toolbar dark color="blue ">
          <v-toolbar-title class="white--text ">
            <h6 class="text-pre-wrap font-weight-bold">EVALUACION DE DESEMPEÑO</h6>
          </v-toolbar-title>
            <v-spacer></v-spacer>          
        </v-toolbar>
      </div>
      <div class="col-xl-2">
           <v-btn color="blue darken-2 w-50 mb-2" dark large class="w-100 h-75"><b>Evaluar</b></v-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-md-7 col-lg-7 col-xl-8 order-2  order-md-1 order-lg-1 order-xl-1 mt-2">
        <aHistorialDiciplinario></aHistorialDiciplinario>
        <aReactivosPersonal class="mt-3"> </aReactivosPersonal>
      </div>
      <div class="col-md-7 col-lg-5 col-xl-4 order-1 order-md-2 order-lg-2 order-xl-2  mt-2">
        <infoEmpleado class=""></infoEmpleado>
        <firmasyResultados class="mt-lg-5"></firmasyResultados>
      </div>
    </div>
  </v-container>


</template>

<script>
  import infoEmpleado from './childs/infoEmpleado.vue';
  import firmasyResultados from './childs/firmasyResultados.vue';

  import aHistorialDiciplinario from './childs/aHistorialDiciplinario.vue';
  import aReactivosPersonal from './childs/aReactivosPersonal.vue';

  export default {
    name: 'evaluarEmpleado',
    components: {

      infoEmpleado,
      firmasyResultados,
      aHistorialDiciplinario,
      aReactivosPersonal
    },
    data() {
      return {}
    },
    computed: {},
    methods: {}
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