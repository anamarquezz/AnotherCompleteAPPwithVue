<template>
  <div v-resize="onResize">
    <div v-if="!isMobile">

      <v-layout wrap class="text-center pl-4 pr-4">
        <v-flex xs12>
          <h4 class="orange light-1 white--text p-2 mr-1 ml-1 h2 font-weight-bold">PUNTUACIÓN</h4>
          <v-flex xs12 sm12 mdl12 lg12 xl12>
            <h1 class="  mr-1 ml-1 font-weight-bold">{{g_empleadoaEvaluar.puntuacionEmpleado}}</h1>
          </v-flex>

        </v-flex>

        <v-flex xs12>
          <h4 class="orange light-1 white--text p-2 ml-1 mr-1 h2 font-weight-bold">EVALUACIÓN</h4>
       <!--   <v-rating large v-model="g_empleadoaEvaluar.ratingEmpleado" background-color="orange" color="orange"
            readonly="readonly"></v-rating> -->        
             <h1 class=" mr-1 ml-1 font-weight-bold">{{g_empleadoaEvaluar.ratingEmpleado}}</h1>
        </v-flex>
      </v-layout>
    </div>

    <div v-else class="mb-2 mt-5">
      <v-layout wrap class=" mt-5 ">
        <v-flex xs12 sm12 mdl12 lg12 xl12>
          <h4 class="orange light-16 white--text p-2 mr-1 ml-1 h2 font-weight-bold">PUNTUACIÓN</h4>
          <v-flex xs12 sm12 mdl12 lg12 xl12>
            <h1 class="  mr-1 ml-1 font-weight-bold">{{g_empleadoaEvaluar.puntuacionEmpleado}}</h1>
          </v-flex>

        </v-flex>
        <v-flex xs12 sm12 mdl12 lg12 xl12 class="mt-3">
          <h4 class="orange light-1 white--text p-2 ml-1 mr-1 h2 font-weight-bold">EVALUACIÓN</h4>
       <!--   <v-rating large v-model="g_empleadoaEvaluar.ratingEmpleado" background-color="orange" color="orange"
            readonly="readonly"></v-rating> -->
               <h1 class="  mr-1 ml-1 font-weight-bold">{{g_empleadoaEvaluar.ratingEmpleado}}</h1>
        </v-flex>
      </v-layout>
   

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "calificacionpuntuacion",
  props: {},
  data() {
    return {
      isMobile: false,
      rating: 5
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  },
  computed: {
    ...mapGetters(["g_empleadoaEvaluar"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../../../assets/css/global.css";

@import "../../../../assets/css/media_query.css";
</style>
