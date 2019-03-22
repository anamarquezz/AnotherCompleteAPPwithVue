<template>
  <div v-if="!isMobile">  
    <v-layout wrap class=" mt-5 " v-resize="onResize">
       <v-flex xs12 sm12 mdl12 lg12 xl12>
          <h4 class="orange light-16 white--text p-2 mr-1 ml-1">PUNTUACIÓN</h4>
          <v-rating v-model="rating" background-color="orange" color="orange" readonly="readonly"></v-rating>

        </v-flex>
        <v-flex xs12 sm12 mdl12 lg12 xl12 class="mt-3">
          <h4 class="orange light-1 white--text p-2 ml-1 mr-1">EVALUACIÓN</h4>
          <v-rating v-model="rating" background-color="orange" color="orange" readonly="readonly"></v-rating>
        </v-flex>
    </v-layout>

      <v-layout wrap class="white " >

      <v-toolbar dark>
        <h5>Información del Empleado</h5>
      </v-toolbar>


      <v-layout row wrap>
        <v-flex xs10 sm10 mdl10 lg10 xl10 class="mb-2">
          <v-text-field outline label="Firma Empleado:" prepend-inner-icon="fa fa-user"></v-text-field>
        </v-flex>
        <v-flex xs2 sm2 mdl2 lg2 xl2>
          <v-btn fab dark small class="indigo accent-3">
            <v-icon dark>fas fa-edit</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs10 sm10 mdl10 lg10 xl10 class="mb-2">
          <v-text-field outline label="Nombre:" prepend-inner-icon="fa fa-user"></v-text-field>
        </v-flex>
        <v-flex xs2 sm2 mdl2 lg2 xl2>
          <v-btn fab dark small class="indigo accent-3">
            <v-icon dark>fas fa-edit</v-icon>
          </v-btn>
        </v-flex>


        <v-flex xs10 sm10 mdl10 lg10 xl10 class="mb-2">
          <v-text-field outline label="Supervisor" prepend-inner-icon="fas fa-user-tie"></v-text-field>
        </v-flex>
        <v-flex xs2 sm2 mdl2 lg2 xl2>
          <v-btn fab dark small class="indigo accent-3">
            <v-icon dark>fas fa-edit</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>

   </v-layout>
  </div>

  <div v-else>

    <v-container>
      <v-layout wrap class="white" v-resize="onResize">
        <v-flex xs12 sm12 mdl12 lg6 xl6>
          <h4 class="orange light-16 white--text p-3 mr-3 ml-3">PUNTUACIÓN</h4>
          <v-rating v-model="rating" background-color="orange" color="orange" readonly="readonly"></v-rating>

        </v-flex>
        <v-flex xs12 sm12 mdl12 lg6 xl6 class="">
          <h4 class="orange light-1 white--text p-3 ml-3 mr-3">EVALUACIÓN</h4>
          <v-rating v-model="rating" background-color="orange" color="orange" readonly="readonly"></v-rating>
        </v-flex>
      </v-layout>
    </v-container>


  </div>

</template>

<script>
  export default {
    name: 'firmasyResultados',
    props: {},
    data() {
      return {
        isMobile: false,
        rating: 5
      }
    },
    methods: {
      onResize() {
        if (window.innerWidth < 769)
          this.isMobile = true;
        else
          this.isMobile = false;
      }
    },
    computed: {
      g_empleadoaEvaluar() {
        return this.$store.getters.g_empleadoaEvaluar.empleadoInfo;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../../assets/css/global.css';



  @import '../../../../assets/css/media_query.css';
</style>