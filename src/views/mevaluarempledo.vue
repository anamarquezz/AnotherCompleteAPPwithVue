<template>
  <v-container fluid>
    <v-layout>
      <navbar color="grey darken-4"  textcolor="white--text"></navbar>

      <v-flex roww xs6 md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex row xs12 md9 lg9 xl9 class="mt-5">
        <v-layout row class="mt-5">
         <evaluarempleado v-if="g_loginUser.empleadoaEvaluar.indicatorTress.length > 0"> </evaluarempleado>
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

import evaluarempleado from "../components/modules/evaluarempleado/evaluarempleado.vue";
  import navbar from '../components/navbar.vue'
   import menuoptions from '../components/menuoptions.vue'

  export default {

    name: 'mempleadoaevaluar',
    components: {
      menuoptions,
      navbar,
      evaluarempleado
    },
    data() {
      return {      
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
