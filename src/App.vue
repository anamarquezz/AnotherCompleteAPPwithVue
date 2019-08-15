<template>
  <div id="app" class="h-100p" v-resize="onResize">
    <v-app>
      <router-view />

      <div class="containersModal" v-if="g_Loading.show || g_Loading.showlinear">
        <v-progress-circular v-if="g_Loading.show && isMobile" :size="150" :width="10" color="light-blue darken-3" indeterminate
          class=" display-3 font-weight-bold center possition2 loadingz">
        
        </v-progress-circular>



        <v-progress-circular v-if="g_Loading.show  && !isMobile" :size="270" :width="20" color="light-blue darken-3" indeterminate
          class=" display-3 font-weight-bold possition center">         
        </v-progress-circular>

        <div v-if="g_Loading.showlinear" class="possition3">

          <v-btn fixed left top  color="light-blue accent-4" class="z-idx shadowborder" dark large v-on:click="cancelshowlinear()">
             <v-icon dark>fas fa-window-close </v-icon>
             <b class="ml-3">Cancelar</b></v-btn>
             
          <h1 class=" indigo--text"> <i class="fontsihuella mt-3 fas fa-fingerprint"></i>
            Favor de colocar tu huella en el dispositivo,</h1>
          <h1 v-if="validhuella !='' " class=" ml-5 mt-4 red--text">Huella invalida, intenta de nuevo</h1>


        </div>


        <v-progress-linear v-if="g_Loading.showlinear" class="possition2" :indeterminate="true"></v-progress-linear>

      </div>


      <mensaje v-if="g_showMessage.show"></mensaje>
      <cdialog v-if="gsw_dialog.Value"></cdialog>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import mensaje from "./components/elemento/mensaje.vue";
import cdialog from "./components/elemento/cdialog.vue";

export default {
  name: "App",
  components: {
    mensaje,
    cdialog
  },
  data() {
    return {
      interval: {},
      value: 0,
      isMobile: false
    };
  },
  computed: {
    ...mapGetters(["g_Loading", "g_showMessage", "gsw_dialog"]),
    ...mapState(["validhuella"])
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    onResize() {
      if (window.innerWidth < 910) this.isMobile = true;
      else this.isMobile = false;
    },

    cancelshowlinear() {
      var esto = this;
      esto.$store.dispatch("s_Loading", {
        value: 0,
        show: false,
        showlinear: false
      });
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      if (!this.g_Loading.show) {
        return (this.value = 0);
      }
      if (this.value < 100) {
        this.value += 10;
      }
    }, 2000);
  }
};
</script>


<style scoped>
@import "./assets/css/global.css";

.v-progress-circular {
  margin: 1rem;
}

.mt-200 {
  margin-top: -50px;
}

.possition {
  position: fixed;
  top: 250px;
  bottom: 0;
  left: 500px;
  width: 22;
}

.possition2 {
  position: fixed;
  top: 300px;
  bottom: 0;
  left: 320px;
}

.loadingz {
  z-index: 10;
}

.v-progress-circular__underlay {
  stroke: rgb(73, 86, 97);
  z-index: 1;
}
</style>
