<template>
  <v-container fluid>
    <v-layout>
      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex roww xs md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex xs12 md8 lg8 xl8 class="mt-5 " v-if="g_periods.length > 0">

        <v-toolbar dark color="light-blue darken-4" class="mt-3 mb-5">
          <v-toolbar-title class="white--text ">
            <h3 class="text-pre-wrap font-weight-bold text-center">Administrador de Fechas</h3>
          </v-toolbar-title>
        </v-toolbar>

        <v-layout row wrap class="mt-3 ml-5" v-for="fechas in g_periods" :key="fechas.code">

          <v-flex xs12 sm12 md12 lg12 xl2 class="ml-3 mt-3">
            <h5 class="text-pre-wrap font-weight-bold">{{fechas.description}}</h5>
          </v-flex>

          <v-flex xs12 sm5 md4 lg-4 xl3 class="ml-3 mt-2">
            <h5 class="dinline"></h5>
            <v-menu lazy :close-on-content-click="true" transition="scale-transition" offset-y full-width
              :nudge-right="40" max-width="190px" min-width="290px">
              <v-text-field slot="activator" label="Desde:" v-model="fechas.minDate" prepend-icon="event" readonly>
              </v-text-field>
              <v-date-picker v-model="fechas.minDate" no-title scrollable actions color="light-blue darken-4" dark>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs12 sm5 md4 lg-4 xl3 class="ml-3 mt-2">
            <v-menu lazy :close-on-content-click="true" transition="scale-transition" offset-y full-width
              :nudge-right="40" max-width="190px" min-width="290px">
              <v-text-field slot="activator" label="Hasta" v-model="fechas.maxDate" prepend-icon="event" readonly>
              </v-text-field>
              <v-date-picker v-model="fechas.maxDate" no-title scrollable actions color="light-blue darken-4 " dark>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
          </v-flex>  
          <v-flex xs12 sm5 md4 lg24 xl2 class="ml-3 mt-1">
             <v-btn color="light-blue darken-4" dark large v-on:click="guardarfecha(fechas)"><b>Guardar</b></v-btn>    
          </v-flex>       
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


  import navbar from '../components/navbar.vue'
  import menuoptions from '../components/menuoptions.vue'

  export default {

    name: 'mconfigurarfechas',
    components: {
      menuoptions,
      navbar
    },
    data() {
      return {
        date: new Date().toISOString().substr(0, 10),
        datestart: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false

      }
    },
    computed: {
      ...mapGetters(["g_loginUser", "g_periods"]),
      ...mapState([
        'token'
      ]),

    },
    methods: {
      guardarfecha(item){
        var esto = this;
         new Promise((resolve, reject) => {
            esto.$store.dispatch("guardarPeriodo",item).then(() =>
              resolve('listo!!')).catch(err => console.log(err));
          }).then((successMessage) => {            
          });

      }
    },
    created: function () {
      if (this.token == undefined) {
        this.$router.push('/#login');
      }
    },
  }

</script>

<style scope>
  @import '../assets/css/global.css';
  @import '../assets/css/media_query.css';

</style>
