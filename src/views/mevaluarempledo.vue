<template>
  <v-container fluid v-if="g_loginUser.empleadoaEvaluar.empleadoInfo.length > 0">
    <v-layout>
      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex roww xs1 md1 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>
      <v-flex row xs12 md12 lg9 xl9 class="mt-5">
        <v-layout row class="mt-5">
          <evaluarempleado> </evaluarempleado>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import evaluarempleado from "../components/modules/evaluarempleado/evaluarempleado.vue";
import navbar from "../components/navbar.vue";
import menuoptions from "../components/menuoptions.vue";

export default {
  name: "mempleadoaevaluar",
  components: {
    menuoptions,
    navbar,
    evaluarempleado
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["g_loginUser"]),
    ...mapState(["token"])
  },
  props: ["returnTo"],
  methods: {},
  created: function() {
    if (this.g_loginUser.empleadoaEvaluar.empleadoInfo.length > 0) {
    } else {
      this.$router.push("/mempleadosaevaluar");
    }
  }
};
</script>

<style scope>
@import "../assets/css/global.css";

@import "../assets/css/media_query.css";
</style>
