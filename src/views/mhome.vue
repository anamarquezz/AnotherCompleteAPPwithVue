<template>
  <v-container fluid>
    <v-layout>
      <navbar color="grey darken-4"  textcolor="white--text"></navbar>

      <v-flex row xs6 md2 lg2 xl2>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex row md8 lg8 xl8 class="mt-5">
        <v-layout row class="mt-5">
          <v-flex xs12 sm6 offset-sm3>
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

  import menuoptions from '../components/menuoptions.vue'
  import navbar from '../components/navbar.vue'

  export default {

    name: 'minicio',
    components: {
      menuoptions,
      navbar
    },
    data() {
      return {}
    },
   computed: mapState([
       'token'       
     ]),
    methods: {},
    created: function () {
        var token = this.token;
          if(this.token == undefined){
            this.$router.push('/#login');
          }
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
