<template>
  <div id="app" class="h-100p" v-resize="onResize">

    <router-view/>

    <v-progress-circular v-if="g_Loading.show && isMobile" :rotate="-100" :size="250" :width="40" :value="value"
      color="blue" class=" display-3 font-weight-bold center possition2 loadingz">
      {{ value }}
    </v-progress-circular>

    <mensaje v-if="g_showMessage.show"></mensaje>
  </div>
</template>

<script>
  

  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex';
  import mensaje from './components/elemento/mensaje.vue';
  export default {
    name: 'App',
    components: { 
       mensaje
    },
    data() {
      return {
        interval: {},
        value: 0,
        isMobile: false,
      }
    },
       computed: {       
            ...mapGetters(["g_Loading","g_showMessage"]),
            
    }, 
    beforeDestroy() {
      clearInterval(this.interval);

    },
    methods: {
      onResize() {
        if (window.innerWidth < 910)
          this.isMobile = true;
        else
          this.isMobile = false;
      },
    },
    mounted() {
      this.interval = setInterval(() => {
        if (!this.g_Loading.show) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1500);
    }
  }

</script>

<style scoped>
  @import './assets/css/global.css';

  .v-progress-circular {
    margin: 1rem
  }

  .mt-200 {
    margin-top: -50px;
  }


  .possition {
    position: fixed;
    top: 250px;
    bottom: 0;
    left: 500px;
    width: 22%;

  }

  .possition2 {

    position: fixed;
    top: 300px;
    bottom: 0;
    left: 100px;

  }

  .loadingz {
    z-index: 10;
  }

  .v-progress-circular__underlay {
    stroke: rgb(73, 86, 97);
    z-index: 1;
  }

</style>
