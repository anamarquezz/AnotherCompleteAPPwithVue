<template>
  <v-container fluid>
    <v-layout>
      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex row xs3 md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex xs12 md12 lg12 xl12 class="mt-5 " v-if="g_periods.length > 0">

        <v-toolbar dark color="light-blue darken-4" class="mt-3 mb-5">
          <v-toolbar-title class="white--text ">
            <h4 class="text-pre-wrap font-weight-bold text-center">Calendario</h4>
          </v-toolbar-title>
        </v-toolbar>

        <v-layout row wrap class="mt-3 ml-lg-5 ml-xl-5" v-for="fechas in g_periods" :key="fechas.code">

          <v-flex xs12 sm12 md12 lg3 xl2 class="ml-3 mt-3">
            <h5 class="text-pre-wrap font-weight-bold">{{fechas.description}}</h5>
          </v-flex>

          <v-flex xs3 sm3 md3 lg3 xl3 class="ml-3 mt-2">
            <h5 class="dinline"></h5>
            <date-picker :disabledDays="disabledDays" v-if="fechas.code ==='YEAR'" v-model="fechas.minDate" type="year"
              format="YYYY" :lang="lang"></date-picker>

            <v-menu v-if="fechas.code !=='YEAR'" lazy :close-on-content-click="true" transition="scale-transition"
              offset-y full-width :nudge-right="40" max-width="190px" min-width="290px">
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

          <v-flex xs3 sm3 md3 lg3 xl3 class="ml-3 mt-2">
            <date-picker :disabledDays="disabledDays" v-if="fechas.code ==='YEAR'" v-model="fechas.maxDate" type="year"
              format="YYYY" :lang="lang"></date-picker>

            <v-menu v-if="fechas.code !=='YEAR'" lazy :close-on-content-click="true" transition="scale-transition"
              offset-y full-width :nudge-right="40" max-width="190px" min-width="290px">
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
          <v-flex xs2 sm2 md3 lg2 xl3 class="ml-3 mt-1">
            <v-btn color="light-blue darken-4" dark large v-on:click="guardarfecha(fechas)"><b>Guardar</b></v-btn>
          </v-flex>
        </v-layout>

        <v-layout>
        </v-layout>

      </v-flex>
    </v-layout>


  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

//https://mengxiong10.github.io/vue2-datepicker/demo/index.html
import navbar from "../components/navbar.vue";
import menuoptions from "../components/menuoptions.vue";
import DatePicker from "vue2-datepicker";
export default {
  name: "mconfigurarfechas",
  components: {
    menuoptions,
    navbar,
    DatePicker
  },
  data() {
    return {
      date: null,
      menu: false,
      modal: false,
      menu2: false,
      lang: {
        placeholder: {
          date: "Selecciona el año"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["g_loginUser", "g_periods"]),
    ...mapState(["token"])
  },
  methods: {
    guardarfecha(item) {
      var esto = this;

      esto.$store.dispatch("s_Loading", {
        value: 0,
        show: true
      }),
        esto.$store.dispatch("guardarPeriodo", item);
    },
    disabledDays(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      return year < 2018 || year > 2019;
    }
  },
  created: function() {
    var esto = this;
    esto.$store.dispatch("s_Loading", {
      value: 0,
      show: true
    }),
      esto.$store.dispatch("GetPeriods");
  }
};
</script>

<style scope>
@import "../assets/css/global.css";
@import "../assets/css/media_query.css";

.mx-calendar {
  float: left;
  color: #fff9f9cf;
  padding: 6px 12px;
  font: 18px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei, sans-serif;
  background: #000000cf;
}

.cell:hover {
  color: #01579b;
  font-weight: bold;
}
</style>
