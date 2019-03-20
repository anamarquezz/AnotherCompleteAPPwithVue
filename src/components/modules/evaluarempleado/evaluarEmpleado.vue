<template>



      <v-container grid-list-md text-xs-center>
      <v-layout row wrap>

        <v-flex xs8>
          <aHistorialDiciplinario></aHistorialDiciplinario>
        </v-flex>

        <v-flex xs4>
          <infoEmpleado></infoEmpleado>
          <firmasyResultados></firmasyResultados>

        </v-flex>

       
        
      </v-layout>
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