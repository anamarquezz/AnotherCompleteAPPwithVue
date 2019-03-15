<template>
  <div id="app" class="h-100p">
    <div class="container-fluid h-100p">
      <login v-if="gsw_ui === 'login'"></login>     
      <mainevaluation v-if="gsw_ui === 'mainevaluation'" ></mainevaluation>
    </div>
  </div>
</template>

<script>
  /*APPSS */
  import mainevaluation from './components/mainevaluation.vue';
  import login from './components/login/login.vue';

  export default {

    name: 'App',
    components: {
      mainevaluation,
      login
    },
    data() {
      return {}
    },
    computed: {
      gsw_ui() {
        return this.$store.getters.gsw_ui;
      }
    }

  }
</script>

<style scoped>
  @import './assets/css/global.css';
</style>