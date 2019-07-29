<template>
  <v-container fluid>
    <v-layout>


      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex row xs3 md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex row xs12 md11 lg11 xl11 class="mt-5">
        <v-container fluid class="mt-5">
          <v-toolbar dark color="indigo darken-4 white--text">
            <h4><i class="fa fa-users mr-3"></i>Plantilla Activa</h4>
            <v-spacer></v-spacer>
          </v-toolbar>
          <listaempleados from="EVAL" :headers="headers" v-if="g_loginUser.Subordinates.length > 0"
            :list='g_loginUser.Subordinates' excelname="todoslosempleados.xls">
          </listaempleados>


        </v-container>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import listaempleados from "../components/listaempleados.vue";
import navbar from "../components/navbar.vue";
import menuoptions from "../components/menuoptions.vue";

export default {
  name: "mtodosempleados",
  components: {
    menuoptions,
    navbar,
    listaempleados
  },
  data() {
    return {
      headers: [
        /*{
          text:'',
          type: 'icon',
          iconbtn:'fas fa-user',
          resize: true
        },*/
        {
          text: "Num Emp",
          type: "text",
          align: "center",
          value: "Number",
          resize: false
        },
        {
          text: "Nombre",
          type: "text",
          align: "center",
          value: "PrettyName",
          resize: true
        },
        {
          text: "Clasificación",
          type: "text",
          align: "center",
          value: "Clasificacion",
          resize: true
        },
        {
          text: "Puesto",
          type: "text",
          align: "center",
          value: "Position",
          resize: false
        },
        {
          text: "Departamento",
          type: "text",
          align: "center",
          value: "Department",
          resize: false
        },
        {
          text: "Supervisor",
          type: "text",
          align: "center",
          value: "SupervisorPrettyName",
          resize: false
        },
        {
          text: "Status",
          type: "text",
          align: "center",
          value: "Status",
          resize: false
        },
        {
          text: "Evaluación",
          type: "text",
          align: "center",
          value: "Score",
          resize: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["g_loginUser"]),
    ...mapState(["token"])
  },
  methods: {},
  created: function() {
    var esto = this;
    esto.$store.dispatch("s_Loading", {
      value: 0,
      show: true
    }),
      esto.$store.dispatch("GetAllEmployees");
  }
};
</script>

<style scope>
@import "../assets/css/global.css";

@import "../assets/css/media_query.css";
</style>
