<template>
  <v-container fluid>
    <v-layout>


      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex row xs md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex row xs12 md9 lg9 xl9 class="mt-5">
        <v-layout row class="mt-5">
          <listaempleados v-if="g_loginUser.Subordinates.length > 0" titletoolbar="Empleados a Evaluar" icontoolbar="far fa-list-alt"
            colortoolbar="light-blue darken-2" :headers="headers" g_gridby="employeetoevaluate">
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

    name: 'mempleadosaevaluar',
    components: {
      menuoptions,
      navbar,
      listaempleados
    },
    data() {
      return {
        headers: [{
            text: "",
            value: "Image"
          },
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
            text: "Status",
            value: "Status"
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
